import React, { useState, useEffect } from "react";
import { Shield, FileText, Truck, RefreshCw, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "privacy", label: "Privacy Policy", icon: Shield },
  { id: "terms", label: "Terms of Service", icon: FileText },
  { id: "disclosure", label: "Hauler Vetting Disclosure", icon: Truck },
  { id: "refund", label: "Refund Policy", icon: RefreshCw },
];

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "DisposalGrid collects information you provide directly to us, such as when you request a quote, create an account, submit a job request, or contact us. This includes: name, email address, zip code, service address, and communications data. We also collect usage data, device identifiers, and IP addresses automatically when you access our platform."
      },
      {
        heading: "2. How We Use Your Information",
        body: "We use collected information to: (a) match your service request with verified local hauling professionals in our network; (b) route your contact information to a vetted local pro to facilitate quote generation; (c) send transactional and marketing communications; (d) improve platform algorithms and directory rankings; (e) comply with legal obligations."
      },
      {
        heading: "3. Data Routing to Local Pros",
        callout: true,
        body: "IMPORTANT: When you submit a service request, your name, zip code, email address, and job description are transmitted in real-time to up to three (3) locally matched hauling professionals. This is a core function of the aggregator service. By submitting a request, you explicitly consent to this data routing. Local pros are contractually bound by our data handling addendum and may not use your data for any purpose other than quote generation and job fulfillment."
      },
      {
        heading: "4. Programmatic SEO & Directory Disclosures",
        body: "DisposalGrid operates as a programmatic directory. Certain pages on this platform are generated algorithmically using structured location data, zip codes, and service category data to create indexed, locally relevant directory pages. These pages are designed to surface verified local pros in specific geographic areas. DisposalGrid does not guarantee any specific business outcome from directory visibility."
      },
      {
        heading: "5. Cookies & Tracking",
        body: "We use first-party and third-party cookies for session management, conversion tracking, A/B testing, and retargeting. You may opt out of non-essential cookies via our cookie consent banner. Note: opting out of tracking cookies may degrade quote-matching accuracy."
      },
      {
        heading: "6. Data Retention",
        body: "We retain your personal data for the duration of your account plus 36 months, unless you request deletion. Job records may be retained for up to 7 years for dispute resolution and regulatory compliance purposes."
      }
    ]
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        heading: "1. Platform Nature & Scope",
        body: "DisposalGrid is a technology-enabled aggregator and directory platform. We do not directly provide junk removal, mattress disposal, or any hauling services. All services are performed by independent third-party contractors ('Hauling Professionals' or 'Pros') who independently operate their businesses and are not employees, agents, or representatives of DisposalGrid."
      },
      {
        heading: "2. Limitation of Liability for Third-Party Haulers",
        callout: true,
        body: "CRITICAL DISCLAIMER: DisposalGrid expressly disclaims all liability for the acts, omissions, errors, negligence, misconduct, or breach of contract of any Hauling Professional listed on this platform. Your engagement with any Pro is a direct contract between you and that Pro. DisposalGrid's maximum aggregate liability to you for any claims arising from platform use shall not exceed the greater of: (a) fifty US dollars ($50.00), or (b) the amount of fees, if any, paid directly to DisposalGrid in the three months prior to the claim. This limitation applies to all claims, whether based in contract, tort, strict liability, or otherwise."
      },
      {
        heading: "3. User Responsibilities",
        body: "You represent that you are 18 years of age or older; that all information provided is accurate and truthful; that you will not solicit Pros outside the platform to circumvent our fee structure; and that you will not use the platform for any unlawful purpose."
      },
      {
        heading: "4. Pro Vetting Disclaimer",
        body: "While DisposalGrid performs multi-point background verification on all Pros, we do not guarantee the accuracy or completeness of such checks. Background checks reflect publicly available information at the time of screening and may not capture all criminal history, civil judgments, or licensing violations."
      },
      {
        heading: "5. Intellectual Property",
        body: "All platform content, including but not limited to the DisposalGrid brand, UI/UX design, directory architecture, ranking algorithms, and programmatically generated pages, is the exclusive intellectual property of DisposalGrid, Inc. Unauthorized scraping, mirroring, or replication of directory content is strictly prohibited."
      },
      {
        heading: "6. Governing Law",
        body: "These Terms are governed by the laws of the State of Delaware, without regard to its conflict of law provisions. Any dispute must be submitted to binding arbitration under the JAMS Comprehensive Arbitration Rules, on an individual basis. Class action waivers apply."
      }
    ]
  },
  disclosure: {
    title: "Hauler Vetting Disclosure",
    sections: [
      {
        heading: "1. Our 7-Point Verification Process",
        body: "Every Hauling Professional on DisposalGrid must complete our 7-point verification before listing. This includes: (1) Government-issued ID verification; (2) Business entity confirmation (LLC/Sole Prop); (3) Criminal background check via certified third-party partner; (4) Sex offender registry cross-check; (5) Vehicle and equipment insurance verification (min $1M general liability); (6) Eco-disposal partnership confirmation; (7) Platform onboarding assessment."
      },
      {
        heading: "2. What Vetting Does NOT Guarantee",
        callout: true,
        body: "DisposalGrid's vetting process is a screening mechanism, not a guarantee of performance, quality, or conduct. Verification status reflects conditions at the time of screening. Licenses, insurance, and compliance status can change. DisposalGrid is not liable for any inaccuracies in third-party screening data. The 'Verified' badge indicates that a Pro passed our screening process at the time of onboarding — it is not a warranty of future behavior."
      },
      {
        heading: "3. Eco-Disposal Certification Requirements",
        body: "Pros holding the 'Eco-Partner' designation have provided documentation of partnerships with certified recycling facilities or donation centers. DisposalGrid conducts spot-audit re-verification annually. Eco-Partner status may be revoked at any time upon audit failure or customer complaint substantiation."
      },
      {
        heading: "4. Programmatic Directory Disclosure",
        body: "DisposalGrid generates location-specific directory pages algorithmically. Pro rankings on these pages are determined by a composite score including: (a) verified review volume and recency; (b) platform response time; (c) job completion rate; (d) pricing transparency score; (e) eco-certification status. Rankings are NOT sold or influenced by advertising spend on directory pages."
      },
      {
        heading: "5. Reporting a Vetting Concern",
        body: "If you believe a listed Pro has misrepresented their credentials, license status, or conduct, please submit a report via our Customer Dispute Resolution department. All reports are investigated within 5 business days. Substantiated reports result in immediate suspension pending full review."
      }
    ]
  },
  refund: {
    title: "Refund Policy",
    sections: [
      {
        heading: "1. Platform Fee Refunds",
        body: "DisposalGrid may charge a platform convenience fee for quote facilitation or booking in certain markets. This fee is non-refundable once a Pro has been matched and has confirmed contact with the customer, unless DisposalGrid has made a material platform error."
      },
      {
        heading: "2. Job Payment Disputes (Pro-to-Customer)",
        body: "Payments made directly to Hauling Professionals are subject to the individual Pro's payment terms. DisposalGrid does not process, hold, or intermediate these payments. For payment disputes with a Pro, contact our Customer Dispute Resolution team with documentation and we will mediate the dispute in good faith."
      },
      {
        heading: "3. Cancellation Windows",
        callout: true,
        body: "For bookings facilitated through the DisposalGrid platform: Cancellations made more than 24 hours before a scheduled pickup are fully refundable. Cancellations made between 4–24 hours before scheduled pickup may incur a 25% cancellation fee. Cancellations made less than 4 hours before scheduled pickup may incur a 50% cancellation fee. Same-day bookings cancelled after Pro dispatch are non-refundable."
      },
      {
        heading: "4. Platform Credit Issuance",
        body: "At DisposalGrid's sole discretion, in cases of verifiable platform error or substantiated Pro misconduct, we may issue platform credit (not cash) equivalent to the convenience fee paid. Credits expire 12 months from issuance and are non-transferable."
      }
    ]
  }
};

export default function Legal() {
  const [active, setActive] = useState("privacy");
  const content = CONTENT[active];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <div className="bg-primary text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight">Legal & Compliance Center</h1>
          <p className="text-gray-400 mt-2 text-sm">Last updated: February 27, 2026. View our transparent operational policies.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-6 border border-border rounded-2xl overflow-hidden">
              <div className="bg-secondary border-b border-border px-4 py-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Legal Documents</span>
              </div>
              <nav>
                {SECTIONS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left border-b border-border last:border-0 transition-colors ${
                      active === id ? "bg-secondary text-primary" : "text-gray-600 hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active === id ? "text-accent" : "text-gray-400"}`} />
                      <span className={`text-sm font-semibold`}>{label}</span>
                    </div>
                    {active === id && <ChevronRight className="w-3.5 h-3.5 text-accent" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="border-b border-border pb-6 mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{content.title}</h2>
              <p className="text-gray-500 text-sm mt-1">DisposalGrid, Inc. — Effective February 27, 2026</p>
            </div>

            <div className="space-y-8">
              {content.sections.map(({ heading, body, callout }, i) => (
                <div key={i}>
                  <h3 className="text-base font-extrabold text-gray-900 mb-3">{heading}</h3>
                  {callout ? (
                    <div className="bg-secondary border-l-4 border-accent rounded-r-xl p-5">
                      <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-gray-400 text-xs">
                Questions about our legal policies? <button onClick={() => window.location.href='#'} className="text-accent font-semibold hover:underline">Contact our Legal team →</button>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
