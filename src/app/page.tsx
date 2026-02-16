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
      <section id="cities" className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              Available Locations
            </span>
            <h2 className="text-[#1A1A1A] font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              Browse by City
            </h2>
            <p className="text-[#808080] text-xl max-w-2xl mx-auto leading-relaxed">
              Select your city to view local disposal regulations and options
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="group flex items-center justify-between bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#0055FF] hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#0055FF] transition-colors">
                    {city.city_name}
                  </h3>
                  <p className="text-[#808080] text-sm mt-1">{city.state_name}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700] transition-all duration-300">
                  <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
