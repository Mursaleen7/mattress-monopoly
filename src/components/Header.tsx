import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#e8734a] rounded-xl flex items-center justify-center group-hover:shadow-md transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-[#1a2830] font-bold text-lg tracking-tight">DisposalGrid</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className="px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Home
            </Link>
            <Link href="/#cities" className="px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Cities
            </Link>
            <Link href="/book" className="px-4 py-2 text-[#3a4d54] hover:text-[#e8734a] hover:bg-[#e8734a]/5 rounded-lg transition-all duration-200 font-medium text-sm">
              Book Pickup
            </Link>
          </nav>

          {/* CTA */}
          <Link href="/book" className="group px-5 py-2.5 bg-[#e8734a] hover:bg-[#d4623b] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5 text-sm">
            Get Started
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
