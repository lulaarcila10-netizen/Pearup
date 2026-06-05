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
    admin.from("deals").select("brand_id, creator_id, budget, status"),
    admin.from("creator_profiles").select("id"),
    admin.from("brand_profiles").select("id"),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const emailMap: Record<string, string> = {};
  const joinedMap: Record<string, string> = {};
  authData?.users?.forEach((u: any) => {
    emailMap[u.id] = u.email || "";
    joinedMap[u.id] = u.created_at || "";
  });

  const dealCounts: Record<string, number> = {};
  const dealRevenue: Record<string, number> = {};
  dealData?.forEach((d: any) => {
    [d.brand_id, d.creator_id].forEach((uid: string) => {
      if (!uid) return;
      dealCounts[uid] = (dealCounts[uid] || 0) + 1;
      const amt = parseFloat((d.budget || "").replace(/[^0-9.]/g, ""));
      if (!isNaN(amt) && amt > 0) dealRevenue[uid] = (dealRevenue[uid] || 0) + amt;
    });
  });

  const completedIds = new Set([
    ...(creatorProfiles?.map((c: any) => c.id) || []),
    ...(brandProfiles?.map((b: any) => b.id) || []),
  ]);

  const result = (profiles || []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    email: emailMap[p.id] || "",
    user_type: p.user_type,
    avatar_url: p.avatar_url || null,
    deal_count: dealCounts[p.id] || 0,
    total_revenue: dealRevenue[p.id] || 0,
    profile_complete: p.user_type === "admin" ? true : completedIds.has(p.id),
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
