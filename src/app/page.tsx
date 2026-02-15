import Link from 'next/link';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-slate-700 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-white font-bold text-5xl mb-6 leading-tight">
            Mattress & Bulk Item<br />Disposal, Simplified
          </h1>
          <p className="text-white text-xl mb-8">
            Find Your City's Rules & Options
          </p>

          {/* Search Component */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="flex bg-white rounded-full overflow-hidden shadow-xl">
              <input
                type="text"
                placeholder="Find Your City's Rules & Options"
                className="flex-1 px-6 py-4 text-gray-700 outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 text-white font-semibold transition rounded-full m-1">
                🔍
              </button>
            </div>
          </div>

          <p className="text-white text-sm opacity-90">
            Official Regulations & Fast Pickup Services Nationwide
          </p>
        </div>
      </section>

      {/* Two Ways to Dispose Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-gray-900 font-bold text-4xl mb-16">
            Two Ways to Dispose
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 - Self-Haul */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-md p-10 flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="w-32 h-32" viewBox="0 0 200 200" fill="none">
                  {/* Truck illustration */}
                  <rect x="40" y="80" width="80" height="50" fill="#94a3b8" rx="4"/>
                  <rect x="120" y="90" width="40" height="40" fill="#475569" rx="4"/>
                  <circle cx="70" cy="135" r="12" fill="#1e293b"/>
                  <circle cx="130" cy="135" r="12" fill="#1e293b"/>
                  <rect x="45" y="85" width="15" height="15" fill="#e2e8f0"/>
                  <rect x="65" y="85" width="15" height="15" fill="#e2e8f0"/>
                  <rect x="85" y="85" width="15" height="15" fill="#e2e8f0"/>
                </svg>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900">
                Self-Haul
              </h3>
              <p className="text-gray-600 mb-3">(Free, Requires Effort)</p>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Locate drop-off sites and meet strict regulations. Requires truck, time, and heavy lifting.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Card 2 - Paid Pickup */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-md p-10 flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="w-32 h-32" viewBox="0 0 200 200" fill="none">
                  {/* Workers illustration */}
                  <circle cx="80" cy="70" r="20" fill="#475569"/>
                  <path d="M80 90 L60 130 L100 130 Z" fill="#64748b"/>
                  <circle cx="120" cy="70" r="20" fill="#475569"/>
                  <path d="M120 90 L100 130 L140 130 Z" fill="#64748b"/>
                  <circle cx="100" cy="110" r="15" fill="#f97316"/>
                </svg>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-gray-900">
                Paid Pickup
              </h3>
              <p className="text-gray-600 mb-3">(Easy, Zero Effort)</p>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                We're a vetted set of pre-pros that will take care of you from start to anonymous and beyond the.
              </p>
              <Link href="/book" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-gray-900 font-bold text-4xl mb-4">
            Browse by City
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Select your city to view local disposal regulations and options
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition">
                      {city.city_name}
                    </h3>
                    <p className="text-gray-600 text-sm">{city.state_name}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Population: {city.population.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    📍
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Trust Badges */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-3xl">✓</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-gray-400">
                  <span className="text-xs font-bold text-gray-700">100%<br/>SECURE</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 mx-auto border-4 border-gray-400">
                  <span className="text-xs font-bold text-gray-700">BEST<br/>PRICE</span>
                </div>
              </div>
            </div>

            {/* Trust Badges Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Trust Badges</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Our Partners</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Delivery Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Find Haulers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-600 pt-6 flex justify-between items-center text-gray-400 text-sm">
            <p>Copyright © 2026 - DisposalGrid.com</p>
            <p>© DisposalGrid</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
