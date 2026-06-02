"use client";

import { useState, useEffect } from "react";
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

export default function EditBrandProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [{ data: profile }, { data: bp }] = await Promise.all([
        supabase.from("profiles").select("avatar_url").eq("id", user.id).single(),
        supabase.from("brand_profiles").select("brand_name, description, website, instagram_handle, budget_min, budget_max, industry").eq("id", user.id).single(),
      ]);

      if (profile) setAvatarPreview(profile.avatar_url || null);
      if (bp) {
        setBrandName(bp.brand_name || "");
        setDescription(bp.description || "");
        setWebsite(bp.website || "");
        setInstagram(bp.instagram_handle || "");
        setSelectedIndustries(bp.industry || []);
        const br = BUDGET_RANGES.find(r => r.min === bp.budget_min);
        if (br) setSelectedBudget(br);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError("");

    let avatarUrl = avatarPreview;
    if (avatarFile) {
      const { data } = await supabase.storage.from("avatars").upload(`${userId}/avatar`, avatarFile, { upsert: true });
      if (data) {
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(`${userId}/avatar`);
        avatarUrl = urlData.publicUrl;
      }
    }

    const [r1, r2] = await Promise.all([
      supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", userId),
      supabase.from("brand_profiles").update({
        brand_name: brandName,
        description,
        website,
        instagram_handle: instagram,
        budget_min: selectedBudget?.min || null,
        budget_max: selectedBudget?.max || null,
        industry: selectedIndustries,
      }).eq("id", userId),
    ]);

    if (r1.error || r2.error) {
      setError(r1.error?.message || r2.error?.message || "Something went wrong.");
      setSaving(false);
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", paddingBottom: "60px" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={() => router.push("/dashboard")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "20px", lineHeight: "1", padding: "0" }}>←</button>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "32px 24px", maxWidth: "480px", margin: "0 auto" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", textAlign: "center", margin: "0 0 8px" }}>Edit Your Profile</p>

        {/* Photo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "96px", height: "96px", borderRadius: "50%", border: "1px solid rgba(201,169,110,0.3)", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            )}
          </div>
          <label style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", cursor: "pointer", border: "1px solid rgba(201,169,110,0.3)", padding: "8px 16px" }}>
            Change Logo
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)); } }} style={{ display: "none" }} />
          </label>
        </div>

        <div>
          <label style={labelStyle}>Brand Name</label>
          <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>What does your brand sell?</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "none" }} />
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
            {BUDGET_RANGES.map(r => (
              <button key={r.label} type="button" onClick={() => setSelectedBudget(r)} style={{ padding: "10px 18px", border: `1px solid ${selectedBudget?.label === r.label ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: selectedBudget?.label === r.label ? "rgba(201,169,110,0.12)" : "transparent", color: selectedBudget?.label === r.label ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Industry (pick all that apply)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {INDUSTRIES.map(i => (
              <button key={i} type="button" onClick={() => setSelectedIndustries(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{ padding: "10px 18px", border: `1px solid ${selectedIndustries.includes(i) ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: selectedIndustries.includes(i) ? "rgba(201,169,110,0.12)" : "transparent", color: selectedIndustries.includes(i) ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
                {i}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", textAlign: "center" }}>{error}</p>}

        <button type="submit" disabled={saving} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "8px" }}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
