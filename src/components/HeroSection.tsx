'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import citiesData from '@/../data/cities.json';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const router = useRouter();

  const phrases = ['Made Simple', 'Made Easy'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredCities = searchQuery.trim()
    ? citiesData.filter(city =>
        city.city_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state_name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filteredCities.length > 0) {
      const city = filteredCities[0];
      router.push(`/disposal-guides/${city.state_slug}/${city.city_slug}`);
    }
  };

  const handleCitySelect = (city: typeof citiesData[0]) => {
    router.push(`/disposal-guides/${city.state_slug}/${city.city_slug}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <section className="relative w-full aspect-video flex items-center overflow-hidden -mt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-main.jpg"
          alt="Professional mattress disposal service"
          fill
          className="object-cover object-center"
          priority
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full pt-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white font-black text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] tracking-tight">
            Mattress Disposal
            <br />
            <span className="relative inline-block overflow-hidden h-[1.4em] min-w-[300px] md:min-w-[380px] lg:min-w-[450px] px-2">
              {phrases.map((phrase, index) => {
                // Calculate the display position for smooth looping
                let displayPosition;
                
                if (index === currentWordIndex) {
                  // Current phrase at center
                  displayPosition = 0;
                } else if (index === (currentWordIndex + 1) % phrases.length) {
                  // Next phrase below, ready to slide up
                  displayPosition = 1;
                } else {
                  // Previous phrase above, out of view
                  displayPosition = -1;
                }
                
                return (
                  <span
                    key={index}
                    className="absolute inset-0 text-[#FFD700] whitespace-nowrap flex items-center justify-center px-2"
                    style={{
                      transform: `translateY(${displayPosition * 100}%)`,
                      opacity: displayPosition === 0 ? 1 : 0,
                      transition: 'transform 0.7s ease-in-out, opacity 0.7s ease-in-out',
                    }}
                  >
                    {phrase}
                  </span>
                );
              })}
            </span>
          </h1>

          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Find local disposal regulations and book professional pickup services
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent focus-within:border-[#0055FF] transition-all">
                <div className="pl-6 pr-3 flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter your city name..."
                  className="flex-1 py-6 px-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="m-2 px-10 py-4 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Search
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim() && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-100">
                  {filteredCities.map((city) => (
                    <button
                      key={`${city.state_slug}-${city.city_slug}`}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-[#0055FF]">
                          {city.city_name}
                        </div>
                        <div className="text-sm text-gray-500">{city.state_name}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-[#FFD700] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-10 text-sm text-white/90">
            <span className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Licensed & Insured</span>
            </span>
            <span className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Same-Day Service</span>
            </span>
            <span className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Eco-Friendly</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
