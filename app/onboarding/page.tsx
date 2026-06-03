"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Onboarding() {
  const router = useRouter();
  const [selected, setSelected] = useState<"brand" | "creator" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("user_type").eq("id", user.id).single();
      if (data?.user_type === "admin") router.push("/admin");
    }
    checkAdmin();
  }, [router]);

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      user_type: selected,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(`/onboarding/${selected}`);
    }
  }

  const cardStyle = (type: "brand" | "creator") => ({
    width: "200px",
    height: "200px",
    border: `1px solid ${selected === type ? "#c9a96e" : "rgba(255,255,255,0.1)"}`,
    backgroundColor: selected === type ? "rgba(201,169,110,0.08)" : "transparent",
    color: "white" as const,
    cursor: "pointer" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "24px",
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>Welcome</p>
      <h1 style={{ fontSize: "40px", color: "#c9a96e", margin: "0", letterSpacing: "8px", fontFamily: "Arial", fontWeight: "700" }}>PEARUP</h1>
      <div style={{ width: "30px", height: "2px", backgroundColor: "#c9a96e", margin: "20px auto 40px" }} />

      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "40px" }}>
        Who are you joining as?
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
        <button onClick={() => setSelected("brand")} style={cardStyle("brand")}>
          <p style={{ fontFamily: "Arial", fontSize: "22px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Brand</p>
          <div style={{ width: "24px", height: "1px", backgroundColor: "#c9a96e" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.8", fontFamily: "Georgia, serif", margin: "0" }}>Find the perfect creator for your brand</p>
        </button>

        <button onClick={() => setSelected("creator")} style={cardStyle("creator")}>
          <p style={{ fontFamily: "Arial", fontSize: "22px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Creator</p>
          <div style={{ width: "24px", height: "1px", backgroundColor: "#c9a96e" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.8", fontFamily: "Georgia, serif", margin: "0" }}>Get brand deals that match your style</p>
        </button>
      </div>

      {error && (
        <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", marginBottom: "16px" }}>{error}</p>
      )}

      <button
        onClick={handleContinue}
        disabled={!selected || loading}
        style={{ backgroundColor: selected ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "16px 48px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: selected ? "pointer" : "not-allowed" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
