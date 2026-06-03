"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type CreatorProfile = {
  type: "creator";
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  niche: string[];
  platforms: string[];
  follower_count: number | null;
  rate_per_post: number | null;
  location: string | null;
};

type BrandProfile = {
  type: "brand";
  brand_name: string;
  avatar_url: string | null;
  description: string | null;
  industry: string[];
  budget_min: number | null;
  website: string | null;
};

type ViewerType = "brand" | "creator";

type PortfolioImage = {
  id: string;
  url: string;
};

function displayFollowers(min: number): string {
  if (min >= 500000) return "500K+";
  if (min >= 100000) return "100K – 500K";
  if (min >= 50000) return "50K – 100K";
  if (min >= 10000) return "10K – 50K";
  return "1K – 10K";
}

function displayRate(min: number): string {
  if (min >= 15000) return "$15,000+";
  if (min >= 5000) return "$5,000 – $15,000";
  if (min >= 1000) return "$1,000 – $5,000";
  if (min >= 500) return "$500 – $1,000";
  return "$100 – $500";
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [profileData, setProfileData] = useState<CreatorProfile | BrandProfile | null>(null);
  const [viewerType, setViewerType] = useState<ViewerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDealForm, setShowDealForm] = useState(false);
  const [dealMessage, setDealMessage] = useState("");
  const [dealBudget, setDealBudget] = useState("");
  const [sendingDeal, setSendingDeal] = useState(false);
  const [dealSent, setDealSent] = useState(false);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioImage[]>([]);
  const [showFeeInfo, setShowFeeInfo] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setViewerId(user.id);

      const { data: viewerProfile } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", user.id)
        .single();

      if (!viewerProfile) { router.push("/dashboard"); return; }
      setViewerType(viewerProfile.user_type);

      const { data: targetProfile } = await supabase
        .from("profiles")
        .select("user_type, full_name, avatar_url")
        .eq("id", profileId)
        .single();

      if (!targetProfile) { router.push("/dashboard"); return; }

      if (targetProfile.user_type === "creator") {
        const { data: cp } = await supabase
          .from("creator_profiles")
          .select("bio, niche, platforms, follower_count, rate_per_post, location")
          .eq("id", profileId)
          .single();

        setProfileData({
          type: "creator",
          full_name: targetProfile.full_name,
          avatar_url: targetProfile.avatar_url,
          bio: cp?.bio || null,
          niche: cp?.niche || [],
          platforms: cp?.platforms || [],
          follower_count: cp?.follower_count || null,
          rate_per_post: cp?.rate_per_post || null,
          location: cp?.location || null,
        });

        const { data: pics } = await supabase
          .from("portfolio_images")
          .select("id, url")
          .eq("user_id", profileId)
          .order("position", { ascending: true });

        setPortfolio(pics || []);
      } else {
        const { data: bp } = await supabase
          .from("brand_profiles")
          .select("brand_name, description, industry, budget_min, website")
          .eq("id", profileId)
          .single();

        setProfileData({
          type: "brand",
          brand_name: bp?.brand_name || "Brand",
          avatar_url: targetProfile.avatar_url,
          description: bp?.description || null,
          industry: bp?.industry || [],
          budget_min: bp?.budget_min || null,
          website: bp?.website || null,
        });
      }

      setLoading(false);
    }
    load();
  }, [profileId, router]);

  async function handleSendDeal() {
    if (!dealMessage || !viewerId) return;
    setSendingDeal(true);

    await supabase.from("deals").insert({
      brand_id: viewerType === "brand" ? viewerId : profileId,
      creator_id: viewerType === "creator" ? viewerId : profileId,
      message: dealMessage,
      budget: dealBudget || null,
      status: "pending",
      initiated_by: viewerId,
    });

    setSendingDeal(false);
    setDealSent(true);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  if (!profileData) return null;

  const name = profileData.type === "creator" ? profileData.full_name : profileData.brand_name;
  const canSendDeal = viewerType === "brand" && profileData.type === "creator";
  const canPitch = viewerType === "creator" && profileData.type === "brand";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", paddingBottom: "40px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "Arial", fontSize: "20px", lineHeight: "1", padding: "0" }}>←</button>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
      </div>

      {/* Profile hero */}
      <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: "96px", height: "96px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(201,169,110,0.3)", marginBottom: "16px", backgroundColor: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {profileData.avatar_url ? (
            <img src={profileData.avatar_url} alt={name || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "36px", fontWeight: "700" }}>{(name || "?")[0].toUpperCase()}</span>
          )}
        </div>

        <h1 style={{ fontFamily: "Arial", fontSize: "22px", fontWeight: "700", color: "white", margin: "0 0 6px" }}>{name}</h1>
        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "#c9a96e", textTransform: "uppercase", margin: "0 0 20px" }}>
          {profileData.type === "creator" ? profileData.platforms.join(" · ") : "Brand"}
        </p>

        {profileData.type === "creator" && (
          <div style={{ display: "flex", gap: "32px", marginBottom: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "700", color: "#c9a96e", margin: "0 0 4px" }}>{profileData.follower_count ? displayFollowers(profileData.follower_count) : "—"}</p>
              <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0" }}>Followers</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "700", color: "#c9a96e", margin: "0 0 4px" }}>{profileData.rate_per_post ? displayRate(profileData.rate_per_post) : "—"}</p>
              <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0" }}>Per Post</p>
            </div>
            {profileData.location && (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "700", color: "#c9a96e", margin: "0 0 4px" }}>{profileData.location}</p>
                <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0" }}>Location</p>
              </div>
            )}
          </div>
        )}

        {profileData.type === "brand" && profileData.budget_min && (
          <p style={{ fontFamily: "Arial", fontSize: "13px", color: "#c9a96e", margin: "0 0 16px" }}>{displayRate(profileData.budget_min)} per deal</p>
        )}
      </div>

      {/* Details */}
      <div style={{ padding: "32px 24px" }}>
        {(profileData.type === "creator" ? profileData.bio : profileData.description) && (
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "10px" }}>About</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: "1.8", margin: "0" }}>
              {profileData.type === "creator" ? profileData.bio : profileData.description}
            </p>
          </div>
        )}

        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "12px" }}>
            {profileData.type === "creator" ? "Niche" : "Industry"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {(profileData.type === "creator" ? profileData.niche : profileData.industry).map(tag => (
              <span key={tag} style={{ padding: "6px 14px", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e", fontFamily: "Arial", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Portfolio grid — only for creators */}
        {profileData.type === "creator" && portfolio.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "12px" }}>Their Vibe</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
              {portfolio.map(pic => (
                <div key={pic.id} style={{ aspectRatio: "1", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)" }}>
                  <img src={pic.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked contact info */}
        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", textAlign: "center", margin: "0 0 20px" }}>🔒 Contact unlocked after a deal</p>
        {/* Action button */}
        {!dealSent ? (
          !showDealForm ? (
            (canSendDeal || canPitch) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                <button
                  onClick={() => setShowDealForm(true)}
                  style={{ width: "100%", backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "18px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}
                >
                  {canSendDeal ? "Send Deal Proposal" : "Pitch Yourself"}
                </button>
                <button
                  onClick={() => setShowFeeInfo(f => !f)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", background: "none", border: "none", padding: "14px 0", marginTop: "4px", cursor: "pointer" }}
                >
                  <span style={{ color: "#c9a96e", fontSize: "12px" }}>ⓘ</span>
                  <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Pearup takes 12% commission</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", transform: showFeeInfo ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>▾</span>
                </button>
                {showFeeInfo && (
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.8", margin: "0 0 16px", textAlign: "center" }}>
                    Pearup charges a 12% platform fee on every completed deal. This is automatically deducted from the agreed budget before the creator receives payment. Both parties agree to this fee by using the platform.
                  </p>
                )}
              </div>
            )
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>
                {canSendDeal ? "Your Proposal" : "Your Pitch"}
              </p>
              <textarea
                placeholder={canSendDeal ? "Describe the collaboration — what you need, timeline, deliverables..." : "Tell them why you're the perfect fit for their brand..."}
                value={dealMessage}
                onChange={e => setDealMessage(e.target.value)}
                rows={4}
                style={{ padding: "14px 18px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", resize: "none" }}
              />
              {canSendDeal && (
                <input
                  type="text"
                  placeholder="Your budget offer e.g. $500"
                  value={dealBudget}
                  onChange={e => setDealBudget(e.target.value)}
                  style={{ padding: "14px 18px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none" }}
                />
              )}
              <div style={{ padding: "12px 16px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0", lineHeight: "1.6" }}>
                  {canSendDeal
                    ? "By sending this proposal, you agree that all deals must be completed through Pearup. A 12% platform fee applies."
                    : "FTC notice: You must disclose this as a paid partnership in your content (#ad, #sponsored, or 'Paid partnership'). All deals must stay on Pearup."}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => setShowDealForm(false)} style={{ flex: 1, background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)", padding: "14px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSendDeal} disabled={!dealMessage || sendingDeal} style={{ flex: 2, backgroundColor: dealMessage ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "14px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: dealMessage ? "pointer" : "not-allowed" }}>
                  {sendingDeal ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          )
        ) : (
          <div style={{ textAlign: "center", padding: "24px", border: "1px solid rgba(201,169,110,0.2)" }}>
            <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px" }}>Proposal Sent!</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "13px", margin: "0" }}>You'll hear back in Messages once they respond.</p>
          </div>
        )}
      </div>
    </div>
  );
}
