import Link from 'next/link';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-clean-room.jpg"
          alt="Clean bright modern bedroom after mattress disposal"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a2830]/75 backdrop-blur-[2px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-white font-bold text-4xl md:text-5xl mb-6 text-balance">
          Ready for a fresh start?
        </h2>
        <p className="text-[#b0c4ce] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a professional pickup today and wake up to a clutter-free home tomorrow. Same-day and next-day service available in most cities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#d4623b] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Book Pickup Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/#cities"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
          >
            Browse Cities
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8a9ca5]">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Vetted Partners
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Fully Insured
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Eco-Friendly
          </span>
        </div>
      </div>
    </section>
  );
}
