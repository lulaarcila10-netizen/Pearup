"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dealId = searchParams.get("deal_id");
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function markPaid() {
      if (!dealId) return;
      await supabase.from("deals").update({ payment_status: "paid" }).eq("id", dealId);
      setDone(true);
    }
    markPaid();
  }, [dealId]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
      </div>

      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#4ade80", textTransform: "uppercase", marginBottom: "12px" }}>Payment Complete</p>
      <h1 style={{ fontFamily: "Arial", fontSize: "26px", fontWeight: "700", color: "white", margin: "0 0 12px" }}>You're all set.</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(255,255,255,0.72)", lineHeight: "1.8", maxWidth: "340px", margin: "0 0 40px" }}>
        Your payment was received. The creator has been notified and your deal is officially on.
      </p>

      <div style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "20px 28px", marginBottom: "32px", maxWidth: "320px", width: "100%" }}>
        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", margin: "0 0 8px" }}>What happens next</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.8", margin: "0" }}>
          Head to your Messages tab to coordinate with the creator. Contact info is now unlocked in your deal.
        </p>
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px 40px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "700", border: "none", cursor: "pointer" }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
}
