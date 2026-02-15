import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mattress.jpg"
          alt="Professional mattress removal team carrying a mattress from a suburban home"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2830]/95 via-[#1a2830]/80 to-[#1a2830]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2830]/60 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 max-w-2xl">
          <div className="inline-block mb-6 px-5 py-2 bg-[#e8734a]/15 backdrop-blur-sm rounded-full border border-[#e8734a]/30">
            <span className="text-[#f0a07a] text-sm font-semibold tracking-wide">Fast & Eco-Friendly Disposal</span>
          </div>

          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.08] tracking-tight text-balance">
            Mattress & Bulk Item{' '}
            <span className="text-[#e8734a]">
              Disposal, Simplified
            </span>
          </h1>

          <p className="text-[#b0c4ce] text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            Find your city's disposal rules and book professional pickup services in seconds. Trusted by thousands of homeowners nationwide.
          </p>

          {/* Search Component */}
          <div className="max-w-xl mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#e8734a]/25 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex bg-white rounded-2xl overflow-hidden shadow-2xl">
                <input
                  type="text"
                  placeholder="Enter your city name..."
                  className="flex-1 px-6 py-5 text-[#1a2830] text-base outline-none placeholder-[#8a9ca5] font-sans"
                />
                <button className="bg-[#e8734a] hover:bg-[#d4623b] px-8 text-white font-semibold transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#8a9ca5]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Official Regulations
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Same-Day Pickup
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Nationwide Service
            </span>
          </div>
        </div>

        {/* Stats floating cards on the right */}
        <div className="hidden lg:flex flex-col gap-5">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[240px]">
            <p className="text-4xl font-extrabold text-white mb-1">50K+</p>
            <p className="text-[#8a9ca5] text-sm">Mattresses Removed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[240px]">
            <p className="text-4xl font-extrabold text-[#e8734a] mb-1">4.9/5</p>
            <p className="text-[#8a9ca5] text-sm">Customer Rating</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[240px]">
            <p className="text-4xl font-extrabold text-emerald-400 mb-1">95%</p>
            <p className="text-[#8a9ca5] text-sm">Recycled & Diverted</p>
          </div>
        </div>
      </div>
    </section>
  );
}
