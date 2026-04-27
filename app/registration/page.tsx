"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
/* ─── TYPES ──────────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  nationality: string;
  state: string;
  instagram: string;
  height: string;
  shoulder: string;
  bust: string;
  waist: string;
  hip: string;
  shoe: string;
  hairColour: string;
  eyeColour: string;
  skinTone: string;
  experience: string;
  categoryInterest: string[];
  portrait: File | null;
  fullBodyFront: File | null;
  fullBodySide: File | null;
  walkVideo: File | null;
  extra1: File | null;
  extra2: File | null;
  termsAccepted: boolean;
  guardianConsent: boolean;
  promoCode: string;
  paymentMethod: string;
}

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT – Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

const STEP_LABELS = [
  "Personal Info",
  "Model Details",
  "Uploads",
  "Review & Confirm",
  "Payment",
  "Complete",
];

const empty: FormData = {
  fullName: "", email: "", phone: "", dob: "", gender: "", nationality: "",
  state: "", instagram: "",
  height: "", shoulder: "", bust: "", waist: "", hip: "", shoe: "",
  hairColour: "", eyeColour: "", skinTone: "", experience: "", categoryInterest: [],
  portrait: null, fullBodyFront: null, fullBodySide: null, walkVideo: null,
  extra1: null, extra2: null,
  termsAccepted: false, guardianConsent: false, promoCode: "",
  paymentMethod: "",
};

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f0eb",
    color: "#f5f0eb",
    fontFamily: "'Georgia', serif",
    
  },
  hero: {
    textAlign: "center" as const,
    padding: "60px 20px 40px",
    backgroundColor: "#f5f0eb",
  },
  heroLabel: {
    fontSize: "10px",
    letterSpacing: "0.45em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "16px",
    fontFamily: "'Georgia', serif",
  },
  heroTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(1.7rem, 5vw, 3.2rem)",
    fontWeight: 400,
    lineHeight: 1.1,
    color: "#1a0f0a",
    marginBottom: "16px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heroSub: {
    fontSize: "14px",
    color: "#6b5a50",
    lineHeight: 1.7,
    maxWidth: "520px",
    margin: "0 auto",
  },
  progressCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8ddd4",
    borderRadius: "16px",
    padding: "24px",
  },
  progressLabel: {
    fontSize: "10px",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "16px",
    fontFamily: "'Georgia', serif",
  },
  progressBar: {
    height: "3px",
    backgroundColor: "#e8ddd4",
    borderRadius: "99px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressFill: (pct: number) => ({
    height: "100%",
    width: `${pct}%`,
    backgroundColor: "#7a3d18",
    borderRadius: "99px",
    transition: "width 0.4s ease",
  }),
  stepRow: (active: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 10px",
    borderRadius: "10px",
    marginBottom: "4px",
    backgroundColor: active ? "#f5ece4" : "transparent",
  }),
  stepBubble: (active: boolean, done: boolean) => ({
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 500,
    flexShrink: 0,
    backgroundColor: active || done ? "#3d2210" : "transparent",
    color: active || done ? "#ffffff" : "#b08968",
    border: active || done ? "none" : "1.5px solid #c5a98a",
    fontFamily: "sans-serif",
  }),
  stepName: (active: boolean) => ({
    fontSize: "14px",
    color: active ? "#3d2210" : "#6b5a50",
    fontWeight: active ? 600 : 400,
    fontFamily: "'Georgia', serif",
  }),
  guideCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8ddd4",
    borderRadius: "16px",
    padding: "20px",
    overflow: "hidden",
  },
  guideLabel: {
    fontSize: "10px",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "14px",
    fontFamily: "'Georgia', serif",
  },
  guideNote: {
    fontSize: "12px",
    color: "#6b5a50",
    lineHeight: 1.6,
    fontFamily: "sans-serif",
  },
  formPanel: {
    backgroundColor: "#ffffff",
    border: "1px solid #e8ddd4",
    borderRadius: "16px",
    padding: "40px",
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  stepTag: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "8px",
    fontFamily: "'Georgia', serif",
  },
  stepHeading: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 400,
    color: "#1a0f0a",
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e8ddd4",
  },
  sectionLabel: {
    fontSize: "10px",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "14px",
    marginTop: "28px",
    fontFamily: "sans-serif",
    display: "block" as const,
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    minWidth: 0,
  },
  label: {
    fontSize: "13px",
    color: "#3d2210",
    fontFamily: "sans-serif",
    fontWeight: 500,
  },
  input: {
    height: "44px",
    padding: "0 14px",
    border: "1px solid #ddd0c5",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1a0f0a",
    backgroundColor: "#faf8f6",
    outline: "none",
    fontFamily: "sans-serif",
    width: "100%",
    boxSizing: "border-box" as const,
    minWidth: 0,
  },
  select: {
    height: "44px",
    padding: "0 36px 0 14px",
    border: "1px solid #ddd0c5",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1a0f0a",
    backgroundColor: "#faf8f6",
    outline: "none",
    fontFamily: "sans-serif",
    width: "100%",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b08968' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    cursor: "pointer",
    boxSizing: "border-box" as const,
    minWidth: 0,
  },
  uploadSlot: (hasFile: boolean) => ({
    border: `1.5px dashed ${hasFile ? "#7a3d18" : "#c5a98a"}`,
    borderRadius: "10px",
    padding: "20px 12px",
    textAlign: "center" as const,
    backgroundColor: hasFile ? "#f5ece4" : "#faf8f6",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: 0,
    wordBreak: "break-word" as const,
  }),
  uploadTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#3d2210",
    marginBottom: "4px",
    fontFamily: "sans-serif",
  },
  uploadHint: {
    fontSize: "11px",
    color: "#6b5a50",
    fontFamily: "sans-serif",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "36px",
    paddingTop: "24px",
    borderTop: "1px solid #e8ddd4",
  },
  btnBack: {
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#6b5a50",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "sans-serif",
    padding: "10px 0",
  },
  btnContinue: {
    height: "44px",
    padding: "0 28px",
    backgroundColor: "#3d2210",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontWeight: 600,
    transition: "background 0.2s",
    whiteSpace: "nowrap" as const,
  },
  reviewSection: {
    marginBottom: "24px",
    padding: "20px",
    backgroundColor: "#faf8f6",
    borderRadius: "10px",
    border: "1px solid #e8ddd4",
  },
  reviewHead: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: "#b08968",
    marginBottom: "12px",
    fontFamily: "sans-serif",
  },
  reviewKey: {
    fontSize: "12px",
    color: "#6b5a50",
    fontFamily: "sans-serif",
  },
  reviewVal: {
    fontSize: "12px",
    color: "#1a0f0a",
    fontWeight: 500,
    fontFamily: "sans-serif",
    wordBreak: "break-all" as const,
  },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "12px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#7a3d18",
    flexShrink: 0,
    marginTop: "2px",
    cursor: "pointer",
  },
  checkLabel: {
    fontSize: "13px",
    color: "#3d2210",
    lineHeight: 1.5,
    fontFamily: "sans-serif",
  },
  payMethod: (active: boolean) => ({
    border: `1.5px solid ${active ? "#7a3d18" : "#ddd0c5"}`,
    borderRadius: "10px",
    padding: "16px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: active ? "#f5ece4" : "#faf8f6",
    transition: "all 0.2s",
    marginBottom: "12px",
  }),
  payDot: (active: boolean) => ({
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: `2px solid ${active ? "#7a3d18" : "#c5a98a"}`,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  payInner: (active: boolean) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: active ? "#7a3d18" : "transparent",
  }),
  payName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#3d2210",
    fontFamily: "sans-serif",
  },
  paySub: {
    fontSize: "11px",
    color: "#6b5a50",
    fontFamily: "sans-serif",
  },
  completeWrap: {
    textAlign: "center" as const,
    padding: "60px 20px",
  },
  completeIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "#f5ece4",
    border: "2px solid #7a3d18",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "28px",
  },
  completeTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.8rem",
    fontWeight: 400,
    color: "#1a0f0a",
    marginBottom: "12px",
  },
  completeSub: {
    fontSize: "14px",
    color: "#6b5a50",
    lineHeight: 1.7,
    maxWidth: "400px",
    margin: "0 auto 8px",
    fontFamily: "sans-serif",
  },
  refBox: {
    display: "inline-block",
    backgroundColor: "#f5ece4",
    border: "1px solid #c5a98a",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "13px",
    fontFamily: "sans-serif",
    color: "#3d2210",
    fontWeight: 600,
    margin: "20px auto",
  },
  lightboxOverlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  lightboxClose: {
    position: "absolute" as const,
    top: "20px",
    right: "24px",
    color: "#fff",
    fontSize: "28px",
    cursor: "pointer",
    background: "none",
    border: "none",
    lineHeight: 1,
  },
  lightboxMedia: {
    maxWidth: "90vw",
    maxHeight: "85vh",
    borderRadius: "12px",
    objectFit: "contain" as const,
  },
} as const;

/* ─── SAMPLE GUIDE SIDEBAR ───────────────────────────────────────────────── */
function SampleGuideSidebar() {
  const [lightbox, setLightbox] = useState<"image" | "video" | null>(null);

  return (
    <>
    
      <div style={S.guideCard}>
        <p style={S.guideLabel}>Sample Guide</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          {/* Portrait */}
          <div>
            <div
              onClick={() => setLightbox("image")}
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "3/4",
                backgroundColor: "#2a170f",
              }}
            >
              <img
                src="/images/8.jpeg"
                alt="Sample portrait"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(42,23,15,0.75) 0%, transparent 40%)",
                padding: "10px",
              }}>
                
              </div>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                backgroundColor: "rgba(42,23,15,0.88)",
                padding: "8px 10px",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px",
              }}>
                {[["Height", "5ft 9"], ["Shoulder", "16\""], ["Bust", "31\""], ["Waist", "23\""]].map(([k, v]) => (
                  <p key={k} style={{ margin: 0, fontSize: "9px", color: "#e8d5c4", fontFamily: "sans-serif" }}>
                    {k} <span style={{ fontWeight: 700, color: "#fff" }}>{v}</span>
                  </p>
                ))}
              </div>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "50%", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </div>
            </div>
            <p style={{ fontSize: "10px", color: "#6b5a50", textAlign: "center", marginTop: "6px", fontFamily: "sans-serif" }}>Sample portrait</p>
          </div>

          {/* Catwalk Video */}
          <div>
            <div
              onClick={() => setLightbox("video")}
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "3/4",
                backgroundColor: "#1a0f0a",
              }}
            >
              <video
                src="/videos/sample-catwalkie.mp4"
                muted loop autoPlay playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgba(122,61,24,0.85)",
                borderRadius: "50%", width: "36px", height: "36px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                backgroundColor: "rgba(42,23,15,0.88)",
                padding: "6px 8px",
              }}>
                <p style={{ margin: 0, fontSize: "9px", color: "#c89b75", fontFamily: "sans-serif" }}>Required: 30 sec walk</p>
              </div>
            </div>
            <p style={{ fontSize: "10px", color: "#6b5a50", textAlign: "center", marginTop: "6px", fontFamily: "sans-serif" }}>Sample catwalk</p>
          </div>
        </div>

        <p style={S.guideNote}>
          Use this as a reference for measurements. Photos should be clear, well-lit, and taken against a plain background.
        </p>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={S.lightboxOverlay}
            onClick={() => setLightbox(null)}
          >
            <button style={S.lightboxClose} onClick={() => setLightbox(null)}>×</button>
            {lightbox === "image" ? (
              <img
                src="/images/8.jpeg"
                alt="Sample portrait"
                style={S.lightboxMedia}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                src="/videos/sample-catwalkie.mp4"
                controls autoPlay loop playsInline
                style={{ ...S.lightboxMedia, width: "min(500px, 90vw)" }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── UPLOAD SLOT ────────────────────────────────────────────────────────── */
function UploadSlot({
  label, hint, accept, value, onChange, required,
}: {
  label: string; hint: string; accept: string;
  value: File | null; onChange: (f: File | null) => void; required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div style={S.uploadSlot(!!value)} onClick={() => ref.current?.click()}>
      <input
        ref={ref} type="file" accept={accept}
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {value ? (
        <>
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>✓</div>
          <p style={{ ...S.uploadTitle, color: "#7a3d18", wordBreak: "break-word" }}>{value.name}</p>
          <p style={S.uploadHint}>Click to replace</p>
        </>
      ) : (
        <>
          <div style={{ fontSize: "20px", marginBottom: "6px", color: "#b08968" }}>↑</div>
          <p style={S.uploadTitle}>{label}{required && " *"}</p>
          <p style={S.uploadHint}>{hint}</p>
        </>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
export default function RegistrationPage() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(empty);
  const [refNum] = useState(() => "EH" + Math.floor(100000 + Math.random() * 900000));

  const set = (k: keyof FormData, v: unknown) =>
    setData((d) => ({ ...d, [k]: v }));

  const pct = ((step - 1) / 5) * 100;
  const next = () => setStep((s) => Math.min(6, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  const ProgressSidebar = (
    <div style={S.progressCard}>
      <p style={S.progressLabel}>Application Progress</p>
      <div style={S.progressBar}>
        <div style={S.progressFill(pct)} />
      </div>
      {STEP_LABELS.map((label, i) => {
        const n = (i + 1) as Step;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} style={S.stepRow(active)}>
            <div style={S.stepBubble(active, done)}>{done ? "✓" : n}</div>
            <span style={S.stepName(active)}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  /* ── STEP 1 ── */
  const Step1 = (
    <>
      <p style={S.stepTag}>Step 1</p>
      <h2 style={S.stepHeading}>Personal Info</h2>
      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Full Name *</label>
          <input style={S.input} placeholder="Enter your full name" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />
        </div>
        <div style={S.field}>
          <label style={S.label}>Email Address *</label>
          <input style={S.input} type="email" placeholder="Enter your email" value={data.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>
      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Phone Number *</label>
          <input style={S.input} placeholder="+234 000 000 0000" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div style={S.field}>
          <label style={S.label}>Date of Birth *</label>
          <input style={S.input} type="date" value={data.dob} onChange={(e) => set("dob", e.target.value)} />
        </div>
      </div>
      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Gender *</label>
          <select style={S.select} value={data.gender} onChange={(e) => set("gender", e.target.value)}>
            <option value="">Select gender</option>
            <option>Female</option><option>Male</option>
            <option>Non-binary</option><option>Prefer not to say</option>
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Nationality</label>
          <input style={S.input} placeholder="e.g. Nigerian" value={data.nationality} onChange={(e) => set("nationality", e.target.value)} />
        </div>
      </div>
      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>State *</label>
          <select style={S.select} value={data.state} onChange={(e) => set("state", e.target.value)}>
            <option value="">Select state</option>
            {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Instagram Handle</label>
          <input style={S.input} placeholder="@yourhandle" value={data.instagram} onChange={(e) => set("instagram", e.target.value)} />
        </div>
      </div>
    </>
  );

  /* ── STEP 2 ── */
  const Step2 = (
    <>
      <p style={S.stepTag}>Step 2</p>
      <h2 style={S.stepHeading}>Model Details</h2>
      <span style={S.sectionLabel}>Measurements</span>
      <div className="rg-grid3">
        {([["height","Height * (ft/in)","e.g. 5'9"],["shoulder","Shoulder (inches) *","e.g. 16"],["bust","Bust/Chest (inches) *","e.g. 31"]] as [keyof FormData, string, string][]).map(([k, l, ph]) => (
          <div key={k} style={S.field}>
            <label style={S.label}>{l}</label>
            <input style={S.input} placeholder={ph} value={data[k] as string} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="rg-grid3">
        {([["waist","Waist (inches) *","e.g. 23"],["hip","Hip (inches) *","e.g. 35"],["shoe","Shoe Size (UK) *","e.g. 7"]] as [keyof FormData, string, string][]).map(([k, l, ph]) => (
          <div key={k} style={S.field}>
            <label style={S.label}>{l}</label>
            <input style={S.input} placeholder={ph} value={data[k] as string} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
      </div>
      <span style={S.sectionLabel}>Appearance</span>
      <div className="rg-grid3">
        <div style={S.field}>
          <label style={S.label}>Hair Colour</label>
          <select style={S.select} value={data.hairColour} onChange={(e) => set("hairColour", e.target.value)}>
            <option value="">Select</option>
            {["Black","Dark Brown","Brown","Auburn","Blonde","Red","Grey","White","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Eye Colour</label>
          <select style={S.select} value={data.eyeColour} onChange={(e) => set("eyeColour", e.target.value)}>
            <option value="">Select</option>
            {["Black","Dark Brown","Brown","Hazel","Green","Blue","Grey","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Skin Tone</label>
          <select style={S.select} value={data.skinTone} onChange={(e) => set("skinTone", e.target.value)}>
            <option value="">Select</option>
            {["Fair","Light","Medium","Olive","Tan","Dark","Deep"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <span style={S.sectionLabel}>Experience & Interest</span>
      <div className="rg-grid2">
        <div style={S.field}>
          <label style={S.label}>Modelling Experience</label>
          <select style={S.select} value={data.experience} onChange={(e) => set("experience", e.target.value)}>
            <option value="">Select level</option>
            <option>No experience</option>
            <option>Beginner (0–1 year)</option>
            <option>Intermediate (1–3 years)</option>
            <option>Experienced (3+ years)</option>
          </select>
        </div>
        <div style={S.field}>
          <label style={S.label}>Category Interest</label>
          <select style={S.select} value={data.categoryInterest[0] || ""} onChange={(e) => set("categoryInterest", [e.target.value])}>
            <option value="">Select category</option>
            {["Runway","Editorial","Commercial","Fitness","Bridal","Plus Size","Kids","Hair & Beauty"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
    </>
  );

  /* ── STEP 3 ── */
  const Step3 = (
    <>
      <p style={S.stepTag}>Step 3</p>
      <h2 style={S.stepHeading}>Uploads</h2>
      <p style={{ fontSize: "13px", color: "#6b5a50", marginBottom: "24px", fontFamily: "sans-serif", lineHeight: 1.6 }}>
        Upload clear, well-lit photos against a plain background. Your catwalk video must be between{" "}
        <strong style={{ color: "#3d2210" }}>25–30 seconds</strong> long.
      </p>
      <span style={S.sectionLabel}>Required Photos</span>
      <div className="rg-grid3">
        <UploadSlot label="Portrait / Headshot" hint="Front-facing, plain bg. Max 5MB" accept="image/*" value={data.portrait} onChange={(f) => set("portrait", f)} required />
        <UploadSlot label="Full Body (Front)" hint="Head to toe, plain bg. Max 5MB" accept="image/*" value={data.fullBodyFront} onChange={(f) => set("fullBodyFront", f)} required />
        <UploadSlot label="Full Body (Side)" hint="Side profile, plain bg. Max 5MB" accept="image/*" value={data.fullBodySide} onChange={(f) => set("fullBodySide", f)} required />
      </div>
      <span style={{ ...S.sectionLabel, marginTop: "24px" }}>Catwalk Video *</span>
      <div style={{ marginBottom: "16px" }}>
        <UploadSlot label="Catwalk / Walk Video" hint="25–30 seconds. Walk toward & away from camera. Max 50MB" accept="video/*" value={data.walkVideo} onChange={(f) => set("walkVideo", f)} required />
      </div>
      <span style={{ ...S.sectionLabel, marginTop: "24px" }}>Additional Photos (Optional)</span>
      <div className="rg-grid2">
        <UploadSlot label="Extra Photo 1" hint="Any additional photo. Max 5MB" accept="image/*" value={data.extra1} onChange={(f) => set("extra1", f)} />
        <UploadSlot label="Extra Photo 2" hint="Any additional photo. Max 5MB" accept="image/*" value={data.extra2} onChange={(f) => set("extra2", f)} />
      </div>
    </>
  );

  /* ── STEP 4 ── */
  const Step4 = (
    <>
      <p style={S.stepTag}>Step 4</p>
      <h2 style={S.stepHeading}>Review & Confirm</h2>
      <p style={{ fontSize: "13px", color: "#6b5a50", marginBottom: "20px", fontFamily: "sans-serif" }}>
        Please review your details before proceeding to payment.
      </p>
      <div style={S.reviewSection}>
        <p style={S.reviewHead}>Personal Info</p>
        <div className="rg-review-grid">
          {[["Name", data.fullName || "—"], ["Email", data.email || "—"], ["Phone", data.phone || "—"], ["Date of Birth", data.dob || "—"], ["Gender", data.gender || "—"], ["State", data.state || "—"], ["Instagram", data.instagram || "—"]].map(([k, v]) => (
            <><span key={"k"+k} style={S.reviewKey}>{k}</span><span key={"v"+k} style={S.reviewVal}>{v}</span></>
          ))}
        </div>
      </div>
      <div style={S.reviewSection}>
        <p style={S.reviewHead}>Model Details</p>
        <div className="rg-review-grid">
          {[["Height", data.height || "—"], ["Shoulder", data.shoulder || "—"], ["Bust", data.bust || "—"], ["Waist", data.waist || "—"], ["Hip", data.hip || "—"], ["Shoe", data.shoe || "—"], ["Experience", data.experience || "—"]].map(([k, v]) => (
            <><span key={"k"+k} style={S.reviewKey}>{k}</span><span key={"v"+k} style={S.reviewVal}>{v}</span></>
          ))}
        </div>
      </div>
      <div style={S.reviewSection}>
        <p style={S.reviewHead}>Uploads</p>
        <div className="rg-review-grid">
          {([["Portrait", data.portrait], ["Full Body (Front)", data.fullBodyFront], ["Full Body (Side)", data.fullBodySide], ["Catwalk Video", data.walkVideo]] as [string, File | null][]).map(([k, v]) => (
            <><span key={"k"+k} style={S.reviewKey}>{k}</span><span key={"v"+k} style={{ ...S.reviewVal, color: v ? "#7a3d18" : "#c0392b" }}>{v ? "✓ " + v.name : "Not uploaded"}</span></>
          ))}
        </div>
      </div>
      <div style={{ ...S.field, marginBottom: "20px" }}>
        <label style={S.label}>Promo / Referral Code (optional)</label>
        <input style={{ ...S.input, maxWidth: "260px" }} placeholder="Enter code" value={data.promoCode} onChange={(e) => set("promoCode", e.target.value)} />
      </div>
      <div style={S.checkRow}>
        <input type="checkbox" style={S.checkbox} id="terms" checked={data.termsAccepted} onChange={(e) => set("termsAccepted", e.target.checked)} />
        <label htmlFor="terms" style={S.checkLabel}>
          I confirm all information provided is accurate. *
        </label>
      </div>
      <div style={S.checkRow}>
        <input type="checkbox" style={S.checkbox} id="guardian" checked={data.guardianConsent} onChange={(e) => set("guardianConsent", e.target.checked)} />
        <label htmlFor="guardian" style={S.checkLabel}>
          If under 18, I confirm parent/guardian consent has been obtained. *
        </label>
      </div>
    </>
  );

  /* ── STEP 5 ── */
  const Step5 = (
    <>
      <p style={S.stepTag}>Step 5</p>
      <h2 style={S.stepHeading}>Payment</h2>
      <div style={{
        backgroundColor: "#f5ece4", border: "1px solid #c5a98a", borderRadius: "12px",
        padding: "20px 24px", marginBottom: "28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap" as const, gap: "12px",
      }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#b08968", marginBottom: "4px", fontFamily: "sans-serif" }}>Application Fee</p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.8rem", color: "#1a0f0a", fontWeight: 400, lineHeight: 1 }}>₦15,000</p>
          <p style={{ fontSize: "11px", color: "#6b5a50", marginTop: "4px", fontFamily: "sans-serif" }}>Includes training kit & registration materials</p>
        </div>
        <div style={{ fontSize: "32px" }}>💳</div>
      </div>
      <p style={{ fontSize: "13px", fontWeight: 600, color: "#3d2210", marginBottom: "14px", fontFamily: "sans-serif" }}>Select Payment Method</p>
      {[
        { id: "paystack", name: "Paystack", sub: "Pay securely with card, bank transfer or USSD" },
        { id: "transfer", name: "Direct Bank Transfer", sub: "Transfer to our GTBank account – attach proof of payment" },
      ].map((m) => (
        <div key={m.id} style={S.payMethod(data.paymentMethod === m.id)} onClick={() => set("paymentMethod", m.id)}>
          <div style={S.payDot(data.paymentMethod === m.id)}>
            <div style={S.payInner(data.paymentMethod === m.id)} />
          </div>
          <div>
            <p style={S.payName}>{m.name}</p>
            <p style={S.paySub}>{m.sub}</p>
          </div>
        </div>
      ))}
      {data.paymentMethod === "transfer" && (
        <div style={{ backgroundColor: "#faf8f6", border: "1px solid #e8ddd4", borderRadius: "10px", padding: "16px 20px", marginTop: "8px", fontFamily: "sans-serif" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#3d2210", marginBottom: "8px" }}>Bank Transfer Details</p>
          <p style={{ fontSize: "12px", color: "#6b5a50", lineHeight: 2 }}>
            Bank: <strong style={{ color: "#1a0f0a" }}>GTBank</strong><br />
            Account Name: <strong style={{ color: "#1a0f0a" }}>Everything High Academy</strong><br />
            Account No: <strong style={{ color: "#1a0f0a" }}>0123456789</strong>
          </p>
          <p style={{ fontSize: "11px", color: "#b08968", marginTop: "8px" }}>Use your full name as transfer reference.</p>
        </div>
      )}
    </>
  );

  /* ── STEP 6 ── */
  const Step6 = (
    <div style={S.completeWrap}>
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} style={S.completeIcon}>✓</motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 style={S.completeTitle}>Application Submitted!</h2>
        <p style={S.completeSub}>Thank you, {data.fullName || "Applicant"}. Your application has been received and is under review.</p>
        <p style={S.completeSub}>You'll receive a confirmation email at <strong>{data.email}</strong> within 24–48 hours.</p>
        <div style={S.refBox}>Reference: {refNum}</div>
        <p style={{ fontSize: "13px", color: "#6b5a50", fontFamily: "sans-serif", marginBottom: "24px" }}>
          What's next: Our team reviews each application for potential, readiness, and alignment. Selected applicants will be contacted within 5 business days.
        </p>
        <Link href="/" style={{ display: "inline-block", backgroundColor: "#3d2210", color: "#fff", borderRadius: "8px", padding: "12px 32px", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" as const, textDecoration: "none", fontFamily: "sans-serif" }}>
          Back to Home
        </Link>
        <p style={{ marginTop: "20px", fontSize: "13px", color: "#6b5a50", fontFamily: "sans-serif" }}>
          Share your journey →{" "}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#7a3d18", textDecoration: "underline" }}>Tag us @everythinghigh</a>
        </p>
      </motion.div>
    </div>
  );

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6];

  return (
    <main style={S.page}>
      <SiteNavbar variant="light" />


      <section style={S.hero}>
        <p style={S.heroLabel}>Application Form</p>
        <h1 style={S.heroTitle}>Complete your application with<br />clarity and confidence.</h1>
        <p style={S.heroSub}>Follow each step carefully. Upload your materials clearly and review your details before payment.</p>
      </section>

      <div className="rg-layout">
        <aside className="rg-sidebar">
          {ProgressSidebar}
          <SampleGuideSidebar />
        </aside>

        <div className="rg-form-panel" style={S.formPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {steps[step - 1]}
            </motion.div>
          </AnimatePresence>

          {step < 6 && (
            <div style={S.navRow}>
              <button style={S.btnBack} onClick={back}>{step === 1 ? "" : "← Back"}</button>
              <button
                style={S.btnContinue}
                onClick={next}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a3018")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3d2210")}
              >
                {step === 5 ? "Submit & Pay" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .rg-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          grid-template-areas: "sidebar form";
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
          align-items: start;
          box-sizing: border-box;
          width: 100%;
        }
        .rg-sidebar {
          grid-area: sidebar;
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }
        .rg-form-panel {
          grid-area: form;
          min-width: 0;
          width: 100%;
        }
        .rg-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .rg-grid3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .rg-review-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 860px) {
          .rg-layout {
            grid-template-columns: 1fr;
            grid-template-areas: "sidebar" "form";
            padding: 0 16px 60px;
            gap: 16px;
          }
          .rg-sidebar { position: static; }
        }
        @media (max-width: 600px) {
          .rg-layout { padding: 0 12px 48px; }
          .rg-form-panel { padding: 20px 14px !important; }
          .rg-grid2, .rg-grid3 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .rg-review-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            word-break: break-word;
          }
        }
        .rg-layout, .rg-layout * { box-sizing: border-box; max-width: 100%; }
        img, video { max-width: 100%; height: auto; }
        input:focus, select:focus {
          border-color: #7a3d18 !important;
          box-shadow: 0 0 0 3px rgba(122,61,24,0.12) !important;
          outline: none !important;
        }
        input::placeholder { color: #b8a49a; }
        select option { background: #fff; color: #1a0f0a; }
      `}</style>

      <SiteFooter />
    </main>
  );
}