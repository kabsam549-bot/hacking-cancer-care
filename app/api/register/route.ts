import { NextRequest, NextResponse } from "next/server";

// Rate limiting: simple in-memory store (resets on cold start)
const submissions = new Map<string, number[]>();

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY || "";
const SPREADSHEET_ID =
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
  "1MjdxXmh4jZfaT-eNWGrHLtGe28K4FoBYqZFKvqUhYLA";

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxPerWindow = 3;

  const times = (submissions.get(ip) || []).filter(
    (t) => now - t < windowMs
  );
  if (times.length >= maxPerWindow) return true;
  submissions.set(ip, [...times, now]);
  return false;
}

function validateEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@mdanderson.org");
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Server-side validation
  const { firstName, lastName, email, role, skills, challengeInterest, hackathonExperience, consent } = body;

  if (!firstName || !lastName || !email || !role || !hackathonExperience || !consent) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!validateEmail(String(email))) {
    return NextResponse.json(
      { error: "Email must be an @mdanderson.org address." },
      { status: 400 }
    );
  }

  if (!Array.isArray(skills) || skills.length === 0) {
    return NextResponse.json(
      { error: "Please select at least one skill area." },
      { status: 400 }
    );
  }

  if (!Array.isArray(challengeInterest) || challengeInterest.length === 0) {
    return NextResponse.json(
      { error: "Please select at least one challenge area." },
      { status: 400 }
    );
  }

  // Build the row
  const row = [
    new Date().toISOString(),
    String(firstName || ""),
    String(lastName || ""),
    String(body.preferredName || ""),
    String(email || ""),
    String(role || ""),
    String(body.trainingLevel || ""),
    String(body.trainingProgram || ""),
    String(body.department || ""),
    Array.isArray(skills) ? skills.join(", ") : "",
    Array.isArray(challengeInterest) ? challengeInterest.join(", ") : "",
    String(hackathonExperience || ""),
    String(body.digitalHealthExperience || ""),
    Array.isArray(body.dietaryRestrictions)
      ? [...(body.dietaryRestrictions as string[]), body.dietaryOther ? String(body.dietaryOther) : ""]
          .filter(Boolean)
          .join(", ")
      : "",
    String(body.accessibilityNeeds || ""),
    String(body.tshirtSize || ""),
    String(body.whyParticipate || ""),
    body.mailingList ? "Yes" : "No",
    body.consent ? "Yes" : "No",
  ];

  // Send to Google Sheets via Apps Script webhook
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    // Development fallback: just log
    console.log("[Registration]", JSON.stringify(row, null, 2));
    return NextResponse.json({ success: true, mode: "dev" });
  }

  try {
    const sheetsRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values: row }),
      signal: AbortSignal.timeout(15000),
    });

    if (!sheetsRes.ok) {
      const text = await sheetsRes.text();
      console.error("[Registration] Sheets webhook error:", sheetsRes.status, text);
      throw new Error(`Webhook returned ${sheetsRes.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Registration] Failed to write to Sheets:", err);
    return NextResponse.json({
      success: true,
      warning: "Submission recorded but could not write to spreadsheet.",
    });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
