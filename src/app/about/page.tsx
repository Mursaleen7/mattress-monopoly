import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - DisposalGrid | Making Mattress Disposal Simple',
  description: 'Learn about DisposalGrid&apos;s mission to make mattress disposal simple, eco-friendly, and accessible for everyone. Discover our story and values.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-24 md:py-32 overflow-hidden border-b-2 border-gray-100">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1A1A1A 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-black text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tight text-[#1A1A1A]">
              Making Disposal <span className="text-[#FFD700]">Simple</span> for Everyone
            </h1>
            <p className="text-[#808080] text-xl md:text-2xl leading-relaxed">
              We believe getting rid of an old mattress shouldn&apos;t be a headache. That&apos;s why we created DisposalGrid.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
                alt="Team working together on sustainable solutions"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
                Why We <span className="text-[#0055FF]">Exist</span>
              </h2>
              <p className="text-[#808080] text-lg leading-relaxed mb-6">
                Every year, millions of mattresses end up in landfills, taking up valuable space and harming our environment. We saw a problem that needed solving.
              </p>
              <p className="text-[#808080] text-lg leading-relaxed mb-6">
                DisposalGrid was born from a simple idea: what if disposing of a mattress could be as easy as ordering a pizza? We built a platform that connects people with local disposal options, recycling centers, and pickup services.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-[#0055FF]/5 to-[#0055FF]/10 rounded-xl p-6 border border-[#0055FF]/20">
                  <div className="text-3xl font-black text-[#0055FF] mb-2">20M+</div>
                  <div className="text-sm text-[#808080]">Mattresses disposed annually in the US</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-[#FFD700]/5 to-[#FFD700]/10 rounded-xl p-6 border border-[#FFD700]/20">
                  <div className="text-3xl font-black text-[#1A1A1A] mb-2">80%</div>
                  <div className="text-sm text-[#808080]">Can be recycled with proper disposal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-sm">
              What Drives Us
            </span>
            <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
              Our <span className="text-[#FFD700]">Core Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#0055FF]">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80"
                  alt="Simplicity - Easy to use interface"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#0055FF] to-[#0044CC] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">Simplicity First</h3>
              <p className="text-[#808080] leading-relaxed">
                We cut through the confusion. No jargon, no hassle—just clear, actionable information that gets you from &quot;I need to dispose of this&quot; to &quot;Done&quot; in minutes.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#FFD700]">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80"
                  alt="Sustainability - Green earth and recycling"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">Eco-Conscious</h3>
              <p className="text-[#808080] leading-relaxed">
                Every mattress we help recycle is one less in a landfill. We prioritize recycling and donation options to keep materials in use and out of the waste stream.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#0055FF]">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
                  alt="Community - People helping each other"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#0055FF] to-[#0044CC] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">Community Focused</h3>
              <p className="text-[#808080] leading-relaxed">
                We connect you with local resources, support small businesses, and help charities receive donated mattresses. Your disposal choice impacts your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                What We Do
              </span>
              <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
                How We <span className="text-[#FFD700]">Help You</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0055FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">City-Specific Guides</h3>
                    <p className="text-[#808080]">Every city has different rules. We research and compile local regulations, pickup schedules, and disposal options so you don&apos;t have to.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FFD700]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">Price Comparisons</h3>
                    <p className="text-[#808080]">We show you all your options—from free municipal pickup to paid hauling services—so you can choose what fits your budget and timeline.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#0055FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">Verified Information</h3>
                    <p className="text-[#808080]">All our data is researched, verified, and regularly updated. No outdated phone numbers or closed facilities—just accurate, reliable info.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Data analysis and research"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Spirit Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-sm">
              The People Behind It
            </span>
            <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
              Built by People Who <span className="text-[#0055FF]">Care</span>
            </h2>
            <p className="text-[#808080] text-xl max-w-3xl mx-auto leading-relaxed">
              We&apos;re a small team of developers, researchers, and sustainability advocates who got tired of seeing mattresses pile up in landfills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Team meeting and planning"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-gray-100">
            <p className="text-[#808080] text-lg leading-relaxed mb-6">
              Our journey started when one of our founders spent three hours trying to figure out how to dispose of a mattress in their city. After calling five different numbers, visiting three websites, and still not getting a clear answer, they thought: &quot;There has to be a better way.&quot;
            </p>
            <p className="text-[#808080] text-lg leading-relaxed">
              That frustration turned into DisposalGrid. We&apos;ve since helped thousands of people dispose of their mattresses responsibly, keeping tons of material out of landfills and making the process painless. We&apos;re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              Making a Difference
            </span>
            <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">
              Our <span className="text-[#FFD700]">Impact</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#0055FF] to-[#0044CC] rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-black mb-3">50+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Cities Covered</div>
            </div>
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-2xl p-8 text-[#1A1A1A] text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-black mb-3">10K+</div>
              <div className="text-[#1A1A1A]/70 text-sm uppercase tracking-wider">Mattresses Recycled</div>
            </div>
            <div className="bg-gradient-to-br from-[#0055FF] to-[#0044CC] rounded-2xl p-8 text-white text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-black mb-3">95%</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Satisfaction Rate</div>
            </div>
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-2xl p-8 text-[#1A1A1A] text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-black mb-3">24/7</div>
              <div className="text-[#1A1A1A]/70 text-sm uppercase tracking-wider">Access to Info</div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80"
              alt="Environmental impact - clean earth"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-white">
                <h3 className="font-black text-2xl md:text-3xl mb-3">Together, We&apos;re Making a Difference</h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  Every mattress properly disposed of is a win for the environment. Thank you for being part of the solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1A1A1A 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-sm">
            Get Started
          </span>
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight text-[#1A1A1A]">
            Ready to Dispose <span className="text-[#FFD700]">Responsibly?</span>
          </h2>
          <p className="text-[#808080] text-xl mb-10 leading-relaxed">
            Find your city&apos;s disposal guide and get started in minutes.
          </p>
          <Link
            href="/#cities"
            className="inline-flex items-center gap-3 bg-[#FFD700] text-[#1A1A1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FFC700] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Browse Cities
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </main>
  );
}
