"use client";

import { useState } from "react";

const TABS = ["Terms of Service", "Privacy Policy", "Brand Agreement", "Creator Agreement"] as const;
type Tab = typeof TABS[number];

export default function Legal() {
  const [active, setActive] = useState<Tab>("Terms of Service");

  const body: React.CSSProperties = {
    fontFamily: "Georgia, serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.9",
    margin: "0 0 12px",
  };

  const bullet: React.CSSProperties = {
    fontFamily: "Georgia, serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.9",
    margin: "0 0 8px",
    paddingLeft: "20px",
  };

  const sec: React.CSSProperties = {
    fontFamily: "Arial",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#c9a96e",
    textTransform: "uppercase",
    margin: "36px 0 10px",
  };

  const caps: React.CSSProperties = {
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: "1.8",
    margin: "0 0 12px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "Arial", fontSize: "15px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", textDecoration: "none" }}>PEARUP</a>
        <p style={{ fontFamily: "Arial", fontSize: "10px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: 0 }}>Legal</p>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto", display: "flex" }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              flexShrink: 0,
              padding: "16px 24px",
              background: "none",
              border: "none",
              borderBottom: active === tab ? "2px solid #c9a96e" : "2px solid transparent",
              color: active === tab ? "#c9a96e" : "rgba(255,255,255,0.3)",
              fontFamily: "Arial",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color 0.2s",
              marginBottom: "-1px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {active === "Terms of Service" && <TermsContent body={body} bullet={bullet} sec={sec} caps={caps} />}
        {active === "Privacy Policy" && <PrivacyContent body={body} bullet={bullet} sec={sec} caps={caps} />}
        {active === "Brand Agreement" && <BrandContent body={body} bullet={bullet} sec={sec} caps={caps} />}
        {active === "Creator Agreement" && <CreatorContent body={body} bullet={bullet} sec={sec} caps={caps} />}

      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: 0 }}>© 2026 PearUp, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}

type StyleProps = {
  body: React.CSSProperties;
  bullet: React.CSSProperties;
  sec: React.CSSProperties;
  caps: React.CSSProperties;
};

function TermsContent({ body, bullet, sec, caps }: StyleProps) {
  return (
    <>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>Effective Date: June 3, 2026 · Version 1.0</p>
      <p style={body}>These Terms of Service ("Terms") govern your access to and use of the Pearup platform. By creating an account or using the Platform in any way, you agree to be legally bound by these Terms and our Privacy Policy. If you do not agree, you must immediately discontinue use.</p>

      <p style={sec}>1. Definitions</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Platform</strong> — the Pearup website, application, software, tools, and all related services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Brand</strong> — any company or individual registered to seek content creation or influencer marketing services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Creator</strong> — any individual registered to offer content creation or influencer marketing services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Deal</strong> — an agreed campaign or service arrangement between a Brand and a Creator initiated through the Platform.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.8)" }}>Platform Fee</strong> — the 12% commission charged by Pearup on each completed transaction.</p>

      <p style={sec}>2. Eligibility</p>
      <p style={body}>You must be at least 18 years of age, have legal capacity to enter binding contracts, and provide accurate registration information. Minors between 13–17 may browse with verified parental consent but may not send or receive payments or enter into Deals.</p>

      <p style={sec}>3. Pearup's Role</p>
      <p style={body}>Pearup is a technology marketplace and intermediary only. Pearup does not employ, supervise, or represent any Creator or Brand. Pearup is not a staffing agency, talent agency, or advertising agency. The relationship between a Brand and a Creator is a direct, independent contractual relationship. Pearup does not guarantee the quality, legality, accuracy, results, or commercial success of any Deal, Content, product, or service.</p>

      <p style={sec}>4. Creator Obligations</p>
      <p style={body}>By registering as a Creator, you represent that all information provided — including follower count, engagement rate, niche, and platforms — is accurate. Misrepresentation is grounds for immediate account termination. As a Creator you agree to:</p>
      <p style={bullet}>— Deliver all agreed Content within the timeframes specified in each Deal.</p>
      <p style={bullet}>— Communicate promptly if you are unable to meet a deadline or fulfill any obligation.</p>
      <p style={bullet}>— Post only Content you own or have full rights to, including any music, images, or third-party materials.</p>
      <p style={bullet}>— Not accept payment outside the Platform for any Deal originated through Pearup.</p>
      <p style={body}>Creators are solely responsible for complying with FTC Endorsement Guidelines. You must clearly disclose any material connection to a Brand using language such as "#ad," "#sponsored," or "Paid partnership with [Brand]." Pearup is not liable for any Creator's failure to comply with disclosure requirements.</p>

      <p style={sec}>5. Independent Contractor Status</p>
      <p style={body}>Creators are independent contractors — not employees, agents, or partners of Pearup. Creators are solely responsible for all taxes on income earned through the Platform. Creators who earn $600 or more in a calendar year may receive a Form 1099-NEC and must provide valid tax identification upon request.</p>

      <p style={sec}>6. Brand Obligations</p>
      <p style={body}>By registering as a Brand, you represent that all information provided is accurate and truthful. As a Brand you agree to:</p>
      <p style={bullet}>— Ensure all products and services promoted are lawful, safe, truthful, and compliant with applicable law.</p>
      <p style={bullet}>— Ship any agreed physical products to the Creator within 7 business days of Deal acceptance.</p>
      <p style={bullet}>— Make all payments through the Platform's designated payment system only.</p>
      <p style={bullet}>— Limit revision requests to one round of reasonable revisions per Deal.</p>
      <p style={body}>Brands are solely responsible for all consumer complaints, product defects, service failures, shipping issues, warranties, fulfillment obligations, and any customer-facing legal obligations.</p>

      <p style={sec}>7. Platform Fee & Payments</p>
      <p style={body}>Pearup charges a 12% platform fee on every Deal completed through the Platform. This fee is automatically deducted at payment release and is non-negotiable and non-refundable under any circumstances. All payments are processed through Stripe. All payments related to any Deal initiated on Pearup must be processed exclusively through Pearup. Circumventing the Platform to avoid the fee is a material breach of these Terms.</p>

      <p style={sec}>8. Content Delivery & Payment Release</p>
      <p style={body}>Brands must fund the Deal in full before the Deal is marked active. Once a Creator submits the completed Content or post link, the Brand has <strong style={{ color: "white" }}>48 hours</strong> to file a dispute. If no dispute is filed within 48 hours, payment is automatically released less the 12% fee. Creator payouts are processed within 3–5 business days after the review period closes.</p>

      <p style={sec}>9. Intellectual Property</p>
      <p style={body}>Creators retain full ownership of all original Content they create. Upon full payment, the Creator grants the Brand a non-exclusive, one-year license to use the delivered Content on their own marketing channels, unless a different scope is explicitly agreed upon in writing within the Deal. This license does not include the right to use Content in paid advertising, create derivative works, or sub-license Content without Creator consent.</p>

      <p style={sec}>10. Prohibited Conduct</p>
      <p style={bullet}>— Sharing contact information to conduct deals outside the Platform.</p>
      <p style={bullet}>— Creating fake accounts, using bots, or artificially inflating follower counts or engagement.</p>
      <p style={bullet}>— Posting or promoting illegal, false, misleading, defamatory, offensive, or hateful content.</p>
      <p style={bullet}>— Harassment, threats, intimidation, or abusive conduct toward any user.</p>
      <p style={bullet}>— Creating multiple accounts to evade a ban or circumvent restrictions.</p>
      <p style={bullet}>— Selling, transferring, or assigning your account to any other person or entity.</p>

      <p style={sec}>11. Disclaimers & Limitation of Liability</p>
      <p style={caps}>THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. PEARUP'S TOTAL LIABILITY TO ANY USER FOR ANY CLAIM SHALL NOT EXCEED THE TOTAL PLATFORM FEES EARNED FROM THAT USER'S DEALS IN THE 30 DAYS PRECEDING THE CLAIM. PEARUP IS NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES OF ANY KIND.</p>

      <p style={sec}>12. Indemnification</p>
      <p style={body}>You agree to defend, indemnify, and hold harmless Pearup and its founders, officers, directors, employees, agents, and licensors from any claims, damages, losses, liabilities, costs, and expenses arising out of your use of the Platform, your Content, your products or services, your advertising claims, or your violation of these Terms or applicable law.</p>

      <p style={sec}>13. Dispute Resolution</p>
      <p style={caps}>ANY DISPUTE THAT CANNOT BE RESOLVED INFORMALLY SHALL BE RESOLVED EXCLUSIVELY THROUGH BINDING INDIVIDUAL ARBITRATION CONDUCTED BY THE AMERICAN ARBITRATION ASSOCIATION (AAA) UNDER ITS CONSUMER ARBITRATION RULES, IN BOSTON, MASSACHUSETTS. YOU WAIVE YOUR RIGHT TO PARTICIPATE IN ANY CLASS ACTION LAWSUIT OR JURY TRIAL AGAINST PEARUP.</p>

      <p style={sec}>14. Governing Law & Contact</p>
      <p style={body}>These Terms are governed by the laws of the Commonwealth of Massachusetts. For questions or legal notices: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.25)", marginTop: "32px", fontStyle: "italic" }}>BY CREATING AN ACCOUNT OR USING THE PLATFORM, YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS OF SERVICE.</p>
    </>
  );
}

function PrivacyContent({ body, bullet, sec, caps }: StyleProps) {
  return (
    <>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>Effective Date: June 3, 2026 · Version 1.0 · Governing Law: Commonwealth of Massachusetts, USA</p>
      <p style={body}>This Privacy Policy describes how PearUp, LLC. collects, uses, discloses, retains, and protects personal information about individuals who access or use the PearUp platform. By creating an account or using the Platform, you acknowledge that you have read and understood this Policy, which is incorporated by reference into PearUp's Terms of Service.</p>

      <p style={sec}>1. Who We Are & Contact</p>
      <p style={body}>PearUp, LLC. is the data controller responsible for personal information processed through the Platform. Privacy inquiries, data subject requests, and legal notices: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span>. We respond within 45 days of receipt.</p>

      <p style={sec}>2. Information We Collect</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Account & Registration</strong> — Full name, email, phone number, physical address, company name (Brands), social media handles and profile URLs, profile photo and biography, niche and content categories (Creators), date of birth, and government-issued identification where required.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Payment & Financial</strong> — Billing address, transaction records, invoices, refund history, Platform Fee records, payout history, and tax documentation. Processed securely through Stripe; PearUp does not store full card numbers.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Social Media & Creator Data</strong> — Linked social media accounts, follower and subscriber counts, engagement metrics, audience demographic data, content performance metrics, and historical campaign data.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Campaign & Transaction Data</strong> — Deal terms, deliverables, timelines, content submissions, revision requests, payment release records, dispute records, and Brand-Creator interaction history.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Communication Data</strong> — Messages between Brands and Creators, support requests, dispute filings, feedback, and reviews. Platform communications are not private from PearUp; we may monitor them for safety, fraud prevention, and dispute resolution.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Technical & Device Data</strong> — IP address, approximate geographic location, browser type, operating system, device identifiers, session duration, pages viewed, clickstream data, and error logs.</p>

      <p style={sec}>3. How We Use Your Information</p>
      <p style={bullet}>— Platform operations: creating and managing accounts, facilitating connections, processing payments, verifying identities, providing customer support, enforcing policies.</p>
      <p style={bullet}>— Safety, security & fraud prevention: detecting fraudulent activity, verifying social media metrics authenticity, monitoring for prohibited conduct, investigating payment disputes.</p>
      <p style={bullet}>— Platform improvement & analytics: analyzing usage patterns, developing new features, testing and optimizing performance.</p>
      <p style={bullet}>— Marketing & communications: transactional communications, newsletters, product updates, and promotional communications (subject to your opt-out rights).</p>
      <p style={bullet}>— Legal & regulatory compliance: complying with applicable laws, responding to legal process, enforcing our agreements, supporting investor due diligence, tax reporting.</p>

      <p style={sec}>4. Cookies & Tracking</p>
      <p style={body}>We use cookies, web beacons, local storage, and device fingerprinting. Categories include: strictly necessary cookies (authentication and security), performance and analytics cookies (Google Analytics), functional cookies (preferences), and advertising and targeting cookies (Meta Pixel, TikTok Pixel, Google Ads). You can manage cookies through your browser settings.</p>

      <p style={sec}>5. Disclosure of Your Information</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Service Providers</strong> — Payment processors (Stripe), cloud hosting, analytics, customer support software, identity verification, fraud prevention, and legal and accounting advisors.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Platform Users</strong> — Creator profiles (name, biography, social media handles, follower counts, engagement metrics, content samples, niche) are visible to Brand users. Brand profiles are visible to Creator users.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Business Transfers</strong> — In connection with any merger, acquisition, financing, asset sale, or similar corporate transaction, we may transfer your personal information to relevant third parties without additional notice.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Legal Obligations</strong> — When required to comply with applicable law, respond to legal process, enforce our agreements, investigate and prevent fraud, or protect the rights and safety of PearUp, our users, and the public.</p>

      <p style={sec}>6. Social Media Platform Integrations</p>
      <p style={body}>When you connect your social media accounts to the Platform, you authorize PearUp to access, import, analyze, and store information from those accounts as permitted by the applicable platform's API. PearUp is not affiliated with or endorsed by Instagram, TikTok, YouTube, Meta, Google, LinkedIn, X, Pinterest, or any other social media platform. PearUp is not responsible for the privacy practices of any third-party social media platform.</p>

      <p style={sec}>7. Data Retention</p>
      <p style={bullet}>— Account information: Duration of your account plus up to 7 years following closure.</p>
      <p style={bullet}>— Transaction and financial records: Minimum 7 years following the transaction date.</p>
      <p style={bullet}>— Communication records: Minimum 3 years or as necessary for dispute resolution.</p>
      <p style={bullet}>— Campaign and content data: Minimum 3 years following campaign completion.</p>
      <p style={bullet}>— Technical and device data: Generally up to 2 years.</p>

      <p style={sec}>8. Data Security</p>
      <p style={body}>We implement commercially reasonable security measures including TLS encryption in transit, encryption of sensitive data at rest, access controls on a need-to-know basis, multi-factor authentication, regular security assessments, and incident response procedures.</p>
      <p style={caps}>NO METHOD OF TRANSMISSION OVER THE INTERNET IS COMPLETELY SECURE. PEARUP DOES NOT GUARANTEE ABSOLUTE SECURITY. YOU ARE RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY OF YOUR ACCOUNT CREDENTIALS. NOTIFY US IMMEDIATELY AT LEGAL@PEARUP.COM UPON BECOMING AWARE OF ANY UNAUTHORIZED ACCESS.</p>

      <p style={sec}>9. International Data Transfers</p>
      <p style={body}>PearUp is headquartered in the United States and processes and stores data on servers in the United States. For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses or other appropriate legal mechanisms. For users in Colombia, Mexico, Brazil, and other Latin American jurisdictions, we process your information in compliance with applicable data protection laws including Colombia's Ley 1581 de 2012, Mexico's LFPDPPP, and Brazil's LGPD.</p>

      <p style={sec}>10. Your Rights</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>California (CCPA/CPRA)</strong> — Right to Know, Right to Delete, Right to Correct, Right to Opt Out of Sale or Sharing, Right to Limit Use of Sensitive Personal Information, and Right to Non-Discrimination. We respond to verifiable consumer requests within 45 days.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>EEA / UK / Switzerland (GDPR)</strong> — Right of Access, Right to Rectification, Right to Erasure, Right to Restriction, Right to Data Portability, Right to Object, and Rights Related to Automated Decision-Making. We respond within one month.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Other U.S. States</strong> — Residents of Virginia, Colorado, Connecticut, Texas, and other states with comprehensive privacy laws may have additional rights including the right to access, correct, delete, and opt out of targeted advertising. Contact us at legal@pearup.com.</p>

      <p style={sec}>11. Children's Privacy</p>
      <p style={body}>The Platform is not intended for individuals under 13. We do not knowingly collect personal information from children under 13. Minors between 13–17 may only browse with verified parental consent and may not send or receive payments, enter into Deals, or post Content. Contact legal@pearup.com immediately if you believe we have collected information from a child under 13.</p>

      <p style={sec}>12. Marketing Communications</p>
      <p style={body}>You may opt out of marketing emails at any time by clicking "unsubscribe" in any marketing email, updating your account settings, or contacting us at legal@pearup.com. Transactional and service-related communications will continue regardless of opt-out status.</p>

      <p style={sec}>13. Dispute Resolution & Arbitration</p>
      <p style={caps}>ANY DISPUTE ARISING FROM OR RELATING TO THIS PRIVACY POLICY SHALL BE RESOLVED THROUGH THE BINDING ARBITRATION PROCESS SET FORTH IN PEARUP'S TERMS OF SERVICE. YOU WAIVE THE RIGHT TO A JURY TRIAL AND THE RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT WITH RESPECT TO ANY PRIVACY-RELATED DISPUTE.</p>

      <p style={sec}>14. Changes to This Policy</p>
      <p style={body}>We reserve the right to modify this Privacy Policy at any time. We will notify you by posting the updated Policy with a revised Effective Date, sending an email notification, and displaying a notice within the Platform. Your continued use of the Platform after the effective date constitutes your acceptance.</p>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.25)", marginTop: "32px", fontStyle: "italic" }}>BY CREATING AN ACCOUNT OR USING THE PLATFORM, YOU CONSENT TO THE COLLECTION, USE, PROCESSING, AND DISCLOSURE OF YOUR PERSONAL INFORMATION AS DESCRIBED HEREIN.</p>
    </>
  );
}

function BrandContent({ body, bullet, sec, caps }: StyleProps) {
  return (
    <>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>Version 1.0 · Effective Date: June 3, 2026</p>
      <p style={{ ...body, fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>By registering as a Brand or using the Platform, you agree to be legally bound by this Agreement.</p>

      <p style={sec}>Section 1. Pearup's Role</p>
      <p style={body}>PearUp is a technology marketplace and intermediary only. PearUp does not employ, supervise, direct, control, manage, endorse, or represent any Creator or Brand. PearUp is not an advertiser, marketing agency, talent agency, employer, distributor, publisher, or fiduciary of any kind. PearUp does not pre-screen, review, approve, verify, or monitor any Brand's products, services, advertising claims, or campaign materials. The relationship between a Brand and a Creator is a direct, independent contractual relationship.</p>

      <p style={sec}>Section 2. Brand Representations & Warranties</p>
      <p style={body}>Brand represents, warrants, and covenants on a continuous and ongoing basis that:</p>
      <p style={bullet}>— Brand has full legal right, power, and authority to enter into this Agreement and perform all obligations hereunder.</p>
      <p style={bullet}>— All information provided to PearUp and to Creators — including business descriptions, product descriptions, campaign briefs, and advertising claims — is and will remain accurate, truthful, non-deceptive, and compliant with applicable law.</p>
      <p style={bullet}>— All products and services Brand promotes through the Platform are lawful in all jurisdictions in which they are offered, marketed, or sold. Brand holds all necessary permits, licenses, registrations, certifications, and governmental approvals required to offer, sell, and advertise its products and services.</p>
      <p style={bullet}>— All advertising claims and campaign briefs provided to Creators are truthful, non-deceptive, and not misleading. All objective product or service claims are substantiated by competent and reliable evidence.</p>
      <p style={bullet}>— Brand owns or has obtained all necessary rights, licenses, consents, and permissions with respect to all trademarks, logos, product images, photographs, videos, marketing materials, and other Intellectual Property provided to Creators. Brand's use of such materials does not infringe any third-party right.</p>
      <p style={bullet}>— Brand's collection, use, processing, and disclosure of any personal data obtained through or in connection with the Platform complies with all applicable privacy and data protection laws, including CCPA/CPRA and GDPR where applicable.</p>

      <p style={sec}>Section 3. Prohibited Products & Services</p>
      <p style={body}>The following categories are strictly prohibited on the Platform:</p>
      <p style={bullet}>— Illegal drugs, controlled substances, or drug paraphernalia.</p>
      <p style={bullet}>— Counterfeit, replica, or knockoff products; products that infringe any third-party Intellectual Property right.</p>
      <p style={bullet}>— Firearms, ammunition, explosives, weapons, or dangerous items.</p>
      <p style={bullet}>— Pornography, adult entertainment, or escort services.</p>
      <p style={bullet}>— Unlicensed gambling services, sports betting, casinos, or lottery services.</p>
      <p style={bullet}>— Pyramid schemes, Ponzi schemes, or fraudulent multi-level marketing programs.</p>
      <p style={bullet}>— Unregistered securities offerings; cryptocurrency schemes that constitute unregistered securities offerings; pump-and-dump schemes.</p>
      <p style={bullet}>— Products making false, misleading, or unsubstantiated health or medical claims; products claiming to cure, treat, or prevent disease without FDA approval.</p>
      <p style={bullet}>— Products recalled by the CPSC, FDA, or any other regulatory authority.</p>
      <p style={bullet}>— Products or services promoting hatred, discrimination, or violence based on protected characteristics.</p>
      <p style={bullet}>— Any product or service whose promotion, sale, or distribution violates any applicable federal, state, or local law or regulation.</p>
      <p style={body}>PearUp reserves the right, in its sole discretion, to reject any Campaign, remove any active Campaign, terminate any Brand account associated with prohibited products, and report potential violations to regulatory authorities.</p>

      <p style={sec}>Section 4. Advertising & Marketing Compliance</p>
      <p style={body}>Brand assumes sole and full responsibility for ensuring all advertising campaigns and advertising claims comply with all applicable advertising laws and regulations, including the FTC Act, FTC Endorsement Guides (16 C.F.R. Part 255), all applicable state consumer protection and false advertising laws, and the FDA's guidance on marketing dietary supplements, cosmetics, and health-related products.</p>
      <p style={body}>Brand expressly agrees that it will not instruct, encourage, compensate, or incentivize any Creator to: make any false, misleading, deceptive, or unsubstantiated claim; conceal, hide, or omit any required advertising or sponsorship disclosure; represent a paid commercial relationship as an unpaid, organic endorsement; or remove or obscure advertising disclosures after Content is published.</p>
      <p style={caps}>PEARUP IS NOT AN ADVERTISER, CO-ADVERTISER, OR ADVERTISING AGENCY. PEARUP DOES NOT REVIEW, APPROVE, OR VERIFY THE LEGAL COMPLIANCE OF ANY BRAND'S ADVERTISING CAMPAIGNS. PEARUP SHALL BEAR NO LIABILITY WHATSOEVER FOR ANY VIOLATION OF ADVERTISING LAW, FTC REGULATIONS, OR CONSUMER PROTECTION LAWS ARISING FROM BRAND'S CAMPAIGNS. ALL ADVERTISING LIABILITY ARISING FROM BRAND'S CAMPAIGNS SHALL BE BORNE SOLELY BY BRAND.</p>

      <p style={sec}>Section 5. Product Liability & Consumer Claims</p>
      <p style={body}>Brand assumes sole, exclusive, and full responsibility for all claims, losses, damages, liabilities, costs, and expenses arising from any actual or alleged defect in any product or service promoted or sold by Brand; any product recall, safety alert, or government enforcement action; any personal injury, death, property damage, or financial loss suffered by any consumer; any customer complaint, return, refund demand, warranty claim, or service failure; any product liability claim under any theory of liability; and any class action or mass action relating to Brand's products or services.</p>
      <p style={caps}>PEARUP SHALL HAVE NO LIABILITY WHATSOEVER WITH RESPECT TO ANY PRODUCT OR SERVICE PROMOTED BY BRAND. PEARUP DOES NOT MANUFACTURE, SELL, DISTRIBUTE, FULFILL, SHIP, WARRANT, OR TAKE TITLE TO ANY BRAND'S PRODUCTS. ANY CONSUMER CLAIM ARISING FROM A BRAND'S PRODUCT IS SOLELY THE RESPONSIBILITY OF BRAND.</p>

      <p style={sec}>Section 6. Platform Fee & Payments</p>
      <p style={body}>PearUp charges a Platform Fee equal to 12% of the total value of each Campaign completed through the Platform. This fee is automatically deducted at payment release and is non-negotiable and non-refundable under any circumstances. All payments must be processed through Stripe. Circumventing the Platform to avoid paying the Platform Fee is strictly prohibited and constitutes a material breach of this Agreement. If Brand initiates an unauthorized chargeback after a Campaign has been completed and Content delivered, PearUp reserves the right to permanently suspend Brand's account, recover any Platform Fees and processing costs, and pursue all available legal remedies.</p>

      <p style={sec}>Section 7. Non-Circumvention</p>
      <p style={body}>With respect to any Creator with whom Brand first established contact through or by means of the Platform ("Introduced Creator"), Brand shall not, for a period of twenty-four (24) months following the date of such introduction, directly or indirectly: solicit, accept, initiate, or discuss any business arrangement with the Introduced Creator outside of the Platform; accept any content creation or promotional service from the Introduced Creator through any channel other than the Platform; or share personal contact information with the Introduced Creator for the purpose of facilitating off-Platform transactions.</p>
      <p style={body}>Violations entitle PearUp to: immediate account termination without refund; liquidated damages equal to the Platform Fee (12%) that PearUp would have earned plus a 12% penalty on all off-Platform transaction value; recovery of all actual, documented losses; injunctive relief; and recovery of all reasonable attorneys' fees, court costs, and expenses.</p>

      <p style={sec}>Section 8. Indemnification & Limitation of Liability</p>
      <p style={body}>Brand shall defend, indemnify, protect, and hold harmless PearUp and each of its founders, officers, directors, employees, shareholders, investors, affiliates, licensors, service providers, successors, assigns, and agents from and against any and all claims, demands, suits, proceedings, governmental investigations, losses, liabilities, damages, settlements, judgments, fines, penalties, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to Brand's products and services, advertising campaigns, consumer claims, product liability claims, Intellectual Property infringement, privacy violations, regulatory investigations by the FTC, FDA, SEC, FINRA, CFPB, or any state attorney general, FTC civil investigative demands or enforcement actions, class action lawsuits, financial regulatory actions, non-circumvention violations, and any breach of any representation, warranty, covenant, or obligation under this Agreement.</p>
      <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEARUP'S TOTAL AGGREGATE LIABILITY TO BRAND FOR ANY AND ALL CLAIMS ARISING UNDER OR RELATING TO THIS AGREEMENT OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL PLATFORM FEES PAID BY BRAND DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE APPLICABLE CLAIM FIRST AROSE; OR (B) ONE HUNDRED UNITED STATES DOLLARS (USD $100.00). IN NO EVENT SHALL PEARUP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR ENHANCED DAMAGES OF ANY KIND.</p>

      <p style={sec}>Section 9. Dispute Resolution & Governing Law</p>
      <p style={body}>This Agreement is governed by the laws of the Commonwealth of Massachusetts, USA. Before initiating arbitration, the parties shall negotiate in good faith for thirty (30) days.</p>
      <p style={caps}>ANY DISPUTE THAT CANNOT BE RESOLVED INFORMALLY SHALL BE RESOLVED EXCLUSIVELY THROUGH FINAL, BINDING INDIVIDUAL ARBITRATION ADMINISTERED BY THE AAA UNDER ITS COMMERCIAL ARBITRATION RULES IN BOSTON, MASSACHUSETTS. BRAND EXPRESSLY AND IRREVOCABLY WAIVES ANY RIGHT TO CLASS ACTION LAWSUIT, CLASS-WIDE ARBITRATION, MASS ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING AGAINST PEARUP. BRAND ALSO WAIVES ANY RIGHT TO A JURY TRIAL.</p>

      <p style={sec}>Section 10. General Provisions</p>
      <p style={body}>This Agreement, together with PearUp's Terms of Service and Privacy Policy, constitutes the entire agreement between Brand and PearUp. PearUp may modify this Agreement at any time with 14 days' notice. Brand's continued use of the Platform after the effective date of any amendment constitutes binding acceptance. Brand may not assign or transfer any rights or obligations under this Agreement without PearUp's prior written consent. Clicking "I Agree," completing registration, or otherwise affirmatively accepting this Agreement constitutes Brand's legally binding signature pursuant to the E-SIGN Act. For questions, legal notices, or concerns: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.25)", marginTop: "32px", fontStyle: "italic" }}>BY REGISTERING AS A BRAND, CLICKING "I AGREE," OR USING THE PLATFORM IN ANY WAY, BRAND ACKNOWLEDGES THAT BRAND HAS READ THIS AGREEMENT IN FULL AND AGREES TO BE LEGALLY BOUND BY ALL OF ITS PROVISIONS.</p>
    </>
  );
}

function CreatorContent({ body, bullet, sec, caps }: StyleProps) {
  return (
    <>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>Effective Date: June 3, 2026 · Version 1.0</p>
      <p style={{ ...body, fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>By clicking "I Agree," completing registration, or using the Platform in any capacity, you acknowledge that you have read, understood, and agree to be legally bound by this Agreement.</p>

      <p style={sec}>Section 1. Pearup's Role & Independent Contractor Status</p>
      <p style={body}>PearUp is a technology marketplace and intermediary only. PearUp does not employ, supervise, direct, control, manage, endorse, or represent any Creator or Brand. PearUp is not a staffing agency, talent agency, advertising agency, marketing firm, publisher, media company, joint venture partner, or fiduciary of any kind. PearUp does not pre-screen, review, approve, verify, or monitor any Content, Campaign, or Creator conduct.</p>
      <p style={body}>Creator is an independent contractor. Nothing in this Agreement creates any employment relationship, agency relationship, partnership, joint venture, franchise, or fiduciary relationship between PearUp and Creator. Creator has no authority, express or implied, to make any representation, warranty, or commitment on behalf of PearUp.</p>
      <p style={body}>As an independent contractor, Creator is solely and exclusively responsible for: all federal, state, local, and international income taxes, self-employment taxes, payroll taxes, sales taxes, and any other taxes arising from Creator's income or activities; obtaining and maintaining all business licenses, permits, registrations, and professional certifications required by applicable law; obtaining and maintaining all necessary insurance coverage; compliance with all applicable labor, employment, immigration, and worker classification laws; all regulatory compliance obligations, including advertising disclosure requirements; and all equipment, software, subscriptions, and operational costs incurred in performing Services.</p>

      <p style={sec}>Section 2. Eligibility & Registration</p>
      <p style={body}>To register as a Creator you must be at least eighteen (18) years of age or the age of majority in your jurisdiction, have legal capacity to enter into binding contracts, not be prohibited from using the Platform under applicable law, and complete the registration process accurately and completely.</p>
      <p style={body}>By registering, you represent, warrant, and covenant that: all information provided — including follower counts, engagement rates, audience demographics, reach statistics, and performance data — is, and will remain, accurate, current, truthful, and complete; you will not create duplicate or multiple accounts; you will not transfer, sell, or assign your account to any other person; and you will maintain active, compliant accounts on all social media platforms represented in your profile. Deliberate or material misrepresentation of any information is grounds for immediate and permanent account termination.</p>

      <p style={sec}>Section 3. Creator Representations & Warranties</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Authenticity of Social Media Presence</strong> — All follower counts, subscriber counts, engagement rates, view counts, impression statistics, and reach data displayed on Creator's profile are authentic and accurately represent Creator's genuine, organic social media presence. Creator has not purchased and will not purchase followers, likes, comments, shares, views, or any other form of social media engagement. Creator does not use and has never used bots, automated engagement tools, click farms, engagement pods designed to artificially inflate metrics, or any other mechanism to artificially inflate any social media metric.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Content Representations</strong> — All Content delivered or published in connection with any Campaign is Creator's original work or Creator possesses all rights, licenses, consents, and permissions necessary to use, deliver, and license such Content. No Content infringes, misappropriates, or violates any Intellectual Property right, publicity right, privacy right, or moral right of any third party. All claims, statements, endorsements, and testimonials in Content are truthful, non-deceptive, substantiated where required by law, and based on Creator's genuine opinion and experience. Creator has obtained all necessary written consents, model releases, and property releases from all individuals appearing in Content.</p>

      <p style={sec}>Section 4. Intellectual Property</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Creator Ownership</strong> — Creator retains full ownership of all original Content created by Creator. No transfer of copyright occurs solely by virtue of this Agreement.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>License to PearUp</strong> — Creator grants PearUp a non-exclusive, worldwide, royalty-free, sublicensable, transferable license to host, store, display, transmit, process, reproduce, and use Creator's Content and profile materials solely to the extent necessary to operate, improve, promote, and provide the Platform.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>License to Brands</strong> — Upon full payment for a Campaign, Creator grants the Brand a limited, non-exclusive, non-transferable license to use the delivered Content on the Brand's own marketing channels for one (1) year, unless a different scope is explicitly negotiated. This default license does not include the right to use Content in paid advertising, dark posts, whitelisting, or boosted posts without Creator's express written consent; the right to modify, alter, or create derivative works; or the right to sublicense, sell, or transfer Content to third parties.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>AI-Generated Content</strong> — Creator must clearly disclose to both PearUp and the Brand if any portion of the delivered Content was generated or substantially modified using artificial intelligence tools. Creator represents and warrants that any AI-generated Content does not infringe any third-party Intellectual Property rights and does not constitute a deepfake depicting any real, identifiable individual without that individual's express written consent. Creator shall not represent AI-generated Content as wholly human-created without appropriate disclosure.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.8)" }}>Music & Audio</strong> — All music, sound recordings, and audio elements incorporated in any Content must be fully cleared for all contemplated uses through valid licenses or through use of royalty-free or original compositions. Creator acknowledges that platform-licensed music (e.g., Instagram Music, TikTok Sound Library) may only be used pursuant to the specific terms of those platforms and may not carry over to other uses, including Brand advertising.</p>

      <p style={sec}>Section 5. FTC Compliance & Advertising Disclosure</p>
      <p style={body}>Creator is solely, exclusively, and fully responsible for complying with all applicable advertising disclosure laws, consumer protection laws, and truth-in-advertising requirements, including the FTC Act, FTC Endorsement Guides (16 C.F.R. Part 255), all applicable state consumer protection statutes, and all rules, policies, and guidelines of each social media platform on which Creator publishes sponsored Content.</p>
      <p style={body}>In connection with every Campaign and every piece of sponsored, paid, gifted, or otherwise compensated Content, Creator must:</p>
      <p style={bullet}>— Include a clear, conspicuous, and unambiguous disclosure of the material relationship with the Brand, placed where it will be easily noticed before the audience engages with the Content.</p>
      <p style={bullet}>— Use disclosure language complying with current FTC guidance, such as "#ad," "#sponsored," "#paid," "Paid partnership with [Brand]," or equivalent clear and unambiguous language.</p>
      <p style={bullet}>— Ensure disclosures are not buried within hashtags, below "more" links, in fine print, or in any other placement where they are unlikely to be noticed.</p>
      <p style={bullet}>— Disclose all material connections to the Brand, including: cash compensation, free products, gifts, discounts, affiliate commissions, equity interests, and any other consideration of value.</p>
      <p style={bullet}>— Not remove or obscure disclosures after Content is published without the Brand's written consent and without replacing them with equivalent language.</p>
      <p style={caps}>PEARUP IS NOT RESPONSIBLE FOR REVIEWING, APPROVING, OR ENSURING THE COMPLIANCE OF CREATOR'S CONTENT WITH FTC REQUIREMENTS OR ANY ADVERTISING DISCLOSURE LAW. PEARUP SHALL BEAR NO LIABILITY WHATSOEVER FOR ANY CREATOR'S FAILURE TO INCLUDE REQUIRED DISCLOSURES, FOR ANY DECEPTIVE ADVERTISING PRACTICES, OR FOR ANY FINES, PENALTIES, ENFORCEMENT ACTIONS, OR CIVIL LIABILITY ARISING FROM CREATOR'S NON-COMPLIANCE WITH ADVERTISING LAWS. ANY REGULATORY ENFORCEMENT ACTION, CIVIL CLAIM, OR OTHER CONSEQUENCE ARISING FROM CREATOR'S ADVERTISING DISCLOSURES OR LACK THEREOF IS SOLELY CREATOR'S RESPONSIBILITY.</p>

      <p style={sec}>Section 6. Creator Service Obligations</p>
      <p style={body}>In connection with each Campaign accepted through the Platform, Creator shall:</p>
      <p style={bullet}>— Deliver all agreed Content and Services within the timeframes specified in the Campaign terms.</p>
      <p style={bullet}>— Create Content that materially conforms to the scope, specifications, creative brief, and requirements agreed upon in the Campaign.</p>
      <p style={bullet}>— Communicate promptly with the Brand and with PearUp regarding any circumstances that may prevent Creator from meeting a deadline or fulfilling any Campaign obligation.</p>
      <p style={bullet}>— Post Content only on the social media platforms and accounts specified in the Campaign terms.</p>
      <p style={bullet}>— Not accept payment outside the Platform for any Campaign or Brand relationship originated through the Platform.</p>
      <p style={bullet}>— Not subcontract, outsource, or delegate the performance of any material Campaign obligation to any third party without the Brand's prior written consent.</p>
      <p style={bullet}>— Retain and preserve all original files, raw materials, and supporting documentation related to Content deliverables for a period of not less than three (3) years following Campaign completion.</p>

      <p style={sec}>Section 7. Platform Fee & Payment Terms</p>
      <p style={body}>PearUp charges a Platform Fee equal to 12% of the total value of each Campaign completed through the Platform. This fee is automatically deducted at payment release and is non-negotiable and non-refundable under any circumstances. Following delivery of agreed Content: the Brand has forty-eight (48) hours to review and file a dispute; if no dispute is filed, payment is automatically released to Creator less the Platform Fee; Creator payouts are processed within 3–5 business days after the review period closes. Creator is solely and exclusively responsible for determining and satisfying all tax obligations arising from income earned through the Platform. Creators who earn $600 USD or more in a calendar year may receive IRS Form 1099-NEC and must provide a completed Form W-9 upon request.</p>

      <p style={sec}>Section 8. Prohibited Content</p>
      <p style={body}>The following categories of Content are strictly prohibited on the Platform and in connection with any Campaign:</p>
      <p style={bullet}>— Misleading, deceptive, or false statements about a product's characteristics, benefits, efficacy, safety, or origin.</p>
      <p style={bullet}>— Defamatory, libelous, or slanderous Content.</p>
      <p style={bullet}>— Content promoting or inciting hatred, discrimination, harassment, or violence based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, disability, age, or any other protected characteristic.</p>
      <p style={bullet}>— Content that harasses, intimidates, threatens, or demeans any individual.</p>
      <p style={bullet}>— Pornographic, obscene, or sexually explicit Content; Content that sexualizes minors in any manner.</p>
      <p style={bullet}>— Content promoting or facilitating the sale of illegal products, controlled substances, drug paraphernalia, counterfeit goods, or weapons.</p>
      <p style={bullet}>— Content promoting gambling, sports betting, unlicensed financial products, or cryptocurrency investment schemes without appropriate regulatory disclosures and licensing.</p>
      <p style={bullet}>— Content making unauthorized medical claims or promoting prescription drugs for off-label use.</p>
      <p style={bullet}>— Content promoting any investment opportunity, security, or financial product in a manner that violates applicable securities laws or constitutes fraud.</p>
      <p style={bullet}>— Content glorifying, inciting, or providing instructions for violence, self-harm, or illegal dangerous activities.</p>
      <p style={bullet}>— Content disclosing the private information of any individual without their consent.</p>
      <p style={bullet}>— Content that infringes any third-party copyright, trademark, patent, trade secret, or other Intellectual Property right.</p>

      <p style={sec}>Section 9. Non-Circumvention</p>
      <p style={body}>With respect to any Brand with which Creator first established contact through or by means of the Platform ("Introduced Brand"), Creator shall not, for a period of twenty-four (24) months following the date of such introduction, directly or indirectly: solicit, accept, initiate, or discuss any business arrangement with the Introduced Brand outside of the Platform; accept any payment, compensation, gift, equity, or consideration of any kind from the Introduced Brand in connection with any services except through the Platform; or share personal contact information (email addresses, telephone numbers, direct social media handles, personal websites, or any other off-platform contact method) with the Introduced Brand for the purpose of facilitating off-Platform transactions.</p>
      <p style={body}>Violations entitle PearUp to: immediate account termination without refund; liquidated damages equal to the Platform Fee (12%) that PearUp would have earned plus a 12% penalty on all off-Platform transaction value; recovery of all actual, documented losses; injunctive relief; and recovery of all reasonable attorneys' fees, court costs, and expenses.</p>

      <p style={sec}>Section 10. Indemnification & Limitation of Liability</p>
      <p style={body}>Creator shall defend, indemnify, protect, and hold harmless PearUp and each of its founders, officers, directors, employees, shareholders, investors, affiliates, subsidiaries, licensors, service providers, successors, assigns, and agents from and against any and all claims, demands, suits, proceedings, governmental investigations, losses, liabilities, damages, settlements, judgments, fines, penalties, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: any Content created, delivered, or published by Creator; any violation of FTC guidelines, consumer protection laws, or advertising disclosure requirements; any infringement or misappropriation of any third-party Intellectual Property rights; any violation of applicable privacy laws or data protection regulations; any failure to pay applicable taxes; any claim that Creator is or should be classified as an employee of PearUp; any breach of this Agreement or any Campaign terms; any circumvention of the Platform; or any use of fake followers, purchased engagement, bots, or other fraudulent social media practices.</p>
      <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEARUP'S TOTAL AGGREGATE LIABILITY TO CREATOR FOR ANY AND ALL CLAIMS ARISING UNDER OR RELATING TO THIS AGREEMENT OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL PLATFORM FEES PAID BY CREATOR DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE APPLICABLE CLAIM FIRST AROSE; OR (B) ONE HUNDRED UNITED STATES DOLLARS (USD $100.00). IN NO EVENT SHALL PEARUP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR ENHANCED DAMAGES OF ANY KIND.</p>

      <p style={sec}>Section 11. Dispute Resolution & Governing Law</p>
      <p style={body}>This Agreement is governed by the laws of the Commonwealth of Massachusetts, USA. Before initiating arbitration, the parties shall negotiate in good faith for thirty (30) days.</p>
      <p style={caps}>ANY DISPUTE THAT CANNOT BE RESOLVED INFORMALLY SHALL BE RESOLVED EXCLUSIVELY THROUGH FINAL, BINDING INDIVIDUAL ARBITRATION ADMINISTERED BY THE AAA UNDER ITS CONSUMER ARBITRATION RULES IN BOSTON, MASSACHUSETTS. CREATOR EXPRESSLY AND IRREVOCABLY WAIVES ANY RIGHT TO CLASS ACTION LAWSUIT, CLASS-WIDE ARBITRATION, MASS ARBITRATION, OR ANY OTHER REPRESENTATIVE PROCEEDING AGAINST PEARUP. CREATOR ALSO WAIVES ANY RIGHT TO A JURY TRIAL. The prevailing party in any arbitration shall be entitled to recover reasonable attorneys' fees and costs.</p>

      <p style={sec}>Section 12. General Provisions</p>
      <p style={body}>This Agreement, together with PearUp's Terms of Service and Privacy Policy, constitutes the entire agreement between Creator and PearUp. PearUp may modify this Agreement at any time with 14 days' notice. Creator's continued use of the Platform after the effective date of any amendment constitutes binding acceptance. Creator may not assign or transfer any rights or obligations under this Agreement without PearUp's prior written consent. Clicking "I Agree," completing registration, or otherwise affirmatively accepting this Agreement constitutes Creator's legally binding signature pursuant to the E-SIGN Act. For questions, legal notices, or concerns: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.25)", marginTop: "32px", fontStyle: "italic" }}>BY REGISTERING AS A CREATOR, CLICKING "I AGREE," OR USING THE PLATFORM IN ANY WAY, CREATOR ACKNOWLEDGES THAT CREATOR HAS READ THIS AGREEMENT IN FULL AND AGREES TO BE LEGALLY BOUND BY ALL OF ITS PROVISIONS, INCLUDING THE BINDING ARBITRATION CLAUSE, CLASS ACTION WAIVER, JURY TRIAL WAIVER, LIMITATION OF LIABILITY, AND INDEMNIFICATION OBLIGATIONS.</p>
    </>
  );
}
