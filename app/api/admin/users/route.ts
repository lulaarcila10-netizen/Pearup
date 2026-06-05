import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyAdmin(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return null;
  const { data: profile } = await admin.from("profiles").select("user_type").eq("id", user.id).single();
  if (profile?.user_type !== "admin") return null;
  return user;
}

// Creator: 7 fields (avatar is optional but pushes to 100%)
function creatorCompletion(cp: any, fullName: string | null, avatarUrl: string | null): number {
  const checks = [
    !!fullName,
    !!cp.bio,
    Array.isArray(cp.niche) && cp.niche.length > 0,
    Array.isArray(cp.platforms) && cp.platforms.length > 0,
    !!cp.follower_count,
    !!cp.rate_per_post,
    !!avatarUrl,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

// Brand: 5 fields (avatar is optional but pushes to 100%)
function brandCompletion(bp: any, avatarUrl: string | null): number {
  const checks = [
    !!bp.brand_name,
    !!bp.description,
    Array.isArray(bp.industry) && bp.industry.length > 0,
    !!bp.budget_min,
    !!avatarUrl,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export async function GET(request: Request) {
  const user = await verifyAdmin(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [
    { data: profiles },
    { data: dealData },
    { data: creatorProfiles },
    { data: brandProfiles },
    { data: authData },
  ] = await Promise.all([
    admin.from("profiles").select("id, full_name, user_type, avatar_url"),
    admin.from("deals").select("brand_id, creator_id, budget"),
    admin.from("creator_profiles").select("id, bio, niche, platforms, follower_count, rate_per_post"),
    admin.from("brand_profiles").select("id, brand_name, description, industry, budget_min"),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const emailMap: Record<string, string> = {};
  const joinedMap: Record<string, string> = {};
  authData?.users?.forEach((u: any) => {
    emailMap[u.id] = u.email || "";
    joinedMap[u.id] = u.created_at || "";
  });

  const fullNameMap: Record<string, string | null> = {};
  const avatarMap: Record<string, string | null> = {};
  profiles?.forEach((p: any) => {
    fullNameMap[p.id] = p.full_name || null;
    avatarMap[p.id] = p.avatar_url || null;
  });

  const dealCounts: Record<string, number> = {};
  const brandSpent: Record<string, number> = {};   // keyed by brand_id — money going out
  const creatorEarned: Record<string, number> = {}; // keyed by creator_id — money coming in
  dealData?.forEach((d: any) => {
    const amt = parseFloat((d.budget || "").replace(/[^0-9.]/g, ""));
    const validAmt = !isNaN(amt) && amt > 0 ? amt : 0;
    if (d.brand_id) dealCounts[d.brand_id] = (dealCounts[d.brand_id] || 0) + 1;
    if (d.creator_id) dealCounts[d.creator_id] = (dealCounts[d.creator_id] || 0) + 1;
    if (d.brand_id && validAmt) brandSpent[d.brand_id] = (brandSpent[d.brand_id] || 0) + validAmt;
    if (d.creator_id && validAmt) creatorEarned[d.creator_id] = (creatorEarned[d.creator_id] || 0) + validAmt;
  });

  // Build completion percentages
  const completionMap: Record<string, number> = {};
  creatorProfiles?.forEach((cp: any) => {
    completionMap[cp.id] = creatorCompletion(cp, fullNameMap[cp.id] ?? null, avatarMap[cp.id] ?? null);
  });
  brandProfiles?.forEach((bp: any) => {
    completionMap[bp.id] = brandCompletion(bp, avatarMap[bp.id] ?? null);
  });

  const result = (profiles || []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    email: emailMap[p.id] || "",
    user_type: p.user_type,
    avatar_url: p.avatar_url || null,
    deal_count: dealCounts[p.id] || 0,
    total_revenue: p.user_type === "brand" ? (brandSpent[p.id] || 0) : (creatorEarned[p.id] || 0),
    completion: p.user_type === "admin" ? 100 : (completionMap[p.id] ?? 0),
    joined_at: joinedMap[p.id] || "",
  }));

  result.sort((a: any, b: any) => b.deal_count - a.deal_count || a.full_name?.localeCompare(b.full_name || "") || 0);

  return NextResponse.json(result);
}

export async function PATCH(request: Request) {
  const user = await verifyAdmin(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { user_id, user_type } = await request.json();
  if (!["creator", "brand", "admin"].includes(user_type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const { error } = await admin.from("profiles").update({ user_type }).eq("id", user_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
