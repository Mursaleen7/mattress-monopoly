import Link from 'next/link';
import Image from 'next/image';

export default function DisposalOptions() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#e8734a]/10 text-[#e8734a] rounded-full text-sm font-semibold mb-4">
            Choose Your Method
          </span>
          <h2 className="text-[#1a2830] font-bold text-4xl md:text-5xl mb-4 text-balance">
            Two Ways to Dispose
          </h2>
          <p className="text-[#5a6e78] text-lg max-w-2xl mx-auto leading-relaxed">
            Select the option that best fits your schedule and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 - Self-Haul */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e2e8ed]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/images/self-haul.jpg"
                alt="Loading items onto a pickup truck for self-haul disposal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                  FREE
                </span>
              </div>
            </div>

            <div className="p-8 pt-4">
              <h3 className="font-bold text-2xl mb-3 text-[#1a2830]">Self-Haul</h3>
              <p className="text-[#5a6e78] mb-6 leading-relaxed">
                Find nearby drop-off sites and follow local regulations. Ideal if you have a vehicle and prefer to handle it yourself.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center gap-3 text-[#3a4d54] text-sm">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No service fees
                </li>
                <li className="flex items-center gap-3 text-[#3a4d54] text-sm">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Eco-friendly disposal
                </li>
                <li className="flex items-center gap-3 text-[#5a6e78] text-sm">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Requires vehicle and effort
                </li>
              </ul>

              <Link href="/#cities" className="flex w-full items-center justify-center gap-2 bg-[#f0f3f5] hover:bg-[#e2e8ed] text-[#1a2830] py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm group/btn">
                Find Drop-off Sites
                <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2 - Paid Pickup */}
          <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/images/paid-pickup.jpg"
                alt="Professional crew handling a pickup service"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#e8734a] via-[#e8734a]/30 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 bg-white/25 backdrop-blur-sm text-white rounded-full text-xs font-semibold shadow-lg">
                  POPULAR
                </span>
              </div>
            </div>

            <div className="bg-[#e8734a] p-8 pt-4">
              <h3 className="font-bold text-2xl mb-3 text-white">Paid Pickup</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Professional team removes items from inside your home. Fast, insured, and completely hassle-free.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center gap-3 text-white text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Same or next-day service
                </li>
                <li className="flex items-center gap-3 text-white text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No heavy lifting required
                </li>
                <li className="flex items-center gap-3 text-white text-sm">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Insured and vetted professionals
                </li>
              </ul>

              <Link href="/book" className="flex w-full items-center justify-center gap-2 bg-white hover:bg-[#f8f9fa] text-[#e8734a] py-3.5 rounded-xl font-bold transition-all duration-300 text-sm group/btn">
                Book Pickup Now
                <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
