'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A] shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#FFD700] rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">DisposalGrid</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            <Link href="/" className="px-5 py-2.5 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-base">
              Home
            </Link>
            <Link href="/#cities" className="px-5 py-2.5 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-base">
              Cities
            </Link>
            <Link href="/book" className="px-5 py-2.5 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-base">
              Book Pickup
            </Link>
            <a href="#contact" className="px-5 py-2.5 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all duration-200 font-medium text-base">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="px-5 py-2.5 text-white/90 hover:text-white rounded-lg transition-colors text-base font-medium">
              Login
            </a>
            <Link href="/book" className="group px-7 py-3 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-base">
              Get Started
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white rounded-lg transition-colors"
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
        <div className="md:hidden border-t border-white/10 bg-[#1A1A1A]">
          <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all text-sm font-medium">
              Home
            </Link>
            <Link href="/#cities" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all text-sm font-medium">
              Cities
            </Link>
            <Link href="/book" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all text-sm font-medium">
              Book Pickup
            </Link>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-white/90 hover:text-[#FFD700] hover:bg-white/10 rounded-lg transition-all text-sm font-medium">
              Contact
            </a>
            <div className="border-t border-white/10 mt-2 pt-3 flex flex-col gap-2">
              <a href="#" className="px-4 py-3 text-white/90 hover:text-white rounded-lg transition-colors text-sm font-medium">
                Login
              </a>
              <Link href="/book" onClick={() => setMobileOpen(false)} className="px-4 py-3 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-lg text-center font-bold text-sm transition-colors">
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
