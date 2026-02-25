import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata = {
  title: 'Affiliate Disclosure | DisposalGrid',
  description: 'Learn about DisposalGrid\'s affiliate relationships and how we earn commissions.',
};

export default function DisclosurePage() {
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
              Transparency
            </span>
            <h1 className="text-[#1A1A1A] font-black text-4xl sm:text-5xl md:text-6xl mb-6 leading-[1.1] tracking-tight">
              Affiliate Disclosure
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
                  At DisposalGrid, we believe in transparency and honesty with our users. This page discloses our affiliate relationships and how we may earn commissions when you use our services.
                </p>
              </div>

              {/* Main Disclosure */}
              <div className="mb-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  Affiliate Relationships
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  DisposalGrid is a participant in the Amazon Services LLC Associates Program and other affiliate programs. These are affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner websites.
                </p>
                <p className="text-[#808080] leading-relaxed mb-4">
                  <strong className="text-[#1A1A1A]">What this means:</strong> When you click on certain links on our website and make a purchase or book a service, we may earn a commission at no additional cost to you. This helps us maintain and improve our free service.
                </p>
              </div>

              {/* How It Works */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  How Affiliate Commissions Work
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  When you use DisposalGrid, you may encounter affiliate links in several ways:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-[#1A1A1A]">Service Provider Links:</strong> When you click "Book Now" or similar buttons to connect with disposal service providers</li>
                  <li><strong className="text-[#1A1A1A]">Product Recommendations:</strong> Links to mattress disposal bags, covers, or related products on Amazon and other retailers</li>
                  <li><strong className="text-[#1A1A1A]">Partner Services:</strong> Connections to junk removal companies, recycling facilities, and disposal services</li>
                </ul>
                <p className="text-[#808080] leading-relaxed mb-4">
                  If you make a purchase or book a service through these links, we may receive a commission. The price you pay remains the same—you do not pay anything extra.
                </p>
              </div>

              {/* Our Commitment */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  Our Commitment to You
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  While we do earn commissions from affiliate relationships, we are committed to:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li><strong className="text-[#1A1A1A]">Honest Recommendations:</strong> We only recommend services and products we believe will benefit our users</li>
                  <li><strong className="text-[#1A1A1A]">Unbiased Information:</strong> Our city guides and disposal information are based on research and facts, not commission rates</li>
                  <li><strong className="text-[#1A1A1A]">Transparency:</strong> We clearly disclose when links are affiliate links</li>
                  <li><strong className="text-[#1A1A1A]">User First:</strong> Your needs come before our earnings—we prioritize providing accurate, helpful information</li>
                </ul>
              </div>

              {/* Specific Programs */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  Affiliate Programs We Participate In
                </h2>
                
                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Amazon Associates</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  DisposalGrid is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you purchase products through our Amazon links, we may earn a small commission.
                </p>

                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Disposal Service Partners</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  We partner with various mattress disposal, junk removal, and recycling companies. When you book services through our platform, we may receive a referral fee or commission from these partners. This does not affect the price you pay for services.
                </p>

                <h3 className="text-[#1A1A1A] font-bold text-xl mb-4">Other Affiliate Networks</h3>
                <p className="text-[#808080] leading-relaxed mb-6">
                  We may participate in other affiliate networks and programs related to home services, eco-friendly products, and waste management solutions. All affiliate relationships are disclosed in accordance with FTC guidelines.
                </p>
              </div>

              {/* FTC Compliance */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  FTC Compliance
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  This disclosure is made in accordance with the Federal Trade Commission's 16 CFR, Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
                </p>
                <p className="text-[#808080] leading-relaxed">
                  We are required by the FTC to disclose any relationship we have between a product manufacturer or service provider when we write about or recommend a product or service. If you have any questions about our affiliate relationships, please contact us.
                </p>
              </div>

              {/* Your Choice */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  Your Choice
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  Using our affiliate links is completely optional. You can:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Navigate directly to service provider websites without using our links</li>
                  <li>Search for products independently on Amazon or other retailers</li>
                  <li>Contact disposal facilities directly using the information in our guides</li>
                </ul>
                <p className="text-[#808080] leading-relaxed">
                  However, using our affiliate links helps support DisposalGrid at no extra cost to you, allowing us to continue providing free, comprehensive disposal guides and information.
                </p>
              </div>

              {/* How We Use Earnings */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  How We Use Affiliate Earnings
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  Commissions earned through affiliate relationships help us:
                </p>
                <ul className="list-disc pl-6 text-[#808080] leading-relaxed mb-6 space-y-2">
                  <li>Maintain and update our website</li>
                  <li>Research and verify disposal regulations and facility information</li>
                  <li>Expand our coverage to more cities</li>
                  <li>Improve user experience and add new features</li>
                  <li>Keep our service free for all users</li>
                </ul>
              </div>

              {/* Questions */}
              <div className="mb-12">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-6 tracking-tight">
                  Questions About Our Affiliate Relationships?
                </h2>
                <p className="text-[#808080] leading-relaxed mb-4">
                  We're happy to answer any questions about our affiliate relationships, how we earn commissions, or our recommendation process.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                  <p className="text-[#808080] leading-relaxed mb-2">
                    <strong className="text-[#1A1A1A]">Email:</strong> affiliates@disposalgrid.com
                  </p>
                  <p className="text-[#808080] leading-relaxed mb-2">
                    <strong className="text-[#1A1A1A]">Phone:</strong> 1-800-DISPOSE
                  </p>
                  <p className="text-[#808080] leading-relaxed">
                    <strong className="text-[#1A1A1A]">Website:</strong> disposalgrid.com/contact
                  </p>
                </div>
              </div>

              {/* Thank You */}
              <div className="mb-12 bg-[#FFD700]/10 border-2 border-[#FFD700]/30 rounded-xl p-8">
                <h2 className="text-[#1A1A1A] font-bold text-2xl md:text-3xl mb-4 tracking-tight">
                  Thank You for Your Support
                </h2>
                <p className="text-[#808080] leading-relaxed">
                  We appreciate your trust in DisposalGrid. When you use our affiliate links, you're helping us continue to provide free, accurate, and comprehensive mattress disposal information to users across the country. Thank you for supporting our mission to make disposal simple and eco-friendly for everyone.
                </p>
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
