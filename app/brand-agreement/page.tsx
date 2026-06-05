export default function BrandAgreement() {
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
      <h1 style={{ fontFamily: "Arial", fontSize: "28px", fontWeight: "700", letterSpacing: "4px", color: "white", margin: "0 0 8px" }}>Brand Agreement</h1>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>Version 1.0 | Effective Date: June 3, 2026</p>
      <div style={{ width: "40px", height: "2px", backgroundColor: "#c9a96e", margin: "24px 0 32px" }} />

      <p style={{ ...body, fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>Please read this Agreement carefully. By registering as a Brand or using the Platform, you agree to be legally bound by these terms.</p>

      <p style={sectionStyle}>Section 1. Definitions</p>
      <p style={body}>As used in this Brand Agreement, the following capitalized terms have the meanings set forth below:</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Agreement</strong> — this Brand Agreement, together with all policies and documents incorporated by reference, including the Terms of Service and Privacy Policy.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Brand</strong> — any company, business owner, individual, merchant, agency, or entity that registers on the Platform as a brand advertiser seeking content creation, influencer marketing, promotional, or advertising services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Campaign / Deal</strong> — an agreed engagement, project, or service arrangement between a Brand and a Creator initiated, documented, and managed through the Platform.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Content</strong> — any photographs, videos, reels, short-form videos, stories, posts, written copy, audio recordings, graphics, animations, or other creative materials produced or delivered by a Creator in connection with a Campaign.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Creator</strong> — any individual or entity registered on the Platform to offer content creation, influencer marketing, social media posting, user-generated content (UGC), photography, videography, or promotional services.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Introduced Creator</strong> — any Creator with whom Brand first established contact, communication, or a business relationship through or by means of the Platform.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform</strong> — the PearUp website, mobile application, software, tools, APIs, marketplace infrastructure, and all related services operated by PearUp.</p>
      <p style={bullet}>— <strong style={{ color: "rgba(255,255,255,0.85)" }}>Platform Fee</strong> — the twelve percent (12%) commission charged by PearUp on each completed transaction.</p>

      <p style={sectionStyle}>Section 2. Nature of the Platform & Pearup's Role</p>
      <p style={body}>PearUp is a technology marketplace and intermediary platform only. PearUp's sole role is to provide the technical infrastructure connecting Brands with Creators, facilitate communication and Campaign creation, process payments and disburse funds, and provide tools to support Campaign management.</p>
      <p style={body}>PearUp does not employ, supervise, direct, control, manage, endorse, or represent any Creator or Brand. PearUp is expressly not: an advertiser or co-advertiser, a marketing or advertising agency, a talent agency, an employer or staffing agency, a distributor or retailer, a publisher or media company, or a partner, joint venture party, or fiduciary of any kind. PearUp does not pre-screen, review, approve, verify, or monitor any Brand's products, services, advertising claims, or campaign materials.</p>
      <p style={body}>The relationship between a Brand and a Creator is a direct, independent contractual relationship. PearUp is not a party to any Deal except as expressly stated herein.</p>

      <p style={sectionStyle}>Section 3. Eligibility & Registration</p>
      <p style={body}>To register as a Brand and use the Platform, you must: be at least 18 years of age or the age of majority in your jurisdiction; have full legal capacity and authority to enter into binding contracts on behalf of the Brand entity; not be prohibited from using the Platform under applicable law; complete the registration process accurately and completely; and hold all permits, licenses, and registrations necessary to lawfully operate your business and offer the products and services you intend to promote.</p>
      <p style={body}>By registering, you represent, warrant, and covenant that all information provided — including your business name, identity, product or service descriptions, budget, and campaign requirements — is, and will remain, accurate, truthful, current, and complete. Deliberate misrepresentation is grounds for immediate and permanent account termination without liability to PearUp.</p>

      <p style={sectionStyle}>Section 4. Brand Representations & Warranties</p>
      <p style={body}>Brand represents, warrants, and covenants to PearUp and to each Creator, as of the effective date and on a continuous and ongoing basis:</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Authority & Capacity</strong> — Brand has full legal right, power, and authority to enter into this Agreement and perform all obligations hereunder. This Agreement constitutes a valid, binding, and enforceable obligation of Brand. If entering on behalf of a legal entity, the individual accepting has full authority to bind such entity.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Accuracy of Information</strong> — All information provided to PearUp and to Creators — including business descriptions, product descriptions, campaign briefs, advertising claims, and brand materials — is and will remain accurate, truthful, non-deceptive, and compliant with applicable law.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Lawfulness of Products & Services</strong> — All products and services Brand promotes through the Platform are lawful in all jurisdictions in which they are offered, marketed, or sold. All products comply with applicable product safety laws, labeling laws, consumer protection laws, and health and safety regulations. Brand holds all necessary permits, licenses, registrations, certifications, and governmental approvals required to offer, sell, and advertise its products and services.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Advertising & Marketing Claims</strong> — All advertising claims, marketing representations, and campaign briefs provided to Creators are truthful, non-deceptive, and not misleading. All objective product or service claims are substantiated by competent and reliable evidence. Brand will not instruct, encourage, or pressure any Creator to make false, deceptive, or misleading claims, or to conceal required advertising disclosures.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Intellectual Property Ownership</strong> — Brand owns or has obtained all necessary rights, licenses, consents, and permissions with respect to all trademarks, logos, slogans, trade dress, product images, photographs, videos, marketing materials, and other Intellectual Property Brand provides to Creators or instructs Creators to use. Brand's use of Intellectual Property through the Platform does not infringe any third-party right.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Privacy & Data Compliance</strong> — Brand's collection, use, processing, and disclosure of any personal data obtained through or in connection with the Platform complies with all applicable privacy and data protection laws, including CCPA/CPRA and GDPR (where applicable).</p>

      <p style={sectionStyle}>Section 5. Product & Service Compliance</p>
      <p style={body}>Brand assumes sole and exclusive responsibility for ensuring that all products and services promoted through the Platform, and all related advertising and marketing activities, comply with all applicable laws and regulations, including without limitation: the FTC Act and all FTC regulations; the Consumer Product Safety Act; the Food, Drug, and Cosmetic Act; the CAN-SPAM Act; the TCPA; all applicable state consumer protection statutes; all applicable product safety standards and recall obligations; all applicable financial regulations; all applicable privacy and data protection laws; and all applicable laws in each jurisdiction in which Brand's products and services are offered, sold, or marketed.</p>
      <p style={caps}>PEARUP BEARS NO RESPONSIBILITY WHATSOEVER FOR BRAND'S COMPLIANCE WITH ANY APPLICABLE LAW, REGULATION, OR REGULATORY REQUIREMENT. PEARUP DOES NOT REVIEW, APPROVE, OR VERIFY THE LAWFULNESS, SAFETY, OR REGULATORY COMPLIANCE OF ANY BRAND'S PRODUCTS, SERVICES, OR ADVERTISING CAMPAIGNS. BRAND IS SOLELY AND EXCLUSIVELY RESPONSIBLE FOR ALL COMPLIANCE OBLIGATIONS.</p>

      <p style={sectionStyle}>Section 6. Prohibited Products & Services</p>
      <p style={body}>The following categories of products and services are strictly prohibited on the Platform:</p>
      <p style={bullet}>— Illegal drugs, controlled substances, or drug paraphernalia.</p>
      <p style={bullet}>— Counterfeit, replica, or knockoff products; products that infringe any third-party Intellectual Property right.</p>
      <p style={bullet}>— Firearms, ammunition, explosives, weapons, or dangerous items.</p>
      <p style={bullet}>— Pornography, adult entertainment, escort services, or any sexual or adult content service.</p>
      <p style={bullet}>— Unlicensed gambling services, sports betting, casinos, or lottery services.</p>
      <p style={bullet}>— Pyramid schemes, Ponzi schemes, chain letters, or fraudulent multi-level marketing programs.</p>
      <p style={bullet}>— Unregistered securities offerings; investment schemes misrepresenting expected returns; pump-and-dump schemes; cryptocurrency schemes that constitute unregistered securities offerings.</p>
      <p style={bullet}>— Products making false, misleading, or unsubstantiated health or medical claims; products claiming to cure, treat, or prevent disease without FDA approval.</p>
      <p style={bullet}>— Products recalled by the CPSC, FDA, or any other regulatory authority.</p>
      <p style={bullet}>— Tobacco or vaping products marketed or accessible to minors.</p>
      <p style={bullet}>— Products or services promoting hatred, discrimination, or violence based on protected characteristics.</p>
      <p style={bullet}>— Any product or service whose promotion, sale, or distribution violates any applicable federal, state, or local law or regulation.</p>
      <p style={body}>PearUp reserves the right, in its sole and absolute discretion, to reject any Campaign it deems inappropriate, remove any active Campaign, terminate any Brand account associated with prohibited products or services, and report potential violations to regulatory authorities.</p>

      <p style={sectionStyle}>Section 7. Advertising & Marketing Compliance</p>
      <p style={body}>Brand assumes sole and full responsibility for ensuring that all advertising campaigns, campaign briefs, and advertising claims comply with all applicable advertising laws and regulations, including the FTC Act, FTC Endorsement Guides (16 C.F.R. Part 255), all applicable state consumer protection and false advertising laws, and the FDA's guidance on marketing dietary supplements, cosmetics, and health-related products.</p>
      <p style={body}>Brand expressly agrees that it will not, under any circumstances, instruct, encourage, compensate, or incentivize any Creator to: make any false, misleading, deceptive, or unsubstantiated claim about any product or service; conceal, hide, suppress, or omit any required advertising or sponsorship disclosure; represent a paid commercial relationship as an unpaid, organic endorsement; or remove or obscure advertising disclosures after Content is published.</p>
      <p style={caps}>PEARUP IS NOT AN ADVERTISER, CO-ADVERTISER, OR ADVERTISING AGENCY. PEARUP DOES NOT REVIEW, APPROVE, OR VERIFY THE LEGAL COMPLIANCE OF ANY BRAND'S ADVERTISING CAMPAIGNS, CAMPAIGN BRIEFS, OR ADVERTISING CLAIMS. PEARUP SHALL BEAR NO LIABILITY WHATSOEVER FOR ANY VIOLATION OF ADVERTISING LAW, FTC REGULATIONS, OR CONSUMER PROTECTION LAWS ARISING FROM BRAND'S CAMPAIGNS. ALL ADVERTISING LIABILITY ARISING FROM BRAND'S CAMPAIGNS SHALL BE BORNE SOLELY BY BRAND.</p>

      <p style={sectionStyle}>Section 8. Health, Wellness & Medical Claims</p>
      <p style={body}>Brand promoting any health, wellness, medical, dietary supplement, cosmetic, skincare, or beauty product must ensure that all health and wellness claims are truthful, non-deceptive, and substantiated by competent and reliable scientific evidence; that any structure/function claim made about a dietary supplement includes all required FDA disclaimers; that no claim constitutes a drug claim unless the product is an FDA-approved drug; and that all ingredient disclosures and labeling comply with applicable FDA and FTC requirements. By initiating any such Campaign, Brand certifies that the product complies with all applicable FDA regulations and guidance. PearUp is expressly released from any and all liability arising from health, wellness, medical, dietary supplement, cosmetic, or skincare claims made in connection with any Campaign.</p>

      <p style={sectionStyle}>Section 9. Financial Products, Investment & Crypto Compliance</p>
      <p style={body}>Brand promoting any financial product, investment product, cryptocurrency product, lending product, insurance product, or securities-related promotion must comply with all applicable laws, including the Securities Act of 1933, the Securities Exchange Act of 1934, FINRA rules, applicable state securities laws, applicable banking laws, and applicable cryptocurrency and digital asset regulations. Brand agrees that it will not instruct any Creator to promote an unregistered security, engage in or instruct any Creator to engage in paid promotion of a security without all required SEC disclosures, or engage in any pump-and-dump scheme or market manipulation. Brand assumes sole and exclusive responsibility for compliance with all financial regulatory requirements. PearUp is expressly released from any liability arising from Brand's financial product promotions.</p>

      <p style={sectionStyle}>Section 10. Intellectual Property</p>
      <p style={body}>Brand represents and warrants that it owns or controls all rights necessary to use, license, and authorize the use of all trademarks, service marks, logos, slogans, product images, photographs, videos, marketing materials, and other Intellectual Property provided to Creators in connection with any Campaign. Brand's use of any Intellectual Property through the Platform does not infringe, misappropriate, or dilute any third-party trademark, copyright, patent, trade secret, or other Intellectual Property right. Brand shall defend, indemnify, and hold harmless PearUp and all Creators from and against any losses, damages, costs, and expenses arising from any third-party claim that Brand's Intellectual Property or instructions to Creators infringe any third-party right.</p>

      <p style={sectionStyle}>Section 11. Product Liability & Consumer Claims</p>
      <p style={body}>Brand assumes sole, exclusive, and full responsibility for all claims, losses, damages, liabilities, costs, and expenses arising from or relating to: any actual or alleged defect in any product or service promoted or sold by Brand; any product recall, safety alert, or government enforcement action; any personal injury, death, property damage, or financial loss suffered by any consumer; any customer complaint, return, refund demand, warranty claim, or service failure; any shipping damage or fulfillment failure; any product liability claim under any theory of liability; any consumer protection law violation; and any class action or mass action relating to Brand's products or services.</p>
      <p style={caps}>PEARUP SHALL HAVE NO LIABILITY WHATSOEVER WITH RESPECT TO ANY PRODUCT OR SERVICE PROMOTED BY BRAND THROUGH THE PLATFORM. PEARUP DOES NOT MANUFACTURE, SELL, DISTRIBUTE, FULFILL, SHIP, WARRANT, OR TAKE TITLE TO ANY BRAND'S PRODUCTS. PEARUP IS NOT A CO-SELLER, DISTRIBUTOR, OR RETAILER OF ANY BRAND'S PRODUCTS. ANY CONSUMER CLAIM ARISING FROM A BRAND'S PRODUCT IS SOLELY THE RESPONSIBILITY OF BRAND.</p>

      <p style={sectionStyle}>Section 12. Payment Terms & Platform Fees</p>
      <p style={body}>PearUp charges a Platform Fee equal to twelve percent (12%) of the total value of each Campaign completed through the Platform. This fee is automatically deducted from the transaction at the time of payment release. The Platform Fee is non-negotiable and non-refundable under any circumstances, including in the event of a dispute, partial refund, or account termination, provided that the Campaign was marked active prior to such event.</p>
      <p style={body}>All payments are processed through Stripe. PearUp does not store payment card information. Brand must fund the full Deal amount through the Platform before the Deal is marked active. All payments related to any Campaign initiated through the Platform must be processed exclusively through PearUp. Circumventing the Platform to avoid paying the Platform Fee is strictly prohibited and constitutes a material breach of this Agreement.</p>
      <p style={body}>If Brand initiates an unauthorized chargeback after a Campaign has been completed and Content delivered in accordance with agreed Campaign terms, PearUp reserves the right to permanently suspend Brand's account, recover any Platform Fees and processing costs, reverse any payment to Creator pending resolution of the chargeback, and pursue all available legal remedies.</p>

      <p style={sectionStyle}>Section 13. Non-Circumvention</p>
      <p style={body}>With respect to any Introduced Creator — meaning any Creator with whom Brand first established contact, communication, or a business relationship through or by means of the Platform — Brand shall not, for a period of twenty-four (24) months following the date of such introduction, directly or indirectly: solicit, accept, initiate, or discuss any business arrangement with the Introduced Creator outside of the Platform; accept any content creation or promotional service from the Introduced Creator through any channel other than the Platform; or share personal contact information with the Introduced Creator for the purpose of facilitating or enabling off-Platform transactions.</p>
      <p style={body}>In the event of any violation of this Section, PearUp shall be entitled to: immediate termination of Brand's account without notice or refund; liquidated damages equal to the Platform Fee (12%) that PearUp would have earned on the total value of all off-Platform transactions during the restriction period, plus an additional twelve percent (12%) penalty; recovery of all actual, documented losses; injunctive relief; and recovery of all reasonable attorneys' fees, court costs, and expenses.</p>

      <p style={sectionStyle}>Section 14. Confidentiality</p>
      <p style={body}>"Confidential Information" means any non-public information disclosed to Brand by PearUp or by any Creator in connection with the Platform or any Campaign, including Creator identity, contact information, rates, pricing, campaign performance data, audience data, Creator business strategies, PearUp's proprietary technology, Platform data and analytics, and PearUp's business relationships.</p>
      <p style={body}>Brand agrees to: hold all Confidential Information in strict confidence; not disclose any Confidential Information to any third party without prior written consent; use Confidential Information solely for the purpose of conducting Campaigns through the Platform; and promptly notify PearUp in writing of any unauthorized disclosure or use. Brand's obligations under this Section survive termination for a period of five (5) years, and indefinitely for trade secrets.</p>

      <p style={sectionStyle}>Section 15. Data Privacy & Protection</p>
      <p style={body}>Brand represents, warrants, and covenants that Brand's activities on the Platform comply with all applicable privacy and data protection laws, including CCPA/CPRA, GDPR (where applicable), Brazil's LGPD, Colombia's Ley 1581 de 2012, Mexico's LFPDPPP, and all other applicable national, state, or local privacy laws. Brand agrees to protect all personal data received in connection with any Campaign using reasonable security measures; not share, sell, or disclose any personal data received in connection with the Platform to any third party without prior written consent; and notify PearUp within seventy-two (72) hours of becoming aware of any actual or suspected data security incident.</p>

      <p style={sectionStyle}>Section 16. Platform Disclaimer & No Guarantee of Results</p>
      <p style={caps}>BRAND ACKNOWLEDGES THAT PEARUP DOES NOT GUARANTEE, AND EXPRESSLY DISCLAIMS ANY WARRANTY REGARDING: CAMPAIGN RESULTS, SALES, OR REVENUE; AUDIENCE REACH, VIEWS, IMPRESSIONS, OR ENGAGEMENT; CONVERSIONS, LEADS, TRAFFIC, OR CLICKS; BRAND AWARENESS IMPROVEMENT OR REPUTATIONAL BENEFIT; CREATOR PERFORMANCE, CONTENT QUALITY, OR AUDIENCE AUTHENTICITY; OR RETURN ON INVESTMENT OR ADVERTISING EFFECTIVENESS. ALL PLATFORM SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND. BRAND ASSUMES ALL RISK ASSOCIATED WITH CAMPAIGN OUTCOMES.</p>

      <p style={sectionStyle}>Section 17. Release of Liability</p>
      <p style={caps}>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, BRAND HEREBY RELEASES, DISCHARGES, AND FOREVER HOLDS HARMLESS PEARUP AND ITS FOUNDERS, OFFICERS, DIRECTORS, EMPLOYEES, SHAREHOLDERS, INVESTORS, ADVISORS, AFFILIATES, LICENSORS, SERVICE PROVIDERS, SUCCESSORS, ASSIGNS, AND AGENTS FROM ANY AND ALL CLAIMS, DEMANDS, LIABILITIES, DAMAGES, LOSSES, CAUSES OF ACTION, COSTS, AND EXPENSES ARISING FROM OR RELATING TO: CREATOR PERFORMANCE, DELAYS, NON-DELIVERY, OR FAILURE TO COMPLETE ANY CAMPAIGN; CAMPAIGN RESULTS, ENGAGEMENT, REACH, CONVERSIONS, SALES, OR OTHER BUSINESS OUTCOMES; LOST SALES, LOST REVENUE, OR LOST PROFITS; PRODUCT CLAIMS OR ENDORSEMENT CONTENT MADE BY ANY CREATOR; CONSUMER COMPLAINTS RELATING TO BRAND'S PRODUCTS OR SERVICES; ADVERTISING DISPUTES, FTC INVESTIGATIONS, OR REGULATORY ENFORCEMENT ACTIONS; THIRD-PARTY INTELLECTUAL PROPERTY DISPUTES ARISING FROM CAMPAIGN CONTENT; SOCIAL MEDIA PLATFORM ALGORITHM CHANGES, ACCOUNT SUSPENSIONS, OR CONTENT TAKEDOWNS; OR ANY FRAUD, MISREPRESENTATION, OR MISCONDUCT BY ANY CREATOR.</p>

      <p style={sectionStyle}>Section 18. Indemnification</p>
      <p style={body}>To the fullest extent permitted by applicable law, Brand shall defend, indemnify, protect, and hold harmless PearUp and each of its founders, officers, directors, employees, shareholders, investors, affiliates, licensors, service providers, successors, assigns, and agents from and against any and all claims, demands, suits, proceedings, governmental investigations, losses, liabilities, damages, settlements, judgments, fines, penalties, costs, and expenses (including reasonable attorneys' fees, expert fees, and court costs) arising out of or relating to: Brand's products and services; Brand's advertising campaigns; consumer claims; product liability claims; Intellectual Property infringement; privacy violations; regulatory investigations by the FTC, FDA, SEC, FINRA, CFPB, or any state attorney general; FTC civil investigative demands or enforcement actions; class action lawsuits; financial regulatory actions; non-circumvention violations; and any breach of any representation, warranty, covenant, or obligation by Brand under this Agreement.</p>
      <p style={body}>Brand's indemnification obligations include the obligation to assume the defense of any indemnified claim upon PearUp's written request, and to advance reasonable legal defense costs to PearUp without awaiting the outcome of the underlying proceeding. Brand's indemnification obligations survive the termination or expiration of this Agreement.</p>

      <p style={sectionStyle}>Section 19. Limitation of Liability</p>
      <p style={caps}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PEARUP OR ANY PEARUP PARTY BE LIABLE TO BRAND OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY, OR ENHANCED DAMAGES OF ANY KIND, INCLUDING: LOSS OF PROFITS, REVENUE, INCOME, OR BUSINESS OPPORTUNITY; LOSS OF DATA, LOSS OF GOODWILL, OR LOSS OF REPUTATION; BUSINESS INTERRUPTION DAMAGES; REPUTATIONAL DAMAGES OR BRAND DAMAGE; DAMAGES ARISING FROM CAMPAIGN FAILURE OR POOR CONTENT PERFORMANCE; OR DAMAGES ARISING FROM SOCIAL MEDIA PLATFORM ACTIONS. THESE EXCLUSIONS APPLY REGARDLESS OF THE LEGAL THEORY AND EVEN IF PEARUP HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
      <p style={caps}>PEARUP'S TOTAL AGGREGATE LIABILITY TO BRAND FOR ANY AND ALL CLAIMS ARISING UNDER OR RELATING TO THIS AGREEMENT OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL PLATFORM FEES PAID BY BRAND DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE APPLICABLE CLAIM FIRST AROSE; OR (B) ONE HUNDRED UNITED STATES DOLLARS (USD $100.00).</p>

      <p style={sectionStyle}>Section 20. Account Suspension & Termination</p>
      <p style={body}>PearUp reserves the right, in its sole and absolute discretion and without incurring any liability to Brand, to suspend, restrict, or permanently terminate Brand's account and access to the Platform at any time, with or without notice, and for any reason, including: violation of any provision of this Agreement, the Terms of Service, or any Platform policy; actual or suspected fraud, identity misrepresentation, or payment manipulation; repeated disputes, chargebacks, or non-payment; promotion of prohibited products or services; regulatory concerns or governmental investigations involving Brand; any conduct posing legal, regulatory, reputational, or financial risk to PearUp; or any governmental or law enforcement request requiring suspension or termination.</p>
      <p style={body}>Upon termination: Brand's license to use the Platform is immediately revoked; PearUp may remove Brand's profile and campaign data; any escrowed funds for active Campaigns will be returned to Brand within seven (7) business days; the Platform Fee is non-refundable for Campaigns that were active prior to termination.</p>

      <p style={sectionStyle}>Section 21. Dispute Resolution & Governing Law</p>
      <p style={body}>This Agreement is governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, United States of America, without regard to conflict of law provisions.</p>
      <p style={body}>Before initiating any arbitration, the party asserting a dispute shall provide written notice and the parties shall negotiate in good faith for thirty (30) days to attempt to resolve the dispute informally.</p>
      <p style={caps}>ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THIS AGREEMENT, THE PLATFORM, OR ANY CAMPAIGN THAT CANNOT BE RESOLVED INFORMALLY SHALL BE RESOLVED EXCLUSIVELY THROUGH FINAL, BINDING INDIVIDUAL ARBITRATION ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION ("AAA") UNDER ITS COMMERCIAL ARBITRATION RULES. ARBITRATION SHALL TAKE PLACE IN BOSTON, MASSACHUSETTS, OR VIA REMOTE HEARING AS PERMITTED BY THE AAA. BRAND EXPRESSLY AND IRREVOCABLY WAIVES ANY RIGHT TO BRING OR PARTICIPATE IN ANY CLASS ACTION LAWSUIT, CLASS-WIDE ARBITRATION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, MASS ARBITRATION, OR ANY OTHER REPRESENTATIVE OR CONSOLIDATED PROCEEDING AGAINST PEARUP. ALL DISPUTES SHALL BE ARBITRATED ON AN INDIVIDUAL BASIS ONLY. BRAND ALSO EXPRESSLY AND IRREVOCABLY WAIVES ANY RIGHT TO A JURY TRIAL.</p>
      <p style={body}>Notwithstanding the foregoing, either party may seek temporary restraining orders, preliminary injunctions, and other emergency equitable relief from a court of competent jurisdiction (including for violations of the non-circumvention and confidentiality provisions) without waiving the right to arbitration. Any such proceeding shall be brought exclusively in the state or federal courts located in Boston, Massachusetts.</p>

      <p style={sectionStyle}>Section 22. General Provisions</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Entire Agreement</strong> — This Agreement, together with PearUp's Terms of Service and Privacy Policy, constitutes the entire agreement between Brand and PearUp with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, representations, and negotiations, whether oral or written.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Amendments</strong> — PearUp reserves the right to modify this Agreement at any time. When material changes are made, PearUp will provide notice at least fourteen (14) days prior to the effective date. Brand's continued use of the Platform after the effective date of any amendment constitutes Brand's binding acceptance.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Severability</strong> — If any provision is found invalid, illegal, or unenforceable, it shall be modified to the minimum extent necessary, and the remaining provisions continue in full force.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>No Waiver</strong> — PearUp's failure to enforce any right or remedy shall not constitute a waiver. No waiver of any breach constitutes a waiver of any subsequent breach.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Assignment</strong> — Brand may not assign or transfer any rights or obligations under this Agreement without PearUp's prior written consent. Any purported assignment without such consent is null and void. PearUp may assign its rights and obligations without Brand's consent.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Electronic Acceptance</strong> — Clicking "I Agree," completing registration, or otherwise affirmatively accepting this Agreement through electronic means constitutes Brand's legally binding signature, with the same legal effect as a handwritten signature, pursuant to applicable electronic signature laws including the E-SIGN Act.</p>
      <p style={body}><strong style={{ color: "rgba(255,255,255,0.85)" }}>Contact</strong> — For questions, legal notices, or concerns regarding this Agreement, contact: <span style={{ color: "#c9a96e" }}>legal@pearup.com</span></p>

      <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "40px 0 0", fontStyle: "italic" }}>BY REGISTERING AS A BRAND, CLICKING "I AGREE," OR USING THE PLATFORM IN ANY WAY, BRAND ACKNOWLEDGES THAT BRAND HAS READ THIS AGREEMENT IN FULL, UNDERSTANDS ITS TERMS, AND AGREES TO BE LEGALLY BOUND BY ALL OF ITS PROVISIONS, INCLUDING THE BINDING ARBITRATION CLAUSE, CLASS ACTION WAIVER, JURY TRIAL WAIVER, LIMITATION OF LIABILITY, NON-CIRCUMVENTION OBLIGATIONS, AND INDEMNIFICATION OBLIGATIONS.</p>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "60px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "Arial", fontSize: "16px", fontWeight: "700", letterSpacing: "4px", color: "#c9a96e", margin: "0" }}>PEARUP</p>
        <a href="/" style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Pearup</a>
      </div>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: "12px 0 0" }}>© 2026 PearUp, LLC. All Rights Reserved.</p>
    </div>
  );
}
