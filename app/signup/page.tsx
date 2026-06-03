"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsConfirmed, setTermsConfirmed] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!ageConfirmed || !termsConfirmed) return;
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/onboarding");
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>Join Pearup</p>
      <h1 style={{ fontSize: "40px", color: "#c9a96e", margin: "0", letterSpacing: "8px", fontFamily: "Arial", fontWeight: "700" }}>PEARUP</h1>
      <div style={{ width: "30px", height: "2px", backgroundColor: "#c9a96e", margin: "20px auto 40px" }} />

      <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "360px" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "16px 20px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "15px", outline: "none", width: "100%", fontFamily: "Georgia, serif" }}
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 10 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={10}
            style={{ padding: "16px 48px 16px 20px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "15px", outline: "none", width: "100%", fontFamily: "Georgia, serif" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(p => !p)}
            style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "12px", fontFamily: "Arial", letterSpacing: "1px", textTransform: "uppercase" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px" }}>{error}</p>}

        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", textAlign: "left" }}>
          <input type="checkbox" checked={ageConfirmed} onChange={e => setAgeConfirmed(e.target.checked)} style={{ marginTop: "3px", accentColor: "#c9a96e", flexShrink: 0 }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
            I confirm that I am <strong style={{ color: "rgba(255,255,255,0.85)" }}>13 years of age or older</strong> and understand that Pearup charges a <strong style={{ color: "#c9a96e" }}>12% platform fee</strong> on every completed deal.
          </span>
        </label>

        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", textAlign: "left" }}>
          <input type="checkbox" checked={termsConfirmed} onChange={e => setTermsConfirmed(e.target.checked)} style={{ marginTop: "3px", accentColor: "#c9a96e", flexShrink: 0 }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
            I have read and agree to Pearup's{" "}
            <Link href="/terms" target="_blank" style={{ color: "#c9a96e", textDecoration: "underline" }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" target="_blank" style={{ color: "#c9a96e", textDecoration: "underline" }}>Privacy Policy</Link>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !ageConfirmed || !termsConfirmed}
          style={{ backgroundColor: (ageConfirmed && termsConfirmed) ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: (ageConfirmed && termsConfirmed) ? "pointer" : "not-allowed", marginTop: "8px" }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p style={{ marginTop: "32px", color: "rgba(255,255,255,0.45)", fontFamily: "Georgia, serif", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#c9a96e", textDecoration: "none" }}>Log in</Link>
      </p>
    </div>
  );
}
