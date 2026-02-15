import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#e8734a] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#1a2830] font-bold text-lg tracking-tight">DisposalGrid</span>
              <div className="flex items-center gap-1 text-xs text-[#8a9ca5]">
                <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Service
              </div>
            </div>
            <span className="sm:hidden text-[#1a2830] font-bold text-lg">DisposalGrid</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className="px-3 xl:px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Home
            </Link>
            <Link href="/#cities" className="px-3 xl:px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Cities
            </Link>
            <Link href="/#pricing" className="px-3 xl:px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Pricing
            </Link>
            <Link href="/#contact" className="px-3 xl:px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/#login" className="hidden md:block px-4 py-2 text-[#3a4d54] hover:text-[#1a2830] font-medium transition-colors text-sm">
              Log In
            </Link>
            <Link href="/book" className="group px-4 sm:px-6 py-2 sm:py-2.5 bg-[#e8734a] hover:bg-[#d4623b] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5 text-sm">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
