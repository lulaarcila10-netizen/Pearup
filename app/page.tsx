import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white" }}>

      {/* Hero */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "64px 24px 48px" }}>
        <Image src="/logo.png" alt="Pearup" width={180} height={180} style={{ marginBottom: "24px", mixBlendMode: "lighten" }} />

        <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>
          Where Brands Meet Creators
        </p>

        <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "0 auto 24px" }} />

        <p style={{ fontSize: "19px", color: "rgba(255,255,255,0.65)", maxWidth: "420px", lineHeight: "1.8", marginBottom: "40px", fontFamily: "Georgia, serif" }}>
          The easiest way to collab, get paid, and grow.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "80px" }}>
          <Link href="/signup" style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "16px 40px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textDecoration: "none", fontWeight: "700" }}>
            Get Started
          </Link>
          <Link href="/login" style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e", padding: "16px 40px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textDecoration: "none" }}>
            Log In
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", textAlign: "center", marginBottom: "8px" }}>
          How It Works
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "white", textAlign: "center", marginBottom: "48px", fontWeight: "300" }}>
          Three steps to your next deal.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", maxWidth: "860px", margin: "0 auto" }}>

          {/* Step 1 */}
          <div style={{ flex: "1 1 240px", maxWidth: "260px", border: "1px solid rgba(201,169,110,0.2)", padding: "32px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", color: "#c9a96e", margin: "0 0 16px" }}>01</p>
            <p style={{ fontFamily: "Arial", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "white", textTransform: "uppercase", margin: "0 0 12px" }}>Create Your Profile</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", margin: "0" }}>
              Sign up as a brand or creator. Set your niche, budget, rate, and vibe. Your profile is your pitch.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ flex: "1 1 240px", maxWidth: "260px", border: "1px solid rgba(201,169,110,0.2)", padding: "32px 24px", textAlign: "center", backgroundColor: "rgba(201,169,110,0.04)" }}>
            <p style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", color: "#c9a96e", margin: "0 0 16px" }}>02</p>
            <p style={{ fontFamily: "Arial", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "white", textTransform: "uppercase", margin: "0 0 12px" }}>Get Matched</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", margin: "0" }}>
              Browse creators or brands that fit your niche. Send a proposal or pitch yourself — no cold emails.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ flex: "1 1 240px", maxWidth: "260px", border: "1px solid rgba(201,169,110,0.2)", padding: "32px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", color: "#c9a96e", margin: "0 0 16px" }}>03</p>
            <p style={{ fontFamily: "Arial", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "white", textTransform: "uppercase", margin: "0 0 12px" }}>Close the Deal</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", margin: "0" }}>
              Message, agree on terms, and lock in a formal offer. Payment is handled securely inside Pearup. 🍐
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "rgba(255,255,255,0.75)", marginBottom: "32px", lineHeight: "1.8" }}>
          Ready to make real deals happen?
        </p>
        <Link href="/signup" style={{ backgroundColor: "#c9a96e", color: "#0a0a0a", padding: "18px 48px", fontFamily: "Arial", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", textDecoration: "none", fontWeight: "700" }}>
          Join Pearup
        </Link>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Arial", fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: "0", letterSpacing: "1px" }}>© 2026 Pearup · Miami, FL</p>
      </div>

    </div>
  );
}
