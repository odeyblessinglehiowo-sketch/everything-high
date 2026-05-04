"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://ypukgajdjfrtdwetqetg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdWtnYWpkamZydGR3ZXRxZXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODgzNDYsImV4cCI6MjA5Mjc2NDM0Nn0.DepyLLBM3XyGwKY2Ouz22fIOCaLHKmTCjKFKGtoo1cA"
);

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Redirect if already logged in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/admin");
    });
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/admin");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0906",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% -20%, rgba(122,61,24,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 85% 85%, rgba(176,137,104,0.08) 0%, transparent 50%)
        `,
        pointerEvents: "none",
      }} />

      {/* Subtle grain overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      {/* Thin decorative lines */}
      <div style={{
        position: "absolute",
        top: "40px",
        left: "40px",
        right: "40px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(176,137,104,0.2), transparent)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "40px",
        right: "40px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(176,137,104,0.2), transparent)",
      }} />

      {/* Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(26,15,10,0.9)",
          border: "1px solid rgba(176,137,104,0.2)",
          borderRadius: "20px",
          padding: "48px 40px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(176,137,104,0.1)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            backgroundColor: "#7a3d18",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#f5f0eb",
            fontFamily: "'Georgia', serif",
            marginBottom: "20px",
            boxShadow: "0 8px 24px rgba(122,61,24,0.4)",
          }}>
            EH
          </div>
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.5rem",
            color: "#f5f0eb",
            fontWeight: 400,
            letterSpacing: "0.04em",
            marginBottom: "6px",
          }}>
            Everything High
          </h1>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#b08968",
          }}>
            Admin Portal
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(176,137,104,0.25), transparent)",
          marginBottom: "32px",
        }} />

        {/* Fields */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "10px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#b08968",
            marginBottom: "8px",
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="admin@everythinghigh.com"
            style={{
              width: "100%",
              height: "44px",
              padding: "0 16px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(176,137,104,0.2)",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#f5f0eb",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(176,137,104,0.6)")}
            onBlur={e => (e.target.style.borderColor = "rgba(176,137,104,0.2)")}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "10px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#b08968",
            marginBottom: "8px",
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            style={{
              width: "100%",
              height: "44px",
              padding: "0 16px",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(176,137,104,0.2)",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#f5f0eb",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(176,137,104,0.6)")}
            onBlur={e => (e.target.style.borderColor = "rgba(176,137,104,0.2)")}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "rgba(229,57,53,0.1)",
            border: "1px solid rgba(229,57,53,0.3)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "12px",
            color: "#ff7b77",
            marginBottom: "20px",
          }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            height: "46px",
            backgroundColor: loading ? "#5a2e12" : "#7a3d18",
            color: "#f5f0eb",
            border: "none",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s, transform 0.1s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={e => { if (!loading) (e.currentTarget.style.backgroundColor = "#8f4a1e"); }}
          onMouseLeave={e => { if (!loading) (e.currentTarget.style.backgroundColor = "#7a3d18"); }}
          onMouseDown={e => { if (!loading) (e.currentTarget.style.transform = "scale(0.98)"); }}
          onMouseUp={e => { (e.currentTarget.style.transform = "scale(1)"); }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                border: "2px solid rgba(245,240,235,0.3)",
                borderTopColor: "#f5f0eb",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              Signing in…
            </span>
          ) : "Sign In"}
        </button>

        <p style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "11px",
          color: "#5a4a42",
        }}>
          Restricted access · Authorised personnel only
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(176,137,104,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #1a0f0a inset !important;
          -webkit-text-fill-color: #f5f0eb !important;
        }
      `}</style>
    </div>
  );
}