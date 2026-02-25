import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-[#FFD700] font-black text-2xl tracking-tight lowercase italic transform -skew-x-6 inline-block group-hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                disposal<span className="text-white">grid</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Making mattress disposal simple, eco-friendly, and accessible for everyone.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#FFD700] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#FFD700] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-white/60 group-hover:text-[#FFD700] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h4 className="font-semibold text-sm mb-6 uppercase tracking-wider text-white/50">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                About Us
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Careers
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Press
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Partners
              </a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-6 uppercase tracking-wider text-white/50">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/#cities" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Cities
              </Link></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Help Center
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                Blog
              </a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#FFD700] transition-colors" />
                FAQ
              </a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-6 uppercase tracking-wider text-white/50">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-white/70 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:support@disposalgrid.com" className="hover:text-[#FFD700] transition-colors text-sm">
                  support@disposalgrid.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:1-800-DISPOSE" className="hover:text-[#FFD700] transition-colors text-sm">
                  1-800-DISPOSE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="border-t border-white/5 pt-8 pb-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white">Affiliate Disclosure:</strong> DisposalGrid is a participant in the Amazon Services LLC Associates Program and other affiliate programs. We may earn a commission if you book a service or make a purchase through our links, at no additional cost to you. This helps us keep our service free. <Link href="/disclosure" className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors underline">Learn more</Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            &copy; 2026 DisposalGrid. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/privacy" className="text-white/50 hover:text-[#FFD700] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50 hover:text-[#FFD700] transition-colors">Terms of Service</Link>
            <Link href="/disclosure" className="text-white/50 hover:text-[#FFD700] transition-colors">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
