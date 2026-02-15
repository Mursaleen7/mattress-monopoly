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
  population: {
    count: number;
    year: number;
    source: string;
  };
  contacts: {
    official_phone: string;
    department_name: string;
    website_url: string;
  };
  curbside_rules: {
    is_available: boolean;
    mattress_specific_rule: string;
    placement_time: string;
    size_limits: string;
  };
  drop_off_locations: {
    name: string;
    address: string;
    type: string;
    hours: string;
    notes: string;
  }[];
  illegal_dumping: {
    fine_amount: string;
    citation: string;
  };
  audit_metadata: {
    confidence_score: string;
    verification_checklist: {
      gov_source_found: boolean;
      mattress_rule_verified: boolean;
      facility_hours_verified: boolean;
      facility_type_verified: boolean;
      population_census_verified: boolean;
    };
    sources_used: string[];
    last_updated: string;
  };
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* City Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2f3e45] via-[#3a4d54] to-[#2f3e45] py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#cities" className="hover:text-white transition-colors">Cities</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{cityData.city_name}</span>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-6">
              <svg className="w-4 h-4 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-orange-300 text-sm font-semibold">{cityData.state_name}</span>
            </div>

            <h1 className="text-white font-extrabold text-5xl md:text-6xl mb-4 leading-tight">
              Mattress Disposal Guide:<br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {cityData.city_name}, {cityData.state_abbr}
              </span>
            </h1>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
              Official 2026 regulations & fast pickup services for {cityData.city_name} residents
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-white text-sm">{cityData.population.count.toLocaleString()} residents</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">Updated {cityData.audit_metadata.last_updated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Choose Your Option
            </span>
            <h2 className="text-gray-900 font-bold text-4xl mb-4">
              How Would You Like to Dispose?
            </h2>
            <p className="text-gray-600 text-lg">
              Select the method that works best for your situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1 - Self-Haul or Curbside */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400">
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {cityData.curbside_rules.is_available ? 'CURBSIDE' : 'DROP-OFF'}
                </span>
              </div>

              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cityData.curbside_rules.is_available ? (
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cityData.curbside_rules.is_available ? 'Schedule Curbside Pickup' : 'I Have a Truck & Time'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {cityData.curbside_rules.is_available ? 'Free city pickup service' : 'View free drop-off locations'}
                </p>
              </div>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                View Details
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Option 2 - Paid Pickup */}
            <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  RECOMMENDED
                </span>
              </div>

              <div className="mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  I Want It Gone NOW
                </h3>
                <p className="text-orange-100 mb-4">Schedule affordable pickup</p>
              </div>

              <Link href="/book" className="block w-full bg-white hover:bg-gray-50 text-orange-600 py-3 rounded-xl font-bold transition-all duration-300 text-center">
                <span className="flex items-center justify-center gap-2">
                  Book Pickup Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-gray-900 font-bold text-4xl mb-4">
              {cityData.city_name} Drop-off Regulations
            </h2>
            <p className="text-gray-600 text-lg">
              Official requirements from the city sanitation department
            </p>
          </div>

          {/* Alert Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
            <div className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-xl mb-3">
                  {cityData.curbside_rules.is_available ? 'Curbside Pickup Rules' : 'Important: Read Before Disposing'}
                </h3>
                
                {cityData.curbside_rules.is_available ? (
                  <div className="space-y-3">
                    {cityData.curbside_rules.mattress_specific_rule && (
                      <div>
                        <p className="text-gray-800 font-semibold mb-1">Mattress Requirements:</p>
                        <p className="text-gray-700 leading-relaxed">{cityData.curbside_rules.mattress_specific_rule}</p>
                      </div>
                    )}
                    
                    {cityData.curbside_rules.placement_time && (
                      <div>
                        <p className="text-gray-800 font-semibold mb-1">Placement Time:</p>
                        <p className="text-gray-700 leading-relaxed">{cityData.curbside_rules.placement_time}</p>
                      </div>
                    )}
                    
                    {cityData.curbside_rules.size_limits && (
                      <div>
                        <p className="text-gray-800 font-semibold mb-1">Size & Weight Limits:</p>
                        <p className="text-gray-700 leading-relaxed">{cityData.curbside_rules.size_limits}</p>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-amber-200">
                      <p className="text-gray-800 font-semibold mb-1">Contact Information:</p>
                      <p className="text-gray-700">
                        {cityData.contacts.department_name} • {cityData.contacts.official_phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Contact {cityData.contacts.department_name} at {cityData.contacts.official_phone} for mattress disposal requirements.
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-amber-900 font-semibold mt-4 pt-4 border-t border-amber-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Illegal dumping fine: {cityData.illegal_dumping.fine_amount}
                </div>
              </div>
            </div>
          </div>

          {/* Drop-off Locations */}
          {cityData.drop_off_locations && cityData.drop_off_locations.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold">Interactive Map</p>
                  <p className="text-gray-500 text-sm">View {cityData.city_name} locations</p>
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Drop-off Locations</h3>
                {cityData.drop_off_locations.map((location, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-900">
                        {location.name}
                      </h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {location.type}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{location.hours}</span>
                      </div>
                      {location.notes && (
                        <div className="flex items-start gap-3 mt-3 pt-3 border-t border-gray-200">
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm italic">{location.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#d1e8f5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-gray-900 font-bold text-5xl mb-6">
            Skip the Hassle
          </h2>
          <p className="text-gray-700 text-xl mb-12 max-w-2xl mx-auto">
            Professional pickup service available in {cityData.city_name}. Same-day or next-day scheduling.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Fast Service</h3>
              <p className="text-gray-600 text-sm">As soon as tomorrow</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">No Heavy Lifting</h3>
              <p className="text-gray-600 text-sm">We do all the work</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Insured & Vetted</h3>
              <p className="text-gray-600 text-sm">Trusted professionals</p>
            </div>
          </div>

          <Link href="/book" className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            Check Availability in {cityData.city_name}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-gray-600 text-sm mt-6">
            ✓ Vetted partners • ✓ Insured • ✓ Eco-friendly disposal
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
