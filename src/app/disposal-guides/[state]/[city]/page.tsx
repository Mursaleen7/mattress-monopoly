import { Metadata } from 'next';
import citiesData from '@/../data/cities.json';

interface City {
  city: string;
  cityName: string;
  state: string;
  stateName: string;
  stateAbbr: string;
  population: number;
  disposalOptions: string[];
  localServices: {
    name: string;
    phone: string;
    website: string;
  }[];
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
    state: city.state,
    city: city.city,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state === state && c.city === city
  );

  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Mattress Disposal in ${cityData.cityName}, ${cityData.stateAbbr} | Free Guide`,
    description: `Complete guide to mattress disposal and recycling in ${cityData.cityName}, ${cityData.stateName}. Find local services, pickup options, and eco-friendly solutions.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state === state && c.city === city
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
            Mattress Disposal in {cityData.cityName}, {cityData.stateAbbr}
          </h1>
          <p className="text-xl text-gray-600">
            Your complete guide to responsible mattress disposal and recycling in {cityData.cityName}
          </p>
        </div>

        {/* Disposal Options */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Disposal Options
          </h2>
          <ul className="space-y-3">
            {cityData.disposalOptions.map((option, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700">{option}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Local Services */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Local Services
          </h2>
          <div className="space-y-4">
            {cityData.localServices.map((service, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {service.name}
                </h3>
                <p className="text-gray-600">Phone: {service.phone}</p>
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
