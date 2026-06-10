import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: { user: sender } } = await admin.auth.getUser(token);
  if (!sender) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { recipient_id, sender_name, budget } = await request.json();
  if (!recipient_id) return NextResponse.json({ error: "Missing recipient_id" }, { status: 400 });

  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const recipient = users?.find((u: any) => u.id === recipient_id);
  if (!recipient?.email) return NextResponse.json({ ok: true }); // no email, skip silently

  const resend = new Resend(process.env.RESEND_API_KEY);
  const budgetLine = budget ? `<p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#c9a96e;">Budget: ${budget}</p>` : "";

  await resend.emails.send({
    from: "PearUp <onboarding@resend.dev>",
    to: recipient.email,
    subject: "You have a new deal proposal on PearUp",
    html: `
      <div style="background:#0a0a0a;padding:40px 32px;max-width:480px;margin:0 auto;font-family:Georgia,serif;">
        <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;margin:0 0 24px;">PEARUP</p>
        <p style="font-size:18px;color:#ffffff;font-weight:300;margin:0 0 16px;">You have a new deal proposal.</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 0 8px;"><strong style="color:rgba(255,255,255,0.85);">${sender_name}</strong> sent you a deal proposal on PearUp.</p>
        ${budgetLine}
        <div style="margin:28px 0;">
          <a href="https://pearup.vercel.app/dashboard" style="display:inline-block;background:#c9a96e;color:#0a0a0a;padding:14px 28px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;text-decoration:none;">View Deal</a>
        </div>
        <p style="font-family:Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.2);margin:0;line-height:1.6;">You're receiving this because you have an account on PearUp. Log in to accept or decline.</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
