import Link from 'next/link';
import citiesData from '@/../data/cities.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mattress Disposal Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find local mattress disposal and recycling options in your city.
            Eco-friendly solutions for every community.
          </p>
        </div>

        {/* City Grid */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by City
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesData.map((city) => (
              <Link
                key={`${city.state}-${city.city}`}
                href={`/disposal-guides/${city.state}/${city.city}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-lg text-gray-900">
                  {city.cityName}
                </h3>
                <p className="text-gray-600 text-sm">{city.stateName}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Population: {city.population.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Can't find your city?
          </h2>
          <p className="text-lg mb-6">
            We're constantly adding new locations. Check back soon!
          </p>
        </div>
      </div>
    </main>
  );
}
