import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white" id="contact">
      {/* Eco Impact Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Committed to the Environment</h3>
                <p className="text-white/80 text-sm">We partner with certified recyclers to keep items out of landfills.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Certified Recyclers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Eco-Friendly Disposal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80">Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">DisposalGrid</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Making bulk item disposal simple, eco-friendly, and accessible for everyone.
            </p>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-white/60">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Partners</a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-white/60">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/#cities" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Cities</Link></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#FFD700] transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-white/60">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-white/70">
                <svg className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@disposalgrid.com" className="hover:text-[#FFD700] transition-colors text-sm">
                  support@disposalgrid.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <svg className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:1-800-DISPOSE" className="hover:text-[#FFD700] transition-colors text-sm">
                  1-800-DISPOSE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-xs">
            &copy; 2026 DisposalGrid. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
