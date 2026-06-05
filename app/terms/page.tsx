export default function TermsOfService() {
  const sectionStyle = {
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
    paddingLeft: "20px",
  };

  const caps = {
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
    lineHeight: "1.8",
    margin: "0 0 12px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", padding: "60px 24px", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontFamily: "Arial", fontSize: "11px", letterSpacing: "4px", color: "#c9a96e", textTransform: "uppercase", marginBottom: "16px" }}>Legal</p>
      <h1 style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", letterSpacing: "4px", color: "white", margin: "0 0 8px" }}>Terms of Service</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Effective Date: June 3, 2026 | Version 1.0</p>
      <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "24px 0 32px" }} />

      <p style={body}>Welcome to Pearup. These Terms of Service ("Terms") govern your access to and use of the Pearup platform, website, and all related services. By creating an account or using the Platform in any way, you agree to be legally bound by these Terms and our Privacy Policy. If you do not agree, you must immediately discontinue use of the Platform.</p>

      <p style={sectionStyle}>1. Definitions</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform</strong> — the Pearup website, application, software, tools, and all related services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Brand</strong> — any company or individual that registers to seek content creation or influencer marketing services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Creator</strong> — any individual that registers to offer content creation or influencer marketing services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Deal</strong> — an agreed campaign or service arrangement between a Brand and a Creator initiated through the Platform.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform Fee</strong> — the 12% commission charged by Pearup on each completed transaction.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Content</strong> — any photos, videos, reels, stories, posts, written copy, or other creative materials produced in connection with a Deal.</p>

      <p style={sectionStyle}>2. Eligibility</p>
      <p style={body}>To use the Platform, you must be at least 18 years of age (or the age of majority in your jurisdiction), have the legal capacity to enter into binding contracts, and provide accurate, complete registration information. Minors between 13 and 17 may browse with verified parental consent but may not send or receive payments or enter into Deals. Pearup reserves the right to verify age and terminate accounts that violate this provision.</p>

      <p style={sectionStyle}>3. Pearup's Role</p>
      <p style={body}>Pearup is a technology marketplace and intermediary only. Pearup does not employ, supervise, direct, or represent any Creator or Brand. Pearup is not a staffing agency, talent agency, or advertising agency. The relationship between a Brand and a Creator is a direct, independent contractual relationship. Pearup is not a party to any Deal except as expressly stated in these Terms.</p>
      <p style={body}>Pearup does not guarantee the quality, legality, accuracy, results, or commercial success of any Deal, campaign, Content, product, or service offered through the Platform.</p>

      <p style={sectionStyle}>4. No Guarantee of Results</p>
      <p style={body}>Pearup makes no representations or guarantees regarding follower counts, engagement rates, traffic, conversions, sales, revenue, brand awareness, or any other outcome of any campaign. All campaign results depend solely on the independent actions of Brands and Creators. Pearup bears no liability for unsatisfactory campaign results.</p>

      <p style={sectionStyle}>5. Creator Obligations</p>
      <p style={body}>By registering as a Creator, you represent that all information provided — including follower count, engagement rate, niche, and social media platforms — is accurate and not misleading. Misrepresentation is grounds for immediate and permanent account termination. As a Creator, you agree to:</p>
      <p style={bullet}>— Deliver all agreed Content within the timeframes specified in each Deal.</p>
      <p style={bullet}>— Create Content that conforms to the scope and requirements agreed upon in the Deal.</p>
      <p style={bullet}>— Communicate promptly if you are unable to meet a deadline or fulfill any obligation.</p>
      <p style={bullet}>— Post only Content you own or have full rights to, including any music, images, or third-party materials.</p>
      <p style={bullet}>— Maintain active, compliant accounts on all social media platforms represented in your profile.</p>
      <p style={bullet}>— Not accept payment outside the Platform for any Deal originated through Pearup.</p>
      <p style={body}>Creators are solely responsible for complying with FTC Endorsement Guidelines and all applicable advertising disclosure laws. You must clearly and conspicuously disclose any material connection to a Brand using unambiguous language such as "#ad," "#sponsored," or "Paid partnership with [Brand]." Pearup is not liable for any Creator's failure to comply with disclosure requirements.</p>

      <p style={sectionStyle}>6. Independent Contractor Status</p>
      <p style={body}>Creators are independent contractors — not employees, agents, partners, or franchisees of Pearup. Nothing in these Terms creates any employment relationship. Creators are solely responsible for all federal, state, and local taxes on income earned through the Platform. Creators who earn $600 or more in a calendar year may receive a Form 1099-NEC and must provide valid tax identification information upon request.</p>

      <p style={sectionStyle}>7. Brand Obligations</p>
      <p style={body}>By registering as a Brand, you represent that all information provided — including your business name, product descriptions, and campaign requirements — is accurate and truthful. As a Brand, you agree to:</p>
      <p style={bullet}>— Ensure all products and services promoted through the Platform are lawful, safe, truthful, and compliant with applicable law.</p>
      <p style={bullet}>— Provide complete, accurate, and lawful campaign briefs and creative directions.</p>
      <p style={bullet}>— Ship any agreed physical products to the Creator within 7 business days of Deal acceptance.</p>
      <p style={bullet}>— Make all payments through the Platform's designated payment system only.</p>
      <p style={bullet}>— Limit revision requests to one round of reasonable revisions. Additional revisions must be mutually agreed upon in writing within the Platform.</p>
      <p style={bullet}>— Not contact Creators for additional work outside the agreed Deal scope without initiating a new Deal through the Platform.</p>
      <p style={body}>Brands are solely responsible for all consumer complaints, product defects, service failures, shipping issues, warranties, fulfillment obligations, and any customer-facing legal obligations arising from their products or services.</p>

      <p style={sectionStyle}>8. Platform Fee & Payments</p>
      <p style={body}>Pearup charges a 12% platform fee on the total value of each Deal completed through the Platform. This fee is automatically deducted at the time of payment release. The 12% Platform Fee is non-negotiable and non-refundable under any circumstances, including in the event of a dispute, refund, or account termination.</p>
      <p style={body}>All payments are processed through Stripe. Pearup does not store payment card information. Brands must fund the Deal amount in full through the Platform before the Deal is marked active. All payments related to any Deal initiated through the Platform must be processed exclusively through Pearup. Circumventing the Platform to avoid paying the Platform Fee is a material breach of these Terms and may result in immediate account termination and legal remedies.</p>

      <p style={sectionStyle}>9. Content Delivery, Review & Payment Release</p>
      <p style={body}>Payment must be funded through the Platform before a Deal is marked active. Creators are not obligated to deliver Content until payment is confirmed. Once a Creator submits the completed Content or post link:</p>
      <p style={bullet}>— The Brand has <strong style={{ color: "white" }}>48 hours</strong> to review and file a dispute if the Content materially fails to conform to the agreed Deal terms.</p>
      <p style={bullet}>— If no dispute is filed within 48 hours, payment is automatically released to the Creator, less the 12% Platform Fee.</p>
      <p style={bullet}>— Creator payouts are processed within 3–5 business days after the review period closes without a dispute.</p>
      <p style={body}>Brands may request one round of revisions if delivered Content materially differs from what was agreed. Creators are not obligated to perform revisions beyond the original agreed scope.</p>

      <p style={sectionStyle}>10. Disputes Between Brands & Creators</p>
      <p style={body}>Pearup may, in its sole discretion, offer dispute mediation services. Pearup is not legally obligated to mediate or resolve disputes. In the event of a dispute, Pearup may hold funds in escrow, release funds to either party based on available evidence, issue a full or partial refund to the Brand, or decline to intervene. Pearup's dispute decisions are final and non-appealable within the Platform.</p>

      <p style={sectionStyle}>11. Intellectual Property & Content Ownership</p>
      <p style={body}>Creators retain full ownership of all original Content they create. No transfer of copyright occurs solely by virtue of these Terms. Upon full payment for a Deal, the Creator grants the Brand a non-exclusive, non-transferable, limited license to use the delivered Content on the Brand's own marketing channels for one year, unless a different scope is explicitly agreed upon in writing within the Deal. This license does not include the right to use Content in paid advertising (dark posts, whitelisting, boosted posts), to create derivative works, or to sub-license or transfer Content to third parties without Creator consent.</p>
      <p style={body}>The Pearup name, logo, platform design, and all proprietary materials are the exclusive intellectual property of Pearup and may not be copied or used without written permission.</p>

      <p style={sectionStyle}>12. Prohibited Conduct</p>
      <p style={body}>The following is strictly prohibited. Violations may result in immediate termination and legal action:</p>
      <p style={bullet}>— Sharing contact information to conduct deals outside the Platform.</p>
      <p style={bullet}>— Creating fake accounts, using bots, or artificially inflating follower counts or engagement.</p>
      <p style={bullet}>— Posting or promoting illegal, false, misleading, defamatory, offensive, hateful, or pornographic content.</p>
      <p style={bullet}>— Promoting or facilitating illegal products, controlled substances, or counterfeit goods.</p>
      <p style={bullet}>— Harassment, threats, intimidation, or abusive conduct toward any user.</p>
      <p style={bullet}>— Attempting to reverse engineer, scrape, or reproduce the Platform or its data.</p>
      <p style={bullet}>— Creating multiple accounts to evade a ban or circumvent restrictions.</p>
      <p style={bullet}>— Selling, transferring, or assigning your account to any other person or entity.</p>
      <p style={bullet}>— Using the Platform for spam, phishing, unsolicited marketing, or fraud.</p>

      <p style={sectionStyle}>13. Third-Party Platforms</p>
      <p style={body}>Pearup is not affiliated with, endorsed by, or partnered with Instagram, TikTok, YouTube, Meta, Google, Pinterest, or any other social media platform unless expressly stated in a separate written agreement. Pearup is not responsible for social media platform policy changes, algorithm updates, content moderation decisions, account suspensions, or changes in reach or visibility.</p>

      <p style={sectionStyle}>14. Release of Liability</p>
      <p style={caps}>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, EACH USER HEREBY RELEASES PEARUP, ITS FOUNDERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS FROM ANY AND ALL CLAIMS ARISING FROM OR RELATING TO: A CREATOR'S FAILURE TO PERFORM OR DELIVER; POOR QUALITY OR NON-CONFORMING CONTENT; MISSED DEADLINES OR CANCELLATIONS; BRAND DISSATISFACTION WITH CAMPAIGN RESULTS; PRODUCT DEFECTS OR CONSUMER COMPLAINTS; FALSE OR MISLEADING CLAIMS BY ANY USER; FTC DISCLOSURE FAILURES; SOCIAL MEDIA PLATFORM ACTIONS; LOW CAMPAIGN RESULTS; OR FRAUD, MISREPRESENTATION, OR MISCONDUCT BY ANY USER.</p>

      <p style={sectionStyle}>15. Disclaimers</p>
      <p style={caps}>THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND. PEARUP EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, UNINTERRUPTED OR ERROR-FREE PLATFORM ACCESS, AND WARRANTIES REGARDING CAMPAIGN PERFORMANCE, CONTENT QUALITY, OR BUSINESS RESULTS. USE OF THE PLATFORM IS AT EACH USER'S OWN RISK.</p>

      <p style={sectionStyle}>16. Limitation of Liability</p>
      <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEARUP'S TOTAL LIABILITY TO ANY USER FOR ANY CLAIM SHALL NOT EXCEED THE TOTAL PLATFORM FEES EARNED BY PEARUP FROM THAT USER'S DEALS IN THE 30 DAYS PRECEDING THE CLAIM. IN NO EVENT SHALL PEARUP BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, REGARDLESS OF THE LEGAL THEORY OR WHETHER PEARUP WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

      <p style={sectionStyle}>17. Indemnification</p>
      <p style={body}>Each User agrees to defend, indemnify, and hold harmless Pearup and its founders, officers, directors, employees, agents, and licensors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of: your use of the Platform in violation of these Terms; your Content; your products or services; your advertising claims; your breach of any representation or obligation; your violation of applicable law; or your tax obligations.</p>

      <p style={sectionStyle}>18. Account Suspension & Termination</p>
      <p style={body}>Pearup reserves the right, in its sole discretion, to suspend, restrict, or permanently terminate any account at any time for any reason, including violation of these Terms, suspected fraud, repeated disputes, or conduct posing legal or reputational risk to Pearup or other users. You may delete your account at any time by contacting Pearup. If an account is terminated while a Deal is in an active, payment-held state, any escrowed funds will be returned to the Brand within 7 business days. The Platform Fee is non-refundable if the Deal was marked active prior to termination.</p>

      <p style={sectionStyle}>19. Privacy & Data</p>
      <p style={body}>Your use of the Platform is subject to Pearup's Privacy Policy, incorporated into these Terms by reference. By using the Platform, you consent to Pearup's collection, processing, storage, and use of your personal information as described in the Privacy Policy.</p>

      <p style={sectionStyle}>20. Governing Law, Arbitration & Dispute Resolution</p>
      <p style={body}>These Terms are governed by the laws of the Commonwealth of Massachusetts, without regard to conflict of law principles.</p>
      <p style={caps}>ANY DISPUTE THAT CANNOT BE RESOLVED INFORMALLY SHALL BE RESOLVED EXCLUSIVELY THROUGH BINDING INDIVIDUAL ARBITRATION CONDUCTED BY THE AMERICAN ARBITRATION ASSOCIATION (AAA) UNDER ITS CONSUMER ARBITRATION RULES. ARBITRATION SHALL TAKE PLACE IN BOSTON, MASSACHUSETTS, OR VIA REMOTE HEARING. YOU EXPRESSLY WAIVE YOUR RIGHT TO PARTICIPATE IN ANY CLASS ACTION LAWSUIT, CLASS-WIDE ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING AGAINST PEARUP. YOU ALSO WAIVE YOUR RIGHT TO A JURY TRIAL. Either party may bring an individual claim in small claims court where the claim qualifies.</p>

      <p style={sectionStyle}>21. Changes to These Terms</p>
      <p style={body}>Pearup reserves the right to modify these Terms at any time. When material changes are made, Pearup will provide notice via the Platform or email at least 14 days prior to the effective date. Your continued use of the Platform after the updated Terms become effective constitutes binding acceptance.</p>

      <p style={sectionStyle}>22. Miscellaneous</p>
      <p style={body}>These Terms, together with the Privacy Policy and any other agreements incorporated herein, constitute the entire agreement between you and Pearup with respect to the Platform. If any provision is found invalid or unenforceable, it shall be modified to the minimum extent necessary, and remaining provisions continue in full force. You may not assign or transfer your rights or obligations under these Terms without Pearup's prior written consent. Pearup shall not be liable for delays or failures in performance resulting from causes beyond its reasonable control.</p>

      <p style={sectionStyle}>23. Contact</p>
      <p style={body}>For questions, concerns, or legal notices regarding these Terms, contact Pearup at: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>

      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "40px 0 0", fontStyle: "italic" }}>BY CREATING AN ACCOUNT OR USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY BOUND BY THESE TERMS OF SERVICE.</p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "60px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Pearup</a>
      </div>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: "12px 0 0" }}>© 2026 Pearup. All Rights Reserved.</p>
    </div>
  );
}
