"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  user_type: "brand" | "creator";
  full_name: string | null;
  avatar_url: string | null;
};

type Creator = {
  id: string;
  full_name: string | null;
  bio: string | null;
  niche: string[];
  platforms: string[];
  follower_count: number | null;
  rate_per_post: number | null;
  avatar_url: string | null;
};

type Brand = {
  id: string;
  brand_name: string;
  description: string | null;
  industry: string[];
  budget_min: number | null;
  budget_max: number | null;
  avatar_url: string | null;
};

type Deal = {
  id: string;
  brand_id: string;
  creator_id: string;
  message: string;
  budget: string | null;
  status: "pending" | "accepted" | "declined";
  payment_status: "unpaid" | "paid" | null;
  initiated_by: string | null;
  last_message_at: string | null;
  last_message_sender_id: string | null;
  shipping_address: string | null;
  post_link: string | null;
  content_status: "pending_review" | "approved" | "disputed" | null;
  created_at: string;
  other_id: string;
  other_name: string;
  other_avatar: string | null;
};

type ChatMessage = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  type: "text" | "offer" | "system";
  offer_amount: string | null;
  offer_details: string | null;
  offer_status: "pending" | "accepted" | null;
};

type SupportMsg = {
  id: string;
  sender_type: "user" | "admin";
  content: string;
  created_at: string;
};

type Tab = "discover" | "deals" | "messages" | "profile";

const NICHES = ["Fashion", "Beauty", "Jewelry", "Skincare", "Fitness", "Travel", "Food", "Tech", "Gadgets", "Lifestyle"];

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

function displayBudget(min: number): string {
  if (min >= 15000) return "$15,000+";
  if (min >= 5000) return "$5,000 – $15,000";
  if (min >= 1000) return "$1,000 – $5,000";
  if (min >= 500) return "$500 – $1,000";
  return "$100 – $500";
}

function Avatar({ url, name, size = 48 }: { url: string | null; name: string | null; size?: number }) {
  if (url) {
    return <img src={url} alt={name || ""} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: size * 0.35, fontWeight: "700" }}>
        {(name || "?")[0].toUpperCase()}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [activeFollower, setActiveFollower] = useState<number | null>(null);
  const [activeRate, setActiveRate] = useState<number | null>(null);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [portfolio, setPortfolio] = useState<{ id: string; url: string }[]>([]);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);
  const [brandName, setBrandName] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealsLoading, setDealsLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Deal | null>(null);
  const [dealReads, setDealReads] = useState<Record<string, string>>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [shippingInputs, setShippingInputs] = useState<Record<string, string>>({});
  const [submittingShipping, setSubmittingShipping] = useState<string | null>(null);
  const [postLinkInputs, setPostLinkInputs] = useState<Record<string, string>>({});
  const [submittingPostLink, setSubmittingPostLink] = useState<string | null>(null);
  const [hasPayoutMethod, setHasPayoutMethod] = useState<boolean | null>(null);
  const dealsLoadedRef = useRef(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const [creatorStats, setCreatorStats] = useState<{ bio: string | null; niche: string[]; follower_count: number | null; rate_per_post: number | null } | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showPortfolioInfo, setShowPortfolioInfo] = useState(false);
  const [dismissedCompletion, setDismissedCompletion] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("pearup_profile_complete") === "true";
  });
  const [supportMessages, setSupportMessages] = useState<SupportMsg[]>([]);
  const [supportInput, setSupportInput] = useState("");
  const [sendingSupport, setSendingSupport] = useState(false);
  const [supportUnread, setSupportUnread] = useState(0);
  const supportBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles")
        .select("user_type, full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!data) { router.push("/onboarding"); return; }
      if (data.user_type === "admin") { router.push("/admin"); return; }
      setProfile(data);
      setLoading(false);

      const { count } = await supabase.from("support_messages").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("sender_type", "admin").eq("read_by_user", false);
      setSupportUnread(count || 0);

      const { data: portfolioData } = await supabase
        .from("portfolio_images")
        .select("id, url")
        .eq("user_id", user.id)
        .order("position");
      if (portfolioData) setPortfolio(portfolioData);

      if (data.user_type === "brand") {
        const { data: bp } = await supabase.from("brand_profiles").select("brand_name").eq("id", user.id).single();
        if (bp) setBrandName(bp.brand_name);
      }

      setDiscoverLoading(true);
      if (data.user_type === "brand") {
        const { data: creatorData } = await supabase
          .from("creator_profiles")
          .select("id, bio, niche, platforms, follower_count, rate_per_post, profiles(full_name, avatar_url)");
        if (creatorData) {
          const formatted = creatorData.map((c: any) => ({
            id: c.id,
            full_name: c.profiles?.full_name || null,
            bio: c.bio,
            niche: c.niche || [],
            platforms: c.platforms || [],
            follower_count: c.follower_count,
            rate_per_post: c.rate_per_post,
            avatar_url: c.profiles?.avatar_url || null,
          }));
          setCreators(formatted);
          setFilteredCreators(formatted);
        }
      } else {
        const { data: brandData } = await supabase
          .from("brand_profiles")
          .select("id, brand_name, description, industry, budget_min, budget_max, profiles(avatar_url)");
        if (brandData) {
          const formatted = brandData.map((b: any) => ({
            id: b.id,
            brand_name: b.brand_name,
            description: b.description,
            industry: b.industry || [],
            budget_min: b.budget_min,
            budget_max: b.budget_max,
            avatar_url: b.profiles?.avatar_url || null,
          }));
          setBrands(formatted);
          setFilteredBrands(formatted);
        }
      }
      setDiscoverLoading(false);
    }
    loadProfile();
  }, [router]);

  // Load deals lazily when switching to Deals or Messages tab
  useEffect(() => {
    if (activeTab !== "deals" && activeTab !== "messages") return;
    if (dealsLoadedRef.current || !userId || !profile) return;
    dealsLoadedRef.current = true;

    async function fetchDeals() {
      setDealsLoading(true);
      const { data: dealData } = await supabase
        .from("deals")
        .select("id, brand_id, creator_id, message, budget, status, payment_status, initiated_by, last_message_at, last_message_sender_id, shipping_address, post_link, content_status, created_at")
        .or(`brand_id.eq.${userId},creator_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (!dealData || dealData.length === 0) {
        setDeals([]);
        setDealsLoading(false);
        return;
      }

      const isBrandUser = profile!.user_type === "brand";
      const otherIds = [...new Set(dealData.map(d => isBrandUser ? d.creator_id : d.brand_id))];
      const profileMap: Record<string, { name: string; avatar_url: string | null }> = {};

      if (isBrandUser) {
        const { data: pd } = await supabase.from("profiles").select("id, full_name, avatar_url").in("id", otherIds);
        pd?.forEach(p => { profileMap[p.id] = { name: p.full_name || "Creator", avatar_url: p.avatar_url }; });
      } else {
        const [{ data: bd }, { data: pd }] = await Promise.all([
          supabase.from("brand_profiles").select("id, brand_name").in("id", otherIds),
          supabase.from("profiles").select("id, avatar_url").in("id", otherIds),
        ]);
        const avatarMap: Record<string, string | null> = {};
        pd?.forEach(p => { avatarMap[p.id] = p.avatar_url; });
        bd?.forEach((b: any) => { profileMap[b.id] = { name: b.brand_name, avatar_url: avatarMap[b.id] || null }; });
      }

      const formatted: Deal[] = dealData.map(d => {
        const otherId = isBrandUser ? d.creator_id : d.brand_id;
        const other = profileMap[otherId] || { name: "Unknown", avatar_url: null };
        return { id: d.id, brand_id: d.brand_id, creator_id: d.creator_id, message: d.message, budget: d.budget, status: d.status, payment_status: d.payment_status, initiated_by: d.initiated_by, last_message_at: d.last_message_at, last_message_sender_id: d.last_message_sender_id, shipping_address: d.shipping_address, post_link: d.post_link, content_status: d.content_status, created_at: d.created_at, other_id: otherId, other_name: other.name, other_avatar: other.avatar_url };
      });

      setDeals(formatted);

      if (!isBrandUser) {
        const { data: cpData } = await supabase.from("creator_profiles").select("payout_method").eq("id", userId!).single();
        setHasPayoutMethod(!!(cpData?.payout_method));
      }

      const dealIds = formatted.map(d => d.id);
      if (dealIds.length > 0) {
        const { data: readsData } = await supabase.from("deal_reads").select("deal_id, last_read_at").eq("user_id", userId!).in("deal_id", dealIds);
        if (readsData) {
          const readsMap: Record<string, string> = {};
          readsData.forEach((r: any) => { readsMap[r.deal_id] = r.last_read_at; });
          setDealReads(readsMap);
        }
      }

      setDealsLoading(false);
    }
    fetchDeals();
  }, [activeTab, userId, profile]);

  // Real-time chat subscription
  useEffect(() => {
    const dealId = activeConversation?.id;
    if (!dealId) {
      if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null; }
      return;
    }

    setChatMessages([]);
    async function loadMessages() {
      const { data } = await supabase.from("messages").select("id, sender_id, content, created_at, type, offer_amount, offer_details, offer_status").eq("deal_id", dealId).order("created_at", { ascending: true });
      setChatMessages(data || []);
    }
    loadMessages();

    const channel = supabase.channel(`deal-${dealId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `deal_id=eq.${dealId}` }, payload => {
        setChatMessages(prev => [...prev, payload.new as ChatMessage]);
      })
      .subscribe();
    channelRef.current = channel;

    return () => { supabase.removeChannel(channel); channelRef.current = null; };
  }, [activeConversation?.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Load support messages, mark as read, and subscribe to new ones
  useEffect(() => {
    if (!showSupport || !userId) return;
    supabase.from("support_messages").select("id, sender_type, content, created_at").eq("user_id", userId).order("created_at", { ascending: true }).then(({ data }) => setSupportMessages(data || []));
    supabase.from("support_messages").update({ read_by_user: true }).eq("user_id", userId).eq("sender_type", "admin").eq("read_by_user", false).then(() => {});
    setSupportUnread(0);
    const ch = supabase.channel(`support-${userId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "support_messages", filter: `user_id=eq.${userId}` }, payload => {
        const msg = payload.new as SupportMsg;
        setSupportMessages(prev => [...prev, msg]);
        if (msg.sender_type === "admin") setSupportUnread(0);
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [showSupport, userId]);

  useEffect(() => {
    supportBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [supportMessages]);

  useEffect(() => {
    if (activeTab !== "profile" || !userId || profile?.user_type !== "creator" || creatorStats) return;
    supabase.from("creator_profiles").select("bio, niche, follower_count, rate_per_post").eq("id", userId).single().then(({ data }) => {
      setCreatorStats(data || { bio: null, niche: [], follower_count: null, rate_per_post: null });
    });
  }, [activeTab, userId, profile?.user_type, creatorStats]);

  useEffect(() => {
    if (!creatorStats || isBrand || dismissedCompletion) return;
    let score = 0;
    if (profile?.avatar_url) score += 25;
    if (creatorStats.bio) score += 25;
    if (creatorStats.niche?.length > 0) score += 25;
    if (creatorStats.follower_count) score += 25;
    if (score === 100) {
      localStorage.setItem("pearup_profile_complete", "true");
      setDismissedCompletion(true);
    }
  }, [creatorStats, profile?.avatar_url]);

  async function handleDealAction(dealId: string, action: "accepted" | "declined") {
    await supabase.from("deals").update({ status: action }).eq("id", dealId);
    if (action === "accepted") {
      await supabase.from("messages").insert({ deal_id: dealId, sender_id: userId, content: "Deal Sealed", type: "system" });
    }
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: action } : d));
    if (activeConversation?.id === dealId) {
      setActiveConversation(prev => prev ? { ...prev, status: action } : null);
    }
  }

  async function markDealAsRead(dealId: string) {
    if (!userId) return;
    const now = new Date().toISOString();
    await supabase.from("deal_reads").upsert({ deal_id: dealId, user_id: userId, last_read_at: now }, { onConflict: "deal_id,user_id" });
    setDealReads(prev => ({ ...prev, [dealId]: now }));
  }

  async function handleSendMessage() {
    if (!newMessage.trim() || !activeConversation || !userId || sendingMessage) return;
    setSendingMessage(true);
    const content = newMessage.trim();
    setNewMessage("");
    const now = new Date().toISOString();
    await supabase.from("messages").insert({ deal_id: activeConversation.id, sender_id: userId, content, type: "text" });
    await supabase.from("deals").update({ last_message_at: now, last_message_sender_id: userId }).eq("id", activeConversation.id);
    setDeals(prev => prev.map(d => d.id === activeConversation!.id ? { ...d, last_message_at: now, last_message_sender_id: userId } : d));
    setDealReads(prev => ({ ...prev, [activeConversation.id]: now }));
    setSendingMessage(false);
  }

  async function handleSendOffer() {
    if (!offerAmount.trim() || !activeConversation || !userId) return;
    const now = new Date().toISOString();
    await supabase.from("messages").insert({
      deal_id: activeConversation.id,
      sender_id: userId,
      content: `Offer: ${offerAmount}`,
      type: "offer",
      offer_amount: offerAmount.trim(),
      offer_details: offerDetails.trim() || null,
      offer_status: "pending",
    });
    await supabase.from("deals").update({ last_message_at: now, last_message_sender_id: userId }).eq("id", activeConversation.id);
    setDeals(prev => prev.map(d => d.id === activeConversation!.id ? { ...d, last_message_at: now, last_message_sender_id: userId } : d));
    setDealReads(prev => ({ ...prev, [activeConversation.id]: now }));
    setShowOfferForm(false);
    setOfferAmount("");
    setOfferDetails("");
  }

  async function handlePayment(deal: Deal) {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: deal.id,
          amount: deal.budget,
          creatorName: deal.other_name,
          dealDescription: deal.message.slice(0, 100),
        }),
      });
      const data = await res.json();
      if (data.error) { alert("Payment error: " + data.error); return; }
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  async function handleAcceptOffer(messageId: string, amount: string) {
    if (!activeConversation) return;
    await Promise.all([
      supabase.from("messages").update({ offer_status: "accepted" }).eq("id", messageId),
      supabase.from("deals").update({ status: "accepted", budget: amount }).eq("id", activeConversation.id),
      supabase.from("messages").insert({ deal_id: activeConversation.id, sender_id: userId, content: "Deal Sealed", type: "system" }),
    ]);
    setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, offer_status: "accepted" } : m));
    setDeals(prev => prev.map(d => d.id === activeConversation.id ? { ...d, status: "accepted", budget: amount } : d));
    setActiveConversation(prev => prev ? { ...prev, status: "accepted", budget: amount } : null);
  }

  async function handleSubmitShipping(dealId: string) {
    const address = shippingInputs[dealId]?.trim();
    if (!address) return;
    setSubmittingShipping(dealId);
    await supabase.from("deals").update({ shipping_address: address }).eq("id", dealId);
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, shipping_address: address } : d));
    setSubmittingShipping(null);
  }

  async function handleSubmitPostLink(dealId: string) {
    const link = postLinkInputs[dealId]?.trim();
    if (!link) return;
    setSubmittingPostLink(dealId);
    await supabase.from("deals").update({ post_link: link, content_status: "pending_review" }).eq("id", dealId);
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, post_link: link, content_status: "pending_review" } : d));
    setSubmittingPostLink(null);
  }

  async function handleContentReview(dealId: string, decision: "approved" | "disputed") {
    await supabase.from("deals").update({ content_status: decision }).eq("id", dealId);
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, content_status: decision } : d));
  }

  function applyCreatorFilters(niche: string | null, platform: string | null, follower: number | null, rate: number | null) {
    let result = creators;
    if (niche) result = result.filter(c => c.niche.includes(niche));
    if (platform) result = result.filter(c => c.platforms.includes(platform));
    if (follower) result = result.filter(c => c.follower_count === follower);
    if (rate) result = result.filter(c => c.rate_per_post === rate);
    setFilteredCreators(result);
  }

  function filterByNiche(niche: string | null) {
    setActiveFilter(niche);
    if (profile?.user_type === "brand") {
      applyCreatorFilters(niche, activePlatform, activeFollower, activeRate);
    } else {
      setFilteredBrands(niche ? brands.filter(b => b.industry.includes(niche)) : brands);
    }
  }

  function filterByPlatform(platform: string | null) {
    setActivePlatform(platform);
    applyCreatorFilters(activeFilter, platform, activeFollower, activeRate);
  }

  function filterByFollower(follower: number | null) {
    setActiveFollower(follower);
    applyCreatorFilters(activeFilter, activePlatform, follower, activeRate);
  }

  function filterByRate(rate: number | null) {
    setActiveRate(rate);
    applyCreatorFilters(activeFilter, activePlatform, activeFollower, rate);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleSendSupport() {
    if (!supportInput.trim() || !userId || sendingSupport) return;
    setSendingSupport(true);
    const content = supportInput.trim();
    setSupportInput("");
    await supabase.from("support_messages").insert({ user_id: userId, sender_type: "user", content });
    fetch("/api/support-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: profile?.full_name || "A user", userType: profile?.user_type || "user", message: content }),
    }).catch(() => {});
    setSendingSupport(false);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setAvatarFile(file); setAvatarPreview(URL.createObjectURL(file)); }
  }

  async function handlePortfolioUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!userId || files.length === 0) return;
    if (portfolio.length + files.length > 9) { alert("Maximum 9 photos allowed."); return; }
    setUploadingPortfolio(true);
    for (let i = 0; i < files.length; i++) {
      const path = `${userId}/${Date.now()}-${i}`;
      const { data } = await supabase.storage.from("portfolio").upload(path, files[i]);
      if (data) {
        const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(path);
        const { data: inserted } = await supabase.from("portfolio_images").insert({ user_id: userId, url: urlData.publicUrl, position: portfolio.length + i }).select().single();
        if (inserted) setPortfolio(prev => [...prev, { id: inserted.id, url: inserted.url }]);
      }
    }
    setUploadingPortfolio(false);
  }

  async function handleDeletePortfolioImage(id: string) {
    await supabase.from("portfolio_images").delete().eq("id", id);
    setPortfolio(prev => prev.filter(p => p.id !== id));
  }

  async function handlePhotoUpload() {
    if (!avatarFile || !userId) return;
    setUploadingPhoto(true);
    const { data } = await supabase.storage.from("avatars").upload(`${userId}/avatar`, avatarFile, { upsert: true });
    if (data) {
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(`${userId}/avatar`);
      await supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", userId);
      setProfile(prev => prev ? { ...prev, avatar_url: urlData.publicUrl } : prev);
    }
    setUploadingPhoto(false);
    setAvatarFile(null);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  const isBrand = profile?.user_type === "brand";

  function NavIcon({ tab, label, badge }: { tab: Tab; label: string; badge?: number }) {
    const active = activeTab === tab;
    const color = active ? "#c9a96e" : "rgba(255,255,255,0.72)";
    const icons: Record<Tab, React.ReactElement> = {
      discover: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5"><circle cx="10" cy="10" r="8" /><circle cx="10" cy="10" r="2" /></svg>),
      deals: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="3" width="14" height="14" rx="1" /><line x1="7" y1="8" x2="13" y2="8" /><line x1="7" y1="12" x2="11" y2="12" /></svg>),
      messages: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5"><path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6l-4 3V5a1 1 0 0 1 1-1z" /></svg>),
      profile: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5"><circle cx="10" cy="7" r="3" /><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>),
    };
    return (
      <button onClick={() => setActiveTab(tab)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "12px 0" }}>
        <div style={{ position: "relative" }}>
          {icons[tab]}
          {badge && badge > 0 ? (
            <div style={{ position: "absolute", top: "-5px", right: "-7px", minWidth: "16px", height: "16px", borderRadius: "8px", backgroundColor: "#ff4444", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
              <span style={{ fontFamily: "Arial", fontSize: "9px", fontWeight: "700", color: "white" }}>{badge > 9 ? "9+" : badge}</span>
            </div>
          ) : null}
        </div>
        <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color }}>{label}</span>
      </button>
    );
  }

  function parseProposal(message: string) {
    const lines = message.split("\n");
    const fields: { key: string; value: string }[] = [];
    for (const line of lines) {
      const idx = line.indexOf(": ");
      if (idx > -1) fields.push({ key: line.slice(0, idx), value: line.slice(idx + 2) });
    }
    return fields.length >= 3 ? fields : null;
  }

  function titleCase(str: string) {
    return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }

  function ProposalCard({ message }: { message: string }) {
    const fields = parseProposal(message);
    if (!fields) {
      return <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", margin: "0", lineHeight: "1.7" }}>"{message}"</p>;
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", textAlign: "left" }}>
        {fields.map(({ key, value }) => (
          <div key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "14px" }}>
            <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(201,169,110,0.6)", textTransform: "uppercase", margin: "0 0 5px" }}>{titleCase(key)}</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: "0", lineHeight: "1.6" }}>{value}</p>
          </div>
        ))}
      </div>
    );
  }

  function DealMessagePreview({ message }: { message: string }) {
    const fields = parseProposal(message);
    if (!fields) {
      return <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7", margin: "0 0 16px" }}>"{message.length > 100 ? message.slice(0, 100) + "…" : message}"</p>;
    }
    const overview = fields.find(f => f.key === "PROPOSAL")?.value || "";
    const budget = fields.find(f => f.key === "BUDGET")?.value || "";
    const platform = fields.find(f => f.key === "PLATFORM")?.value || "";
    const format = fields.find(f => f.key === "FORMAT")?.value || "";
    return (
      <div style={{ marginBottom: "16px", padding: "14px", backgroundColor: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.12)" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: overview ? "10px" : "0", flexWrap: "wrap" }}>
          {budget && <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)", padding: "3px 8px", textTransform: "uppercase" }}>{budget}</span>}
          {platform && <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px", textTransform: "uppercase" }}>{platform}</span>}
          {format && <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px", textTransform: "uppercase" }}>{format}</span>}
        </div>
        {overview && <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", margin: "0", lineHeight: "1.6" }}>{overview.length > 100 ? overview.slice(0, 100) + "…" : overview}</p>}
      </div>
    );
  }

  const filterStyle = (active: boolean) => ({
    padding: "7px 14px",
    border: `1px solid ${active ? "#c9a96e" : "rgba(255,255,255,0.12)"}`,
    backgroundColor: active ? "rgba(201,169,110,0.12)" : "transparent",
    color: active ? "#c9a96e" : "rgba(255,255,255,0.65)",
    fontFamily: "Arial",
    fontSize: "10px",
    letterSpacing: "1px",
    cursor: "pointer",
    textTransform: "uppercase" as const,
  });

  function DiscoverTab() {
    return (
      <div style={{ padding: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "8px" }}>Discover</p>
        <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "24px" }}>
          {"The easiest way to collab, get paid, and grow."}
        </p>
        {/* Filters */}
        {isBrand ? (
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px", overflowX: "auto" }}>
            {[
              { label: "Niche", value: activeFilter || "", onChange: (v: string) => filterByNiche(v || null), options: NICHES },
              { label: "Platform", value: activePlatform || "", onChange: (v: string) => filterByPlatform(v || null), options: ["Instagram", "TikTok", "YouTube", "Pinterest"] },
              { label: "Followers", value: activeFollower?.toString() || "", onChange: (v: string) => filterByFollower(v ? Number(v) : null), options: [{ label: "1K – 10K", value: "1000" }, { label: "10K – 50K", value: "10000" }, { label: "50K – 100K", value: "50000" }, { label: "100K – 500K", value: "100000" }, { label: "500K+", value: "500000" }] },
              { label: "Rate / Post", value: activeRate?.toString() || "", onChange: (v: string) => filterByRate(v ? Number(v) : null), options: [{ label: "$100 – $500", value: "100" }, { label: "$500 – $1K", value: "500" }, { label: "$1K – $5K", value: "1000" }, { label: "$5K – $15K", value: "5000" }, { label: "$15K+", value: "15000" }] },
            ].map(({ label, value, onChange, options }) => (
              <select
                key={label}
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ padding: "7px 8px", backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${value ? "#c9a96e" : "rgba(201,169,110,0.35)"}`, color: "#c9a96e", fontFamily: "Arial", fontSize: "10px", outline: "none", cursor: "pointer", borderRadius: "0", appearance: "none" as const, WebkitAppearance: "none" as const, MozAppearance: "none" as const }}
              >
                <option value="" style={{ backgroundColor: "#0a0a0a" }}>{label}</option>
                {options.map((o: any) => typeof o === "string"
                  ? <option key={o} value={o} style={{ backgroundColor: "#0a0a0a" }}>{o}</option>
                  : <option key={o.value} value={o.value} style={{ backgroundColor: "#0a0a0a" }}>{o.label}</option>
                )}
              </select>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
            <button onClick={() => filterByNiche(null)} style={filterStyle(!activeFilter)}>All</button>
            {NICHES.map(n => <button key={n} onClick={() => filterByNiche(n)} style={filterStyle(activeFilter === n)}>{n}</button>)}
          </div>
        )}
        {discoverLoading ? (
          <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textAlign: "center", padding: "40px 0" }}>Loading...</p>
        ) : isBrand ? (
          filteredCreators.length === 0 ? (
            <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "48px 24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif", fontSize: "15px", lineHeight: "1.8" }}>No creators found yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredCreators.map(creator => (
                <div key={creator.id} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "24px", backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <Avatar url={creator.avatar_url} name={creator.full_name} size={48} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <p style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: "600", color: "white", margin: "0 0 3px" }}>{creator.full_name || "Creator"}</p>
                          <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", margin: "0" }}>{creator.platforms.join(" · ")}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontFamily: "Arial", fontSize: "11px", color: "#c9a96e", margin: "0 0 2px" }}>{creator.follower_count ? displayFollowers(creator.follower_count) : "—"} followers</p>
                          <p style={{ fontFamily: "Arial", fontSize: "11px", color: "rgba(255,255,255,0.65)", margin: "0" }}>{creator.rate_per_post ? displayRate(creator.rate_per_post) : "—"} / post</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {creator.bio && <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7", margin: "0 0 14px" }}>{creator.bio}</p>}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {creator.niche.map(n => (<span key={n} style={{ padding: "4px 10px", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>{n}</span>))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: "Arial", fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: "0" }}>🔒 Contact unlocked after deal</p>
                    <button onClick={() => router.push(`/profile/${creator.id}`)} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "10px 20px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          filteredBrands.length === 0 ? (
            <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "12px" }}>Brands are on their way</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px" }}>We'll notify you as soon as a brand matching your niche joins Pearup.</p>
              <button onClick={() => router.push("/edit-profile/creator")} style={{ background: "none", border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer" }}>Update My Niche Preferences</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filteredBrands.map(brand => (
                <div key={brand.id} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "24px", backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <Avatar url={brand.avatar_url} name={brand.brand_name} size={48} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: "600", color: "white", margin: "0" }}>{brand.brand_name}</p>
                        <p style={{ fontFamily: "Arial", fontSize: "11px", color: "#c9a96e", margin: "0" }}>{brand.budget_min ? displayBudget(brand.budget_min) : "—"} / deal</p>
                      </div>
                    </div>
                  </div>
                  {brand.description && <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7", margin: "0 0 14px" }}>{brand.description}</p>}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {brand.industry.map(i => (<span key={i} style={{ padding: "4px 10px", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>{i}</span>))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: "Arial", fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: "0" }}>🔒 Contact unlocked after deal</p>
                    <button onClick={() => router.push(`/profile/${brand.id}`)} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "10px 20px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  }

  function DealsTab() {
    const statusColor = (s: string) => s === "accepted" ? "#4ade80" : s === "declined" ? "rgba(255,100,100,0.7)" : "#c9a96e";

    return (
      <div style={{ padding: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "8px" }}>Deals</p>
        <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "24px" }}>
          Your proposals & partnerships.
        </p>

        <button
          onClick={() => setShowPaymentInfo(p => !p)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 0 12px", marginBottom: "24px", cursor: "pointer" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#c9a96e", fontSize: "12px" }}>ⓘ</span>
            <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>How payment works</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", transform: showPaymentInfo ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>▾</span>
        </button>

        {showPaymentInfo && (
          <div style={{ marginTop: "-16px", marginBottom: "24px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { step: "01", text: "Brand pays the agreed amount through Pearup. Funds are held — creator receives nothing yet." },
              { step: "02", text: "Creator delivers the content and submits the post link inside the deal." },
              { step: "03", text: "Brand has 48 hours to dispute. No dispute = payment releases automatically." },
              { step: "04", text: "Pearup deducts its 12% fee. The remaining balance is sent to the creator within 3–5 business days." },
            ].map(({ step, text }) => (
              <div key={step} style={{ display: "flex", gap: "16px", marginBottom: "14px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", flexShrink: 0, paddingTop: "3px" }}>{step}</span>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", margin: "0" }}>{text}</p>
              </div>
            ))}
          </div>
        )}

        {dealsLoading ? (
          <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textAlign: "center", padding: "40px 0" }}>Loading...</p>
        ) : deals.length === 0 ? (
          <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif", fontSize: "15px", lineHeight: "1.8", marginBottom: "24px" }}>
              {isBrand ? "Send a deal proposal to a creator to get started." : "No deals yet — find a brand you love and pitch yourself."}
            </p>
            {!isBrand && (
              <button onClick={() => setActiveTab("discover")} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", padding: "12px 24px", border: "none", cursor: "pointer" }}>Browse Brands</button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {deals.map(deal => (
              <div key={deal.id} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <Avatar url={deal.other_avatar} name={deal.other_name} size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: "600", color: "white", margin: "0 0 4px" }}>{deal.other_name}</p>
                      <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: statusColor(deal.status), border: `1px solid ${statusColor(deal.status)}`, padding: "3px 8px" }}>
                        {deal.status}
                      </span>
                    </div>
                    {deal.budget && <p style={{ fontFamily: "Arial", fontSize: "11px", color: "#c9a96e", margin: "0" }}>{deal.budget}</p>}
                  </div>
                </div>

                <DealMessagePreview message={deal.message} />

                {deal.status === "pending" && deal.initiated_by !== null && deal.initiated_by !== userId && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                      onClick={() => { setActiveConversation(deal); setActiveTab("messages"); }}
                      style={{ width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.72)", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      Ask Questions First →
                    </button>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => handleDealAction(deal.id, "declined")} style={{ flex: 1, background: "none", border: "1px solid rgba(255,100,100,0.3)", color: "rgba(255,100,100,0.7)", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>
                        Decline
                      </button>
                      <button onClick={() => handleDealAction(deal.id, "accepted")} style={{ flex: 2, backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}>
                        Accept
                      </button>
                    </div>
                  </div>
                )}
                {deal.status === "pending" && deal.initiated_by === userId && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", margin: "0" }}>Awaiting response</p>
                  </div>
                )}

                {deal.status === "accepted" && !isBrand && (
                  <div style={{ padding: "10px 14px", backgroundColor: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.15)" }}>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: "0", lineHeight: "1.6" }}>
                      FTC reminder: You must disclose this as a paid partnership in your content (e.g. #ad, #sponsored, or "Paid partnership with [Brand]").
                    </p>
                  </div>
                )}
                {deal.status === "accepted" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {isBrand && deal.payment_status !== "paid" && deal.budget && (
                      <button
                        onClick={() => handlePayment(deal)}
                        style={{ width: "100%", backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "14px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}
                      >
                        Complete Payment · {deal.budget}
                      </button>
                    )}
                    {deal.payment_status === "paid" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", border: "1px solid rgba(74,222,128,0.3)", backgroundColor: "rgba(74,222,128,0.05)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0" }}>Payment Received</p>
                      </div>
                    )}

                    {deal.payment_status === "paid" && !isBrand && hasPayoutMethod === false && (
                      <div style={{ border: "1px solid rgba(255,149,0,0.4)", backgroundColor: "rgba(255,149,0,0.05)", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#ff9500", textTransform: "uppercase", margin: "0" }}>⚠ Add Your Payout Method</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0", lineHeight: "1.6" }}>So Pearup knows where to send your money once the brand approves your post. Takes 10 seconds.</p>
                        <button
                          onClick={() => router.push("/edit-profile/creator")}
                          style={{ backgroundColor: "#ff9500", color: "#0a0a0a", padding: "10px 20px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", alignSelf: "flex-start" }}
                        >Add Payout Method →</button>
                      </div>
                    )}

                    {/* Shipping address — creator submits, brand sees */}
                    {deal.payment_status === "paid" && !isBrand && !deal.shipping_address && (
                      <div style={{ border: "1px solid rgba(201,169,110,0.2)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>📦 Submit Your Shipping Address</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", margin: "0" }}>So the brand can send you the product.</p>
                        <textarea
                          placeholder={"Jane Doe\n123 Main St\nMiami, FL 33101"}
                          value={shippingInputs[deal.id] || ""}
                          onChange={e => setShippingInputs(prev => ({ ...prev, [deal.id]: e.target.value }))}
                          rows={3}
                          style={{ padding: "12px 14px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", resize: "none" }}
                        />
                        <button
                          onClick={() => handleSubmitShipping(deal.id)}
                          disabled={!shippingInputs[deal.id]?.trim() || submittingShipping === deal.id}
                          style={{ backgroundColor: shippingInputs[deal.id]?.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: shippingInputs[deal.id]?.trim() ? "pointer" : "not-allowed" }}
                        >
                          {submittingShipping === deal.id ? "Submitting..." : "Submit Address"}
                        </button>
                      </div>
                    )}
                    {deal.payment_status === "paid" && !isBrand && deal.shipping_address && (
                      <div style={{ border: "1px solid rgba(74,222,128,0.2)", padding: "14px", backgroundColor: "rgba(74,222,128,0.04)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0 0 6px" }}>✓ Address Submitted</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.72)", margin: "0", whiteSpace: "pre-line" }}>{deal.shipping_address}</p>
                      </div>
                    )}
                    {deal.payment_status === "paid" && isBrand && deal.shipping_address && (
                      <div style={{ border: "1px solid rgba(201,169,110,0.2)", padding: "14px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0 0 8px" }}>📦 Ship Product To</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.75)", margin: "0", lineHeight: "1.7", whiteSpace: "pre-line" }}>{deal.shipping_address}</p>
                      </div>
                    )}
                    {/* Post link — creator submits, brand sees */}
                    {deal.payment_status === "paid" && !isBrand && !deal.post_link && (
                      <div style={{ border: "1px solid rgba(201,169,110,0.2)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Step 2 — Submit Your Post Link</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: "0", lineHeight: "1.6" }}>Once your content is live, paste the link here. The brand will have 48 hours to review before your payment is released.</p>
                        <input
                          type="url"
                          placeholder="https://www.tiktok.com/@you/video/..."
                          value={postLinkInputs[deal.id] || ""}
                          onChange={e => setPostLinkInputs(prev => ({ ...prev, [deal.id]: e.target.value }))}
                          style={{ padding: "12px 14px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", width: "100%" }}
                        />
                        <button
                          onClick={() => handleSubmitPostLink(deal.id)}
                          disabled={!postLinkInputs[deal.id]?.trim() || submittingPostLink === deal.id}
                          style={{ backgroundColor: postLinkInputs[deal.id]?.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: postLinkInputs[deal.id]?.trim() ? "pointer" : "not-allowed" }}
                        >
                          {submittingPostLink === deal.id ? "Submitting..." : "Submit Post Link"}
                        </button>
                      </div>
                    )}
                    {deal.payment_status === "paid" && !isBrand && deal.post_link && deal.content_status === "pending_review" && (
                      <div style={{ border: "1px solid rgba(74,222,128,0.2)", padding: "14px", backgroundColor: "rgba(74,222,128,0.04)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0 0 6px" }}>✓ Post Submitted — Awaiting Brand Review</p>
                        <a href={deal.post_link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "#c9a96e", wordBreak: "break-all" }}>{deal.post_link}</a>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "8px 0 0", lineHeight: "1.6" }}>You can still message the brand if they need any adjustments.</p>
                      </div>
                    )}
                    {deal.payment_status === "paid" && !isBrand && deal.content_status === "approved" && (
                      <div style={{ border: "1px solid rgba(74,222,128,0.3)", padding: "14px", backgroundColor: "rgba(74,222,128,0.06)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0 0 4px" }}>✓ Content Approved</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: "0" }}>Your payment is being processed and will arrive within 3–5 business days.</p>
                      </div>
                    )}
                    {deal.payment_status === "paid" && !isBrand && deal.content_status === "disputed" && (
                      <div style={{ border: "1px solid rgba(255,100,100,0.3)", padding: "14px", backgroundColor: "rgba(255,100,100,0.04)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,100,100,0.8)", textTransform: "uppercase", margin: "0 0 4px" }}>Brand Opened a Dispute</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: "0", lineHeight: "1.6" }}>Message the brand to resolve it, or contact Pearup support. If you repost, submit a new link below.</p>
                        <label style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", display: "block", marginTop: "12px", marginBottom: "6px" }}>Resubmit Post Link</label>
                        <input
                          type="url"
                          placeholder="https://www.tiktok.com/@you/video/..."
                          value={postLinkInputs[deal.id] || ""}
                          onChange={e => setPostLinkInputs(prev => ({ ...prev, [deal.id]: e.target.value }))}
                          style={{ padding: "10px 12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "13px", fontFamily: "Georgia, serif", outline: "none", width: "100%", marginBottom: "8px" }}
                        />
                        <button
                          onClick={() => handleSubmitPostLink(deal.id)}
                          disabled={!postLinkInputs[deal.id]?.trim() || submittingPostLink === deal.id}
                          style={{ backgroundColor: postLinkInputs[deal.id]?.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "10px 20px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: postLinkInputs[deal.id]?.trim() ? "pointer" : "not-allowed" }}
                        >
                          {submittingPostLink === deal.id ? "Submitting..." : "Resubmit"}
                        </button>
                      </div>
                    )}
                    {deal.payment_status === "paid" && isBrand && deal.post_link && deal.content_status === "pending_review" && (
                      <div style={{ border: "1px solid rgba(201,169,110,0.3)", padding: "16px", backgroundColor: "rgba(201,169,110,0.04)", display: "flex", flexDirection: "column", gap: "12px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Content Delivered — Review Now</p>
                        <a href={deal.post_link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "white", wordBreak: "break-all" }}>{deal.post_link}</a>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0", lineHeight: "1.6" }}>Need adjustments? Message the creator first. If content doesn't match the deal at all, open a dispute.</p>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleContentReview(deal.id, "disputed")}
                            style={{ flex: 1, background: "none", border: "1px solid rgba(255,100,100,0.3)", color: "rgba(255,100,100,0.8)", padding: "12px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                          >Dispute</button>
                          <button
                            onClick={() => handleContentReview(deal.id, "approved")}
                            style={{ flex: 2, backgroundColor: "#4ade80", color: "#0a0a0a", padding: "12px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}
                          >Approve & Release Payment</button>
                        </div>
                      </div>
                    )}
                    {deal.payment_status === "paid" && isBrand && deal.content_status === "approved" && (
                      <div style={{ border: "1px solid rgba(74,222,128,0.2)", padding: "12px 14px", backgroundColor: "rgba(74,222,128,0.04)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0" }}>✓ You Approved This Content</p>
                      </div>
                    )}
                    {deal.payment_status === "paid" && isBrand && deal.content_status === "disputed" && (
                      <div style={{ border: "1px solid rgba(255,100,100,0.2)", padding: "12px 14px", backgroundColor: "rgba(255,100,100,0.04)" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,100,100,0.8)", textTransform: "uppercase", margin: "0 0 4px" }}>Dispute Open</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: "0" }}>Pearup has been notified. You can also message the creator directly to resolve it.</p>
                      </div>
                    )}
                    {deal.payment_status === "paid" && isBrand && !deal.post_link && (
                      <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "12px 14px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: "0" }}>Waiting for creator to submit their post…</p>
                      </div>
                    )}

                    {deal.payment_status === "paid" && isBrand && !deal.shipping_address && (
                      <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "12px 14px" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", margin: "0" }}>Waiting for creator's shipping address…</p>
                      </div>
                    )}

                    <button
                      onClick={() => { setActiveConversation(deal); setActiveTab("messages"); }}
                      style={{ width: "100%", backgroundColor: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", padding: "12px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      Open Chat →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function MessagesTab() {
    const conversationDeals = deals.filter(d => d.status !== "declined");

    if (activeConversation) {
      const isPending = activeConversation.status === "pending";
      return (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
          {/* Header */}
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${activeConversation.status === "accepted" ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.08)"}`, backgroundColor: activeConversation.status === "accepted" ? "rgba(74,222,128,0.04)" : "transparent", display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setActiveConversation(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer", fontSize: "20px", padding: "0", lineHeight: "1" }}>←</button>
            <Avatar url={activeConversation.other_avatar} name={activeConversation.other_name} size={36} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: "600", color: "white", margin: "0 0 2px" }}>{activeConversation.other_name}</p>
              {isPending && <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Deal Pending</p>}
              {activeConversation.status === "accepted" && <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0" }}>✓ Deal Sealed</p>}
            </div>
          </div>

          {/* Accept / Decline when pending — only for recipient */}
          {isPending && activeConversation.initiated_by !== null && activeConversation.initiated_by !== userId && (
            <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
              <p style={{ fontFamily: "Arial", fontSize: "9px", color: "rgba(255,255,255,0.72)", letterSpacing: "1px", textTransform: "uppercase", margin: "0", marginRight: "4px" }}>Deal pending</p>
              <button onClick={() => handleDealAction(activeConversation.id, "declined")} style={{ background: "none", border: "1px solid rgba(255,100,100,0.3)", color: "rgba(255,100,100,0.6)", padding: "5px 12px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>Decline</button>
              <button onClick={() => handleDealAction(activeConversation.id, "accepted")} style={{ backgroundColor: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", padding: "5px 12px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "700", cursor: "pointer" }}>Accept</button>
            </div>
          )}
          {isPending && (activeConversation.initiated_by === userId || activeConversation.initiated_by === null) && (
            <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily: "Arial", fontSize: "9px", color: "rgba(255,255,255,0.45)", letterSpacing: "1px", textTransform: "uppercase", margin: "0", textAlign: "center" }}>Awaiting their response</p>
            </div>
          )}

          {/* Messages list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Original proposal */}
            <div style={{ alignSelf: "stretch", marginBottom: "8px", padding: "20px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>Original Proposal</p>
              <ProposalCard message={activeConversation.message} />
            </div>

            {chatMessages.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Georgia, serif", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>No messages yet. Say hello!</p>
            )}

            {chatMessages.map(msg => {
              const isMe = msg.sender_id === userId;
              if (msg.type === "system") {
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", border: "1px solid rgba(74,222,128,0.4)", backgroundColor: "rgba(74,222,128,0.08)", borderRadius: "20px" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "#4ade80", textTransform: "uppercase", margin: "0" }}>Deal Sealed</p>
                    </div>
                  </div>
                );
              }
              if (msg.type === "offer") {
                const isAccepted = msg.offer_status === "accepted";
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "78%", border: `1px solid ${isAccepted ? "rgba(74,222,128,0.4)" : "rgba(201,169,110,0.5)"}`, padding: "16px", backgroundColor: isAccepted ? "rgba(74,222,128,0.05)" : "rgba(201,169,110,0.06)" }}>
                      <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: isAccepted ? "#4ade80" : "#c9a96e", margin: "0 0 8px" }}>
                        {isAccepted ? "✓ Deal Locked" : "Formal Offer"}
                      </p>
                      <p style={{ fontFamily: "Arial", fontSize: "22px", fontWeight: "700", color: "white", margin: "0 0 4px" }}>{msg.offer_amount}</p>
                      {msg.offer_details && <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: "1.5" }}>{msg.offer_details}</p>}
                      {isAccepted ? (
                        <p style={{ fontFamily: "Arial", fontSize: "10px", color: "#4ade80", letterSpacing: "1px", margin: "0" }}>Both parties agreed</p>
                      ) : !isMe ? (
                        <button onClick={() => handleAcceptOffer(msg.id, msg.offer_amount!)} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "10px 20px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "4px" }}>
                          Accept This Offer
                        </button>
                      ) : (
                        <p style={{ fontFamily: "Arial", fontSize: "10px", color: "rgba(255,255,255,0.75)", letterSpacing: "1px", margin: "0" }}>Waiting for response…</p>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "75%", padding: "10px 14px", backgroundColor: isMe ? "#c9a96e" : "rgba(255,255,255,0.07)", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: isMe ? "#0a0a0a" : "rgba(255,255,255,0.85)", margin: "0", lineHeight: "1.5" }}>{msg.content}</p>
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Offer form */}
          {showOfferForm && (
            <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(201,169,110,0.2)", backgroundColor: "rgba(201,169,110,0.04)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0" }}>Send a Formal Offer</p>
              <input
                type="text"
                placeholder="Amount (e.g. $550)"
                value={offerAmount}
                onChange={e => setOfferAmount(e.target.value)}
                style={{ padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none" }}
              />
              <input
                type="text"
                placeholder="Deliverables (e.g. 1 Instagram Reel, posted within 2 weeks)"
                value={offerDetails}
                onChange={e => setOfferDetails(e.target.value)}
                style={{ padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none" }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => { setShowOfferForm(false); setOfferAmount(""); setOfferDetails(""); }} style={{ flex: 1, background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", padding: "10px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSendOffer} disabled={!offerAmount.trim()} style={{ flex: 2, backgroundColor: offerAmount.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "10px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: offerAmount.trim() ? "pointer" : "not-allowed" }}>Send Offer</button>
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <button
              onClick={() => setShowOfferForm(f => !f)}
              style={{ background: "none", border: "1px solid rgba(201,169,110,0.35)", color: "#c9a96e", padding: "12px 12px", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", flexShrink: 0 }}
            >
              + Offer
            </button>
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              placeholder="Type a message..."
              rows={1}
              style={{ flex: 1, padding: "12px 14px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", resize: "none", borderRadius: "8px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sendingMessage}
              style={{ backgroundColor: newMessage.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "12px 18px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: newMessage.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}
            >
              Send
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "8px" }}>Messages</p>
        <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "24px" }}>Your active chats.</p>

        {dealsLoading ? (
          <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textAlign: "center", padding: "40px 0" }}>Loading...</p>
        ) : conversationDeals.length === 0 ? (
          <div style={{ border: "1px solid rgba(201,169,110,0.15)", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Georgia, serif", fontSize: "15px", lineHeight: "1.8" }}>No conversations yet. Send or receive a deal proposal to start messaging.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {conversationDeals.map(deal => {
              const isUnread = !!(deal.last_message_at && deal.last_message_sender_id !== userId && (!dealReads[deal.id] || new Date(deal.last_message_at) > new Date(dealReads[deal.id])));
              return (
                <button
                  key={deal.id}
                  onClick={() => { setActiveConversation(deal); markDealAsRead(deal.id); }}
                  style={{ display: "flex", gap: "14px", alignItems: "center", padding: "16px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", textAlign: "left", width: "100%" }}
                >
                  <div style={{ position: "relative" }}>
                    <Avatar url={deal.other_avatar} name={deal.other_name} size={48} />
                    {isUnread && <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff4444", border: "2px solid #0a0a0a" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <p style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: isUnread ? "700" : "600", color: "white", margin: "0" }}>{deal.other_name}</p>
                      {deal.status === "pending" && <span style={{ fontFamily: "Arial", fontSize: "8px", letterSpacing: "1px", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.4)", padding: "2px 6px", textTransform: "uppercase" }}>Pending</span>}
                    </div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: isUnread ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.6)", margin: "0", fontWeight: isUnread ? "600" : "400" }}>
                      {deal.message.length > 55 ? deal.message.slice(0, 55) + "…" : deal.message}
                    </p>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.72)", fontSize: "20px", flexShrink: 0 }}>›</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function ProfileTab() {
    return (
      <div style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "24px" }}>Profile</p>

        <div style={{ position: "relative", width: "96px", height: "96px", marginBottom: "16px" }}>
          <div style={{ width: "96px", height: "96px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(201,169,110,0.3)" }}>
            {avatarPreview || profile?.avatar_url ? (
              <img src={avatarPreview || profile?.avatar_url || ""} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "32px", fontWeight: "700" }}>{(profile?.full_name || "?")[0].toUpperCase()}</span>
              </div>
            )}
          </div>
          <label style={{ position: "absolute", bottom: "2px", right: "2px", width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#c9a96e", border: "2px solid #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M9 2h6l1.5 2H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1.5L9 2z"/></svg>
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
          </label>
        </div>

        {avatarFile && (
          <button onClick={handlePhotoUpload} disabled={uploadingPhoto} style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "10px 24px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer", marginBottom: "16px" }}>
            {uploadingPhoto ? "Saving..." : "Save Photo"}
          </button>
        )}

        <p style={{ fontFamily: "Arial", fontSize: "18px", fontWeight: "600", color: "white", margin: "8px 0 4px", textAlign: "center" }}>{isBrand ? (brandName || "—") : (profile?.full_name || "—")}</p>
        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", margin: "0 0 12px", textAlign: "center" }}>{isBrand ? "Brand" : "Creator"}</p>
        <button onClick={() => router.push(isBrand ? "/edit-profile/brand" : "/edit-profile/creator")} style={{ background: "none", border: "none", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", cursor: "pointer", marginBottom: "24px", textDecoration: "underline" }}>
          Edit Profile
        </button>

        {!isBrand && creatorStats && (
          <div style={{ width: "100%", marginBottom: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "700", color: "#c9a96e", margin: "0 0 4px" }}>{creatorStats.follower_count ? displayFollowers(creatorStats.follower_count) : "—"}</p>
                <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0" }}>Followers</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "700", color: "#c9a96e", margin: "0 0 4px" }}>{creatorStats.rate_per_post ? displayRate(creatorStats.rate_per_post) : "—"}</p>
                <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0" }}>Per Post</p>
              </div>
            </div>
            {creatorStats.niche?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                {creatorStats.niche.map((n: string) => (
                  <span key={n} style={{ padding: "5px 12px", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>{n}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {!isBrand && creatorStats !== null && !dismissedCompletion && (() => {
          let score = 0;
          if (profile?.avatar_url) score += 25;
          if (creatorStats.bio) score += 25;
          if (creatorStats.niche?.length > 0) score += 25;
          if (creatorStats.follower_count) score += 25;
          return (
            <div style={{ width: "100%", marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "3px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: "0" }}>Profile Completion</p>
                <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: score === 100 ? "#4ade80" : "#c9a96e", textTransform: "uppercase", margin: "0" }}>{score}%</p>
              </div>
              <div style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: `${score}%`, backgroundColor: score === 100 ? "#4ade80" : "#c9a96e", borderRadius: "2px", transition: "width 0.5s ease" }} />
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: score === 100 ? "#4ade80" : "rgba(255,255,255,0.35)", margin: "8px 0 0", textAlign: "center" }}>
                {score === 100 ? "Your profile is complete — brands can find you easily." :
                 score >= 50 ? "Almost there. A complete profile gets more deal proposals." :
                 "Complete your profile to attract brands."}
              </p>
            </div>
          );
        })()}

        <div style={{ width: "100%", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", margin: "0" }}>
              {isBrand ? "Product Photos" : "Photos"} ({portfolio.length}/9)
            </p>
            {portfolio.length < 9 && (
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", cursor: "pointer", border: "1px solid rgba(201,169,110,0.3)", padding: "6px 14px" }}>
                {uploadingPortfolio ? "Uploading..." : "Upload ↑"}
                <input type="file" accept="image/*" multiple onChange={handlePortfolioUpload} style={{ display: "none" }} disabled={uploadingPortfolio} />
              </label>
            )}
          </div>
          {!isBrand && (
            <div style={{ marginBottom: "16px" }}>
              <button onClick={() => setShowPortfolioInfo(p => !p)} style={{ background: "none", border: "none", padding: "0", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Upload 3–9 photos that represent your content style — no handles in frame</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", transform: showPortfolioInfo ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", display: "inline-block" }}>▾</span>
              </button>
              {showPortfolioInfo && (
                <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: "8px 0 0", lineHeight: "1.7", fontStyle: "italic" }}>
                  Think mood, aesthetic, past collabs. This is what brands see first.
                </p>
              )}
            </div>
          )}
          {!isBrand && portfolio.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px", width: "100%" }}>
              {portfolio.map(img => (
                <div key={img.id} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)" }}>
                  <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <button onClick={() => handleDeletePortfolioImage(img.id)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.7)", border: "none", color: "white", width: "20px", height: "20px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>×</button>
                </div>
              ))}
            </div>
          )}
          {isBrand && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
              {Array.from({ length: 9 }).map((_, i) => {
                const img = portfolio[i];
                if (img) {
                  return (
                    <div key={img.id} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)" }}>
                      <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <button onClick={() => handleDeletePortfolioImage(img.id)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.7)", border: "none", color: "white", width: "20px", height: "20px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>×</button>
                    </div>
                  );
                }
                return (
                  <label key={`empty-${i}`} style={{ aspectRatio: "1", border: "1px dashed rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: portfolio.length < 9 ? "pointer" : "default", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "rgba(201,169,110,0.3)", fontSize: "20px", lineHeight: "1" }}>+</span>
                    {portfolio.length < 9 && <input type="file" accept="image/*" multiple onChange={handlePortfolioUpload} style={{ display: "none" }} disabled={uploadingPortfolio} />}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <button onClick={handleLogout} style={{ border: "1px solid rgba(255,255,255,0.15)", background: "none", color: "rgba(255,255,255,0.65)", fontFamily: "Arial", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", padding: "14px 32px", cursor: "pointer" }}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", paddingBottom: "80px" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", margin: "0" }}>{isBrand ? "Brand" : "Creator"}</p>
          <button onClick={() => { setShowSupport(true); setSupportUnread(0); }} style={{ position: "relative", background: "none", border: "1px solid rgba(201,169,110,0.35)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "6px 12px", cursor: "pointer" }}>
            Help
            {supportUnread > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", minWidth: "16px", height: "16px", borderRadius: "8px", backgroundColor: "#ff4444", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial", fontSize: "9px", fontWeight: "700", color: "white", padding: "0 3px" }}>{supportUnread}</span>
            )}
          </button>
        </div>
      </div>

      {/* Support chat modal */}
      {showSupport && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", backgroundColor: "#0f0f0f", border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none", borderRadius: "16px 16px 0 0", maxHeight: "75vh", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "Arial", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0 0 2px" }}>Support</p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: "0" }}>We usually reply within a few hours.</p>
              </div>
              <button onClick={() => setShowSupport(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "22px", cursor: "pointer", lineHeight: "1" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {supportMessages.length === 0 && (
                <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Georgia, serif", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>Have a question or issue? Send us a message and we'll get back to you.</p>
              )}
              {supportMessages.map(m => (
                <div key={m.id} style={{ display: "flex", justifyContent: m.sender_type === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "78%", padding: "10px 14px", backgroundColor: m.sender_type === "user" ? "#c9a96e" : "rgba(255,255,255,0.07)", borderRadius: m.sender_type === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}>
                    {m.sender_type === "admin" && <p style={{ fontFamily: "Arial", fontSize: "8px", letterSpacing: "2px", color: "#c9a96e", textTransform: "uppercase", margin: "0 0 4px" }}>Pearup Team</p>}
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: m.sender_type === "user" ? "#0a0a0a" : "rgba(255,255,255,0.85)", margin: "0", lineHeight: "1.5" }}>{m.content}</p>
                  </div>
                </div>
              ))}
              <div ref={supportBottomRef} />
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "10px" }}>
              <textarea
                value={supportInput}
                onChange={e => setSupportInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendSupport(); } }}
                placeholder="Type your message..."
                rows={1}
                style={{ flex: 1, padding: "12px 14px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", resize: "none", borderRadius: "8px" }}
              />
              <button onClick={handleSendSupport} disabled={!supportInput.trim() || sendingSupport} style={{ backgroundColor: supportInput.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "12px 18px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: supportInput.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "discover" && DiscoverTab()}
      {activeTab === "deals" && DealsTab()}
      {activeTab === "messages" && MessagesTab()}
      {activeTab === "profile" && ProfileTab()}

      {(() => {
        const dealsBadge = deals.filter(d => d.status === "pending" && d.initiated_by !== null && d.initiated_by !== userId).length;
        const messagesBadge = deals.filter(d => {
          if (d.status === "declined") return false;
          if (!d.last_message_at || d.last_message_sender_id === userId) return false;
          const lastRead = dealReads[d.id];
          return !lastRead || new Date(d.last_message_at) > new Date(lastRead);
        }).length;
        return (
          <div style={{ position: "fixed", bottom: "0", left: "0", right: "0", backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex" }}>
            <NavIcon tab="discover" label="Discover" />
            <NavIcon tab="deals" label="Deals" badge={dealsBadge} />
            <NavIcon tab="messages" label="Messages" badge={messagesBadge} />
            <NavIcon tab="profile" label="Profile" />
          </div>
        );
      })()}
    </div>
  );
}
