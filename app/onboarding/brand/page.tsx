"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const INDUSTRIES = ["Fashion", "Beauty", "Jewelry", "Skincare", "Fitness", "Travel", "Food", "Tech", "Gadgets", "Lifestyle"];

const BUDGET_RANGES = [
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { label: "$5,000 – $15,000", min: 5000, max: 15000 },
  { label: "$15,000+", min: 15000, max: 999999 },
];

export default function BrandOnboarding() {
  const router = useRouter();
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function toggleIndustry(industry: string) {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  }

  const isValid = brandName && description && instagram && selectedBudget && selectedIndustries.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    let avatarUrl = null;
    if (avatarFile) {
      const { data } = await supabase.storage.from("avatars").upload(`${user.id}/avatar`, avatarFile, { upsert: true });
      if (data) {
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(`${user.id}/avatar`);
        avatarUrl = urlData.publicUrl;
      }
    }

    await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", user.id);

    const { error } = await supabase.from("brand_profiles").insert({
      id: user.id,
      brand_name: brandName,
      description,
      website,
      instagram_handle: instagram,
      budget_min: selectedBudget!.min,
      budget_max: selectedBudget!.max,
      industry: selectedIndustries,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  const inputStyle = {
    padding: "14px 18px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white" as const,
    fontSize: "15px",
    outline: "none",
    width: "100%",
    fontFamily: "Georgia, serif",
  };

  const labelStyle = {
    fontFamily: "Arial",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase" as const,
    marginBottom: "12px",
    display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
      <h1 style={{ fontSize: "28px", letterSpacing: "6px", fontFamily: "Arial", fontWeight: "700", marginBottom: "8px" }}>PEARUP</h1>
      <div style={{ width: "30px", height: "2px", backgroundColor: "#c9a96e", margin: "0 auto 40px" }} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "480px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", textAlign: "center", marginBottom: "4px" }}>
          Tell Us About Your Brand
        </p>

        {/* Photo upload */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "96px", height: "96px", borderRadius: "50%", border: "1px solid rgba(201,169,110,0.3)", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            )}
          </div>
          <label style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", cursor: "pointer", border: "1px solid rgba(201,169,110,0.3)", padding: "8px 16px" }}>
            {avatarPreview ? "Change Photo" : "Upload Logo"}
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
          </label>
        </div>

        <div>
          <label style={labelStyle}>Brand Name</label>
          <input type="text" placeholder="Your brand name" value={brandName} onChange={e => setBrandName(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>What does your brand sell?</label>
          <textarea placeholder="Describe your brand and products..." value={description} onChange={e => setDescription(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "none" }} />
        </div>

        <div>
          <label style={labelStyle}>Instagram Handle</label>
          <input type="text" placeholder="@yourbrand" value={instagram} onChange={e => setInstagram(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Website</label>
          <input type="text" placeholder="yourwebsite.com" value={website} onChange={e => setWebsite(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Budget Per Deal</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {BUDGET_RANGES.map(range => (
              <button key={range.label} type="button" onClick={() => setSelectedBudget(range)} style={{ padding: "10px 18px", border: `1px solid ${selectedBudget?.label === range.label ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: selectedBudget?.label === range.label ? "rgba(201,169,110,0.12)" : "transparent", color: selectedBudget?.label === range.label ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Industry (pick all that apply)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {INDUSTRIES.map(industry => (
              <button key={industry} type="button" onClick={() => toggleIndustry(industry)} style={{ padding: "10px 18px", border: `1px solid ${selectedIndustries.includes(industry) ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: selectedIndustries.includes(industry) ? "rgba(201,169,110,0.12)" : "transparent", color: selectedIndustries.includes(industry) ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
                {industry}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", textAlign: "center" }}>{error}</p>}

        <button type="submit" disabled={!isValid || loading} style={{ backgroundColor: isValid ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: isValid ? "pointer" : "not-allowed", marginTop: "8px" }}>
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
