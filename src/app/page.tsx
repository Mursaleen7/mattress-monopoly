import Link from 'next/link';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white font-extrabold text-5xl mb-4">
            Mattress & Bulk Item Disposal, Simplified
          </h1>
          <p className="text-white opacity-90 text-lg mb-8">
            Find Your City's Rules & Options
          </p>

          {/* Search Component */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Find Your City's Rules & Options"
                className="flex-1 px-6 py-4 text-gray-800 outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-8 text-white font-semibold transition">
                🔍
              </button>
            </div>
          </div>

          <p className="text-white text-sm">
            Official Regulations & Fast Pickup Services Nationwide
          </p>
        </div>
      </section>

      {/* Two Ways to Dispose Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-gray-900 font-bold text-3xl mb-12">
            Two Ways to Dispose
          </h2>

          <div className="flex justify-center gap-8">
            {/* Card 1 - Self-Haul */}
            <div className="border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center text-center max-w-md">
              <div className="text-6xl text-gray-700 mb-4">🚚</div>
              <h3 className="font-bold text-xl mb-2">
                Self-Haul (Free, Requires Effort)
              </h3>
              <p className="text-gray-600 mb-6">
                Find drop-off locations and strict regulations. Requires truck, time, and heavy lifting.
              </p>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-md font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Card 2 - Paid Pickup */}
            <div className="border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center text-center max-w-md">
              <div className="text-6xl mb-4">👷</div>
              <h3 className="font-bold text-xl mb-2">
                Paid Pickup (Easy, Zero Effort)
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a professional team to remove items from inside your home. Fast & secure.
              </p>
              <Link href="/book" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition">
                Book Pickup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-gray-900 font-bold text-3xl mb-8">
            Browse by City
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesData.map((city) => (
              <Link
                key={`${city.state_slug}-${city.city_slug}`}
                href={`/disposal-guides/${city.state_slug}/${city.city_slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-xl text-gray-900">
                  {city.city_name}
                </h3>
                <p className="text-gray-600 text-sm">{city.state_name}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Population: {city.population.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
