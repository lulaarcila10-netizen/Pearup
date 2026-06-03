"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const NICHES = ["Fashion", "Beauty", "Jewelry", "Skincare", "Fitness", "Travel", "Food", "Tech", "Gadgets", "Lifestyle"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Pinterest"];
const RATE_RANGES = [
  { label: "$100 – $500", min: 100 },
  { label: "$500 – $1,000", min: 500 },
  { label: "$1,000 – $5,000", min: 1000 },
  { label: "$5,000 – $15,000", min: 5000 },
  { label: "$15,000+", min: 15000 },
];
const FOLLOWER_RANGES = [
  { label: "1K – 10K", min: 1000 },
  { label: "10K – 50K", min: 10000 },
  { label: "50K – 100K", min: 50000 },
  { label: "100K – 500K", min: 100000 },
  { label: "500K+", min: 500000 },
];

export default function EditCreatorProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFollowers, setSelectedFollowers] = useState<{ label: string; min: number } | null>(null);
  const [selectedRate, setSelectedRate] = useState<{ label: string; min: number } | null>(null);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [payoutMethod, setPayoutMethod] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [{ data: profile }, { data: cp }] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).single(),
        supabase.from("creator_profiles").select("bio, instagram_handle, tiktok_handle, location, follower_count, rate_per_post, niche, platforms, payout_method").eq("id", user.id).single(),
      ]);

      if (profile) {
        setFullName(profile.full_name || "");
        setAvatarPreview(profile.avatar_url || null);
      }
      if (cp) {
        setBio(cp.bio || "");
        setInstagram(cp.instagram_handle || "");
        setTiktok(cp.tiktok_handle || "");
        setLocation(cp.location || "");
        setSelectedNiches(cp.niche || []);
        setSelectedPlatforms(cp.platforms || []);
        const fr = FOLLOWER_RANGES.find(r => r.min === cp.follower_count);
        if (fr) setSelectedFollowers(fr);
        const rr = RATE_RANGES.find(r => r.min === cp.rate_per_post);
        if (rr) setSelectedRate(rr);
        setPayoutMethod(cp.payout_method || "");
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
      supabase.from("profiles").update({ full_name: fullName, avatar_url: avatarUrl }).eq("id", userId),
      supabase.from("creator_profiles").update({
        bio,
        instagram_handle: instagram,
        tiktok_handle: tiktok,
        location,
        follower_count: selectedFollowers?.min || null,
        rate_per_post: selectedRate?.min || null,
        niche: selectedNiches,
        platforms: selectedPlatforms,
        payout_method: payoutMethod || null,
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

  function TagButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
      <button type="button" onClick={onClick} style={{ padding: "10px 18px", border: `1px solid ${active ? "#c9a96e" : "rgba(255,255,255,0.15)"}`, backgroundColor: active ? "rgba(201,169,110,0.12)" : "transparent", color: active ? "#c9a96e" : "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "12px", cursor: "pointer", letterSpacing: "1px" }}>
        {label}
      </button>
    );
  }

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
            Change Photo
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)); } }} style={{ display: "none" }} />
          </label>
        </div>

        <div>
          <label style={labelStyle}>Your Name</label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Your Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} required rows={3} style={{ ...inputStyle, resize: "none" }} />
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
            {FOLLOWER_RANGES.map(r => <TagButton key={r.label} label={r.label} active={selectedFollowers?.label === r.label} onClick={() => setSelectedFollowers(r)} />)}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Rate Per Post</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {RATE_RANGES.map(r => <TagButton key={r.label} label={r.label} active={selectedRate?.label === r.label} onClick={() => setSelectedRate(r)} />)}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Your Niche</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {NICHES.map(n => <TagButton key={n} label={n} active={selectedNiches.includes(n)} onClick={() => setSelectedNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} />)}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Platforms</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {PLATFORMS.map(p => <TagButton key={p} label={p} active={selectedPlatforms.includes(p)} onClick={() => setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])} />)}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
          <label style={labelStyle}>Payout Method <span style={{ color: "#c9a96e" }}>*</span></label>
          <input
            type="text"
            placeholder="e.g. Venmo @yourhandle  |  PayPal you@email.com  |  CashApp $tag"
            value={payoutMethod}
            onChange={e => setPayoutMethod(e.target.value)}
            style={inputStyle}
          />
          <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: "10px 0 0", lineHeight: "1.6" }}>
            🔒 Private — only visible to Pearup. Brands cannot see this. This is how we send you your payment after a deal is approved.
          </p>
        </div>

        {error && <p style={{ color: "#ff6b6b", fontFamily: "Arial", fontSize: "13px", textAlign: "center" }}>{error}</p>}

        <button type="submit" disabled={saving} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "8px" }}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
