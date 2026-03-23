"use client";

import { useState, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  role: string;
  trainingLevel: string;
  trainingProgram: string;
  department: string;
  skills: string[];
  challengeInterest: string[];
  hackathonExperience: string;
  digitalHealthExperience: string;
  dietaryRestrictions: string[];
  dietaryOther: string;
  accessibilityNeeds: string;
  tshirtSize: string;
  whyParticipate: string;
  mailingList: boolean;
  consent: boolean;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  preferredName: "",
  email: "",
  role: "",
  trainingLevel: "",
  trainingProgram: "",
  department: "",
  skills: [],
  challengeInterest: [],
  hackathonExperience: "",
  digitalHealthExperience: "",
  dietaryRestrictions: [],
  dietaryOther: "",
  accessibilityNeeds: "",
  tshirtSize: "",
  whyParticipate: "",
  mailingList: false,
  consent: false,
};

const skillOptions = [
  "Clinical",
  "Technical/Coding",
  "Design/UX",
  "Business/Ops",
  "Research",
  "Other",
];
const challengeOptions = [
  "Reducing Preventable Readmissions in Oncology",
  "Simulated Education for Cancer Care Teams",
  "Accelerating Research Efficiency in Oncology",
  "Improving Patient Throughput in Cancer Care Operations",
  "Open to any",
];
const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Kosher",
  "Nut allergy",
  "Other",
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function MultiSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
}) {
  const toggle = (val: string) => {
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 ${
              isSelected
                ? "bg-accent-600 border-accent-500 text-white"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function FormField({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-1.5">
        {label}{" "}
        {required ? (
          <span className="text-accent-400">*</span>
        ) : (
          <span className="text-gray-900/30 text-xs font-normal">(optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="text-gray-900/35 text-xs mt-1.5 leading-relaxed">{hint}</p>}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.toLowerCase().endsWith("@mdanderson.org")) {
      newErrors.email = "Must be an @mdanderson.org email address";
    }
    if (!form.role) newErrors.role = "Please select your role";
    if (form.role === "GME Trainee" && !form.trainingLevel)
      newErrors.trainingLevel = "Training level is required for GME trainees";
    if (form.skills.length === 0)
      newErrors.skills = "Select at least one skill area" as never;
    if (form.challengeInterest.length === 0)
      newErrors.challengeInterest = "Select at least one challenge area" as never;
    if (!form.hackathonExperience)
      newErrors.hackathonExperience = "Please select your experience level";
    if (!form.consent)
      newErrors.consent = "Please acknowledge the full-day commitment" as never;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Submission failed. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  // ─── Success state ──────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-16 h-16 rounded-full bg-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-gray-900 text-2xl font-bold mb-3">Registration Received</h3>
        <p className="text-gray-900/60 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Thank you, {form.firstName}. Your registration for the Hacking Cancer Care hackathon
          on May 2, 2026 has been submitted successfully.
        </p>
        <div className="inline-block text-left p-5 rounded-xl bg-gray-50 border border-gray-200 text-sm space-y-2">
          <p className="text-gray-500"><span className="text-gray-700 font-medium">Date:</span> Saturday, May 2, 2026</p>
          <p className="text-gray-500"><span className="text-gray-700 font-medium">Location:</span> MD Anderson Cancer Center, Houston, TX</p>
          <p className="text-gray-500"><span className="text-gray-700 font-medium">Confirmation sent to:</span> {form.email}</p>
        </div>
        <p className="text-gray-900/40 text-xs mt-6">
          Team assignments will be sent closer to the event. Questions? Contact{" "}
          <a href="mailto:rkouzy@mdanderson.org" className="text-accent-400 hover:underline">
            rkouzy@mdanderson.org
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* ── Section: Basic Info ── */}
      <div>
        <h3 className="text-gray-900 font-semibold text-base mb-5 pb-3 border-b border-white/8">
          Basic Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="First Name" required>
            <input
              type="text"
              className={`form-input ${errors.firstName ? "border-red-500/60" : ""}`}
              placeholder="Jane"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </FormField>
          <FormField label="Last Name" required>
            <input
              type="text"
              className={`form-input ${errors.lastName ? "border-red-500/60" : ""}`}
              placeholder="Smith"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </FormField>
          <FormField label="Preferred Name">
            <input
              type="text"
              className="form-input"
              placeholder="How should we address you?"
              value={form.preferredName}
              onChange={(e) => set("preferredName", e.target.value)}
            />
          </FormField>
          <FormField label="MD Anderson Email" required>
            <input
              type="email"
              className={`form-input ${errors.email ? "border-red-500/60" : ""}`}
              placeholder="jsmith@mdanderson.org"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </FormField>
        </div>
      </div>

      {/* ── Section: Role ── */}
      <div>
        <h3 className="text-gray-900 font-semibold text-base mb-5 pb-3 border-b border-white/8">
          Role & Background
        </h3>
        <div className="space-y-5">
          <FormField label="Role at MD Anderson" required>
            <select
              className={`form-select ${errors.role ? "border-red-500/60" : ""}`}
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
            >
              <option value="">Select your role...</option>
              <option value="GME Trainee">GME Trainee (Resident / Fellow)</option>
              <option value="Faculty">Faculty / Attending Physician</option>
              <option value="Technologist/Engineer">Technologist / Engineer</option>
              <option value="APP">Advanced Practice Provider</option>
              <option value="Admin/Ops">Administrative / Operations Staff</option>
              <option value="Other">Other</option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1">{errors.role}</p>
            )}
          </FormField>

          {/* GME-specific conditional fields */}
          {form.role === "GME Trainee" && (
            <div className="grid sm:grid-cols-2 gap-5 p-4 rounded-xl bg-accent-600/10 border border-accent-600/20">
              <FormField label="Training Level" required>
                <select
                  className={`form-select ${errors.trainingLevel ? "border-red-500/60" : ""}`}
                  value={form.trainingLevel}
                  onChange={(e) => set("trainingLevel", e.target.value)}
                >
                  <option value="">Select level...</option>
                  <option value="PGY-1">PGY-1</option>
                  <option value="PGY-2">PGY-2</option>
                  <option value="PGY-3">PGY-3</option>
                  <option value="PGY-4">PGY-4</option>
                  <option value="PGY-5+">PGY-5+</option>
                  <option value="Fellow Year 1">Fellow Year 1</option>
                  <option value="Fellow Year 2">Fellow Year 2</option>
                  <option value="Fellow Year 3">Fellow Year 3</option>
                  <option value="Fellow Year 4+">Fellow Year 4+</option>
                </select>
                {errors.trainingLevel && (
                  <p className="text-red-400 text-xs mt-1">{errors.trainingLevel}</p>
                )}
              </FormField>
              <FormField label="Training Program">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Radiation Oncology"
                  value={form.trainingProgram}
                  onChange={(e) => set("trainingProgram", e.target.value)}
                />
              </FormField>
            </div>
          )}

          <FormField label="Department / Division">
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Radiation Oncology"
              value={form.department}
              onChange={(e) => set("department", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      {/* ── Section: Interests ── */}
      <div>
        <h3 className="text-gray-900 font-semibold text-base mb-5 pb-3 border-b border-white/8">
          Skills & Interests
        </h3>
        <div className="space-y-6">
          <FormField
            label="Skills / Background"
            required
            hint="Select all that apply"
          >
            <MultiSelect
              options={skillOptions}
              selected={form.skills}
              onChange={(v) => set("skills", v)}
            />
            {errors.skills && (
              <p className="text-red-400 text-xs mt-2">{errors.skills as string}</p>
            )}
          </FormField>

          <FormField
            label="Challenge Area Interest"
            required
            hint="Which challenges would you most like to work on?"
          >
            <MultiSelect
              options={challengeOptions}
              selected={form.challengeInterest}
              onChange={(v) => set("challengeInterest", v)}
            />
            {errors.challengeInterest && (
              <p className="text-red-400 text-xs mt-2">
                {errors.challengeInterest as string}
              </p>
            )}
          </FormField>

          <FormField label="Hackathon Experience" required>
            <select
              className={`form-select ${errors.hackathonExperience ? "border-red-500/60" : ""}`}
              value={form.hackathonExperience}
              onChange={(e) => set("hackathonExperience", e.target.value)}
            >
              <option value="">Select experience level...</option>
              <option value="None">None — first hackathon</option>
              <option value="1-2 hackathons">1–2 previous hackathons</option>
              <option value="3+ hackathons">3 or more hackathons</option>
            </select>
            {errors.hackathonExperience && (
              <p className="text-red-400 text-xs mt-1">{errors.hackathonExperience}</p>
            )}
          </FormField>

          <FormField label="Prior Digital Health / AI Experience">
            <input
              type="text"
              className="form-input"
              placeholder="Briefly describe any relevant prior work..."
              value={form.digitalHealthExperience}
              onChange={(e) => set("digitalHealthExperience", e.target.value)}
            />
          </FormField>

          <FormField
            label="Why do you want to participate?"
            hint="300 characters max"
          >
            <textarea
              className="form-input resize-none"
              rows={3}
              maxLength={300}
              placeholder="In one sentence, what draws you to this event?"
              value={form.whyParticipate}
              onChange={(e) => set("whyParticipate", e.target.value)}
            />
            <p className="text-gray-900/25 text-xs mt-1 text-right">
              {form.whyParticipate.length}/300
            </p>
          </FormField>
        </div>
      </div>

      {/* ── Section: Logistics ── */}
      <div>
        <h3 className="text-gray-900 font-semibold text-base mb-5 pb-3 border-b border-white/8">
          Logistics
        </h3>
        <div className="space-y-5">
          <FormField
            label="Dietary Restrictions"
            hint="Select all that apply"
          >
            <MultiSelect
              options={dietaryOptions}
              selected={form.dietaryRestrictions}
              onChange={(v) => set("dietaryRestrictions", v)}
            />
            {form.dietaryRestrictions.includes("Other") && (
              <input
                type="text"
                className="form-input mt-3"
                placeholder="Please describe..."
                value={form.dietaryOther}
                onChange={(e) => set("dietaryOther", e.target.value)}
              />
            )}
          </FormField>

          <FormField label="Accessibility Needs">
            <input
              type="text"
              className="form-input"
              placeholder="Let us know how we can support you..."
              value={form.accessibilityNeeds}
              onChange={(e) => set("accessibilityNeeds", e.target.value)}
            />
          </FormField>


        </div>
      </div>

      {/* ── Section: Consent ── */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <input
            type="checkbox"
            id="consent"
            className="w-4 h-4 mt-0.5 rounded border-gray-300 bg-white accent-red-500 cursor-pointer shrink-0"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <label htmlFor="consent" className="text-gray-900/65 text-sm leading-relaxed cursor-pointer">
            <span className="text-accent-400 font-medium">Required: </span>
            I understand this is a full-day event (8:00 AM – 5:30 PM) on Saturday, May 2, 2026,
            and I commit to attending for the full day. I understand that team assignments will be
            made by the organizing committee based on registration data.
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-400 text-xs">{errors.consent as string}</p>
        )}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="mailingList"
            className="w-4 h-4 mt-0.5 rounded border-gray-300 bg-white accent-red-500 cursor-pointer shrink-0"
            checked={form.mailingList}
            onChange={(e) => set("mailingList", e.target.checked)}
          />
          <label htmlFor="mailingList" className="text-gray-500 text-sm leading-relaxed cursor-pointer">
            Subscribe to the AI and Digital Health mailing list for future events, workshops, and digital health
            updates at MD Anderson.
          </label>
        </div>
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-sm">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-4 rounded-xl bg-accent-600 hover:bg-accent-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-accent-600/25 hover:-translate-y-0.5 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Registration"
          )}
        </button>
        <p className="text-gray-900/30 text-xs text-center mt-3">
          Estimated time: 5 minutes. Required fields marked with{" "}
          <span className="text-accent-400">*</span>
        </p>
      </div>
    </form>
  );
}
