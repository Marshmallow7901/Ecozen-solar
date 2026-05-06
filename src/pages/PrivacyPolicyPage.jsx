import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: `Ecozen Solar (Pty) Ltd ("Ecozen", "we", "us", or "our") is a South African solar energy company registered under the Companies Act 71 of 2008. Our registered address is in Johannesburg, Gauteng, South Africa. We install rooftop solar systems, supply EcoFlow portable backup units, and provide financing assistance to residential and commercial clients across South Africa.

This Privacy Policy explains how we collect, use, store, and protect your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable South African law.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect personal information only when you voluntarily provide it to us — for example when you:

• Request a quote, contact form submission, or callback via our website
• Sign a system installation or service agreement
• Register for updates or promotional communications
• Interact with our staff by phone, email, or in person

The categories of personal information we may collect include:
• Identity information: full name, ID number (only where legally required for finance applications)
• Contact details: email address, phone number, physical or postal address
• Property information: erf address, municipality, body corporate details (for SSEG applications)
• Financial information: monthly electricity bill estimates, loan application data shared with lending partners
• Technical data: IP address, browser type, and usage data collected automatically when you visit our website (see Cookies section below)`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We process your personal information only for lawful purposes, including:

• Preparing and delivering a personalised solar installation quote
• Conducting site assessments and managing your installation project
• Applying for SSEG approval on your behalf with your municipality
• Facilitating solar finance applications with approved lending partners (ABSA, Nedbank)
• Communicating updates about your installation, warranty, or maintenance plan
• Sending marketing communications — only where you have opted in
• Improving our website and services through aggregated, anonymised analytics
• Complying with our legal and regulatory obligations

We will never process your personal information in a way that is incompatible with the purpose for which it was collected.`,
  },
  {
    title: "4. Sharing Your Information",
    body: `We do not sell your personal information to third parties. We may share your information with:

• Trusted service providers (e.g., installation subcontractors, logistics partners) who are contractually bound to protect your data
• Finance partners (ABSA, Nedbank) solely to process solar loan applications you have requested
• Your municipality or Eskom, where necessary to complete SSEG grid-tie applications
• Legal or regulatory authorities where required by South African law or court order

All third parties with whom we share your data are required to maintain adequate data protection measures consistent with POPIA.`,
  },
  {
    title: "5. Cookies & Website Analytics",
    body: `Our website uses cookies and similar technologies to:

• Remember your preferences and improve your browsing experience
• Measure website traffic and page performance via anonymised analytics (e.g., Google Analytics)
• Support security features such as fraud detection

You may disable cookies through your browser settings. Disabling certain cookies may affect website functionality. We do not use cookies to build advertising profiles or sell your data to ad networks.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal information only for as long as is necessary to fulfil the purpose for which it was collected, or as required by law. In practice:

• Quote and contact enquiries: 2 years from last interaction, unless an installation agreement is signed
• Installation agreements and project records: 7 years (in line with South African tax and contract law)
• Marketing opt-in records: until you withdraw consent
• Website analytics data: 26 months (anonymised)

After the applicable retention period, personal information is securely deleted or irreversibly anonymised.`,
  },
  {
    title: "7. Security",
    body: `Ecozen implements appropriate technical and organisational measures to protect your personal information against loss, theft, unauthorised access, disclosure, or alteration. These measures include:

• Encrypted data transmission (TLS/HTTPS) for all website interactions
• Access controls limiting personal data to staff with a legitimate business need
• Secure storage of physical records and regular review of our security practices

No method of electronic transmission or storage is 100% secure. If you suspect a data breach involving your personal information, please contact us immediately.`,
  },
  {
    title: "8. Your Rights Under POPIA",
    body: `As a data subject under POPIA, you have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate, incomplete, or outdated information
• Request deletion or restriction of your personal information (subject to legal obligations)
• Object to the processing of your personal information for direct marketing
• Lodge a complaint with the Information Regulator of South Africa

To exercise any of these rights, contact our Information Officer using the details in Section 10 below. We will respond within 30 days.`,
  },
  {
    title: "9. Children's Privacy",
    body: `Our services are not directed at persons under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us and we will delete it promptly.`,
  },
  {
    title: "10. Contact & Information Officer",
    body: `If you have any questions about this Privacy Policy, wish to exercise your POPIA rights, or want to report a privacy concern, please contact:

Ecozen Solar — Information Officer
Email: privacy@ecozensolar.co.za
Phone: 010 123 4567
Address: Johannesburg, Gauteng, South Africa

You may also contact the Information Regulator of South Africa:
Website: www.justice.gov.za/inforeg/
Email: inforeg@justice.gov.za`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or South African law. The "Last updated" date at the top of this page will indicate when material changes were made. Continued use of our website or services after such changes constitutes your acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicyPage({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ background: "var(--bg)", minHeight: "100vh" }}
    >
      <div className="section-shell py-16 md:py-24">
        {/* Back button */}
        <button
          onClick={() => onNavigate("home")}
          className="btn-ghost mb-10 inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="tag mb-4 inline-flex">
            <Shield size={11} /> Legal
          </span>
          <h1 className="display-lg" style={{ color: "var(--text)" }}>
            Privacy <span className="text-gradient">Policy.</span>
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            Last updated: 5 May 2026 &nbsp;·&nbsp; Ecozen Solar (Pty) Ltd
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your privacy matters to us. This policy explains how Ecozen Solar collects, uses, and
            protects your personal information in accordance with the{" "}
            <strong style={{ color: "var(--text)" }}>
              Protection of Personal Information Act (POPIA)
            </strong>{" "}
            and other applicable South African law.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="glass-card mb-12 p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#30d158" }}>
            Contents
          </p>
          <ol className="grid gap-1 sm:grid-cols-2">
            {SECTIONS.map((s, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Body sections */}
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((s, i) => (
            <motion.section
              key={i}
              id={`section-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2
                className="mb-3 text-lg font-semibold"
                style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
              >
                {s.title}
              </h2>
              <div
                className="rounded-2xl border p-6 text-sm leading-relaxed whitespace-pre-line"
                style={{
                  borderColor: "var(--separator)",
                  background: "var(--card-bg)",
                  color: "var(--text-secondary)",
                }}
              >
                {s.body}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 border-t pt-10 text-center" style={{ borderColor: "var(--separator)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Questions about your data?
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="btn-primary mt-4"
          >
            Contact our Privacy Team
          </button>
        </div>
      </div>
    </motion.div>
  );
}
