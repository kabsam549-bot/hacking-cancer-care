import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Rate limiting: simple in-memory store
const submissions = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    const required = [
      "firstName",
      "lastName",
      "email",
      "role",
      "skills",
      "challengeInterest",
      "hackathonExp",
    ];
    for (const field of required) {
      if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email
    if (!data.email.endsWith("@mdanderson.org")) {
      return NextResponse.json(
        { error: "Please use your MD Anderson email address." },
        { status: 400 }
      );
    }

    // Rate limit: 1 submission per email per hour
    const key = data.email.toLowerCase();
    const lastSubmission = submissions.get(key);
    if (lastSubmission && Date.now() - lastSubmission < 3600000) {
      return NextResponse.json(
        { error: "You have already registered. Check your email for confirmation." },
        { status: 429 }
      );
    }
    submissions.set(key, Date.now());

    const registration = {
      ...data,
      registeredAt: new Date().toISOString(),
      status: "Registered",
    };

    // Save to local JSON (backup)
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "registrations.json");

    let existing: unknown[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }
    existing.push(registration);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    // Append to Google Sheets if configured
    if (process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        await appendToSheet(registration);
      } catch (err) {
        console.error("Google Sheets append failed:", err);
        // Don't fail registration if Sheets fails — we have local backup
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

async function appendToSheet(data: Record<string, unknown>) {
  // Google Sheets API v4 append
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
  const sheetId = process.env.GOOGLE_SHEETS_ID;

  // For now, this is a placeholder. The actual Google Sheets integration
  // requires a service account key. The local JSON backup ensures no data is lost.
  console.log(`Would append to sheet ${sheetId}:`, data.email);
  
  // TODO: Implement JWT auth + sheets.spreadsheets.values.append
  // when Google service account is configured
}
