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

  const phrases = ['Without the truck', 'Without the fines', 'Without the bedbugs'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredCities = searchQuery.trim()
    ? citiesData
        .map(city => {
          const query = searchQuery.toLowerCase().trim();
          const cityName = city.city_name.toLowerCase();
          const stateName = city.state_name.toLowerCase();
          const stateAbbr = city.state_abbr.toLowerCase();
          
          // Calculate relevance score
          let score = 0;
          
          // Exact matches get highest priority
          if (cityName === query) score += 100;
          if (stateName === query) score += 90;
          if (stateAbbr === query) score += 85;
          
          // Starts with matches
          if (cityName.startsWith(query)) score += 50;
          if (stateName.startsWith(query)) score += 40;
          if (stateAbbr.startsWith(query)) score += 35;
          
          // Contains matches
          if (cityName.includes(query)) score += 20;
          if (stateName.includes(query)) score += 15;
          if (stateAbbr.includes(query)) score += 10;
          
          // Combined city + state search (e.g., "austin tx")
          const combined = `${cityName} ${stateAbbr}`;
          const combinedFull = `${cityName} ${stateName}`;
          if (combined.includes(query)) score += 60;
          if (combinedFull.includes(query)) score += 55;
          
          return { city, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(item => item.city)
    : [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filteredCities.length > 0) {
      const city = filteredCities[0];
      router.push(`/disposal-guides/${city.state_slug}/${city.city_slug}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city: typeof citiesData[0]) => {
    router.push(`/disposal-guides/${city.state_slug}/${city.city_slug}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow click events to fire
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden pt-4 sm:pt-0">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/70 to-black/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 w-full">
        {/* Hidden Impact Verification Text */}
        <div className="sr-only">Impact-Site-Verification: 917b1ec7-dc5d-4706-a9d7-b4eb50adadea</div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            Mattress Disposal
            <br />
            <span className="relative inline-block overflow-hidden h-[1.2em] sm:h-[1.3em] md:h-[1.4em] w-full max-w-[280px] sm:max-w-[400px] md:max-w-[620px] lg:max-w-[750px] px-4 sm:px-6 md:px-10">
              {phrases.map((phrase, index) => {
                // Calculate the display position for smooth continuous scroll
                let displayClass;
                
                if (index === currentWordIndex) {
                  displayClass = 'hero-text-active';
                } else if (index === (currentWordIndex + 1) % phrases.length) {
                  displayClass = 'hero-text-next';
                } else {
                  displayClass = 'hero-text-hidden';
                }
                
                return (
                  <span
                    key={index}
                    className={`hero-text-slide text-[#FFD700] px-4 sm:px-6 md:px-10 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl ${displayClass}`}
                  >
                    {phrase}
                  </span>
                );
              })}
            </span>
          </h1>

          <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Find local disposal regulations and book professional pickup services
          </p>

          {/* Search Bar - Primary CTA */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent focus-within:border-[#0055FF] transition-all">
                <div className="flex items-center pl-4 sm:pl-6 pr-3 pt-4 sm:pt-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  onBlur={handleInputBlur}
                  placeholder="Enter your city name (e.g., Austin, New York, LA)..."
                  className="flex-1 py-4 sm:py-6 px-3 text-base sm:text-lg text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="m-2 min-h-[44px] px-6 sm:px-10 py-3 sm:py-4 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 will-change-transform"
                  aria-label="Search for your city"
                >
                  <span className="hidden sm:inline">Search</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim() && (
                <div 
                  data-lenis-prevent 
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl overflow-hidden z-10 border border-gray-100 max-h-96 overflow-y-auto"
                >
                  {filteredCities.length > 0 ? (
                    <>
                      {filteredCities.map((city, index) => (
                        <button
                          key={`${city.state_slug}-${city.city_slug}`}
                          onClick={() => handleCitySelect(city)}
                          className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors flex items-center justify-between group border-b border-gray-100 last:border-0"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 group-hover:text-[#0055FF] transition-colors">
                                {city.city_name}
                              </span>
                              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                {city.state_abbr}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">{city.state_name}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {city.curbside_rules.is_available ? '✓ Curbside pickup available' : '✓ Drop-off locations available'}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-300 group-hover:text-[#FFD700] transition-colors flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-6 py-8 text-center">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-gray-600 font-medium mb-1">No cities found</p>
                      <p className="text-sm text-gray-500 mb-4">Try searching for: Austin, New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, or Dallas</p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-[#0055FF] hover:text-[#0044CC] font-semibold text-sm transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Help Link - Secondary action */}
          <div className="mb-8 sm:mb-10">
            <a href="#how-it-works" className="text-white/70 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How it works
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12 text-sm sm:text-sm text-white/90 px-4">
            <span className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4.5 sm:h-4.5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Licensed & Insured</span>
            </span>
            <span className="flex items-center gap-2.5 sm:gap-2.5">
              <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Same-Day Service</span>
            </span>
            <span className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-4.5 sm:h-4.5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Eco-Friendly</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
