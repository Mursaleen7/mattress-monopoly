import Link from 'next/link';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import DisposalOptions from '@/components/DisposalOptions';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import EcoSection from '@/components/EcoSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <DisposalOptions />
      <HowItWorks />

      {/* Cities Section */}
      <section id="cities" className="bg-[#f8f9fa] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#1a2830]/10 text-[#1a2830] rounded-full text-sm font-semibold mb-4">
              Available Locations
            </span>
            <h2 className="text-[#1a2830] font-bold text-4xl md:text-5xl mb-4 text-balance">
              Browse by City
            </h2>
            <p className="text-[#5a6e78] text-lg max-w-2xl mx-auto leading-relaxed">
              Select your city to view local disposal regulations and options
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="group flex items-center justify-between bg-white rounded-xl p-5 border border-[#e2e8ed] hover:border-[#e8734a] hover:shadow-md transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-[#1a2830] group-hover:text-[#e8734a] transition-colors">
                    {city.city_name}
                  </h3>
                  <p className="text-[#8a9ca5] text-sm mt-0.5">{city.state_name}</p>
                </div>
                <div className="w-8 h-8 bg-[#f0f3f5] rounded-lg flex items-center justify-center group-hover:bg-[#e8734a] transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8a9ca5] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <EcoSection />
      <CTASection />
      <Footer />
    </main>
  );
}
