import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: 'Privacy Policy | DisposalGrid',
  description: 'Learn how DisposalGrid collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
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
              Privacy Policy
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
                  DisposalGrid ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website disposalgrid.com and use our services.
                </p>
                <p className="text-[#808080] leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  1. Information We Collect
                </h2>
                
                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Personal Information</h3>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Fill out contact forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Book disposal services through our partners</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
                <p className="text-[#808080] leading-relaxed mb-6">
                  This information may include: name, email address, phone number, mailing address, and city/state location.
                </p>

                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Automatically Collected Information</h3>
                <p className="text-[#808080] leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Device identifiers</li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  2. Cookies and Tracking Technologies
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                </p>
                
                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Types of Cookies We Use:</h3>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-[#1A1A1A]">Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong className="text-[#1A1A1A]">Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics)</li>
                  <li><strong className="text-[#1A1A1A]">Advertising Cookies:</strong> Used to deliver relevant advertisements (Google Ads)</li>
                  <li><strong className="text-[#1A1A1A]">Preference Cookies:</strong> Remember your preferences and settings</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  3. How We Use Your Information
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Provide, operate, and maintain our website and services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                  <li>Process transactions and connect you with disposal service providers</li>
                  <li>Improve and personalize your experience on our website</li>
                  <li>Analyze usage patterns and optimize website performance</li>
                  <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  4. Third-Party Services
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We use third-party services that may collect information used to identify you:
                </p>
                
                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Google Analytics</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  We use Google Analytics to analyze website traffic and usage patterns. Google Analytics uses cookies to collect information about your use of our website. You can opt-out of Google Analytics by installing the Google Analytics opt-out browser add-on.
                </p>

                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Google Ads</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  We use Google Ads for advertising and remarketing. Google may use cookies to serve ads based on your prior visits to our website. You can opt out of personalized advertising by visiting Google's Ads Settings.
                </p>

                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Affiliate Partners</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  We participate in affiliate programs including Amazon Services LLC Associates Program. When you click on affiliate links and make purchases, we may receive a commission. These partners may collect information about your interactions with their services.
                </p>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  5. How We Share Your Information
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-[#1A1A1A]">Service Providers:</strong> With disposal service providers when you request quotes or book services</li>
                  <li><strong className="text-[#1A1A1A]">Business Partners:</strong> With trusted partners who assist us in operating our website and conducting our business</li>
                  <li><strong className="text-[#1A1A1A]">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong className="text-[#1A1A1A]">Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or part of our business</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  6. Data Security
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  7. Your Privacy Rights
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  To exercise these rights, please contact us at privacy@disposalgrid.com.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  8. Children's Privacy
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  10. Contact Us
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  If you have questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                  <p className="text-[#808080] leading-relaxed mb-2">
                    <strong className="text-[#1A1A1A]">Email:</strong> privacy@disposalgrid.com
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
