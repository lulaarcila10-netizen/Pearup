export default function PrivacyPolicy() {
  const section = {
    fontFamily: "Arial",
    fontSize: "11px",
    letterSpacing: "3px",
    color: "#c9a96e",
    textTransform: "uppercase" as const,
    margin: "40px 0 12px",
  };

  const body = {
    fontFamily: "Georgia, serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.9",
    margin: "0 0 12px",
  };

  const bullet = {
    fontFamily: "Georgia, serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.9",
    margin: "0 0 8px",
    paddingLeft: "16px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", padding: "60px 24px", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>Legal</p>
      <h1 style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", letterSpacing: "4px", color: "white", margin: "0 0 8px" }}>Privacy Policy</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Last updated: June 3, 2026</p>
      <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "24px 0 32px" }} />

      <p style={body}>Pearup ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have regarding your data.</p>

      <p style={section}>1. Information We Collect</p>
      <p style={body}>We collect the following types of information:</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Account information:</strong> Your email address, name, password (encrypted), and account type (brand or creator).</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Profile information:</strong> Bio, niche, follower count, rate, platforms, photos, and any other information you voluntarily provide.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Deal and message data:</strong> All deal proposals, messages, offers, and agreements made through the platform.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Payment information:</strong> Payment is processed by Stripe. Pearup does not store your credit card or bank details.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Usage data:</strong> How you interact with the platform, including pages visited and actions taken.</p>

      <p style={section}>2. How We Use Your Information</p>
      <p style={body}>We use your information to:</p>
      <p style={bullet}>— Operate and improve the Pearup platform.</p>
      <p style={bullet}>— Match brands with creators based on niche, industry, and preferences.</p>
      <p style={bullet}>— Process payments and enforce deal agreements.</p>
      <p style={bullet}>— Send you important updates about your account and deals.</p>
      <p style={bullet}>— Prevent fraud, abuse, and violations of our Terms of Service.</p>
      <p style={bullet}>— Market Pearup using content you've voluntarily posted on the platform (with your consent as outlined in our Terms of Service).</p>

      <p style={section}>3. Information Sharing</p>
      <p style={body}>We do not sell your personal information. We share your information only in the following circumstances:</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>With other users:</strong> Your profile information is visible to other authenticated users on the platform (brands see creator profiles, creators see brand profiles). Contact information is only revealed after a deal is made.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>With service providers:</strong> We use Supabase for database and authentication, Stripe for payments, and Vercel for hosting. These providers only access your data as necessary to provide their services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>For legal reasons:</strong> We may disclose your information if required by law or to protect the rights and safety of Pearup, its users, or the public.</p>

      <p style={section}>4. Data Retention</p>
      <p style={body}>We retain your data for as long as your account is active. If you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal or financial compliance purposes (e.g., transaction records).</p>

      <p style={section}>5. Security</p>
      <p style={body}>We take reasonable measures to protect your data, including encrypted storage and secure connections (HTTPS). However, no system is 100% secure. By using Pearup, you acknowledge that you share information at your own risk.</p>

      <p style={section}>6. Children's Privacy</p>
      <p style={body}>Pearup is not intended for children under 13. We do not knowingly collect personal information from anyone under 13. If we discover that a user is under 13, we will immediately delete their account and all associated data. If you believe a child under 13 has created an account, please contact us immediately at lulaarcila10@gmail.com.</p>

      <p style={section}>7. Your Rights</p>
      <p style={body}>You have the right to:</p>
      <p style={bullet}>— Access the personal information we hold about you.</p>
      <p style={bullet}>— Request correction of inaccurate information.</p>
      <p style={bullet}>— Request deletion of your account and associated data.</p>
      <p style={bullet}>— Opt out of marketing communications at any time.</p>
      <p style={body}>To exercise any of these rights, contact us at lulaarcila10@gmail.com.</p>

      <p style={section}>8. Third-Party Links</p>
      <p style={body}>Pearup may contain links to third-party websites (such as a brand's website or a creator's social media). We are not responsible for the privacy practices of those sites. Please review their privacy policies independently.</p>

      <p style={section}>9. Changes to This Policy</p>
      <p style={body}>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on the platform. Your continued use of Pearup after changes are posted means you accept the updated policy.</p>

      <p style={section}>10. Contact</p>
      <p style={body}>If you have questions or concerns about this Privacy Policy, contact us at: <span style={{ color: "#c9a96e" }}>lulaarcila10@gmail.com</span></p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "60px", paddingTop: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0 0 8px" }}>PEARUP</p>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Pearup</a>
      </div>
    </div>
  );
}
