"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Tab = "users" | "creators" | "brands" | "deals" | "messages" | "support";

type User = { id: string; full_name: string | null; user_type: string };
type Creator = { id: string; full_name: string | null; bio: string | null; niche: string[]; platforms: string[]; follower_count: number | null; rate_per_post: number | null };
type Brand = { id: string; brand_name: string; description: string | null; industry: string[]; budget_min: number | null };
type Deal = { id: string; brand_name: string; creator_name: string; message: string; budget: string | null; status: string; payment_status: string | null; created_at: string };
type Message = { id: string; deal_id: string; sender_id: string; content: string; type: string; created_at: string };
type SupportThread = { user_id: string; user_name: string; user_type: string; last_message: string; last_message_at: string };
type SupportMsg = { id: string; user_id: string; sender_type: string; content: string; created_at: string };

const statusColor = (s: string) => s === "accepted" ? "#4ade80" : s === "declined" ? "rgba(255,100,100,0.7)" : "#c9a96e";
const typeColor = (t: string) => t === "creator" ? "#c9a96e" : t === "brand" ? "rgba(255,255,255,0.7)" : "#a78bfa";

function displayFollowers(n: number): string {
  if (n >= 500000) return "500K+";
  if (n >= 100000) return "100K – 500K";
  if (n >= 50000) return "50K – 100K";
  if (n >= 10000) return "10K – 50K";
  return "1K – 10K";
}

function displayRate(n: number): string {
  if (n >= 15000) return "$15,000+";
  if (n >= 5000) return "$5,000 – $15,000";
  if (n >= 1000) return "$1,000 – $5,000";
  if (n >= 500) return "$500 – $1,000";
  return "$100 – $500";
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", flexShrink: 0, minWidth: "80px" }}>{label}</span>
      <span style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{value}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "18px", backgroundColor: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: "8px" }}>{children}</div>;
}

function Badge({ text, color }: { text: string; color: string }) {
  return <span style={{ fontFamily: "Arial", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color, border: `1px solid ${color}`, padding: "2px 8px", alignSelf: "flex-start" }}>{text}</span>;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [tabLoading, setTabLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedCreators, setExpandedCreators] = useState<Set<string>>(new Set());
  const [supportThreads, setSupportThreads] = useState<SupportThread[]>([]);
  const [activeSupportUser, setActiveSupportUser] = useState<SupportThread | null>(null);
  const [supportMsgs, setSupportMsgs] = useState<SupportMsg[]>([]);
  const [supportReply, setSupportReply] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    if (!activeSupportUser) return;
    const ch = supabase.channel(`admin-support-${activeSupportUser.user_id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "support_messages", filter: `user_id=eq.${activeSupportUser.user_id}` }, payload => {
        setSupportMsgs(prev => {
          const msg = payload.new as SupportMsg;
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [activeSupportUser?.user_id]);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single();
      if (!profile || profile.user_type !== "admin") { router.push("/dashboard"); return; }
      setLoading(false);
      loadTab("users");
    }
    checkAdmin();
  }, [router]);

  async function loadTab(tab: Tab) {
    setTabLoading(true);
    setActiveTab(tab);

    if (tab === "users") {
      const { data } = await supabase.from("profiles").select("id, full_name, user_type").order("user_type");
      setUsers(data || []);
    } else if (tab === "creators") {
      const { data } = await supabase
        .from("creator_profiles")
        .select("id, bio, niche, platforms, follower_count, rate_per_post, profiles(full_name)");
      setCreators((data || []).map((c: any) => ({
        id: c.id,
        full_name: c.profiles?.full_name || null,
        bio: c.bio,
        niche: c.niche || [],
        platforms: c.platforms || [],
        follower_count: c.follower_count,
        rate_per_post: c.rate_per_post,
      })));
    } else if (tab === "brands") {
      const { data } = await supabase.from("brand_profiles").select("id, brand_name, description, industry, budget_min");
      setBrands(data || []);
    } else if (tab === "deals") {
      const { data } = await supabase.from("deals").select("id, brand_id, creator_id, message, budget, status, payment_status, created_at").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        const brandIds = [...new Set(data.map(d => d.brand_id))];
        const creatorIds = [...new Set(data.map(d => d.creator_id))];
        const [{ data: bd }, { data: cd }] = await Promise.all([
          supabase.from("brand_profiles").select("id, brand_name").in("id", brandIds),
          supabase.from("profiles").select("id, full_name").in("id", creatorIds),
        ]);
        const bMap: Record<string, string> = {};
        bd?.forEach((b: any) => { bMap[b.id] = b.brand_name; });
        const cMap: Record<string, string> = {};
        cd?.forEach((c: any) => { cMap[c.id] = c.full_name || "Creator"; });
        setDeals(data.map(d => ({ id: d.id, brand_name: bMap[d.brand_id] || "Unknown", creator_name: cMap[d.creator_id] || "Unknown", message: d.message, budget: d.budget, status: d.status, payment_status: d.payment_status, created_at: d.created_at })));
      } else {
        setDeals([]);
      }
    } else if (tab === "messages") {
      const { data } = await supabase.from("messages").select("id, deal_id, sender_id, content, type, created_at").order("created_at", { ascending: false }).limit(300);
      setMessages(data || []);
    } else if (tab === "support") {
      const { data: allMsgs } = await supabase.from("support_messages").select("user_id, content, sender_type, created_at").order("created_at", { ascending: false });
      if (allMsgs && allMsgs.length > 0) {
        const seen = new Set<string>();
        const latest: { user_id: string; content: string; created_at: string }[] = [];
        for (const m of allMsgs) {
          if (!seen.has(m.user_id)) { seen.add(m.user_id); latest.push(m); }
        }
        const userIds = latest.map(m => m.user_id);
        const { data: profileData } = await supabase.from("profiles").select("id, full_name, user_type").in("id", userIds);
        const profileMap: Record<string, { name: string; type: string }> = {};
        profileData?.forEach((p: any) => { profileMap[p.id] = { name: p.full_name || "Unknown", type: p.user_type }; });
        setSupportThreads(latest.map(m => ({ user_id: m.user_id, user_name: profileMap[m.user_id]?.name || "Unknown", user_type: profileMap[m.user_id]?.type || "user", last_message: m.content, last_message_at: m.created_at })));
      } else {
        setSupportThreads([]);
      }
      setActiveSupportUser(null);
      setSupportMsgs([]);
    }

    setTabLoading(false);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase" }}>Loading...</p>
      </div>
    );
  }

  const tabs: Tab[] = ["users", "creators", "brands", "deals", "messages", "support"];
  const counts: Record<Tab, number> = { users: users.length, creators: creators.length, brands: brands.length, deals: deals.length, messages: messages.length, support: supportThreads.length };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", paddingBottom: "40px" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0 0 2px" }}>PEARUP</p>
          <p style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "3px", color: "#a78bfa", textTransform: "uppercase", margin: "0" }}>Admin Overview</p>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); router.push("/"); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 16px", cursor: "pointer" }}>
          Log Out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", overflowX: "auto" }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => loadTab(tab)}
            style={{ flex: 1, minWidth: "80px", padding: "14px 8px", background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab ? "#c9a96e" : "transparent"}`, color: activeTab === tab ? "#c9a96e" : "rgba(255,255,255,0.4)", fontFamily: "Arial", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}
          >
            {tab}{activeTab === tab && counts[tab] > 0 ? ` (${counts[tab]})` : ""}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px" }}>
        {tabLoading ? (
          <p style={{ color: "#c9a96e", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textAlign: "center", padding: "40px 0" }}>Loading...</p>
        ) : (
          <>
            {/* USERS */}
            {activeTab === "users" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>{users.length} accounts</p>
                {users.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No users found.</p>}
                {users.map(u => (
                  <Card key={u.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600", color: "white", margin: "0" }}>{u.full_name || "—"}</p>
                      <Badge text={u.user_type} color={typeColor(u.user_type)} />
                    </div>
                    <Row label="ID" value={u.id} />
                  </Card>
                ))}
              </div>
            )}

            {/* CREATORS */}
            {activeTab === "creators" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>{creators.length} creators</p>
                {creators.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No creators yet.</p>}
                {creators.map(c => {
                  const expanded = expandedCreators.has(c.id);
                  const toggle = () => setExpandedCreators(prev => {
                    const next = new Set(prev);
                    expanded ? next.delete(c.id) : next.add(c.id);
                    return next;
                  });
                  return (
                    <Card key={c.id}>
                      {/* Always visible */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600", color: "white", margin: "0" }}>{c.full_name || "—"}</p>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={toggle} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", cursor: "pointer" }}>
                            {expanded ? "Show less" : "Show more"}
                          </button>
                          <button onClick={() => router.push(`/profile/${c.id}`)} style={{ background: "none", border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", cursor: "pointer" }}>
                            View Profile
                          </button>
                        </div>
                      </div>
                      {c.follower_count && <Row label="Followers" value={displayFollowers(c.follower_count)} />}
                      {c.rate_per_post && <Row label="Rate" value={displayRate(c.rate_per_post)} />}
                      {c.niche.length > 0 && (
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                          {c.niche.map(n => <span key={n} style={{ padding: "3px 8px", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e", fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase" }}>{n}</span>)}
                        </div>
                      )}
                      {/* Expanded details */}
                      {expanded && (
                        <>
                          {c.bio && <Row label="Bio" value={c.bio} />}
                          {c.platforms.length > 0 && <Row label="Platforms" value={c.platforms.join(", ")} />}
                        </>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}

            {/* BRANDS */}
            {activeTab === "brands" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>{brands.length} brands</p>
                {brands.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No brands yet.</p>}
                {brands.map(b => (
                  <Card key={b.id}>
                    <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600", color: "white", margin: "0" }}>{b.brand_name}</p>
                    {b.description && <Row label="About" value={b.description} />}
                    {b.industry.length > 0 && <Row label="Industry" value={b.industry.join(", ")} />}
                    {b.budget_min && <Row label="Budget" value={`$${b.budget_min.toLocaleString()}+`} />}
                  </Card>
                ))}
              </div>
            )}

            {/* DEALS */}
            {activeTab === "deals" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>{deals.length} deals</p>
                {deals.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No deals yet.</p>}
                {deals.map(d => (
                  <Card key={d.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontFamily: "Arial", fontSize: "13px", fontWeight: "600", color: "white", margin: "0 0 2px" }}>{d.brand_name} → {d.creator_name}</p>
                        {d.budget && <p style={{ fontFamily: "Arial", fontSize: "11px", color: "#c9a96e", margin: "0" }}>{d.budget}</p>}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
                        <Badge text={d.status} color={statusColor(d.status)} />
                        {d.payment_status === "paid" && <Badge text="paid" color="#4ade80" />}
                      </div>
                    </div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "4px 0 0", lineHeight: "1.6" }}>"{d.message.length > 100 ? d.message.slice(0, 100) + "…" : d.message}"</p>
                    <Row label="Date" value={new Date(d.created_at).toLocaleDateString()} />
                  </Card>
                ))}
              </div>
            )}

            {/* SUPPORT */}
            {activeTab === "support" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>
                  {activeSupportUser ? `← ${activeSupportUser.user_name}` : `${supportThreads.length} support threads`}
                </p>

                {/* Thread list */}
                {!activeSupportUser && (
                  <>
                    {supportThreads.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No support messages yet.</p>}
                    {supportThreads.map(t => (
                      <button key={t.user_id} onClick={async () => {
                        setActiveSupportUser(t);
                        const { data } = await supabase.from("support_messages").select("id, user_id, sender_type, content, created_at").eq("user_id", t.user_id).order("created_at", { ascending: true });
                        setSupportMsgs(data || []);
                      }} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "16px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", textAlign: "left", width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: "600", color: "white", margin: "0" }}>{t.user_name}</p>
                          <Badge text={t.user_type} color={typeColor(t.user_type)} />
                        </div>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: "0" }}>{t.last_message.length > 60 ? t.last_message.slice(0, 60) + "…" : t.last_message}</p>
                      </button>
                    ))}
                  </>
                )}

                {/* Thread view + reply */}
                {activeSupportUser && (
                  <>
                    <button onClick={() => setActiveSupportUser(null)} style={{ background: "none", border: "none", color: "#c9a96e", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", textAlign: "left", padding: "0 0 16px", marginBottom: "8px" }}>← Back</button>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                      {supportMsgs.map(m => (
                        <div key={m.id} style={{ display: "flex", justifyContent: m.sender_type === "admin" ? "flex-end" : "flex-start" }}>
                          <div style={{ maxWidth: "78%", padding: "10px 14px", backgroundColor: m.sender_type === "admin" ? "#c9a96e" : "rgba(255,255,255,0.07)", borderRadius: m.sender_type === "admin" ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}>
                            <p style={{ fontFamily: "Arial", fontSize: "8px", letterSpacing: "2px", color: m.sender_type === "admin" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: "0 0 4px" }}>{m.sender_type === "admin" ? "You" : activeSupportUser.user_name}</p>
                            <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: m.sender_type === "admin" ? "#0a0a0a" : "rgba(255,255,255,0.85)", margin: "0", lineHeight: "1.5" }}>{m.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <textarea
                        value={supportReply}
                        onChange={e => setSupportReply(e.target.value)}
                        placeholder={`Reply to ${activeSupportUser.user_name}…`}
                        rows={2}
                        style={{ flex: 1, padding: "12px 14px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", resize: "none", borderRadius: "8px" }}
                      />
                      <button onClick={async () => {
                        if (!supportReply.trim() || sendingReply) return;
                        setSendingReply(true);
                        const content = supportReply.trim();
                        setSupportReply("");
                        await supabase.from("support_messages").insert({ user_id: activeSupportUser.user_id, sender_type: "admin", content });
                        setSendingReply(false);
                      }} disabled={!supportReply.trim() || sendingReply} style={{ backgroundColor: supportReply.trim() ? "#c9a96e" : "rgba(201,169,110,0.3)", color: "#0a0a0a", padding: "12px 18px", fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: supportReply.trim() ? "pointer" : "not-allowed", alignSelf: "flex-end" }}>
                        {sendingReply ? "Sending..." : "Reply"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* MESSAGES */}
            {activeTab === "messages" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ fontFamily: "Arial", fontSize: "20px", fontWeight: "300", letterSpacing: "2px", color: "white", marginBottom: "16px" }}>{messages.length} messages (latest 300)</p>
                {messages.length === 0 && <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Georgia, serif", fontSize: "14px" }}>No messages yet.</p>}
                {messages.map(m => (
                  <div key={m.id} style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px", backgroundColor: "rgba(255,255,255,0.01)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "Arial", fontSize: "9px", letterSpacing: "1px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                        Deal {m.deal_id.slice(0, 8)}…
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {m.type !== "text" && <Badge text={m.type} color="#c9a96e" />}
                        <span style={{ fontFamily: "Arial", fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>{new Date(m.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", margin: "0", lineHeight: "1.5" }}>{m.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
