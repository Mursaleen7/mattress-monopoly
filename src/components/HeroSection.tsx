import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mattress.jpg"
          alt="Professional removal team carrying items from a suburban home"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2830]/95 via-[#1a2830]/80 to-[#1a2830]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2830]/50 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <div className="inline-block mb-6 px-5 py-2 bg-[#e8734a]/15 backdrop-blur-sm rounded-full border border-[#e8734a]/30">
            <span className="text-[#f0a07a] text-sm font-semibold tracking-wide">Fast & Eco-Friendly Service</span>
          </div>

          <h1 className="text-white font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.08] tracking-tight text-balance">
            Bulk Item{' '}
            <span className="text-[#e8734a]">Disposal, Simplified</span>
          </h1>

          <p className="text-[#b0c4ce] text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            Find your city's disposal rules and book professional pickup services in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/#cities"
              className="inline-flex items-center justify-center gap-2 bg-[#e8734a] hover:bg-[#d4623b] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Browse Cities
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Book a Pickup
            </Link>
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
              Nationwide Coverage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
