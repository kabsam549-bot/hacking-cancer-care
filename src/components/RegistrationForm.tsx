"use client";

import { useState, FormEvent } from "react";

const roles = [
  "GME Trainee",
  "Faculty",
  "Technologist/Engineer",
  "APP",
  "Admin/Ops",
  "Other",
];

const trainingLevels = [
  "PGY-1", "PGY-2", "PGY-3", "PGY-4", "PGY-5", "PGY-6",
  "Fellow Year 1", "Fellow Year 2", "Fellow Year 3", "Fellow Year 4+",
];

const skillOptions = [
  "Clinical",
  "Technical/Coding",
  "Design/UX",
  "Business/Ops",
  "Research",
  "Other",
];

const challengeOptions = [
  "Simulated Education",
  "Post-Discharge Care Coordination",
  "Resource Allocation Throughput",
  "Cancer Research Workflow Optimization",
  "Open to any",
];

const experienceOptions = ["None", "1-2", "3+"];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Halal",
  "Kosher",
  "Gluten-free",
  "Dairy-free",
  "None",
];

const shirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];

function MultiSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() =>
              onChange(
                active ? selected.filter((s) => s !== opt) : [...selected, opt]
              )
            }
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              active
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-white text-[var(--color-text-muted)] border-gray-200 hover:border-gray-300"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [trainingLevel, setTrainingLevel] = useState("");
  const [trainingProgram, setTrainingProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [challengeInterest, setChallengeInterest] = useState<string[]>([]);
  const [hackathonExp, setHackathonExp] = useState("");
  const [digitalHealthExp, setDigitalHealthExp] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [dietaryOther, setDietaryOther] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [tshirt, setTshirt] = useState("");
  const [why, setWhy] = useState("");
  const [mailingList, setMailingList] = useState(false);
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@mdanderson.org")) {
      setError("Please use your MD Anderson email address.");
      return;
    }
    if (skills.length === 0) {
      setError("Please select at least one skill/background.");
      return;
    }
    if (challengeInterest.length === 0) {
      setError("Please select at least one challenge area of interest.");
      return;
    }
    if (!consent) {
      setError("Please acknowledge the full-day attendance requirement.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          preferredName,
          email,
          role,
          trainingLevel: role === "GME Trainee" ? trainingLevel : "",
          trainingProgram: role === "GME Trainee" ? trainingProgram : "",
          department,
          skills,
          challengeInterest,
          hackathonExp,
          digitalHealthExp,
          dietary: [...dietary, dietaryOther].filter(Boolean).join(", "),
          accessibility,
          tshirt,
          why,
          mailingList,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="register" className="py-24 bg-[var(--color-warm-gray)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-navy)] mb-4">
            You&apos;re registered.
          </h2>
          <p className="text-[var(--color-text-muted)] mb-2">
            We&apos;ll send confirmation and team details to{" "}
            <span className="font-medium text-[var(--color-text)]">{email}</span>{" "}
            as the event approaches.
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Saturday, May 2, 2026 -- See you there.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 bg-[var(--color-warm-gray)]">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-2">
          Register
        </h2>
        <p className="text-[var(--color-text-muted)] mb-10">
          Takes about 5 minutes. 40 spots available.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First Name" required>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Last Name" required>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Preferred Name">
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              className="input"
              placeholder="If different from first name"
            />
          </Field>

          <Field label="MD Anderson Email" required>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@mdanderson.org"
            />
          </Field>

          <Field label="Role" required>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input"
            >
              <option value="">Select your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>

          {role === "GME Trainee" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Training Level" required>
                <select
                  required
                  value={trainingLevel}
                  onChange={(e) => setTrainingLevel(e.target.value)}
                  className="input"
                >
                  <option value="">Select level</option>
                  {trainingLevels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Training Program" required>
                <input
                  type="text"
                  required
                  value={trainingProgram}
                  onChange={(e) => setTrainingProgram(e.target.value)}
                  className="input"
                  placeholder="e.g., Radiation Oncology"
                />
              </Field>
            </div>
          )}

          <Field label="Department / Division">
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input"
            />
          </Field>

          <Field label="Skills / Background" required>
            <MultiSelect
              options={skillOptions}
              selected={skills}
              onChange={setSkills}
            />
          </Field>

          <Field label="Challenge Area Interest" required>
            <MultiSelect
              options={challengeOptions}
              selected={challengeInterest}
              onChange={setChallengeInterest}
            />
          </Field>

          <Field label="Hackathon Experience" required>
            <div className="flex gap-3">
              {experienceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setHackathonExp(opt)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    hackathonExp === opt
                      ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                      : "bg-white text-[var(--color-text-muted)] border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Prior digital health or AI project experience?">
            <input
              type="text"
              value={digitalHealthExp}
              onChange={(e) => setDigitalHealthExp(e.target.value)}
              className="input"
              placeholder="Brief description (optional)"
            />
          </Field>

          <Field label="Dietary Restrictions">
            <MultiSelect
              options={dietaryOptions}
              selected={dietary}
              onChange={setDietary}
            />
            <input
              type="text"
              value={dietaryOther}
              onChange={(e) => setDietaryOther(e.target.value)}
              className="input mt-2"
              placeholder="Other dietary needs"
            />
          </Field>

          <Field label="Accessibility Needs">
            <input
              type="text"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
              className="input"
              placeholder="Let us know how we can accommodate you"
            />
          </Field>

          <Field label="T-shirt Size">
            <div className="flex flex-wrap gap-2">
              {shirtSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTshirt(s)}
                  className={`w-12 h-10 rounded-lg text-sm border transition-colors ${
                    tshirt === s
                      ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                      : "bg-white text-[var(--color-text-muted)] border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>

          <Field label="In one sentence, why do you want to participate?">
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value.slice(0, 300))}
              className="input resize-none"
              rows={2}
              maxLength={300}
              placeholder="300 characters max"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {why.length}/300
            </p>
          </Field>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={mailingList}
              onChange={(e) => setMailingList(e.target.checked)}
              className="mt-1 accent-[var(--color-accent)]"
            />
            <span className="text-sm text-[var(--color-text-muted)]">
              Keep me updated about future AIDH events and hackathons
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-[var(--color-accent)]"
            />
            <span className="text-sm text-[var(--color-text)]">
              I understand this is a full-day event (8 AM - 5:30 PM) and commit
              to attending the entire day.{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[var(--color-navy)] text-white font-semibold text-sm rounded-lg hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          transition: border-color 0.15s;
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(27, 73, 101, 0.1);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-navy)] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
