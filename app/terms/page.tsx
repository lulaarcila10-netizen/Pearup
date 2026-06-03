export default function TermsOfService() {
  const section = (title: string) => ({
    fontFamily: "Arial",
    fontSize: "11px",
    letterSpacing: "3px",
    color: "#c9a96e",
    textTransform: "uppercase" as const,
    margin: "40px 0 12px",
  });

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
      <h1 style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", letterSpacing: "4px", color: "white", margin: "0 0 8px" }}>Terms of Service</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Last updated: June 3, 2026</p>
      <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "24px 0 32px" }} />

      <p style={body}>Welcome to Pearup. By creating an account or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before signing up.</p>

      <p style={section("")}>1. Acceptance of Terms</p>
      <p style={body}>By accessing or using Pearup, you confirm that you have read, understood, and agree to these Terms. If you do not agree, you may not use the platform. These Terms apply to all users, including brands and creators.</p>

      <p style={section("")}>2. Eligibility</p>
      <p style={body}>You must be at least 13 years old to use Pearup. By creating an account, you represent and warrant that you meet this requirement. If you are under 18, you represent that a parent or legal guardian has reviewed and consented to these Terms on your behalf. Pearup reserves the right to terminate any account found to belong to a user under 13.</p>
      <p style={body}>To send or receive payments on Pearup, you must be at least 18 years old, or have explicit parental consent and active involvement in all financial transactions.</p>

      <p style={section("")}>3. How Pearup Works</p>
      <p style={body}>Pearup is a marketplace that connects boutique brands with content creators for paid brand deals. Pearup facilitates the connection, communication, and payment between parties — but does not guarantee any specific outcome, content quality, or business results from any deal.</p>

      <p style={section("")}>4. Platform Fee</p>
      <p style={body}>Pearup charges a 12% commission on every deal completed through the platform. This fee is deducted automatically at the time of payment release. By completing a deal on Pearup, both the brand and creator acknowledge and agree to this fee structure. The 12% fee is non-negotiable and non-refundable once a deal is marked as paid.</p>

      <p style={section("")}>5. No Bypassing the Platform</p>
      <p style={body}>All deals, payments, and communications related to a connection made on Pearup must take place inside the platform. You may not take deals off-platform to avoid paying Pearup's commission. Violations of this rule will result in immediate and permanent ban from the platform. Pearup reserves the right to pursue legal remedies for damages caused by intentional circumvention.</p>

      <p style={section("")}>6. Creator Obligations</p>
      <p style={body}>As a creator on Pearup, you agree to:</p>
      <p style={bullet}>— Provide accurate information about your follower count, engagement rate, platforms, and niche. Misrepresentation of stats is grounds for immediate ban.</p>
      <p style={bullet}>— Deliver agreed content within the timeframe specified in the deal.</p>
      <p style={bullet}>— Disclose all brand deals as paid partnerships in your content, as required by the FTC. You must use clear language such as #ad, #sponsored, or "Paid partnership with [Brand Name]." Failure to disclose is your legal responsibility — Pearup is not liable.</p>
      <p style={bullet}>— Own or have the rights to all content you post or deliver through Pearup.</p>
      <p style={bullet}>— Not accept payment outside the platform for any deal initiated through Pearup.</p>
      <p style={bullet}>— Communicate promptly if you are unable to meet a delivery deadline. Failure to deliver without communication may result in a full or partial refund to the brand and permanent ban from the platform.</p>

      <p style={section("")}>7. Independent Contractor Status</p>
      <p style={body}>Creators on Pearup are independent contractors — not employees, agents, or partners of Pearup. Pearup does not withhold taxes, provide benefits, or assume any employer obligations toward creators.</p>
      <p style={body}>Each creator is solely responsible for reporting and paying all applicable federal, state, and local taxes on income earned through the platform. Creators who earn $600 or more in a calendar year through Pearup may be required to provide tax identification information and may receive a Form 1099-NEC. By using Pearup as a creator, you agree to comply with all applicable tax laws and regulations.</p>

      <p style={section("")}>8. Brand Obligations</p>
      <p style={body}>As a brand on Pearup, you agree to:</p>
      <p style={bullet}>— Ship any agreed product to the creator within 7 days of deal acceptance.</p>
      <p style={bullet}>— Make payment through Pearup's payment system — never directly to the creator.</p>
      <p style={bullet}>— Only request deliverables that were clearly agreed upon in the original deal message.</p>
      <p style={bullet}>— Not contact creators for additional work outside the scope of the agreed deal without initiating a new deal through Pearup.</p>
      <p style={bullet}>— Provide accurate information about your brand, products, and budget.</p>
      <p style={bullet}>— Not request content revisions beyond one round of reasonable revision. Additional revision requests must be mutually agreed upon in writing inside the platform.</p>

      <p style={section("")}>9. Content Delivery & Disputes</p>
      <p style={body}>Pearup requires payment to be completed before a deal is marked active. Creators are not obligated to deliver content until payment is confirmed through the platform.</p>
      <p style={body}>Once a creator submits their post link inside the deal, the brand has <strong style={{ color: "white" }}>48 hours</strong> to open a dispute. If no dispute is filed within 48 hours, payment is automatically released to the creator. Pearup deducts its 12% commission before releasing the remaining balance.</p>
      <p style={body}>Brands may request one round of revisions if delivered content materially differs from what was agreed. Creators are not obligated to make changes beyond the original scope. If a creator fails to deliver without communication, the brand may file a dispute and Pearup reserves the right to issue a full or partial refund and permanently ban the creator.</p>

      <p style={section("")}>10. Prohibited Conduct</p>
      <p style={body}>The following are strictly prohibited on Pearup:</p>
      <p style={bullet}>— Sharing contact information (email, phone, Instagram DM, etc.) to move deals off-platform.</p>
      <p style={bullet}>— Creating fake accounts, inflating follower counts, or misrepresenting your identity.</p>
      <p style={bullet}>— Harassment, threats, or abusive behavior toward any other user.</p>
      <p style={bullet}>— Posting or promoting illegal products, adult content, or anything that violates applicable law.</p>
      <p style={bullet}>— Attempting to reverse engineer, scrape, or copy Pearup's platform or data.</p>
      <p style={bullet}>— Creating multiple accounts to evade a ban.</p>
      <p style={bullet}>— Transferring or selling your account to another person. All accounts are personal and non-transferable.</p>

      <p style={section("")}>11. Payments, Refunds & Chargebacks</p>
      <p style={body}>All payments are processed through Stripe. Pearup does not store your payment information. Payments are final once a deal is marked as paid. Refunds are issued only at Pearup's sole discretion in cases of verified fraud, non-delivery, or gross breach of these Terms. Pearup's 12% commission is non-refundable under any circumstances.</p>
      <p style={body}>Creator payouts are released within 3–5 business days after the 48-hour dispute window closes without a filed dispute.</p>
      <p style={body}>Chargebacks: If a brand initiates an unauthorized chargeback with their bank or card issuer after a deal has been completed and content delivered, Pearup reserves the right to permanently ban that brand's account and pursue recovery of fees and damages. Initiating a chargeback when a deal was fulfilled as agreed is a violation of these Terms.</p>

      <p style={section("")}>12. Intellectual Property</p>
      <p style={body}>Creators retain full ownership of all content they create. By using Pearup, you grant Pearup a non-exclusive, royalty-free license to use your name, likeness, and content posted on the platform for marketing and promotional purposes. Pearup will not misrepresent your identity or imply endorsements you have not made.</p>
      <p style={body}>Brands receive a non-exclusive, one-year license to use the delivered content on their own platforms and channels, unless a different scope is explicitly agreed upon in writing within the deal message. No additional rights are transferred beyond what is stated in the deal. Pearup's platform, logo, design, and code are the exclusive property of Pearup and may not be copied or used without written permission.</p>

      <p style={section("")}>13. Limitation of Liability</p>
      <p style={body}>Pearup is a marketplace and is not responsible for the actions, content, or conduct of any brand or creator on the platform. Pearup's maximum liability to any user for any claim arising from these Terms or use of the platform is limited to the total commission fees Pearup earned from that specific user's deals in the 30 days preceding the claim. Pearup is not liable for lost revenue, lost profits, reputational damage, or any indirect or consequential damages of any kind.</p>

      <p style={section("")}>14. Indemnification</p>
      <p style={body}>You agree to defend, indemnify, and hold harmless Pearup and its founders, officers, and agents from and against any claims, damages, losses, or expenses (including legal fees) arising out of your use of the platform, your violation of these Terms, or your violation of any third party's rights.</p>

      <p style={section("")}>15. Dispute Resolution & Arbitration</p>
      <p style={body}>Any dispute between you and Pearup will be resolved through binding arbitration, not in court, except that either party may bring individual claims in small claims court. You waive any right to participate in a class action lawsuit against Pearup. Arbitration will be conducted under the rules of the American Arbitration Association (AAA) and will take place in the state of Massachusetts.</p>

      <p style={section("")}>16. Termination</p>
      <p style={body}>Pearup reserves the right to suspend or permanently ban any account at any time, for any reason, including but not limited to violation of these Terms. You may delete your account at any time by contacting us.</p>
      <p style={body}>If an account is banned or terminated while a deal is in an active payment-held state, any funds held in escrow will be returned to the brand within 7 business days. Pearup's 12% fee is non-refundable if the deal was marked active prior to termination.</p>

      <p style={section("")}>17. Changes to These Terms</p>
      <p style={body}>Pearup may update these Terms at any time. We will notify users of significant changes via the platform or email. Your continued use of Pearup after changes are posted constitutes acceptance of the updated Terms.</p>

      <p style={section("")}>18. Contact</p>
      <p style={body}>If you have questions about these Terms, contact us at: <span style={{ color: "#c9a96e" }}>lulaarcila10@gmail.com</span></p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "60px", paddingTop: "24px" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0 0 8px" }}>PEARUP</p>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Pearup</a>
      </div>
    </div>
  );
}
