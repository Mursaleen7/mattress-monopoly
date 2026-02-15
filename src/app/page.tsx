import Link from 'next/link';
import citiesData from '@/../data/cities.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Mattress & Bulk Item<br />Disposal, Simplified
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              Find Your City's Rules & Options
            </p>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Find Your City's Rules & Options"
                  className="flex-1 px-6 py-3 text-slate-800 text-lg outline-none rounded-full"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition">
                  🔍
                </button>
              </div>
              <p className="text-slate-300 text-sm mt-4">
                Official Regulations & Fast Pickup Services Nationwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Two Ways Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Two Ways to Dispose
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Choose the option that works best for you
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self-Haul */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-slate-200">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Self-Haul</h3>
              <p className="text-slate-600 mb-4">(Free, Requires Effort)</p>
              <p className="text-sm text-slate-700">
                Transport to city facilities yourself. Free but requires truck and time.
              </p>
              <button className="mt-6 bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Paid Pickup */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 border-2 border-orange-300">
              <div className="text-6xl mb-4">👷</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Paid Pickup</h3>
              <p className="text-slate-600 mb-4">(Easy, Zero Effort)</p>
              <p className="text-sm text-slate-700">
                We come to you, lift and haul. Same-day service available.
              </p>
              <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* City Grid */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">
            Browse by City
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Select your city to view local disposal regulations and options
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="group block p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition">
                      {city.city_name}
                    </h3>
                    <p className="text-slate-600 text-sm">{city.state_name}</p>
                    <p className="text-slate-500 text-xs mt-2">
                      Pop: {city.population.toLocaleString()}
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

        {/* Trust Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Trust Badges</h3>
            <p className="text-slate-600 text-sm">Official city regulations verified</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Contact</h3>
            <p className="text-slate-600 text-sm">Fast response times</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4">♻️</div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Eco-Friendly</h3>
            <p className="text-slate-600 text-sm">Responsible disposal methods</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Trust Badges</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>✓ Verified Information</p>
                <p>✓ Official Sources</p>
                <p>✓ Updated 2026</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>Support</p>
                <p>Find Haulers</p>
                <p>Partner</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>About</p>
                <p>Privacy</p>
                <p>Terms</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>Blog</p>
                <p>Guides</p>
                <p>FAQ</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 DisposalGrid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
