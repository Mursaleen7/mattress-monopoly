import Link from 'next/link';
import Image from 'next/image';

export default function DisposalOptions() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
            Choose Your Method
          </span>
          <h2 className="text-[#1A1A1A] font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Two Ways to Dispose
          </h2>
          <p className="text-[#808080] text-xl max-w-2xl mx-auto leading-relaxed">
            Select the option that best fits your schedule and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Self-Haul */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/self-haul.jpg"
                alt="Loading items onto a pickup truck for self-haul disposal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-[#0055FF] text-white rounded-full text-sm font-bold shadow-lg">
                  FREE
                </span>
              </div>
            </div>

            <div className="p-10">
              <h3 className="font-black text-3xl mb-4 text-[#1A1A1A]">Self-Haul</h3>
              <p className="text-[#808080] text-lg mb-8 leading-relaxed">
                Find nearby drop-off sites and follow local regulations. Ideal if you have a vehicle and prefer to handle it yourself.
              </p>

              <ul className="flex flex-col gap-4 mb-10">
                <li className="flex items-center gap-3 text-[#1A1A1A]">
                  <svg className="w-6 h-6 text-[#0055FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No service fees</span>
                </li>
                <li className="flex items-center gap-3 text-[#1A1A1A]">
                  <svg className="w-6 h-6 text-[#0055FF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Eco-friendly disposal</span>
                </li>
                <li className="flex items-center gap-3 text-[#808080]">
                  <svg className="w-6 h-6 text-[#A9A9A9] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Requires vehicle and effort</span>
                </li>
              </ul>

              <Link href="/#cities" className="flex w-full items-center justify-center gap-2 bg-[#2B2B2B] hover:bg-[#1A1A1A] text-white py-4 rounded-xl font-bold transition-all duration-300 text-base group/btn">
                Find Drop-off Sites
                <svg className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2 - Paid Pickup */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-[#FFD700]">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/paid-pickup.jpg"
                alt="Professional crew handling a pickup service"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-[#FFD700] text-[#1A1A1A] rounded-full text-sm font-bold shadow-lg">
                  POPULAR
                </span>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-10">
              <h3 className="font-black text-3xl mb-4 text-white">Paid Pickup</h3>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Professional team removes items from inside your home. Fast, insured, and completely hassle-free.
              </p>

              <ul className="flex flex-col gap-4 mb-10">
                <li className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-[#FFD700] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Same or next-day service</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-[#FFD700] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No heavy lifting required</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <svg className="w-6 h-6 text-[#FFD700] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Insured and vetted professionals</span>
                </li>
              </ul>

              <Link href="/book" className="flex w-full items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] py-4 rounded-xl font-bold transition-all duration-300 text-base group/btn shadow-xl">
                Book Pickup Now
                <svg className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
