import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#FFD700]/10 mb-8">
            <span className="text-4xl font-black text-[#FFD700]">404</span>
          </div>

          {/* Heading */}
          <h1 className="text-[#1A1A1A] font-black text-4xl md:text-5xl mb-4">
            We Haven't Launched Here Yet
          </h1>
          
          <p className="text-[#808080] text-lg mb-8 leading-relaxed">
            This city isn't in our database yet, but we're expanding fast! Want to be notified when we launch in your area?
          </p>

          {/* Email Notification Form */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-10 border-2 border-gray-200">
            <h2 className="font-bold text-xl text-[#1A1A1A] mb-4">Get Notified</h2>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-300 focus:border-[#FFD700] focus:outline-none text-[#1A1A1A] placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#1A1A1A] hover:bg-[#2B2B2B] text-white rounded-xl font-bold transition-all duration-300 whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
            <p className="text-xs text-[#808080] mt-3">We'll email you as soon as we launch in your city</p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 rounded-2xl p-8 border-2 border-[#FFD700]/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold text-xl text-[#1A1A1A]">Need Disposal Now?</h3>
            </div>
            <p className="text-[#808080] mb-6">
              In the meantime, you can still book a professional pickup service in your area
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Book Private Pickup
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Browse Cities Link */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-[#808080] mb-4">Or browse cities we currently serve:</p>
            <Link
              href="/#cities"
              className="inline-flex items-center gap-2 text-[#0055FF] hover:text-[#0044CC] font-semibold transition-colors"
            >
              View All Cities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
