import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userName, userType, message } = await req.json();

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true });
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "lulaarcila10@gmail.com",
      subject: `New support message from ${userName} (${userType})`,
      html: `<p><strong>${userName}</strong> (${userType}) sent a support message on Pearup:</p><blockquote>${message}</blockquote><p>Log in to your admin panel to reply.</p>`,
    }),
  });

  return NextResponse.json({ ok: true });
}
