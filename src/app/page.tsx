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
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFD700] focus:text-[#1A1A1A] focus:rounded-lg focus:font-bold">
        Skip to main content
      </a>
      
      <Header />
      <div id="main-content">
        <HeroSection />
        <DisposalOptions />
        <HowItWorks />

      {/* Cities Section */}
      <section id="cities" className="bg-white py-20 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="group flex items-center justify-between bg-white rounded-xl p-5 sm:p-6 border-2 border-gray-200 hover:border-[#0055FF] hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 min-h-[80px]"
                aria-label={`View disposal guide for ${city.city_name}, ${city.state_name}`}
              >
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#0055FF] transition-colors duration-500">
                    {city.city_name}
                  </h3>
                  <p className="text-[#808080] text-sm mt-1 transition-colors duration-500">{city.state_name}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] transition-all duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
      
      <BackToTop />
      <Footer />
    </main>
  );
}
