"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setForgotLoading(true);
    await supabase.auth.resetPasswordForEmail(forgotEmail);
    setForgotSent(true);
    setForgotLoading(false);
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>Welcome Back</p>
      <h1 style={{ fontSize: "40px", color: "#c9a96e", margin: "0", letterSpacing: "8px", fontFamily: "Arial", fontWeight: "700" }}>PEARUP</h1>
      <div style={{ width: "30px", height: "2px", backgroundColor: "#c9a96e", margin: "20px auto 40px" }} />

      {!showForgot ? (
        <>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "360px" }}>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            <div style={{ position: "relative", width: "100%" }}>
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inputStyle, padding: "16px 48px 16px 20px" }} />
              <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "12px", fontFamily: "Arial", letterSpacing: "1px", textTransform: "uppercase" }}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px" }}>{error}</p>}

            <button type="submit" disabled={loading} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "8px" }}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <button onClick={() => setShowForgot(true)} style={{ marginTop: "20px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "13px", cursor: "pointer" }}>
            Forgot your password?
          </button>

          <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.45)", fontFamily: "Georgia, serif", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#c9a96e", textDecoration: "none" }}>Sign up</Link>
          </p>
        </>
      ) : (
        <>
          {!forgotSent ? (
            <form onSubmit={handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "360px" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif", fontSize: "14px", lineHeight: "1.7" }}>
                Enter your email and we'll send you a link to reset your password.
              </p>
              <input type="email" placeholder="Email address" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required style={inputStyle} />
              <button type="submit" disabled={forgotLoading} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Check your email for the reset link!
            </p>
          )}

          <button onClick={() => setShowForgot(false)} style={{ marginTop: "24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "13px", cursor: "pointer" }}>
            Back to login
          </button>
        </>
      )}
    </div>
  );
}
