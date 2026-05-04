"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { contactDetails } from "@/data/site-content";

const defaultServiceOptions = [
  "Brand identity",
  "Packaging",
  "Campaign creative",
  "Digital design",
  "Production",
  "Not sure yet",
];

const simpleServiceOptions = [
  "Social",
  "Creative",
  "Digital",
  "Production",
  "Integrated",
  "Not sure yet",
];

const defaultStageOptions = [
  "Starting out",
  "Scaling fast",
  "Established brand",
  "Need a refresh",
];

const simpleStageOptions = [
  "Early stage",
  "Scaling fast",
  "Established",
  "Enterprise",
];

type ContactFormCardProps = {
  mode?: "default" | "simple";
  showContactDetails?: boolean;
};

const normalizeSingleLine = (value: string) => value.replace(/\s+/g, " ").trim();

const normalizeMultiline = (value: string) => value.replace(/\r\n/g, "\n").trim();

export default function ContactFormCard({
  mode = "default",
  showContactDetails = true,
}: ContactFormCardProps) {
  const isSimple = mode === "simple";
  const serviceOptions = isSimple ? simpleServiceOptions : defaultServiceOptions;
  const stageOptions = isSimple ? simpleStageOptions : defaultStageOptions;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [stage, setStage] = useState("");
  const [project, setProject] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const brandId = useId();
  const phoneId = useId();
  const projectId = useId();

  const clearFeedback = () => {
    setError("");
    setStatus("");
    setIsSubmitting(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (website.trim()) {
      setError("");
      setStatus("Thanks. We will be in touch soon.");
      return;
    }

    const trimmedName = normalizeSingleLine(name);
    const trimmedBrand = normalizeSingleLine(brand);
    const trimmedEmail = normalizeSingleLine(email).toLowerCase();
    const trimmedPhone = normalizeSingleLine(phone);
    const trimmedProject = normalizeMultiline(project);
    const requiresExtendedFields = !isSimple;

    if (
      !trimmedName ||
      !trimmedBrand ||
      !trimmedEmail ||
      (requiresExtendedFields && (!service || !stage))
    ) {
      setError("Please complete the required details before submitting.");
      setStatus("");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid work email.");
      setStatus("");
      return;
    }

    const phonePattern = /^[+()\d\s-]{7,}$/;
    if (trimmedPhone && !phonePattern.test(trimmedPhone)) {
      setError("Please enter a valid phone number or leave it blank.");
      setStatus("");
      return;
    }

    setError("");
    setStatus("Opening your mail app...");
    setIsSubmitting(true);

    const details = [
      `Name: ${trimmedName}`,
      `Brand: ${trimmedBrand}`,
      `Email: ${trimmedEmail}`,
      `Phone: ${trimmedPhone || "Not shared"}`,
      `Need help with: ${service || "Not shared"}`,
      `Current stage: ${stage || "Not shared"}`,
      `Project brief: ${trimmedProject || "Not shared"}`,
    ];

    const params = new URLSearchParams({
      subject: `New INK DABBA inquiry from ${trimmedName} at ${trimmedBrand}`,
      body: details.join("\n"),
    });

    window.location.assign(`mailto:${contactDetails.email}?${params.toString()}`);
    window.setTimeout(() => setIsSubmitting(false), 1200);
  };

  if (isSimple) {
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[41rem] rounded-[1.75rem] border border-black/6 bg-[#fbfaf7] px-6 py-6 shadow-[0_24px_70px_-42px_rgba(17,18,20,0.2)] md:px-8 md:py-7"
        aria-label="Contact form"
        aria-busy={isSubmitting}
        noValidate
      >
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="absolute left-[-9999px] opacity-0"
        />

        <div className="brand-kicker flex items-center gap-3 text-[#9f9f99]">
          <span className="h-2 w-2 rounded-full bg-[#F9665B]" />
          <span>Tell us about you</span>
        </div>

        <div className="mt-8 hidden md:block">
          <div className="grid grid-cols-[minmax(0,1fr)_110px] items-end gap-x-3">
            <div className="font-body text-[clamp(1.9rem,2.4vw,2.25rem)] font-semibold leading-[1.2] text-ink">
              Hi, I&apos;m{" "}
              <span className="inline-block min-w-[14rem] align-baseline">
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="your name"
                  autoComplete="name"
                  aria-invalid={error ? "true" : "false"}
                  type="text"
                  name="name"
                  className="w-full border-b border-black/14 bg-transparent pb-2 font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
                  required
                />
              </span>
            </div>
            <div className="pb-2 text-[clamp(1.9rem,2.4vw,2.25rem)] font-semibold leading-none text-ink">
              from
            </div>
          </div>

          <div className="mt-2 max-w-[15rem]">
            <input
              id={brandId}
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                clearFeedback();
              }}
              placeholder="your brand"
              autoComplete="organization"
              aria-invalid={error ? "true" : "false"}
              type="text"
              name="brand"
              className="w-full border-b border-black/14 bg-transparent pb-2 text-[clamp(1.55rem,2vw,1.9rem)] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
              required
            />
          </div>

          <div className="brand-body mt-8 grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-x-5 gap-y-3 text-[0.96rem] font-medium leading-none text-ink/72">
            <span>Reach me at</span>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFeedback();
              }}
              placeholder="work email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={error ? "true" : "false"}
              type="email"
              name="email"
              className="w-full border-b border-black/14 bg-transparent pb-2 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
              required
            />
            <span className="text-center text-ink/58">or</span>
            <input
              id={phoneId}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                clearFeedback();
              }}
              placeholder="+91 phone"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={error ? "true" : "false"}
              type="tel"
              name="phone"
              className="w-full border-b border-black/14 bg-transparent pb-2 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-7 space-y-4 md:hidden">
          <div>
            <label className="brand-chip mb-2 block text-ink/45">Hi, I&apos;m</label>
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearFeedback();
              }}
              placeholder="your name"
              autoComplete="name"
              aria-invalid={error ? "true" : "false"}
              type="text"
              name="name"
              className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="brand-chip mb-2 block text-ink/45" htmlFor={brandId}>
              from
            </label>
            <input
              id={brandId}
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                clearFeedback();
              }}
              placeholder="your brand"
              autoComplete="organization"
              aria-invalid={error ? "true" : "false"}
              type="text"
              name="brand"
              className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="brand-chip mb-2 block text-ink/45">Reach me at</label>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFeedback();
              }}
              placeholder="work email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={error ? "true" : "false"}
              type="email"
              name="email"
              className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="brand-chip mb-2 block text-ink/45" htmlFor={phoneId}>
              or
            </label>
            <input
              id={phoneId}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                clearFeedback();
              }}
              placeholder="+91 phone"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={error ? "true" : "false"}
              type="tel"
              name="phone"
              className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-7">
          <p className="brand-kicker text-[#9f9f99]">We need help with</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {serviceOptions.map((option) => {
              const active = service === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setService(option);
                    clearFeedback();
                  }}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-2 text-[0.8rem] font-medium transition-all duration-200 ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-[#dad6cf] bg-white text-[#8f8f8b] hover:border-black/18 hover:text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="brand-kicker text-[#9f9f99]">Where are you right now?</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {stageOptions.map((option) => {
              const active = stage === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setStage(option);
                    clearFeedback();
                  }}
                  aria-pressed={active}
                  className={`rounded-[0.9rem] border px-3.5 py-2.5 text-center text-[0.8rem] font-medium transition-all duration-200 ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-[#dad6cf] bg-white text-[#8f8f8b] hover:border-black/18 hover:text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-between rounded-full bg-black px-6 py-3.5 text-left font-body text-[0.9rem] font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-80"
          >
            <span>{isSubmitting ? "Opening your mail app..." : "Let's partner up"}</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F9665B] text-black transition-transform duration-300 group-hover:translate-x-1"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <p className="mt-4 text-center text-[0.84rem] text-[#b3b3af]">
            We typically respond within 24 hours.
          </p>
          {error && (
            <p aria-live="assertive" className="mt-3 text-center text-[0.9rem] font-medium text-[#cb3a1a]">
              {error}
            </p>
          )}
          {status && (
            <p aria-live="polite" className="mt-3 text-center text-[0.9rem] font-medium text-ink/72">
              {status}
            </p>
          )}
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[39rem] rounded-[2rem] border border-black/8 bg-[#fbfaf7] px-6 py-7 shadow-[0_30px_90px_-50px_rgba(17,18,20,0.3)] md:px-8 md:py-8"
      aria-label="Contact form"
      aria-busy={isSubmitting}
      noValidate
    >
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="absolute left-[-9999px] opacity-0"
      />

      <div className="brand-kicker flex items-center gap-3 text-[#9f9f99]">
        <span className="h-2 w-2 rounded-full bg-[#F9665B]" />
        <span>Tell us about you</span>
      </div>

      <div className="mt-9 hidden md:block">
        <div className="grid grid-cols-[minmax(0,1fr)_108px] items-end gap-x-3">
          <div className="font-body text-[clamp(1.6rem,2.1vw,2rem)] font-semibold leading-[1.2] text-ink">
            Hi, I&apos;m{" "}
            <span className="inline-block min-w-[15rem] align-baseline">
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  clearFeedback();
                }}
                placeholder="your name"
                autoComplete="name"
                aria-invalid={error ? "true" : "false"}
                type="text"
                name="name"
                className="w-full border-b border-black/14 bg-transparent pb-2 font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
                required
              />
            </span>
          </div>
          <div className="pb-2 text-[clamp(1.6rem,2.1vw,2rem)] font-semibold leading-none text-ink">
            from
          </div>
        </div>

        <div className="mt-2 max-w-[18rem]">
          <input
            id={brandId}
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              clearFeedback();
            }}
            placeholder="your brand"
            autoComplete="organization"
            aria-invalid={error ? "true" : "false"}
            type="text"
            name="brand"
            className="w-full border-b border-black/14 bg-transparent pb-2 text-[clamp(1.35rem,1.7vw,1.65rem)] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            required
          />
        </div>

        <div className="brand-body mt-9 grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-x-6 gap-y-3 text-[1rem] font-medium leading-none text-ink/72">
          <span>Reach me at</span>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFeedback();
            }}
            placeholder="work email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={error ? "true" : "false"}
            type="email"
            name="email"
            className="w-full border-b border-black/14 bg-transparent pb-2 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            required
          />
          <span className="text-center text-ink/58">or</span>
          <input
            id={phoneId}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              clearFeedback();
            }}
            placeholder="+91 phone"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={error ? "true" : "false"}
            type="tel"
            name="phone"
            className="w-full border-b border-black/14 bg-transparent pb-2 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 md:hidden">
        <div>
          <label className="brand-chip mb-2 block text-ink/45">Hi, I&apos;m</label>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearFeedback();
            }}
            placeholder="your name"
            autoComplete="name"
            aria-invalid={error ? "true" : "false"}
            type="text"
            name="name"
            className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="brand-chip mb-2 block text-ink/45" htmlFor={brandId}>
            from
          </label>
          <input
            id={brandId}
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              clearFeedback();
            }}
            placeholder="your brand"
            autoComplete="organization"
            aria-invalid={error ? "true" : "false"}
            type="text"
            name="brand"
            className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="brand-chip mb-2 block text-ink/45">Reach me at</label>
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFeedback();
            }}
            placeholder="work email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={error ? "true" : "false"}
            type="email"
            name="email"
            className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="brand-chip mb-2 block text-ink/45" htmlFor={phoneId}>
            or
          </label>
          <input
            id={phoneId}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              clearFeedback();
            }}
            placeholder="+91 phone"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={error ? "true" : "false"}
            type="tel"
            name="phone"
            className="w-full rounded-[1rem] border border-[#dad6cf] bg-white px-4 py-3 text-[1rem] font-semibold italic text-[#9b9b97] placeholder:text-[#9b9b97] transition-colors focus:border-black focus:text-ink focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="brand-kicker text-[#9f9f99]">We need help with</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {serviceOptions.map((option) => {
            const active = service === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setService(option);
                  clearFeedback();
                }}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2.5 text-[0.82rem] font-medium transition-all duration-200 ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-[#dad6cf] bg-white text-[#8f8f8b] hover:border-black/18 hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <p className="brand-kicker text-[#9f9f99]">Where are you right now?</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {stageOptions.map((option) => {
            const active = stage === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setStage(option);
                  clearFeedback();
                }}
                aria-pressed={active}
                className={`rounded-[0.95rem] border px-4 py-3 text-center text-[0.82rem] font-medium transition-all duration-200 ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-[#dad6cf] bg-white text-[#8f8f8b] hover:border-black/18 hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-between rounded-full bg-black px-7 py-4 text-left font-body text-[0.95rem] font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span>{isSubmitting ? "Opening your mail app..." : "Let's partner up"}</span>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9665B] text-black transition-transform duration-300 group-hover:translate-x-1"
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </button>
        <p className="mt-5 text-center text-[0.88rem] text-[#b3b3af]">
          We typically respond within 24 hours.
        </p>
        {error && (
          <p aria-live="assertive" className="mt-3 text-center text-[0.9rem] font-medium text-[#cb3a1a]">
            {error}
          </p>
        )}
        {status && (
          <p aria-live="polite" className="mt-3 text-center text-[0.9rem] font-medium text-ink/72">
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
