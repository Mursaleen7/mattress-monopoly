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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e2e8ed] hover:border-[#e8734a] transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-[#1a2830] group-hover:text-[#e8734a] transition-colors mb-1">
                      {city.city_name}
                    </h3>
                    <p className="text-[#5a6e78] text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {city.state_name}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#e8734a]/10 rounded-xl flex items-center justify-center group-hover:bg-[#e8734a] transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#e8734a] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-[#8a9ca5]">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {city.population.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                    Active
                  </span>
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
