"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://ypukgajdjfrtdwetqetg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdWtnYWpkamZydGR3ZXRxZXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODgzNDYsImV4cCI6MjA5Mjc2NDM0Nn0.DepyLLBM3XyGwKY2Ouz22fIOCaLHKmTCjKFKGtoo1cA"
);

const STORAGE_BUCKET = "applicant-uploads";

// Files are now stored as public URLs directly in DB.
// This helper handles both old paths and new full URLs gracefully.
function resolveMediaUrl(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  // Legacy: treat as a storage path and build public URL
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(value);
  return data.publicUrl ?? null;
}

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface Applicant {
  id: string;
  created_at: string;
  full_name: string;
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
  hair_colour: string;
  eye_colour: string;
  skin_tone: string;
  experience: string;
  category_interest: string[] | string;
  portrait_name: string | null;
  full_body_front_name: string | null;
  full_body_side_name: string | null;
  catwalk_video_name: string | null;
  promo_code: string | null;
  referral_code: string | null;
  payment_method: string;
  payment_reference: string;
  internal_ref: string;
  amount: number;
  status: string;
}

type FilterStatus = "all" | "paid" | "pending" | "rejected";
type SortKey = "created_at" | "full_name" | "state" | "status";

// ─── CATEGORY LABELS ───────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  kids:         "Kids (Ages 4–12)",
  teens:        "Teens (Ages 13–17)",
  youth:        "Youth (Ages 13–17)",
  adult:        "Adult (18+)",
  plus_size:    "Plus Size",
  "plus size":  "Plus Size",
  commercial:   "Commercial",
  editorial:    "Editorial",
  runway:       "Runway / Catwalk",
  "runway / catwalk": "Runway / Catwalk",
  fitness:      "Fitness",
  glamour:      "Glamour",
  bridal:       "Bridal",
  "hair & beauty": "Hair & Beauty",
};

function formatCategory(cat: string): string {
  if (!cat) return "";
  const lower = cat.toLowerCase().trim();
  return CATEGORY_LABELS[lower] ?? cat;
}

function formatCategories(cats: string[] | string | null): string {
  if (!cats) return "—";
  // Handle raw DB array-like strings e.g. '["Kids"]' or ["Kids"]
  if (typeof cats === "string") {
    try {
      const parsed = JSON.parse(cats);
      if (Array.isArray(parsed)) {
        return parsed.map(formatCategory).join(", ") || "—";
      }
    } catch {
      // not JSON, treat as plain string
    }
    return formatCategory(cats) || "—";
  }
  if (Array.isArray(cats)) {
    return cats.map(formatCategory).join(", ") || "—";
  }
  return "—";
}

function getFirstCategory(cats: string[] | string | null): string {
  if (!cats) return "";
  if (typeof cats === "string") {
    try {
      const parsed = JSON.parse(cats);
      if (Array.isArray(parsed) && parsed.length > 0) return formatCategory(parsed[0]);
    } catch {
      return formatCategory(cats);
    }
    return formatCategory(cats);
  }
  if (Array.isArray(cats) && cats.length > 0) return formatCategory(cats[0]);
  return "";
}

function getCategoryCount(cats: string[] | string | null): number {
  if (!cats) return 0;
  if (typeof cats === "string") {
    try {
      const parsed = JSON.parse(cats);
      if (Array.isArray(parsed)) return parsed.length;
    } catch { return 1; }
    return 1;
  }
  return Array.isArray(cats) ? cats.length : 0;
}

// All unique categories from rows for filter dropdown
function extractAllCategories(rows: Applicant[]): string[] {
  const set = new Set<string>();
  rows.forEach(r => {
    const cats = r.category_interest;
    if (!cats) return;
    if (typeof cats === "string") {
      try {
        const parsed = JSON.parse(cats);
        if (Array.isArray(parsed)) { parsed.forEach((c: string) => set.add(formatCategory(c))); return; }
      } catch { /* ignore */ }
      set.add(formatCategory(cats));
    } else if (Array.isArray(cats)) {
      cats.forEach(c => set.add(formatCategory(c)));
    }
  });
  return Array.from(set).filter(Boolean).sort();
}

// ─── HELPERS ───────────────────────────────────────────────────────────────
function fmt(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const STATUS_COLORS: Record<string, { bg: string; color: string; dot: string }> = {
  paid:     { bg: "#eaf5ea", color: "#2d6a2d", dot: "#4caf50" },
  pending:  { bg: "#fff8e6", color: "#7a5c00", dot: "#f5a623" },
  rejected: { bg: "#fdecea", color: "#8b1a1a", dot: "#e53935" },
  review:   { bg: "#e8f0fe", color: "#1a3a8b", dot: "#4a6cf7" },
};
function statusStyle(s: string) {
  return STATUS_COLORS[s?.toLowerCase()] ?? { bg: "#f0ebe6", color: "#5a4a42", dot: "#b08968" };
}

const AVATAR_PALETTES = [
  "#7a3d18","#3d2210","#b08968","#5a3018","#2d6a4f","#1a3a8b","#6d3b7a","#7a4d18",
];
function avatarBg(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

// ─── CSV EXPORT ────────────────────────────────────────────────────────────
function exportCSV(rows: Applicant[]) {
  const headers = [
    "Internal Ref", "Full Name", "Email", "Phone", "DOB", "Gender",
    "Nationality", "State", "Instagram", "Height", "Shoulder", "Bust",
    "Waist", "Hip", "Shoe", "Hair Colour", "Eye Colour", "Skin Tone",
    "Experience", "Category", "Payment Method", "Payment Reference",
    "Amount (₦)", "Status", "Promo Code", "Referral Code", "Applied At",
  ];

  const escape = (v: unknown): string => {
    const s = String(v ?? "").replace(/"/g, '""');
    return `"${s}"`;
  };

  const csvRows = rows.map(r => [
    r.internal_ref,
    r.full_name,
    r.email,
    r.phone,
    r.dob,
    r.gender,
    r.nationality,
    r.state,
    r.instagram,
    r.height,
    r.shoulder,
    r.bust,
    r.waist,
    r.hip,
    r.shoe,
    r.hair_colour,
    r.eye_colour,
    r.skin_tone,
    r.experience,
    formatCategories(r.category_interest),
    r.payment_method,
    r.payment_reference,
    r.amount,
    r.status,
    r.promo_code ?? "",
    r.referral_code ?? "",
    fmt(r.created_at),
  ].map(escape).join(","));

  const csv = [headers.map(h => `"${h}"`).join(","), ...csvRows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `EH_Applications_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      border: "1px solid #e8ddd4",
      borderRadius: "14px",
      padding: "20px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px", backgroundColor: accent,
        }} />
      )}
      <p style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", color: "#b08968", fontFamily: "sans-serif", marginBottom: "10px" }}>
        {label}
      </p>
      <p style={{ fontFamily: "'Georgia', serif", fontSize: "2rem", color: "#1a0f0a", lineHeight: 1, marginBottom: "6px" }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: "11px", color: "#9a8880", fontFamily: "sans-serif" }}>{sub}</p>}
    </div>
  );
}

// ─── MEDIA LIGHTBOX ────────────────────────────────────────────────────────
function MediaLightbox({ url, type, onClose }: { url: string; type: "image" | "video"; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        backdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "20px", right: "24px",
          background: "rgba(255,255,255,0.1)", border: "none",
          color: "#fff", fontSize: "24px", cursor: "pointer",
          width: "40px", height: "40px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}
      >
        ×
      </button>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
        {type === "image" ? (
          <img
            src={url}
            alt="Preview"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
            }}
          />
        ) : (
          <video
            src={url}
            controls
            autoPlay
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "8px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
              backgroundColor: "#000",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── MEDIA THUMBNAIL ───────────────────────────────────────────────────────
function MediaThumb({
  url,
  label,
  isVideo,
  onOpen,
}: {
  url: string | null;
  label: string;
  isVideo?: boolean;
  onOpen: (url: string, type: "image" | "video") => void;
}) {
  const [imgError, setImgError] = useState(false);
  const resolved = resolveMediaUrl(url);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!resolved) return;
    const a = document.createElement("a");
    a.href = resolved;
    a.download = label.replace(/\s+/g, "_").toLowerCase() + (isVideo ? ".mp4" : ".jpg");
    a.target = "_blank";
    a.click();
  };

  if (!resolved) {
    return (
      <div style={{
        border: "1px dashed #ddd0c5",
        borderRadius: "8px",
        padding: "14px 10px",
        textAlign: "center",
        fontSize: "11px",
        color: "#c5b0a4",
        fontFamily: "sans-serif",
      }}>
        <div style={{ fontSize: "20px", marginBottom: "4px", opacity: 0.4 }}>{isVideo ? "🎥" : "🖼️"}</div>
        <div style={{ fontSize: "10px", color: "#c0b0a8" }}>{label}</div>
        <div style={{ fontSize: "10px", color: "#d0c0b8", marginTop: "2px" }}>Not uploaded</div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => onOpen(resolved, isVideo ? "video" : "image")}
        style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e0d4ca",
          cursor: "pointer",
          backgroundColor: "#f0ebe6",
          aspectRatio: isVideo ? "16/9" : "3/4",
        }}
      >
        {isVideo ? (
          <div style={{
            width: "100%",
            height: "100%",
            minHeight: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#1a0f0a",
            color: "#b08968",
          }}>
            <div style={{ fontSize: "28px" }}>▶</div>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Play Catwalk
            </div>
          </div>
        ) : imgError ? (
          <div style={{
            width: "100%",
            height: "100%",
            minHeight: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f0eb",
            color: "#b08968",
            gap: "4px",
          }}>
            <div style={{ fontSize: "20px" }}>🖼️</div>
            <div style={{ fontSize: "10px", color: "#c5b0a4" }}>Preview unavailable</div>
          </div>
        ) : (
          <img
            src={resolved}
            alt={label}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
        {/* Overlay label */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(26,15,10,0.75))",
          padding: "16px 8px 8px",
          fontSize: "9px",
          color: "#f5f0eb",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}>
          {label}
        </div>
        {/* Expand icon */}
        <div style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "#fff",
          borderRadius: "4px",
          fontSize: "10px",
          padding: "2px 5px",
          backdropFilter: "blur(4px)",
        }}>
          ⤢
        </div>
      </div>
      {/* Download button below thumbnail */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "6px",
          width: "100%",
          height: "28px",
          border: "1px solid #e0d4ca",
          borderRadius: "6px",
          backgroundColor: "#faf8f6",
          color: "#7a3d18",
          fontSize: "10px",
          cursor: "pointer",
          fontFamily: "sans-serif",
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        ↓ Download
      </button>
    </div>
  );
}

// ─── DETAIL DRAWER ─────────────────────────────────────────────────────────
function DetailDrawer({
  applicant,
  onClose,
  onLightbox,
}: {
  applicant: Applicant;
  onClose: () => void;
  onLightbox: (url: string, type: "image" | "video") => void;
}) {
  const sc = statusStyle(applicant.status);

  const portraitUrl       = resolveMediaUrl(applicant.portrait_name);
  const frontUrl          = resolveMediaUrl(applicant.full_body_front_name);
  const sideUrl           = resolveMediaUrl(applicant.full_body_side_name);
  const catwalkUrl        = resolveMediaUrl(applicant.catwalk_video_name);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b08968", fontFamily: "sans-serif", marginBottom: "12px", borderBottom: "1px solid #f0ebe6", paddingBottom: "8px" }}>
        {title}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
        {children}
      </div>
    </div>
  );

  const Row = ({ k, v }: { k: string; v: string | null | undefined }) => (
    <>
      <span style={{ fontSize: "11px", color: "#9a8880", fontFamily: "sans-serif" }}>{k}</span>
      <span style={{ fontSize: "12px", color: "#1a0f0a", fontFamily: "sans-serif", fontWeight: 500, wordBreak: "break-all" }}>{v || "—"}</span>
    </>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,15,10,0.45)", backdropFilter: "blur(2px)" }}
      />

      {/* Panel */}
      <div
        className="detail-drawer"
        style={{
          position: "relative", zIndex: 1,
          width: "min(520px, 100vw)",
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#faf8f6",
          borderLeft: "1px solid #e8ddd4",
          padding: "32px 28px",
          animation: "slideIn 0.22s ease",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#9a8880", lineHeight: 1 }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", paddingRight: "32px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: avatarBg(applicant.full_name),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "sans-serif", flexShrink: 0,
          }}>
            {initials(applicant.full_name)}
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.3rem", color: "#1a0f0a", fontWeight: 400, marginBottom: "4px", wordBreak: "break-word" }}>
              {applicant.full_name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                backgroundColor: sc.bg, color: sc.color,
                fontSize: "10px", fontFamily: "sans-serif", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "3px 10px", borderRadius: "99px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: sc.dot, display: "inline-block" }} />
                {applicant.status || "unknown"}
              </span>
              <span style={{ fontSize: "11px", color: "#9a8880", fontFamily: "sans-serif" }}>{fmt(applicant.created_at)}</span>
            </div>
          </div>
        </div>

        {/* ── PHOTOS & VIDEO ── */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b08968", fontFamily: "sans-serif", marginBottom: "14px", borderBottom: "1px solid #f0ebe6", paddingBottom: "8px" }}>
            Photos & Video
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
            <MediaThumb url={portraitUrl} label="Portrait"        onOpen={onLightbox} />
            <MediaThumb url={frontUrl}    label="Full Body Front" onOpen={onLightbox} />
            <MediaThumb url={sideUrl}     label="Full Body Side"  onOpen={onLightbox} />
          </div>

          <MediaThumb url={catwalkUrl} label="Catwalk Video" isVideo onOpen={onLightbox} />
        </div>

        <Section title="Contact">
          <Row k="Email"       v={applicant.email} />
          <Row k="Phone"       v={applicant.phone} />
          <Row k="Instagram"   v={applicant.instagram} />
          <Row k="State"       v={applicant.state} />
          <Row k="Nationality" v={applicant.nationality} />
          <Row k="Date of Birth" v={applicant.dob} />
          <Row k="Gender"      v={applicant.gender} />
        </Section>

        <Section title="Measurements">
          <Row k="Height"     v={applicant.height} />
          <Row k="Shoulder"   v={applicant.shoulder ? applicant.shoulder + '"' : null} />
          <Row k="Bust/Chest" v={applicant.bust    ? applicant.bust    + '"' : null} />
          <Row k="Waist"      v={applicant.waist   ? applicant.waist   + '"' : null} />
          <Row k="Hip"        v={applicant.hip     ? applicant.hip     + '"' : null} />
          <Row k="Shoe (UK)"  v={applicant.shoe} />
        </Section>

        <Section title="Appearance & Experience">
          <Row k="Hair Colour" v={applicant.hair_colour} />
          <Row k="Eye Colour"  v={applicant.eye_colour} />
          <Row k="Skin Tone"   v={applicant.skin_tone} />
          <Row k="Experience"  v={applicant.experience} />
          <Row k="Category"    v={formatCategories(applicant.category_interest)} />
        </Section>

        <Section title="Payment">
          <Row k="Method"       v={applicant.payment_method} />
          <Row k="Amount"       v={applicant.amount ? `₦${applicant.amount.toLocaleString()}` : null} />
          <Row k="Payment Ref"  v={applicant.payment_reference} />
          <Row k="Internal Ref" v={applicant.internal_ref} />
          <Row k="Promo Code"   v={applicant.promo_code} />
          <Row k="Referral"     v={applicant.referral_code} />
        </Section>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [rows, setRows]               = useState<Applicant[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortKey, setSortKey]         = useState<SortKey>("created_at");
  const [sortAsc, setSortAsc]         = useState(false);
  const [selected, setSelected]       = useState<Applicant | null>(null);
  const [refreshing, setRefreshing]   = useState(false);
  const [lightbox, setLightbox]       = useState<{ url: string; type: "image" | "video" } | null>(null);

  // ── Auth guard ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });
    return () => subscription.unsubscribe();
  }, [router]);

  async function fetchData(silent = false) {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from("everythinghighregistrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) setError(dbError.message);
    else setRows(data as Applicant[]);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    if (authChecked) fetchData();
  }, [authChecked]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // ── Stats ──
  const stats = useMemo(() => ({
    total:   rows.length,
    paid:    rows.filter(r => r.status === "paid").length,
    pending: rows.filter(r => r.status === "pending").length,
    revenue: rows.filter(r => r.status === "paid").reduce((s, r) => s + (r.amount ?? 0), 0),
  }), [rows]);

  const allCategories = useMemo(() => extractAllCategories(rows), [rows]);

  // ── Filtered + sorted rows ──
  const visible = useMemo(() => {
    let out = [...rows];
    if (filterStatus !== "all") out = out.filter(r => r.status?.toLowerCase() === filterStatus);
    if (filterCategory !== "all") {
      out = out.filter(r => {
        const cats = r.category_interest;
        if (!cats) return false;
        const formatted = formatCategories(cats);
        return formatted.toLowerCase().includes(filterCategory.toLowerCase());
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(r =>
        r.full_name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.state?.toLowerCase().includes(q) ||
        r.internal_ref?.toLowerCase().includes(q)
      );
    }
    out.sort((a, b) => {
      const av = (a[sortKey] ?? "") as string;
      const bv = (b[sortKey] ?? "") as string;
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return out;
  }, [rows, filterStatus, filterCategory, search, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(false); }
  }

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span style={{ marginLeft: "4px", opacity: sortKey === k ? 1 : 0.3, fontSize: "10px" }}>
      {sortKey === k ? (sortAsc ? "↑" : "↓") : "↕"}
    </span>
  );

  const openLightbox = useCallback((url: string, type: "image" | "video") => {
    setLightbox({ url, type });
  }, []);

  if (!authChecked) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0906", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "36px", height: "36px", border: "2px solid rgba(176,137,104,0.2)", borderTopColor: "#b08968", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#6b5a50" }}>Checking access…</p>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f0eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "36px", height: "36px", border: "2px solid #e8ddd4", borderTopColor: "#7a3d18", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#9a8880" }}>Loading applications…</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f0eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", border: "1px solid #e8ddd4", borderRadius: "16px", padding: "40px", textAlign: "center", maxWidth: "400px" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>⚠️</div>
        <h2 style={{ fontFamily: "'Georgia', serif", color: "#1a0f0a", marginBottom: "8px" }}>Couldn't load data</h2>
        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#9a8880", marginBottom: "20px" }}>{error}</p>
        <button onClick={() => fetchData()} style={{ backgroundColor: "#3d2210", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontFamily: "sans-serif", fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em" }}>
          Try again
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f0eb", fontFamily: "sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div style={{ backgroundColor: "#1a0f0a", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", backgroundColor: "#7a3d18", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", flexShrink: 0 }}>
            EH
          </div>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "14px", color: "#f5f0eb", letterSpacing: "0.04em" }}>
            Everything High
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="hide-mobile" style={{ fontSize: "11px", color: "#6b5a50" }}>{rows.length} records</span>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            style={{ backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#c5a98a", borderRadius: "7px", padding: "6px 10px", fontSize: "11px", cursor: "pointer", opacity: refreshing ? 0.5 : 1 }}
          >
            {refreshing ? "…" : "↻"}
          </button>
          <button
            onClick={() => exportCSV(visible)}
            style={{ backgroundColor: "#7a3d18", border: "none", color: "#fff", borderRadius: "7px", padding: "6px 12px", fontSize: "11px", cursor: "pointer", letterSpacing: "0.06em", whiteSpace: "nowrap" }}
          >
            ↓ CSV
          </button>
          <button
            onClick={handleSignOut}
            style={{ backgroundColor: "transparent", border: "1px solid rgba(229,57,53,0.3)", color: "#ff7b77", borderRadius: "7px", padding: "6px 10px", fontSize: "11px", cursor: "pointer" }}
          >
            Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 16px 80px" }}>

        {/* ── STATS ── */}
        <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
          <StatCard label="Total"   value={stats.total}                               sub="All time"               accent="#b08968" />
          <StatCard label="Paid"    value={stats.paid}                                sub={`${stats.total ? Math.round((stats.paid / stats.total) * 100) : 0}%`} accent="#4caf50" />
          <StatCard label="Pending" value={stats.pending}                             sub="Awaiting"               accent="#f5a623" />
          <StatCard label="Revenue" value={`₦${stats.revenue.toLocaleString()}`}      sub="Paid apps"              accent="#7a3d18" />
        </div>

        {/* ── CONTROLS ── */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #e8ddd4", borderRadius: "14px", padding: "14px 16px", marginBottom: "14px" }}>
          {/* Row 1: search */}
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#b08968", fontSize: "14px", pointerEvents: "none" }}>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, ref…"
              style={{ width: "100%", height: "38px", paddingLeft: "32px", paddingRight: "12px", border: "1px solid #e0d4ca", borderRadius: "8px", fontSize: "12px", color: "#1a0f0a", backgroundColor: "#faf8f6", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Row 2: filters */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {(["all", "paid", "pending", "rejected"] as FilterStatus[]).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  height: "32px", padding: "0 12px",
                  borderRadius: "8px", border: "1px solid",
                  fontSize: "11px", fontWeight: 600, cursor: "pointer",
                  letterSpacing: "0.06em", textTransform: "capitalize",
                  backgroundColor: filterStatus === s ? "#3d2210" : "transparent",
                  borderColor:     filterStatus === s ? "#3d2210" : "#ddd0c5",
                  color:           filterStatus === s ? "#fff"    : "#6b5a50",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </button>
            ))}

            {/* Category filter */}
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{
                height: "32px", padding: "0 28px 0 10px",
                borderRadius: "8px", border: "1px solid #ddd0c5",
                fontSize: "11px", color: filterCategory !== "all" ? "#3d2210" : "#6b5a50",
                backgroundColor: filterCategory !== "all" ? "#f5ece4" : "transparent",
                cursor: "pointer", outline: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23b08968' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                appearance: "none",
              }}
            >
              <option value="all">All Categories</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div style={{ marginLeft: "auto", fontSize: "11px", color: "#9a8880", whiteSpace: "nowrap" }}>
              {visible.length} result{visible.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* ── TABLE (desktop) / CARDS (mobile) ── */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #e8ddd4", borderRadius: "14px", overflow: "hidden" }}>

          {/* Desktop table header */}
          <div className="table-header" style={{ display: "grid", gridTemplateColumns: "2.4fr 1.6fr 1.6fr 1fr 1fr 70px", padding: "12px 20px", backgroundColor: "#faf8f6", borderBottom: "1px solid #e8ddd4" }}>
            {([
              ["full_name", "Applicant"],
              ["state",     "Location"],
              [null,        "Category"],
              ["status",    "Status"],
              ["created_at","Applied"],
              [null,        ""],
            ] as [SortKey | null, string][]).map(([key, label], i) => (
              <div
                key={i}
                onClick={key ? () => toggleSort(key) : undefined}
                style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#b08968", cursor: key ? "pointer" : "default", userSelect: "none", display: "flex", alignItems: "center" }}
              >
                {label}{key && <SortIcon k={key} />}
              </div>
            ))}
          </div>

          {visible.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#9a8880", fontSize: "13px" }}>
              No applications found{search ? ` for "${search}"` : ""}.
            </div>
          ) : (
            visible.map((item, idx) => {
              const sc = statusStyle(item.status);
              const firstCat = getFirstCategory(item.category_interest);
              const catCount = getCategoryCount(item.category_interest);
              return (
                <div key={item.id}>
                  {/* ── Desktop row ── */}
                  <div
                    className="table-row"
                    onClick={() => setSelected(item)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2.4fr 1.6fr 1.6fr 1fr 1fr 70px",
                      padding: "14px 20px",
                      borderBottom: idx < visible.length - 1 ? "1px solid #f0ebe6" : "none",
                      cursor: "pointer",
                      alignItems: "center",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#faf8f6")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
                        backgroundColor: avatarBg(item.full_name || "?"),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 700, color: "#fff",
                      }}>
                        {initials(item.full_name || "?")}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a0f0a", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.full_name || "—"}
                        </p>
                        <p style={{ fontSize: "11px", color: "#9a8880", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", color: "#3d2210" }}>{item.state || "—"}</p>
                      <p style={{ fontSize: "11px", color: "#9a8880" }}>{item.gender || ""}</p>
                    </div>
                    <div style={{ fontSize: "12px", color: "#3d2210" }}>
                      {firstCat || "—"}
                      {catCount > 1 && (
                        <span style={{ fontSize: "10px", color: "#b08968", marginLeft: "4px" }}>+{catCount - 1}</span>
                      )}
                    </div>
                    <div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        backgroundColor: sc.bg, color: sc.color,
                        fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em",
                        textTransform: "capitalize", padding: "3px 10px", borderRadius: "99px",
                      }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: sc.dot, display: "inline-block" }} />
                        {item.status || "—"}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b5a50" }}>{fmt(item.created_at)}</div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "11px", color: "#b08968", fontWeight: 600 }}>View →</span>
                    </div>
                  </div>

                  {/* ── Mobile card ── */}
                  <div
                    className="mobile-card"
                    onClick={() => setSelected(item)}
                    style={{
                      padding: "16px",
                      borderBottom: idx < visible.length - 1 ? "1px solid #f0ebe6" : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                        backgroundColor: avatarBg(item.full_name || "?"),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: 700, color: "#fff",
                      }}>
                        {initials(item.full_name || "?")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a0f0a", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.full_name || "—"}
                        </p>
                        <p style={{ fontSize: "12px", color: "#9a8880", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.email}
                        </p>
                      </div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "4px", flexShrink: 0,
                        backgroundColor: sc.bg, color: sc.color,
                        fontSize: "10px", fontWeight: 600, textTransform: "capitalize",
                        padding: "3px 8px", borderRadius: "99px",
                      }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: sc.dot, display: "inline-block" }} />
                        {item.status || "—"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", color: "#6b5a50" }}>📍 {item.state || "—"}</span>
                      <span style={{ fontSize: "11px", color: "#6b5a50" }}>🏷 {firstCat || "—"}</span>
                      <span style={{ fontSize: "11px", color: "#6b5a50" }}>📅 {fmt(item.created_at)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "11px", color: "#b8a49a" }}>
          Everything High Modelling Academy · Admin Portal · {new Date().getFullYear()}
        </p>
      </div>

      {/* ── DETAIL DRAWER ── */}
      {selected && (
        <DetailDrawer
          applicant={selected}
          onClose={() => setSelected(null)}
          onLightbox={openLightbox}
        />
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <MediaLightbox
          url={lightbox.url}
          type={lightbox.type}
          onClose={() => setLightbox(null)}
        />
      )}

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd0c5; border-radius: 99px; }

        /* Mobile card visible, table hidden on mobile */
        .mobile-card { display: none; }
        .table-row   { display: grid; }
        .table-header { display: grid; }

        @media (max-width: 700px) {
          .mobile-card  { display: block !important; }
          .table-row    { display: none !important; }
          .table-header { display: none !important; }
          .hide-mobile  { display: none !important; }
          .stat-grid    { grid-template-columns: 1fr 1fr !important; }
          .detail-drawer { width: 100vw !important; padding: 20px 16px !important; }
        }
        @media (max-width: 400px) {
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}