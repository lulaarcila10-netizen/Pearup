"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for error in hash (e.g. otp_expired)
    const hash = window.location.hash;
    if (hash.includes("error=")) {
      const params = new URLSearchParams(hash.substring(1));
      const desc = params.get("error_description");
      const code = params.get("error_code");
      if (code === "otp_expired") {
        setError("This reset link has expired. Please go back and request a new one.");
      } else {
        setError(desc || "Invalid reset link. Please request a new one.");
      }
      setReady(true);
      return;
    }

    // Listen for PASSWORD_RECOVERY — fired when Supabase processes recovery tokens in URL
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });

    // Also check if session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  const inputStyle = {
    padding: "16px 20px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white" as const,
    fontSize: "15px",
    outline: "none",
    width: "100%",
    fontFamily: "Georgia, serif",
  };

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase" }}>Verifying link...</p>
      </div>
    );
  }

  // Show error-only view (expired link, etc.) — no password form
  if (error && !password && !confirm) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", marginBottom: "32px" }}>PEARUP</p>
        <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", textAlign: "center", maxWidth: "320px", lineHeight: "1.7" }}>{error}</p>
        <a href="/login" style={{ marginTop: "24px", color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "13px", textDecoration: "none" }}>Back to login</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", marginBottom: "32px" }}>PEARUP</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "360px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", textAlign: "center", margin: "0 0 8px" }}>Set New Password</p>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", textAlign: "center", margin: "0" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}>
          {loading ? "Saving..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
