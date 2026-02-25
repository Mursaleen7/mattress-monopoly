import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: 'Terms of Service | DisposalGrid',
  description: 'Terms and conditions for using DisposalGrid services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFD700] focus:text-[#1A1A1A] focus:rounded-lg focus:font-bold">
        Skip to main content
      </a>
      
      <Header />
      
      <div id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-[#1A1A1A] font-black text-4xl sm:text-5xl md:text-6xl mb-6 leading-[1.1] tracking-tight">
              Terms of Service
            </h1>
            <p className="text-[#808080] text-lg leading-relaxed">
              Last Updated: February 24, 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-[#808080] leading-relaxed mb-4">
                  Welcome to DisposalGrid. These Terms of Service ("Terms") govern your access to and use of our website, services, and content. By accessing or using DisposalGrid, you agree to be bound by these Terms.
                </p>
                <p className="text-[#808080] leading-relaxed">
                  Please read these Terms carefully before using our services. If you do not agree with these Terms, you may not access or use our website.
                </p>
              </div>

              {/* Acceptance */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  1. Acceptance of Terms
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  By accessing and using DisposalGrid, you accept and agree to be bound by these Terms and our Privacy Policy. If you are using our services on behalf of an organization, you are agreeing to these Terms for that organization and representing that you have the authority to bind that organization to these Terms.
                </p>
              </div>

              {/* Description of Service */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  2. Description of Service
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  DisposalGrid is an informational platform that provides:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Information about mattress disposal regulations and options</li>
                  <li>City-specific disposal guides</li>
                  <li>Connections to third-party disposal service providers</li>
                  <li>Educational content about eco-friendly disposal practices</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  DisposalGrid is an information service only. We do not directly provide disposal, pickup, or recycling services.
                </p>
              </div>

              {/* User Responsibilities */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  3. User Responsibilities
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use the website only for lawful purposes</li>
                  <li>Not interfere with or disrupt the website or servers</li>
                  <li>Not attempt to gain unauthorized access to any part of the website</li>
                  <li>Not use automated systems to access the website without permission</li>
                  <li>Comply with all applicable local, state, and federal laws</li>
                </ul>
              </div>

              {/* Disclaimer - CRITICAL */}
              <div className="mb-12 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  4. Important Disclaimer
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4 font-semibold">
                  PLEASE READ THIS SECTION CAREFULLY:
                </p>
                <p className="text-[#808080] leading-relaxed mb-4">
                  DisposalGrid provides information about disposal facilities, service providers, and regulations. However:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-[#1A1A1A]">We are not responsible if a disposal facility is closed, has changed hours, or is unavailable when you arrive.</strong></li>
                  <li><strong className="text-[#1A1A1A]">We are not responsible for the quality, availability, or performance of third-party service providers.</strong></li>
                  <li>Facility hours, locations, and regulations may change without notice</li>
                  <li>We recommend calling ahead to confirm facility availability and requirements</li>
                  <li>Service provider pricing and availability are subject to change</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  You acknowledge that you use the information on our website at your own risk and that we are not liable for any inconvenience, costs, or damages resulting from facility closures, changes in regulations, or service provider issues.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  5. Third-Party Services and Links
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  Our website may contain links to third-party websites and services that are not owned or controlled by DisposalGrid. We have no control over, and assume no responsibility for:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>The content, privacy policies, or practices of third-party websites</li>
                  <li>The quality or reliability of third-party disposal services</li>
                  <li>Transactions between you and third-party service providers</li>
                  <li>Disputes arising from your use of third-party services</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  Your interactions with third-party service providers are solely between you and the provider. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit or use.
                </p>
              </div>

              {/* Accuracy of Information */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  6. Accuracy of Information
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or timeliness of the content on our website. Disposal regulations, facility information, and service provider details may change without notice. You should independently verify any information before relying on it.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  7. Intellectual Property Rights
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  The website and its original content, features, and functionality are owned by DisposalGrid and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-[#808080] leading-relaxed">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  8. Limitation of Liability
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, DISPOSALGRID SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Your use or inability to use our services</li>
                  <li>Any conduct or content of third parties on the website</li>
                  <li>Unauthorized access to or alteration of your transmissions or data</li>
                  <li>Facility closures, changes in hours, or unavailability</li>
                  <li>Actions or omissions of third-party service providers</li>
                </ul>
              </div>

              {/* Indemnification */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  9. Indemnification
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  You agree to indemnify, defend, and hold harmless DisposalGrid and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of our services, your violation of these Terms, or your violation of any rights of another party.
                </p>
              </div>

              {/* Modifications */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  10. Modifications to Terms
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the website after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  11. Termination
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the website will immediately cease.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  12. Governing Law
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our services shall be resolved in the courts located in the United States.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  13. Contact Us
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                  <p className="text-[#808080] leading-relaxed mb-2">
                    <strong className="text-[#1A1A1A]">Email:</strong> legal@disposalgrid.com
                  </p>
                  <p className="text-[#808080] leading-relaxed mb-2">
                    <strong className="text-[#1A1A1A]">Phone:</strong> 1-800-DISPOSE
                  </p>
                  <p className="text-[#808080] leading-relaxed">
                    <strong className="text-[#1A1A1A]">Website:</strong> disposalgrid.com/contact
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
