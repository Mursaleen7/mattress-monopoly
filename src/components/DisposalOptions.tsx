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
            Select the option that best fits your schedule and resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 - Self-Haul */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e2e8ed]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/images/self-haul.jpg"
                alt="Person loading a mattress onto a pickup truck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                  FREE
                </span>
              </div>
            </div>

            <div className="p-8 pt-4">
              <h3 className="font-bold text-2xl mb-2 text-[#1a2830]">Self-Haul</h3>
              <p className="text-[#e8734a] font-semibold text-sm mb-4">Free, Requires Effort</p>
              <p className="text-[#5a6e78] mb-6 leading-relaxed">
                Locate drop-off sites and meet strict regulations. Requires truck, time, and heavy lifting.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center text-[#3a4d54]">
                  <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No service fees
                </li>
                <li className="flex items-center text-[#3a4d54]">
                  <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Eco-friendly disposal
                </li>
                <li className="flex items-center text-[#5a6e78]">
                  <svg className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Requires vehicle & time
                </li>
              </ul>

              <button className="w-full bg-[#f0f3f5] hover:bg-[#e2e8ed] text-[#1a2830] py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                Learn More
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2 - Paid Pickup */}
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-52 overflow-hidden">
              <Image
                src="/images/paid-pickup.jpg"
                alt="Professional crew loading mattress into removal truck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#e8734a] via-[#e8734a]/30 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/25 backdrop-blur-sm text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  POPULAR
                </span>
              </div>
            </div>

            <div className="bg-[#e8734a] p-8 pt-4">
              <h3 className="font-bold text-2xl mb-2 text-white">Paid Pickup</h3>
              <p className="text-[#fcd3c1] font-semibold text-sm mb-4">Easy, Zero Effort</p>
              <p className="text-white/90 mb-6 leading-relaxed">
                Professional team removes items from inside your home. Fast, secure, and hassle-free service.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Same/next-day service
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No heavy lifting required
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Insured & vetted pros
                </li>
              </ul>

              <Link href="/book" className="block w-full bg-white hover:bg-[#f8f9fa] text-[#e8734a] py-4 rounded-xl font-bold transition-all duration-300 text-center group/btn">
                <span className="flex items-center justify-center gap-2">
                  Book Pickup Now
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
