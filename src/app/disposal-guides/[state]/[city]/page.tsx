import { Metadata } from 'next';
import Link from 'next/link';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    title: `Mattress Disposal Guide: ${cityData.city_name}, ${cityData.state_abbr} (2026 Rules)`,
    description: `Official municipal drop-off regulations & fast private pickup options for ${cityData.city_name}, ${cityData.state_name}.`,
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
    <main className="min-h-screen">
      <Header />

      {/* City Hero Section */}
      <section className="bg-[#2f3e45] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-white font-extrabold text-3xl mb-4">
            Mattress Disposal Guide: {cityData.city_name}, {cityData.state_abbr} (2026 Rules)
          </h1>
          <p className="text-white">
            Official municipal drop-off regulations & fast private pickup options
          </p>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="bg-[#2f3e45] py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Half - Self-Haul */}
            <div className="bg-[#3a4d54] text-white p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">
                [Option 1: I have a Truck & Time]
              </h3>
              <p className="text-sm mb-4">View free rules</p>
              <button className="text-white underline hover:text-gray-300 transition">
                Learn More
              </button>
            </div>

            {/* Right Half - Paid Pickup */}
            <div className="bg-[#3a4d54] border-2 border-orange-500 text-white p-6 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">
                [Option 2: I want it gone NOW]
              </h3>
              <p className="text-sm mb-4">Schedule affordable pickup</p>
              <Link href="/book" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-gray-900 font-bold text-2xl mb-6">
            City of {cityData.city_name} Drop-off Regulations
          </h2>

          {/* Alert Box */}
          <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-6 mb-8 flex gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Alert:</h3>
              <p className="text-gray-800">{cityData.mattress_rules}</p>
              <p className="text-sm text-gray-700 mt-2">
                Illegal dumping fine: <span className="font-semibold">{cityData.illegal_dumping_fine}</span>
              </p>
            </div>
          </div>

          {/* Data Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <span className="text-4xl mb-2 block">📍</span>
                <p>Map of {cityData.city_name}</p>
              </div>
            </div>

            {/* Right Column - Locations */}
            <div className="space-y-6">
              {cityData.dropoff_locations.map((location, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-700 text-sm">{location.address}</p>
                  <p className="text-gray-700 text-sm">Hours: {location.hours}</p>
                  <p className="text-gray-700 text-sm">Phone: {location.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pickup Section */}
      <section className="bg-sky-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-gray-900 font-bold text-3xl mb-8">
            Skip the Dump Run. Schedule a Pickup.
          </h2>

          {/* Benefit Icons */}
          <div className="flex justify-center gap-12 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-5xl text-slate-700 mb-2">💪</span>
              <p className="text-gray-700 font-semibold">No Heavy Lifting</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl text-slate-700 mb-2">🚚</span>
              <p className="text-gray-700 font-semibold">No Vehicle Needed</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl text-slate-700 mb-2">⏰</span>
              <p className="text-gray-700 font-semibold">As soon as tomorrow</p>
            </div>
          </div>

          {/* Primary CTA */}
          <Link href="/book" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-bold shadow-lg transition">
            Check Pickup Availability in {cityData.city_name}
          </Link>

          <p className="text-gray-600 text-sm mt-4">
            Vetted partners • Insured • Eco-friendly disposal
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
