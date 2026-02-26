'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import citiesData from '@/../data/cities.json';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Keep header fixed during slide-up animation
  const shouldBeFixed = isHomePage && (isScrolled || isAnimating);

  // Use Intersection Observer instead of scroll events - off main thread!
  // Only on home page
  useEffect(() => {
    if (typeof window === 'undefined' || !isHomePage) {
      // On non-home pages, always show nav links (not scrolled state)
      setIsScrolled(false);
      return;
    }

    // Create a sentinel element at 700px from top
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '700px';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const newScrollState = !entry.isIntersecting;
        
        // If transitioning from scrolled to not scrolled, trigger slide-up animation
        if (isScrolled && !newScrollState) {
          setIsAnimating(true);
          // Keep header fixed during animation, then switch to relative
          setTimeout(() => {
            setIsScrolled(false);
            setIsAnimating(false);
          }, 800); // Match animation duration (now 0.8s)
        } else {
          setIsScrolled(newScrollState);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (sentinelRef.current) {
        document.body.removeChild(sentinelRef.current);
      }
    };
  }, [isHomePage]);

  const filteredCities = searchQuery.trim()
    ? citiesData
        .map(city => {
          const query = searchQuery.toLowerCase().trim();
          const cityName = city.city_name.toLowerCase();
          const stateName = city.state_name.toLowerCase();
          
          let score = 0;
          if (cityName === query) score += 100;
          if (stateName === query) score += 90;
          if (cityName.startsWith(query)) score += 50;
          if (cityName.includes(query)) score += 20;
          
          return { city, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.city)
    : [];

  const handleSearch = (e: React.FormEvent) => {
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

  return (
    <>
      {/* Ghost element to prevent layout shift when header becomes fixed */}
      {isHomePage && isScrolled && (
        <div 
          className="h-16 sm:h-18" 
          aria-hidden="true"
        />
      )}
      
      <header 
        className={`
          ${shouldBeFixed ? 'fixed' : 'relative'} 
          ${isHomePage && isScrolled && !isAnimating ? 'header-dropdown' : ''}
          ${isHomePage && isAnimating ? 'header-slideup' : ''}
          top-0 left-0 right-0 z-50 
          bg-[#1A1A1A] border-b border-white/5 shadow-lg
        `}
        style={{
          willChange: shouldBeFixed ? 'transform' : 'auto',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex ${isHomePage && isScrolled ? 'justify-center' : 'justify-between'} items-center ${isHomePage && !isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-18'} transition-all duration-300`}>
            {/* Logo - hide when scrolled on home page */}
            <div 
              className={`flex-shrink-0 transition-all duration-300 ${isHomePage && isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}
              style={{
                pointerEvents: isHomePage && isScrolled ? 'none' : 'auto',
              }}
            >
              <Link href="/" className="group" aria-label="DisposalGrid home">
                <span className="text-[#FFD700] font-black text-2xl sm:text-3xl tracking-tight lowercase italic transform -skew-x-6 inline-block group-hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  disposal<span className="text-white">grid</span>
                </span>
              </Link>
            </div>

            {/* Desktop - Show search bar after scrolling on home page only */}
            <div className={`hidden md:flex items-center ${isHomePage && isScrolled ? 'w-full max-w-4xl' : 'flex-1 max-w-3xl mx-4'} relative transition-all duration-300`}>
              {/* Search Bar - visible after hero on home page */}
              {isHomePage && (
                <form 
                  onSubmit={handleSearch} 
                  className="relative w-full transition-all duration-300"
                  style={{
                    opacity: isScrolled ? 1 : 0,
                    pointerEvents: isScrolled ? 'auto' : 'none',
                    transform: isScrolled ? 'translateY(0)' : 'translateY(10px)',
                    willChange: 'opacity, transform',
                  }}
                  aria-hidden={!isScrolled}
                >
                  <div className="relative flex items-center bg-white/10 rounded-xl overflow-hidden border border-white/10 focus-within:border-[#FFD700] transition-all">
                    <div className="flex items-center pl-4 pr-2">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Search your city..."
                      className="flex-1 py-2.5 px-2 text-sm text-white placeholder-white/50 focus:outline-none bg-transparent"
                      autoComplete="off"
                      tabIndex={isScrolled ? 0 : -1}
                    />
                    <button
                      type="submit"
                      className="m-1 px-4 py-2 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-lg font-bold text-sm transition-all duration-200"
                      tabIndex={isScrolled ? 0 : -1}
                    >
                      Search
                    </button>
                  </div>

                  {/* Compact Suggestions Dropdown */}
                  {showSuggestions && searchQuery.trim() && filteredCities.length > 0 && (
                    <div 
                      data-lenis-prevent 
                      className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden z-50 border border-white/10 max-h-80 overflow-y-auto"
                    >
                      {filteredCities.map((city) => (
                        <button
                          key={`${city.state_slug}-${city.city_slug}`}
                          onClick={() => handleCitySelect(city)}
                          className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between group border-b border-white/5 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{city.city_name}</span>
                            <span className="text-xs text-white/50">{city.state_abbr}</span>
                          </div>
                          <svg className="w-4 h-4 text-white/30 group-hover:text-[#FFD700] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Desktop Actions - hide when scrolled on home page */}
            <div 
              className={`hidden md:flex items-center gap-3 flex-shrink-0 transition-all duration-300 ${isHomePage && isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}
              style={{
                pointerEvents: isHomePage && isScrolled ? 'none' : 'auto',
              }}
            >
              <Link href="/contact" className="px-4 py-2 text-white/80 hover:text-white rounded-xl transition-colors text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </Link>
              <Link href="/book" className="group relative px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-[#1A1A1A] rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center gap-2 text-sm overflow-hidden will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">Book Pickup</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-white/70 hover:text-white rounded-lg transition-colors active:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - CSS-only visibility toggle */}
        <div className={`md:hidden border-t border-white/5 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 min-h-[44px] flex items-center text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium">
                Home
              </Link>
              <Link href="/#cities" onClick={() => setMobileOpen(false)} className="px-4 py-3 min-h-[44px] flex items-center text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium">
                Cities
              </Link>
              <Link href="/book" onClick={() => setMobileOpen(false)} className="px-4 py-3 min-h-[44px] flex items-center text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium">
                Book Pickup
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 min-h-[44px] flex items-center text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium">
                Contact
              </Link>
              <div className="border-t border-white/5 mt-2 pt-3 flex flex-col gap-2">
                <Link href="/book" onClick={() => setMobileOpen(false)} className="px-4 py-4 min-h-[48px] bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-[#1A1A1A] rounded-xl text-center font-bold text-base transition-all shadow-md">
                  Book Pickup
                </Link>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
  }
