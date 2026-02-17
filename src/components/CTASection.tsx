import Link from 'next/link';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/clean-room.jpg"
          alt="Clean modern room after disposal service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/85" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-white font-bold text-4xl md:text-5xl mb-6">
          Ready for a fresh start?
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a professional pickup today. Same-day and next-day service available in most cities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] px-10 py-4 rounded-lg text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group transform hover:scale-105"
          >
            Book Pickup Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/#cities"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-500 ease-out transform hover:scale-105"
          >
            Browse Cities
          </Link>
        </div>
      </div>
    </section>
  );
}
