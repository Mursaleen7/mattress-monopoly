import Image from 'next/image';

export default function EcoSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] max-w-lg mx-auto">
              <Image
                src="/images/eco-recycling.jpg"
                alt="Workers at a recycling facility sorting materials"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-[#0055FF]/10 text-[#0055FF] rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              Sustainability
            </span>
            <h2 className="text-[#1A1A1A] font-bold text-4xl md:text-5xl mb-6">
              Responsible disposal for a cleaner future
            </h2>
            <p className="text-[#808080] text-lg mb-8 leading-relaxed">
              We partner with certified recycling facilities to ensure materials are properly separated and repurposed. Our network prioritizes eco-friendly practices so nothing goes to waste unnecessarily.
            </p>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#0055FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">Materials sorted and sent to certified recycling partners</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#0055FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">Reduced landfill waste through responsible processing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#0055FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[#1A1A1A] leading-relaxed">Full compliance with local environmental regulations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
