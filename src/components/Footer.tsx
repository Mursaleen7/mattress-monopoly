import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a2830] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#e8734a] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">DisposalGrid</span>
            </Link>
            <p className="text-[#8a9ca5] text-sm leading-relaxed">
              Making bulk item disposal simple, eco-friendly, and accessible for everyone.
            </p>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-[#8a9ca5]">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Partners</a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-[#8a9ca5]">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/#cities" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Cities</Link></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-[#8a9ca5] hover:text-white transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider text-[#8a9ca5]">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[#8a9ca5]">
                <svg className="w-4 h-4 text-[#e8734a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@disposalgrid.com" className="hover:text-white transition-colors text-sm">
                  support@disposalgrid.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#8a9ca5]">
                <svg className="w-4 h-4 text-[#e8734a] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:1-800-DISPOSE" className="hover:text-white transition-colors text-sm">
                  1-800-DISPOSE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8a9ca5] text-xs">
            &copy; 2026 DisposalGrid. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-[#8a9ca5] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#8a9ca5] hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[#8a9ca5] hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
