import { Metadata } from 'next';
import citiesData from '@/../data/cities.json';

interface City {
  city_slug: string;
  city_name: string;
  state_slug: string;
  state_name: string;
  state_abbr: string;
  population: number;
  mattress_rules: string;
  dropoff_locations: {
    name: string;
    address: string;
    phone: string;
    hours: string;
    accepts_mattresses: boolean;
  }[];
  pickup_service_available: boolean;
  pickup_phone: string;
  illegal_dumping_fine: string;
  last_updated: string;
}

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

// Generate static paths for all cities
export async function generateStaticParams() {
  return citiesData.map((city: City) => ({
    state: city.state_slug,
    city: city.city_slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state_slug === state && c.city_slug === city
  );

  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Mattress Disposal in ${cityData.city_name}, ${cityData.state_abbr} | Free Guide`,
    description: `Complete guide to mattress disposal and recycling in ${cityData.city_name}, ${cityData.state_name}. Find local services, pickup options, and eco-friendly solutions.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state_slug === state && c.city_slug === city
  );

  if (!cityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">City not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mattress Disposal Guide:<br />
              {cityData.city_name}, {cityData.state_abbr} (2026 Rules)
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Official Regulations & Fast Pickup Services Nationwide
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition">
                📦 Schedule Pickup
              </button>
              <button className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition">
                📍 Find Drop-off
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Two Ways to Dispose */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            How do you envision this?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Self-Haul Option */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-slate-200 hover:border-blue-400 transition">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">🚚</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Self-Haul</h3>
                <p className="text-slate-600 mb-4">(Free, Requires Effort)</p>
              </div>
              <ul className="text-sm text-slate-700 space-y-2 mb-6">
                <li>✓ Free disposal at city facilities</li>
                <li>✓ Must transport yourself</li>
                <li>✓ Requires truck/vehicle</li>
                <li>✓ Limited facility hours</li>
              </ul>
              <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>

            {/* Paid Pickup Option */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-8 border-2 border-orange-300 relative">
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                RECOMMENDED
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">👷</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Paid Pickup</h3>
                <p className="text-slate-600 mb-4">(Easy, Zero Effort)</p>
              </div>
              <ul className="text-sm text-slate-700 space-y-2 mb-6">
                <li>✓ Same-day or next-day service</li>
                <li>✓ We lift and haul everything</li>
                <li>✓ No truck needed</li>
                <li>✓ Eco-friendly disposal</li>
              </ul>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md transition">
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* City Regulations Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <span className="text-3xl mr-4">⚠️</span>
            <div>
              <h3 className="font-bold text-amber-900 text-lg mb-2">
                Important Alert: {cityData.city_name} Drop-off Regulations
              </h3>
              <div className="text-amber-800 text-sm space-y-2">
                <p className="font-semibold">Before you self-haul, know these rules:</p>
                <p>{cityData.mattress_rules}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drop-off Locations */}
        {cityData.dropoff_locations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              📍 Drop-off Locations
            </h2>
            <div className="space-y-6">
              {cityData.dropoff_locations.map((location, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">
                    {location.name}
                  </h3>
                  <div className="text-slate-600 space-y-1">
                    <p>📍 {location.address}</p>
                    <p>📞 {location.phone}</p>
                    <p>🕐 {location.hours}</p>
                  </div>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View on Map →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skip the Dump Run CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-2xl p-12 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Skip the Dump Run</h2>
          <p className="text-xl mb-8 text-blue-100">
            Earn a day free, within your city limits, with a Junk Pickup
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg transition transform hover:scale-105">
            Check Pickup Availability in {cityData.city_name}
          </button>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-8 mt-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🚫</span>
              <span>No Lifting</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">⚡</span>
              <span>Fast</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">♻️</span>
              <span>Eco-Friendly</span>
            </div>
          </div>
        </div>

        {/* Important Info Box */}
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
          <div className="flex items-start">
            <span className="text-3xl mr-4">🚨</span>
            <div>
              <h3 className="font-bold text-red-900 text-lg mb-2">
                Illegal Dumping Penalties
              </h3>
              <p className="text-red-800">
                <span className="font-semibold">Fine:</span> {cityData.illegal_dumping_fine}
              </p>
              <p className="text-sm text-red-700 mt-2">
                Disposing of mattresses on streets or vacant lots is illegal and subject to heavy fines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Last updated: {cityData.last_updated} | Population: {cityData.population.toLocaleString()}
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Information sourced from official {cityData.city_name} government resources
          </p>
        </div>
      </footer>
    </main>
  );
}
