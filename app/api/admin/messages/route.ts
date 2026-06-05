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

  const { data: messages, error } = await admin
    .from("messages")
    .select("id, deal_id, sender_id, content, type, offer_amount, created_at")
    .order("created_at", { ascending: true })
    .limit(2000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!messages || messages.length === 0) return NextResponse.json([]);

  const dealIds = [...new Set(messages.map((m: any) => m.deal_id))];

  const { data: deals } = await admin
    .from("deals")
    .select("id, brand_id, creator_id")
    .in("id", dealIds);

  const dealMap: Record<string, { brand_id: string; creator_id: string }> = {};
  deals?.forEach((d: any) => { dealMap[d.id] = { brand_id: d.brand_id, creator_id: d.creator_id }; });

  const brandIds = [...new Set(deals?.map((d: any) => d.brand_id) || [])];
  const creatorIds = [...new Set(deals?.map((d: any) => d.creator_id) || [])];

  const [{ data: brandProfiles }, { data: profiles }] = await Promise.all([
    admin.from("brand_profiles").select("id, brand_name").in("id", brandIds),
    admin.from("profiles").select("id, full_name").in("id", [...brandIds, ...creatorIds]),
  ]);

  const brandNameMap: Record<string, string> = {};
  brandProfiles?.forEach((b: any) => { brandNameMap[b.id] = b.brand_name; });
  const fullNameMap: Record<string, string> = {};
  profiles?.forEach((p: any) => { fullNameMap[p.id] = p.full_name || "Unknown"; });

  const grouped: Record<string, any> = {};

  for (const m of messages) {
    const deal = dealMap[m.deal_id];
    if (!deal) continue;

    if (!grouped[m.deal_id]) {
      grouped[m.deal_id] = {
        deal_id: m.deal_id,
        brand_id: deal.brand_id,
        creator_id: deal.creator_id,
        brand_name: brandNameMap[deal.brand_id] || "Unknown Brand",
        creator_name: fullNameMap[deal.creator_id] || "Unknown Creator",
        messages: [],
        last_message: "",
        last_message_at: "",
        message_count: 0,
      };
    }

    const isBrand = m.sender_id === deal.brand_id;
    grouped[m.deal_id].messages.push({
      id: m.id,
      sender_id: m.sender_id,
      sender_name: isBrand ? (brandNameMap[deal.brand_id] || "Brand") : (fullNameMap[deal.creator_id] || "Creator"),
      side: isBrand ? "brand" : "creator",
      content: m.content,
      type: m.type,
      offer_amount: m.offer_amount ?? null,
      created_at: m.created_at,
    });

    grouped[m.deal_id].last_message = m.content;
    grouped[m.deal_id].last_message_at = m.created_at;
    grouped[m.deal_id].message_count++;
  }

  const conversations = Object.values(grouped).sort(
    (a: any, b: any) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );

  return NextResponse.json(conversations);
}
