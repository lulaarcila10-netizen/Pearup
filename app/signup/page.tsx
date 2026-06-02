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

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
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
        <input
          type="password"
          placeholder="Password (min 10 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={10}
          style={{ padding: "16px 20px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "15px", outline: "none", width: "100%", fontFamily: "Georgia, serif" }}
        />

        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "8px" }}
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
