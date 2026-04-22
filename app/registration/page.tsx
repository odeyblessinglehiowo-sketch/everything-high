"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  height: string;
  city: string;
  instagram: string;
  experience: string;
  whyJoin: string;
  photo: File | null;
  video: File | null;
};

const initialForm: FormDataType = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  height: "",
  city: "",
  instagram: "",
  experience: "",
  whyJoin: "",
  photo: null,
  video: null,
};

const steps = [
  "Personal Info",
  "Model Details",
  "Uploads",
  "Payment",
  "Complete",
];

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(initialForm);
  const [heroScale, setHeroScale] = useState(1.06);
  const directionRef = useRef<"in" | "out">("in");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroScale((prev) => {
        if (directionRef.current === "in") {
          const next = prev + 0.0025;
          if (next >= 1.12) directionRef.current = "out";
          return next;
        }
        const next = prev - 0.0025;
        if (next <= 1.06) directionRef.current = "in";
        return next;
      });
    }, 80);

    return () => window.clearInterval(timer);
  }, []);

  const progress = useMemo(() => {
    return `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
  }, [currentStep]);

  function updateField<K extends keyof FormDataType>(
    key: K,
    value: FormDataType[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  }

  function prevStep() {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setCurrentStep(5);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ef] text-[#1a0f0a]">
      <SiteNavbar />

      {/* HERO */}
      <section className="relative min-h-[78vh] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-1 - Edited.png"
            alt="Everything High registration hero"
            fill
            priority
            className="object-cover object-center transition-transform duration-1000"
            style={{ transform: `scale(${heroScale})` }}
          />
          <div className="absolute inset-0 bg-[#120a06]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120a06]/90 via-[#120a06]/68 to-[#120a06]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(200,155,117,0.18),transparent_28%)]" />
          <div className="absolute left-[12%] top-[20%] h-40 w-40 rounded-full bg-[#c89b75]/12 blur-3xl" />
          <div className="absolute right-[12%] bottom-[15%] h-48 w-48 rounded-full bg-[#8a5a3b]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-end gap-8 px-6 py-14 lg:grid-cols-[1fr_0.8fr] lg:px-10">
          <div className="max-w-3xl space-y-6 pb-4">
            <p className="text-xs font-medium uppercase tracking-[0.38em] text-[#c89b75]">
              Registration
            </p>

            <h1 className="text-[2.7rem] font-black uppercase leading-[0.9] tracking-[-0.05em] text-white md:text-[4rem] lg:text-[5.2rem]">
              Apply To
              <span className="block text-[#c89b75]">Everything High</span>
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[#eadfd6] md:text-lg">
              Begin your application with a premium multi-step experience
              designed for aspiring models ready to be seen, refined, and
              selected.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#application-form"
                className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
              >
                Start Application
              </a>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/10"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="max-w-sm rounded-[2rem] border border-white/10 bg-[#1a0f0a]/82 p-6 shadow-2xl backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.32em] text-[#c89b75]">
                What you need
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[#dfd2c8]">
                <p>• A clean portrait photo</p>
                <p>• A short catwalk video, up to 30 seconds</p>
                <p>• Your personal and modelling details</p>
                <p>• Completed registration payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section
        id="application-form"
        className="relative border-t border-[#eadfd6] bg-[#f7f3ef]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
              Application Form
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[#1a0f0a] md:text-5xl">
              Complete your application with clarity and confidence.
            </h2>
            <p className="text-base leading-8 text-[#6b5a50]">
              Follow each step carefully. Upload your materials clearly and
              review your details before payment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
            {/* LEFT COLUMN */}
            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#eadfd6] bg-white p-6 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#b08968]">
                  Application Progress
                </p>

                <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#eee4dc]">
                  <div
                    className="h-full rounded-full bg-[#4b2e1f] transition-all duration-500"
                    style={{ width: progress }}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isDone = currentStep > stepNumber;

                    return (
                      <div key={step} className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${
                            isDone
                              ? "border-[#c89b75] bg-[#c89b75] text-[#120a06]"
                              : isActive
                              ? "border-[#4b2e1f] bg-[#4b2e1f] text-white"
                              : "border-[#eadfd6] bg-[#f7f3ef] text-[#7c695d]"
                          }`}
                        >
                          {stepNumber}
                        </div>
                        <p
                          className={`text-sm font-medium ${
                            isActive || isDone
                              ? "text-[#1a0f0a]"
                              : "text-[#7c695d]"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#eadfd6] bg-white p-6 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#b08968]">
                  Sample Guide
                </p>

                <div className="mt-5 space-y-5">
                  <a
                    href="/images/8.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="block overflow-hidden rounded-[1.4rem] border border-[#eadfd6] bg-[#f8f5f2] p-3 transition duration-300 hover:shadow-md"
                  >
                    <div className="relative overflow-hidden rounded-[1rem]">
                      <Image
                        src="/images/8.jpeg"
                        alt="Sample portrait upload"
                        width={800}
                        height={1000}
                        className="h-[220px] w-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-sm text-[#6b5a50]">
                        Sample portrait upload
                      </p>
                      <span className="rounded-full bg-[#4b2e1f] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                        Preview
                      </span>
                    </div>
                  </a>

                  <div className="overflow-hidden rounded-[1.4rem] border border-[#eadfd6] bg-[#f8f5f2] p-3">
                    <video
                      controls
                      className="h-[220px] w-full rounded-[1rem] object-cover"
                      poster="/images/modela.jpg"
                    >
                      <source src="/videos/sample-catwalkie.mp4" type="video/mp4" />
                    </video>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-sm text-[#6b5a50]">
                        Sample catwalk video
                      </p>
                      <a
                        href="/videos/sample-catwalkie.mp4"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#4b2e1f] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
                      >
                        Preview
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* FORM CARD */}
            <div className="rounded-[2.2rem] border border-[#eadfd6] bg-white p-6 shadow-sm md:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2 border-b border-[#eadfd6] pb-6">
                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#b08968]">
                      Step {currentStep}
                    </p>
                    <h2 className="text-3xl font-semibold text-[#1a0f0a]">
                      {steps[currentStep - 1]}
                    </h2>
                  </div>

                  {currentStep === 1 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <InputField
                        label="Full Name"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Enter your full name"
                      />
                      <InputField
                        label="Email Address"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Enter your email"
                        type="email"
                      />
                      <InputField
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                      <InputField
                        label="Age"
                        value={formData.age}
                        onChange={(e) => updateField("age", e.target.value)}
                        placeholder="Your age"
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      <SelectField
                        label="Gender"
                        value={formData.gender}
                        onChange={(e) => updateField("gender", e.target.value)}
                        options={["Female", "Male", "Prefer not to say"]}
                      />
                      <InputField
                        label="Height"
                        value={formData.height}
                        onChange={(e) => updateField("height", e.target.value)}
                        placeholder='e.g. 5"9'
                      />
                      <InputField
                        label="City"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Your city"
                      />
                      <InputField
                        label="Instagram Handle"
                        value={formData.instagram}
                        onChange={(e) => updateField("instagram", e.target.value)}
                        placeholder="@yourhandle"
                      />
                      <div className="md:col-span-2">
                        <SelectField
                          label="Modelling Experience"
                          value={formData.experience}
                          onChange={(e) =>
                            updateField("experience", e.target.value)
                          }
                          options={[
                            "Beginner",
                            "Some experience",
                            "Intermediate",
                            "Professional",
                          ]}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <TextAreaField
                          label="Why do you want to join Everything High?"
                          value={formData.whyJoin}
                          onChange={(e) => updateField("whyJoin", e.target.value)}
                          placeholder="Tell us briefly why you want to join..."
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <UploadCard
                        title="Upload Your Photo"
                        subtitle="Portrait, clean lighting, clear face"
                        accept="image/*"
                        file={formData.photo}
                        onChange={(file) => updateField("photo", file)}
                      />
                      <UploadCard
                        title="Upload Catwalk Video"
                        subtitle="Up to 30 seconds, clear full-body movement"
                        accept="video/*"
                        file={formData.video}
                        onChange={(file) => updateField("video", file)}
                      />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="rounded-[1.6rem] border border-[#eadfd6] bg-[#f8f5f2] p-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-[#b08968]">
                              Registration Fee
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-[#1a0f0a]">
                              ₦10,000
                            </h3>
                          </div>

                          <div className="rounded-full border border-[#eadfd6] bg-white px-4 py-2 text-sm text-[#6b5a50]">
                            Paystack UI Preview
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          <div className="rounded-[1.2rem] border border-[#eadfd6] bg-white p-4">
                            <p className="text-sm text-[#6b5a50]">Email</p>
                            <p className="mt-2 font-medium text-[#1a0f0a]">
                              {formData.email || "applicant@email.com"}
                            </p>
                          </div>

                          <div className="rounded-[1.2rem] border border-[#eadfd6] bg-white p-4">
                            <p className="text-sm text-[#6b5a50]">Reference</p>
                            <p className="mt-2 font-medium text-[#1a0f0a]">
                              EH-REG-2026-001
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-[1.2rem] border border-dashed border-[#c89b75]/40 bg-white p-5 text-sm leading-7 text-[#6b5a50]">
                          This is the polished payment UI section. Once we
                          connect Paystack, the button below will open the real
                          payment flow and only mark the application complete
                          after successful payment.
                        </div>

                        <button
                          type="submit"
                          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
                        >
                          Pay With Paystack
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep < 4 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eadfd6] pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="rounded-full border border-[#eadfd6] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#1a0f0a] transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextStep}
                        className="rounded-full bg-[#4b2e1f] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <div className="py-10">
                  <div className="mx-auto max-w-2xl space-y-8 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#4b2e1f] text-4xl text-white">
                      ✓
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm uppercase tracking-[0.3em] text-[#b08968]">
                        Application Complete
                      </p>
                      <h2 className="text-4xl font-bold text-[#1a0f0a]">
                        Submission Successful
                      </h2>
                      <p className="text-base leading-8 text-[#6b5a50]">
                        Your registration has been received successfully. Your
                        photo, catwalk video, and application details are now in
                        review. A confirmation will be sent to your email after
                        screening.
                      </p>
                    </div>

                    <div className="grid gap-4 rounded-[1.5rem] border border-[#eadfd6] bg-[#f8f5f2] p-6 text-left md:grid-cols-2">
                      <div>
                        <p className="text-sm text-[#b08968]">Applicant</p>
                        <p className="mt-2 font-medium text-[#1a0f0a]">
                          {formData.fullName || "Applicant Name"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#b08968]">Reference</p>
                        <p className="mt-2 font-medium text-[#1a0f0a]">
                          EH-REG-2026-001
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-[#eadfd6] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#1a0f0a] transition duration-300 hover:border-[#c89b75] hover:bg-[#c89b75]/10"
                      >
                        Back Home
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setCurrentStep(1);
                          setFormData(initialForm);
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-[#4b2e1f] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#c89b75] hover:text-[#120a06]"
                      >
                        Start New Application
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA NOTES */}
      <section className="bg-white text-[#1a0f0a]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#b08968]">
              Application Notes
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              What we look for in every application
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Clear Presentation",
                text: "Use clean, well-lit photos that show your face clearly and professionally.",
              },
              {
                title: "Natural Confidence",
                text: "Your catwalk video should reflect confidence, posture, and comfort in movement.",
              },
              {
                title: "Attention to Detail",
                text: "Complete every part of the form carefully and provide accurate information.",
              },
              {
                title: "Professional Readiness",
                text: "We value applicants who show seriousness, discipline, and strong potential.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-[#eadfd6] bg-[#f8f5f2] p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#6b5a50]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[#5a4a40]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-[1rem] border border-[#eadfd6] bg-[#f8f5f2] px-4 py-3 text-[#1a0f0a] outline-none transition focus:border-[#c89b75]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[#5a4a40]">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-[1rem] border border-[#eadfd6] bg-[#f8f5f2] px-4 py-3 text-[#1a0f0a] outline-none transition focus:border-[#c89b75]"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[#5a4a40]">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-[1rem] border border-[#eadfd6] bg-[#f8f5f2] px-4 py-3 text-[#1a0f0a] outline-none transition focus:border-[#c89b75]"
      />
    </label>
  );
}

function UploadCard({
  title,
  subtitle,
  accept,
  file,
  onChange,
}: {
  title: string;
  subtitle: string;
  accept: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <label className="block cursor-pointer rounded-[1.6rem] border border-dashed border-[#c89b75]/40 bg-[#f8f5f2] p-6 transition hover:border-[#c89b75]">
      <div className="space-y-3">
        <p className="text-lg font-semibold text-[#1a0f0a]">{title}</p>
        <p className="text-sm leading-7 text-[#6b5a50]">{subtitle}</p>

        <div className="rounded-[1rem] border border-[#eadfd6] bg-white px-4 py-3 text-sm text-[#4b2e1f]">
          {file ? file.name : "Click to choose file"}
        </div>

        {previewUrl && (
          <div className="rounded-[1rem] border border-[#eadfd6] bg-white p-3">
            {accept.startsWith("image") ? (
              <Image
                src={previewUrl}
                alt="Upload preview"
                width={600}
                height={500}
                className="h-[180px] w-full rounded-[0.8rem] object-cover"
              />
            ) : (
              <video
                controls
                src={previewUrl}
                className="h-[180px] w-full rounded-[0.8rem] object-cover"
              />
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}