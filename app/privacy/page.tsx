export default function PrivacyPolicy() {
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
      <h1 style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", letterSpacing: "4px", color: "white", margin: "0 0 8px" }}>Privacy Policy</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Effective Date: June 3, 2026 | Version 1.0</p>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Governing Law: Commonwealth of Massachusetts, USA</p>
      <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "24px 0 32px" }} />

      <p style={body}>This Privacy Policy describes how PearUp, LLC. ("PearUp," "we," "us," or "our") collects, uses, discloses, retains, and protects personal information about individuals who access or use the PearUp platform, website, mobile application, and all related services (collectively, the "Platform"). By creating an account or using the Platform, you acknowledge that you have read and understood this Policy. This Policy is incorporated by reference into PearUp's Terms of Service and forms part of the binding legal relationship between you and PearUp.</p>

      <p style={sectionStyle}>1. Who We Are & How to Contact Us</p>
      <p style={body}>PearUp, LLC. is the data controller responsible for personal information processed through the Platform. PearUp operates an online marketplace connecting brands and advertisers with content creators and influencers.</p>
      <p style={body}>Privacy inquiries, data subject requests, and legal notices should be directed to: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span>. We will respond within 45 days of receipt, with a possible extension of 45 additional days where reasonably necessary.</p>

      <p style={sectionStyle}>2. Information We Collect</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Account & Registration Information</strong> — Full name, email address, telephone number, physical address, company name and business type (Brands), social media handles and profile URLs, profile photograph and biography, niche and content categories (Creators), date of birth, and government-issued identification where required for age verification or tax compliance.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Payment & Financial Information</strong> — Payment card information and billing address (processed securely through Stripe), transaction records, invoices, refund history, Platform Fee records, payout history, and tax documentation. PearUp does not store full payment card numbers on its servers.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Social Media & Creator Profile Data</strong> — Linked social media account information, follower and subscriber counts, engagement metrics, audience demographic data, content performance metrics, historical campaign performance data, and content categories and posting frequency.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Campaign & Transaction Data</strong> — Deal and campaign terms, deliverables, timelines, content submissions, revision requests, payment release records, dispute records, and Brand-Creator interaction history.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Communication Data</strong> — Messages exchanged between Brands and Creators through the Platform, customer support requests, dispute filings, feedback, and reviews. Platform communications are not private from PearUp; we may monitor and analyze them for safety, fraud prevention, dispute resolution, and compliance.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Technical & Device Data</strong> — IP address, approximate geographic location, browser type and version, operating system and device type, device identifiers, session duration, pages viewed, clickstream data, and error logs.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>User-Generated Content</strong> — Profile content, campaign deliverables, portfolio materials, reviews, ratings, and other materials you post or submit. By submitting content, you acknowledge it may be visible to other users and, where made publicly visible, to the general public.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Information from Third Parties</strong> — Social media platforms (when you connect accounts), identity verification and fraud prevention services, payment processors, analytics providers, and publicly available sources.</p>

      <p style={sectionStyle}>3. How We Use Your Information</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform Operations</strong> — Creating and managing accounts, facilitating connections between Brands and Creators, enabling campaign creation and management, processing payments and disbursing funds, verifying user identities, providing customer support, and enforcing Platform policies.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Safety, Security & Fraud Prevention</strong> — Detecting and preventing fraudulent activity, verifying authenticity of social media metrics, monitoring for prohibited conduct and Terms violations, protecting the rights and safety of PearUp and users, investigating and resolving payment disputes, and maintaining Platform integrity.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform Improvement & Analytics</strong> — Analyzing usage patterns, conducting research and quality assurance, developing new features, testing and optimizing performance, and generating aggregated insights about Platform activity.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Marketing & Communications</strong> — Sending transactional communications, newsletters, product updates, and promotional communications (subject to your opt-out rights), personalizing your experience, and marketing PearUp's services to potential users.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Legal & Regulatory Purposes</strong> — Complying with applicable laws and legal processes, responding to subpoenas and court orders, enforcing our agreements, maintaining required business records, supporting investor due diligence and audits, facilitating corporate transactions, and tax reporting and compliance.</p>

      <p style={sectionStyle}>4. Cookies & Tracking Technologies</p>
      <p style={body}>We use cookies, web beacons, local storage, software development kits (SDKs), and device fingerprinting when you access the Platform. Categories include: strictly necessary cookies (required for authentication and security), performance and analytics cookies (Google Analytics), functional cookies (preferences and settings), and advertising and targeting cookies (Meta Pixel, TikTok Pixel, Google Ads conversion tracking).</p>
      <p style={body}>You can manage cookies through your browser settings. Disabling certain cookies may impair Platform functionality. You may also opt out of advertising-related cookies at www.aboutads.info or the NAI opt-out page.</p>

      <p style={sectionStyle}>5. Disclosure of Your Information</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Service Providers</strong> — We share information with third-party service providers including payment processors (Stripe), cloud hosting and infrastructure providers, analytics providers, customer support software providers, identity verification services, fraud prevention services, and legal and accounting advisors.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform Users</strong> — Creator profiles (including name, biography, social media handles, follower counts, engagement metrics, content samples, and niche) are visible to Brand users. Brand profiles are visible to Creator users. Reviews and ratings may be visible to other users.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Business Transfers</strong> — In connection with any merger, acquisition, financing, asset sale, or similar corporate transaction, we may transfer, disclose, or assign your personal information to relevant third parties without additional notice, to the maximum extent permitted by applicable law.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Legal Obligations</strong> — We may disclose personal information when required to comply with applicable law, respond to legal process, enforce our agreements, investigate and prevent fraud, or protect the rights and safety of PearUp, our users, and the public.</p>

      <p style={sectionStyle}>6. Social Media Platform Integrations</p>
      <p style={body}>When you connect your social media accounts to the Platform, you authorize PearUp to access, import, analyze, display, process, and store information from those accounts as permitted by the applicable platform's API. This may include profile information, follower counts, audience demographics, engagement metrics, published content, and account analytics.</p>
      <p style={body}>PearUp is an independent platform and is not affiliated with, endorsed by, or a partner of Instagram, TikTok, YouTube, Meta, Google, LinkedIn, X (formerly Twitter), Pinterest, or any other social media platform. PearUp is not responsible for the privacy practices or data handling of any third-party social media platform.</p>

      <p style={sectionStyle}>7. Data Retention</p>
      <p style={body}>We retain personal information for as long as necessary to fulfill the purposes for which it was collected, as required by law, and to support legitimate business interests. General retention periods:</p>
      <p style={bullet}>— Account information: Duration of your account plus up to 7 years following closure to comply with legal obligations.</p>
      <p style={bullet}>— Transaction and financial records: Minimum 7 years following the transaction date.</p>
      <p style={bullet}>— Communication records: Minimum 3 years or as necessary for dispute resolution.</p>
      <p style={bullet}>— Campaign and content data: Minimum 3 years following campaign completion.</p>
      <p style={bullet}>— Technical and device data: Generally up to 2 years.</p>
      <p style={body}>We reserve the right to retain personal information longer as necessary to comply with legal holds, ongoing legal proceedings, or regulatory investigations. At the expiration of the applicable retention period, we will securely delete or anonymize personal information.</p>

      <p style={sectionStyle}>8. Data Security</p>
      <p style={body}>We implement commercially reasonable technical and organizational security measures designed to protect against unauthorized access, disclosure, alteration, and destruction of personal information, including: encryption in transit (TLS), encryption of sensitive data at rest, access controls on a need-to-know basis, authentication requirements including multi-factor authentication, regular security assessments, and incident response procedures.</p>
      <p style={caps}>NO METHOD OF TRANSMISSION OVER THE INTERNET IS COMPLETELY SECURE. PEARUP DOES NOT GUARANTEE ABSOLUTE SECURITY AND CANNOT GUARANTEE THAT UNAUTHORIZED THIRD PARTIES WILL NEVER DEFEAT OUR SECURITY MEASURES. YOU ARE RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY OF YOUR ACCOUNT CREDENTIALS AND FOR ALL ACTIVITIES UNDER YOUR ACCOUNT. NOTIFY US IMMEDIATELY AT LEGAL@PEARUP.COM UPON BECOMING AWARE OF ANY UNAUTHORIZED ACCESS.</p>

      <p style={sectionStyle}>9. International Data Transfers</p>
      <p style={body}>PearUp is headquartered in the United States, and we process and store personal information on servers in the United States. If you access the Platform from outside the United States, your information will be transferred to, processed in, and stored in the United States. For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses or other appropriate legal mechanisms. For users in Colombia, Mexico, Brazil, and other Latin American jurisdictions, we process your information in compliance with applicable data protection laws including Colombia's Ley 1581 de 2012, Mexico's LFPDPPP, and Brazil's LGPD, to the extent applicable.</p>

      <p style={sectionStyle}>10. Marketing Communications</p>
      <p style={body}>By creating an account, you agree to receive transactional communications and, subject to applicable law and your opt-out rights, marketing communications from PearUp. You may opt out of marketing emails at any time by clicking "unsubscribe" in any marketing email, updating your account settings, or contacting us at legal@pearup.com. We will continue to send transactional and service-related communications regardless of opt-out status.</p>

      <p style={sectionStyle}>11. California Privacy Rights (CCPA/CPRA)</p>
      <p style={body}>California residents have the following rights under the CCPA/CPRA: Right to Know (categories and specific pieces of personal information collected), Right to Delete (request deletion, subject to exceptions), Right to Correct (correct inaccurate personal information), Right to Opt Out of Sale or Sharing, Right to Limit Use of Sensitive Personal Information, and Right to Non-Discrimination. To exercise your rights, contact us at legal@pearup.com. We will respond to verifiable consumer requests within 45 days.</p>

      <p style={sectionStyle}>12. GDPR Rights (EEA, UK & Switzerland)</p>
      <p style={body}>For individuals in the EEA, UK, and Switzerland, we process personal data on the following lawful bases: performance of a contract, legitimate interests, legal obligation, and consent (where applicable). You have the right of access, right to rectification, right to erasure ("right to be forgotten"), right to restriction of processing, right to data portability, right to object, and rights related to automated decision-making. To exercise these rights, contact us at legal@pearup.com. We will respond within one month, with a possible two-month extension.</p>

      <p style={sectionStyle}>13. Children's Privacy (COPPA)</p>
      <p style={body}>The Platform is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. Minors between 13 and 17 may use the Platform for limited browsing purposes only with verified parental or legal guardian consent; they may not send or receive payments, enter into Deals, or post Content without active parental involvement. If we discover we have collected information from a child under 13 without verifiable parental consent, we will delete that information immediately. Contact us at legal@pearup.com if you believe we may have collected information from a child under 13.</p>

      <p style={sectionStyle}>14. Links to Third-Party Websites</p>
      <p style={body}>The Platform may contain links to third-party websites, applications, and services. This Policy applies only to information processed by PearUp and does not apply to information collected by third parties. We are not responsible for the privacy practices of any third-party website or service.</p>

      <p style={sectionStyle}>15. Business Transfers</p>
      <p style={body}>In the event PearUp undergoes a merger, acquisition, financing, reorganization, dissolution, bankruptcy, asset sale, or similar corporate transaction, personal information may be one of the assets transferred or disclosed to prospective parties. Any acquirer or successor entity may continue to use your personal information as described in this Policy or will provide you with a new privacy notice.</p>

      <p style={sectionStyle}>16. Limitation of Liability</p>
      <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEARUP'S TOTAL LIABILITY ARISING FROM OR RELATED TO ANY DATA INCIDENT, UNAUTHORIZED ACCESS, CYBERATTACK, SERVICE INTERRUPTION, OR DATA BREACH SHALL BE LIMITED IN ACCORDANCE WITH THE LIMITATION OF LIABILITY PROVISIONS IN PEARUP'S TERMS OF SERVICE. IN NO EVENT SHALL PEARUP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING FROM OR RELATED TO ANY PRIVACY OR DATA MATTER, INCLUDING LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, OR REPUTATIONAL HARM.</p>

      <p style={sectionStyle}>17. Dispute Resolution & Arbitration</p>
      <p style={body}>Any dispute arising from or relating to this Privacy Policy shall be resolved through the binding arbitration process set forth in PearUp's Terms of Service, incorporated herein by reference. You waive the right to a jury trial and the right to participate in a class action lawsuit with respect to any privacy-related dispute with PearUp, to the maximum extent permitted by applicable law.</p>

      <p style={sectionStyle}>18. Additional State Privacy Rights</p>
      <p style={body}>In addition to California rights described above, residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Texas (TDPSA), and other states with comprehensive privacy laws may have additional rights, including the right to access, correct, delete, and obtain a copy of personal data, and the right to opt out of targeted advertising, sale, or profiling. To exercise your rights under applicable state law, contact us at legal@pearup.com.</p>

      <p style={sectionStyle}>19. Changes to This Policy</p>
      <p style={body}>We reserve the right to modify this Privacy Policy at any time. When material changes are made, we will notify you by posting the updated Policy with a revised Effective Date, sending a notification to your email address, and displaying a notice within the Platform. Your continued use of the Platform after the effective date of any updated Policy constitutes your acceptance.</p>

      <p style={sectionStyle}>20. Contact Information</p>
      <p style={body}>For any questions, concerns, complaints, or requests regarding this Privacy Policy or our data practices, contact our Privacy Office: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>
      <p style={body}>For data subject rights requests, include: (1) your full name and email address associated with your account; (2) the nature of your request; (3) the jurisdiction under whose laws you are making the request; and (4) any supporting information to help us verify your identity.</p>

      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "40px 0 0", fontStyle: "italic" }}>BY CREATING AN ACCOUNT OR USING THE PEARUP PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THIS PRIVACY POLICY AND CONSENT TO THE COLLECTION, USE, PROCESSING, AND DISCLOSURE OF YOUR PERSONAL INFORMATION AS DESCRIBED HEREIN.</p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "60px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Pearup</a>
      </div>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: "12px 0 0" }}>© 2026 PearUp, LLC. All Rights Reserved.</p>
    </div>
  );
}
