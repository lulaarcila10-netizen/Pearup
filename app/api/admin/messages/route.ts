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
    .from("messages")
    .select("id, deal_id, sender_id, content, type, created_at")
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) return NextResponse.json([]);

  const senderIds = [...new Set(data.map(m => m.sender_id))];
  const { data: pd } = await admin.from("profiles").select("id, full_name").in("id", senderIds);
  const nameMap: Record<string, string> = {};
  pd?.forEach((p: any) => { nameMap[p.id] = p.full_name || "Unknown"; });

  return NextResponse.json(data.map(m => ({
    ...m,
    sender_name: nameMap[m.sender_id] || "Unknown",
  })));
}
