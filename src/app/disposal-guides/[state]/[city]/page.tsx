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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mattress Disposal in {cityData.city_name}, {cityData.state_abbr}
          </h1>
          <p className="text-xl text-gray-600">
            Your complete guide to responsible mattress disposal and recycling in {cityData.city_name}
          </p>
        </div>

        {/* Official Rules */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Official Disposal Rules
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {cityData.mattress_rules}
          </p>
          {cityData.pickup_service_available && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                📞 Schedule pickup: <span className="font-semibold">{cityData.pickup_phone}</span>
              </p>
            </div>
          )}
        </div>

        {/* Drop-off Locations */}
        {cityData.dropoff_locations.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Drop-off Locations
            </h2>
            <div className="space-y-4">
              {cityData.dropoff_locations.map((location, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {location.name}
                  </h3>
                  <p className="text-gray-600">{location.address}</p>
                  <p className="text-gray-600">Phone: {location.phone}</p>
                  <p className="text-gray-600">Hours: {location.hours}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-2">⚠️ Important</h3>
          <p className="text-gray-700">
            Illegal dumping fine: <span className="font-semibold">{cityData.illegal_dumping_fine}</span>
          </p>
        </div>

        {/* CTA Section - Placeholder for affiliate links */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Disposing Your Mattress?
          </h2>
          <p className="text-lg mb-6">
            Don't have time or a truck? Professional pickup services available.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Free Quote
          </button>
        </div>
      </div>
    </main>
  );
}
