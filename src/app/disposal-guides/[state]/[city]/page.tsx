import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationMap from '@/components/LocationMap';

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

export async function generateStaticParams() {
  return citiesData.map((city: City) => ({
    state: city.state_slug,
    city: city.city_slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state_slug === state && c.city_slug === city
  );

  if (!cityData) {
    return { title: 'City Not Found' };
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
        <h1 className="text-2xl text-[#1a2830]">City not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* City Hero Section with background image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-mattress.jpg"
            alt={`Mattress disposal service in ${cityData.city_name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a2830]/85" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#8a9ca5] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#cities" className="hover:text-white transition-colors">Cities</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">{cityData.city_name}</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8734a]/15 backdrop-blur-sm rounded-full border border-[#e8734a]/30 mb-6">
              <svg className="w-4 h-4 text-[#f0a07a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-[#f0a07a] text-sm font-semibold">{cityData.state_name}</span>
            </div>

            <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-balance">
              Mattress Disposal Guide:{' '}
              <span className="text-[#e8734a]">
                {cityData.city_name}, {cityData.state_abbr}
              </span>
            </h1>
            <p className="text-[#b0c4ce] text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Official 2026 regulations & fast pickup services for {cityData.city_name} residents
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-white text-sm">{cityData.population.count.toLocaleString()} residents</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">Updated {cityData.audit_metadata.last_updated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#e8734a]/10 text-[#e8734a] rounded-full text-sm font-semibold mb-4">
              Choose Your Option
            </span>
            <h2 className="text-[#1a2830] font-bold text-3xl md:text-4xl mb-4 text-balance">
              How Would You Like to Dispose?
            </h2>
            <p className="text-[#5a6e78] text-lg leading-relaxed">
              Select the method that works best for your situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1 - Self-Haul or Curbside */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e2e8ed] hover:border-[#3a4d54]">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/self-haul.jpg"
                  alt="Self-haul mattress disposal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    {cityData.curbside_rules.is_available ? 'CURBSIDE' : 'DROP-OFF'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a2830] mb-2">
                  {cityData.curbside_rules.is_available ? 'Schedule Curbside Pickup' : 'I Have a Truck & Time'}
                </h3>
                <p className="text-[#5a6e78] mb-4 text-sm leading-relaxed">
                  {cityData.curbside_rules.is_available ? 'Free city pickup service' : 'View free drop-off locations'}
                </p>
                <button className="w-full bg-[#f0f3f5] hover:bg-[#e2e8ed] text-[#1a2830] py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Option 2 - Paid Pickup */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/paid-pickup.jpg"
                  alt="Professional mattress pickup service"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#e8734a] via-[#e8734a]/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/25 backdrop-blur-sm text-white rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    RECOMMENDED
                  </span>
                </div>
              </div>

              <div className="bg-[#e8734a] p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  I Want It Gone NOW
                </h3>
                <p className="text-[#fcd3c1] mb-4 text-sm">Schedule affordable pickup</p>
                <Link href="/book" className="block w-full bg-white hover:bg-[#f8f9fa] text-[#e8734a] py-3 rounded-xl font-bold transition-all duration-300 text-center text-sm">
                  <span className="flex items-center justify-center gap-2">
                    Book Pickup Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-[#1a2830] font-bold text-3xl md:text-4xl mb-3">
              {cityData.city_name} Drop-off Regulations
            </h2>
            <p className="text-[#5a6e78] text-lg leading-relaxed">
              Official requirements from the city sanitation department
            </p>
          </div>

          {/* Alert Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-lg mb-3">
                  {cityData.curbside_rules.is_available ? 'Curbside Pickup Rules' : 'Important: Read Before Disposing'}
                </h3>
                
                {cityData.curbside_rules.is_available ? (
                  <div className="flex flex-col gap-3">
                    {cityData.curbside_rules.mattress_specific_rule && (
                      <div>
                        <p className="text-[#3a4d54] font-semibold text-sm mb-1">Mattress Requirements:</p>
                        <p className="text-[#5a6e78] leading-relaxed text-sm">{cityData.curbside_rules.mattress_specific_rule}</p>
                      </div>
                    )}
                    {cityData.curbside_rules.placement_time && (
                      <div>
                        <p className="text-[#3a4d54] font-semibold text-sm mb-1">Placement Time:</p>
                        <p className="text-[#5a6e78] leading-relaxed text-sm">{cityData.curbside_rules.placement_time}</p>
                      </div>
                    )}
                    {cityData.curbside_rules.size_limits && (
                      <div>
                        <p className="text-[#3a4d54] font-semibold text-sm mb-1">Size & Weight Limits:</p>
                        <p className="text-[#5a6e78] leading-relaxed text-sm">{cityData.curbside_rules.size_limits}</p>
                      </div>
                    )}
                    <div className="pt-2 border-t border-amber-200">
                      <p className="text-[#3a4d54] font-semibold text-sm mb-1">Contact Information:</p>
                      <p className="text-[#5a6e78] text-sm">
                        {cityData.contacts.department_name} &bull; {cityData.contacts.official_phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#5a6e78] leading-relaxed text-sm mb-4">
                    Contact {cityData.contacts.department_name} at {cityData.contacts.official_phone} for mattress disposal requirements.
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mt-4 pt-3 border-t border-amber-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
              <LocationMap 
                locations={cityData.drop_off_locations} 
                cityName={cityData.city_name}
              />

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#1a2830] mb-2">Drop-off Locations</h3>
                {cityData.drop_off_locations.map((location, index) => (
                  <div key={index} className="bg-white border border-[#e2e8ed] rounded-xl p-5 hover:border-[#e8734a] hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-[#1a2830]">
                        {location.name}
                      </h4>
                      <span className="px-2.5 py-0.5 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold">
                        {location.type}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 text-[#5a6e78] text-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-[#e8734a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#e8734a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{location.hours}</span>
                      </div>
                      {location.notes && (
                        <div className="flex items-start gap-2 mt-1 pt-2 border-t border-[#e2e8ed]">
                          <svg className="w-4 h-4 text-[#8a9ca5] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <span className="italic text-[#8a9ca5]">{location.notes}</span>
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

      {/* CTA Section with background image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-clean-room.jpg"
            alt="Clean bedroom after mattress removal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a2830]/75 backdrop-blur-[2px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-4 text-balance">
            Skip the Hassle
          </h2>
          <p className="text-[#b0c4ce] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional pickup service available in {cityData.city_name}. Same-day or next-day scheduling.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-[#e8734a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">Fast Service</h3>
              <p className="text-[#8a9ca5] text-sm">As soon as tomorrow</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-[#e8734a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">No Heavy Lifting</h3>
              <p className="text-[#8a9ca5] text-sm">We do all the work</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-[#e8734a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">Insured & Vetted</h3>
              <p className="text-[#8a9ca5] text-sm">Trusted professionals</p>
            </div>
          </div>

          <Link href="/book" className="inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#d4623b] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group">
            Check Availability in {cityData.city_name}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-[#8a9ca5] text-sm mt-6">
            Vetted partners &bull; Insured &bull; Eco-friendly disposal
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
