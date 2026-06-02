"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const NICHES = ["Fashion", "Beauty", "Jewelry", "Skincare", "Fitness", "Travel", "Food", "Tech", "Gadgets", "Lifestyle"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Pinterest"];
const RATE_RANGES = [
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { label: "$5,000 – $15,000", min: 5000, max: 15000 },
  { label: "$15,000+", min: 15000, max: 999999 },
];
const FOLLOWER_RANGES = [
  { label: "1K – 10K", min: 1000, max: 10000 },
  { label: "10K – 50K", min: 10000, max: 50000 },
  { label: "50K – 100K", min: 50000, max: 100000 },
  { label: "100K – 500K", min: 100000, max: 500000 },
  { label: "500K+", min: 500000, max: 99999999 },
];

export default function CreatorOnboarding() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFollowers, setSelectedFollowers] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedRate, setSelectedRate] = useState<{ label: string; min: number; max: number } | null>(null);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleNiche(niche: string) {
    setSelectedNiches(prev =>
      prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche]
    );
  }

  function togglePlatform(platform: string) {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  const isValid = fullName && bio && instagram && selectedFollowers && selectedRate && selectedNiches.length > 0 && selectedPlatforms.length > 0;

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

    await supabase.from("profiles").update({ full_name: fullName, avatar_url: avatarUrl }).eq("id", user.id);

    const { error } = await supabase.from("creator_profiles").insert({
      id: user.id,
      bio,
      instagram_handle: instagram,
      tiktok_handle: tiktok,
      location,
      follower_count: selectedFollowers!.min,
      rate_per_post: selectedRate!.min,
      niche: selectedNiches,
      platforms: selectedPlatforms,
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

  function TagButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
      <button type="button" onClick={onClick} style={{ padding: "10px 18px", border: `1px solid ${active ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: active ? "rgba(201,169,110,0.12)" : "transparent", color: active ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
      <h1 style={{ fontSize: "28px", letterSpacing: "6px", fontFamily: "Arial", fontWeight: "700", marginBottom: "8px" }}>PEARUP</h1>
      <div style={{ width: "30px", height: "2px", backgroundColor: "#c9a96e", margin: "0 auto 40px" }} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "480px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", textAlign: "center", marginBottom: "4px" }}>
          Set Up Your Creator Profile
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
            {avatarPreview ? "Change Photo" : "Upload Photo"}
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
          </label>
        </div>

        <div>
          <label style={labelStyle}>Your Name</label>
          <input type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Your Bio</label>
          <textarea placeholder="Tell brands who you are and what you create..." value={bio} onChange={e => setBio(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "none" }} />
        </div>

        <div>
          <label style={labelStyle}>Instagram Handle</label>
          <input type="text" placeholder="@yourcreator" value={instagram} onChange={e => setInstagram(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>TikTok Handle (optional)</label>
          <input type="text" placeholder="@yourtiktok" value={tiktok} onChange={e => setTiktok(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Location (optional)</label>
          <input type="text" placeholder="e.g. Miami, FL" value={location} onChange={e => setLocation(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Total Followers</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {FOLLOWER_RANGES.map(range => (
              <TagButton key={range.label} label={range.label} active={selectedFollowers?.label === range.label} onClick={() => setSelectedFollowers(range)} />
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Rate Per Post</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {RATE_RANGES.map(range => (
              <TagButton key={range.label} label={range.label} active={selectedRate?.label === range.label} onClick={() => setSelectedRate(range)} />
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Your Niche (pick all that apply)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {NICHES.map(niche => (
              <TagButton key={niche} label={niche} active={selectedNiches.includes(niche)} onClick={() => toggleNiche(niche)} />
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Platforms</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {PLATFORMS.map(platform => (
              <TagButton key={platform} label={platform} active={selectedPlatforms.includes(platform)} onClick={() => togglePlatform(platform)} />
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
