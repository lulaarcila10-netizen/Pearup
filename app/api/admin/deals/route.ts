import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await admin.from("profiles").select("user_type").eq("id", user.id).single();
  if (profile?.user_type !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await admin
    .from("deals")
    .select("id, brand_id, creator_id, message, budget, status, payment_status, content_status, payout_sent, post_link, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) return NextResponse.json([]);

  const brandIds = [...new Set(data.map(d => d.brand_id))];
  const creatorIds = [...new Set(data.map(d => d.creator_id))];

  const [{ data: bd }, { data: cd }] = await Promise.all([
    admin.from("brand_profiles").select("id, brand_name").in("id", brandIds),
    admin.from("profiles").select("id, full_name").in("id", creatorIds),
  ]);

  const bMap: Record<string, string> = {};
  bd?.forEach((b: any) => { bMap[b.id] = b.brand_name; });
  const cMap: Record<string, string> = {};
  cd?.forEach((c: any) => { cMap[c.id] = c.full_name || "Creator"; });

  return NextResponse.json(data.map(d => ({
    id: d.id,
    brand_name: bMap[d.brand_id] || "Unknown",
    creator_name: cMap[d.creator_id] || "Unknown",
    message: d.message,
    budget: d.budget,
    status: d.status,
    payment_status: d.payment_status,
    content_status: d.content_status,
    payout_sent: d.payout_sent || false,
    post_link: d.post_link,
    created_at: d.created_at,
  })));
}
