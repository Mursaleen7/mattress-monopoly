'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="group" aria-label="DisposalGrid home">
            <span className="text-[#FFD700] font-black text-2xl sm:text-3xl tracking-tight lowercase italic transform -skew-x-6 inline-block group-hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              disposal<span className="text-white">grid</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className="px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-base relative group">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            </Link>
            <Link href="/#cities" className="px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-base relative group">
              <span className="relative z-10">Cities</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            </Link>
            <Link href="/book" className="px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-base relative group">
              <span className="relative z-10">Book Pickup</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            </Link>
            <a href="#contact" className="px-5 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-base relative group">
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:1-800-DISPOSE" className="px-5 py-3 min-h-[44px] text-white/80 hover:text-white rounded-xl transition-colors text-base font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1-800-DISPOSE
            </a>
            <Link href="/book" className="group relative px-8 py-3 min-h-[48px] bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-[#1A1A1A] rounded-xl font-bold shadow-lg shadow-[#FFD700]/25 hover:shadow-xl hover:shadow-[#FFD700]/40 transition-all duration-300 flex items-center gap-2 text-base overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">Book Pickup</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white rounded-lg transition-colors"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#1A1A1A]/98 backdrop-blur-xl">
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
            <a href="#contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 min-h-[44px] flex items-center text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base font-medium">
              Contact
            </a>
            <div className="border-t border-white/5 mt-2 pt-3 flex flex-col gap-2">
              <Link href="/book" onClick={() => setMobileOpen(false)} className="px-4 py-4 min-h-[48px] bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-[#1A1A1A] rounded-xl text-center font-bold text-base transition-all shadow-lg shadow-[#FFD700]/20">
                Book Pickup
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
