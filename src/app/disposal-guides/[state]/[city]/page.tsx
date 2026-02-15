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
    title: `Disposal Guide: ${cityData.city_name}, ${cityData.state_abbr} | DisposalGrid`,
    description: `Official disposal regulations and pickup options for ${cityData.city_name}, ${cityData.state_name}. Find drop-off sites and book professional service.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const cityData = citiesData.find(
    (c: City) => c.state_slug === state && c.city_slug === city
  );

  if (!cityData) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <h1 className="text-2xl font-bold text-[#1a2830] mb-2">City not found</h1>
          <p className="text-[#5a6e78] mb-6">The city you are looking for does not exist in our database.</p>
          <Link href="/#cities" className="text-[#e8734a] font-semibold hover:underline">
            Browse all cities
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* City Hero - uses distinct city image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/city-hero.jpg"
            alt={`Disposal services in ${cityData.city_name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#1a2830]/85" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-[#8a9ca5] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#5a6e78]">/</span>
            <Link href="/#cities" className="hover:text-white transition-colors">Cities</Link>
            <span className="text-[#5a6e78]">/</span>
            <span className="text-white">{cityData.city_name}, {cityData.state_abbr}</span>
          </nav>

          <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 leading-tight text-balance">
            Disposal Guide:{' '}
            <span className="text-[#e8734a]">{cityData.city_name}, {cityData.state_abbr}</span>
          </h1>
          <p className="text-[#b0c4ce] text-lg max-w-2xl leading-relaxed">
            Official regulations and pickup services for {cityData.city_name} residents
          </p>
        </div>
      </section>

      {/* Decision Cards */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#1a2830] font-bold text-2xl md:text-3xl mb-8">
            How would you like to dispose?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Self-Haul / Curbside */}
            <div className="bg-white rounded-2xl border border-[#e2e8ed] p-6 hover:border-[#1a2830] hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2830]">
                    {cityData.curbside_rules.is_available ? 'Curbside Pickup' : 'Self-Haul Drop-off'}
                  </h3>
                  <p className="text-emerald-600 text-xs font-semibold">Free</p>
                </div>
              </div>
              <p className="text-[#5a6e78] text-sm leading-relaxed">
                {cityData.curbside_rules.is_available
                  ? 'Schedule a free city curbside pickup. See rules below for requirements.'
                  : 'Find free drop-off locations near you. Vehicle required.'}
              </p>
            </div>

            {/* Paid Pickup */}
            <Link href="/book" className="block bg-[#e8734a] rounded-2xl p-6 hover:bg-[#d4623b] transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Professional Pickup</h3>
                  <p className="text-white/70 text-xs font-semibold">Recommended</p>
                </div>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Professional team removes everything from your home. Same-day and next-day available.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                Book now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#1a2830] font-bold text-2xl md:text-3xl mb-3">
            {cityData.city_name} Disposal Regulations
          </h2>
          <p className="text-[#5a6e78] mb-10">
            Official requirements from {cityData.contacts.department_name}
          </p>

          {/* Rules Card */}
          <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-2xl p-6 md:p-8 mb-10">
            <div className="flex flex-col gap-5">
              {cityData.curbside_rules.is_available && cityData.curbside_rules.mattress_specific_rule && (
                <div>
                  <h3 className="font-semibold text-[#1a2830] text-sm mb-1">Specific Requirements</h3>
                  <p className="text-[#5a6e78] text-sm leading-relaxed">{cityData.curbside_rules.mattress_specific_rule}</p>
                </div>
              )}
              {cityData.curbside_rules.placement_time && (
                <div>
                  <h3 className="font-semibold text-[#1a2830] text-sm mb-1">Placement Time</h3>
                  <p className="text-[#5a6e78] text-sm leading-relaxed">{cityData.curbside_rules.placement_time}</p>
                </div>
              )}
              {cityData.curbside_rules.size_limits && (
                <div>
                  <h3 className="font-semibold text-[#1a2830] text-sm mb-1">Size and Weight Limits</h3>
                  <p className="text-[#5a6e78] text-sm leading-relaxed">{cityData.curbside_rules.size_limits}</p>
                </div>
              )}

              <div className="pt-4 border-t border-[#e2e8ed] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm">
                  <span className="text-[#1a2830] font-semibold">{cityData.contacts.department_name}</span>
                  <span className="text-[#8a9ca5] mx-2">&middot;</span>
                  <a href={`tel:${cityData.contacts.official_phone}`} className="text-[#e8734a] hover:underline">
                    {cityData.contacts.official_phone}
                  </a>
                </div>
                {cityData.contacts.website_url && (
                  <a
                    href={cityData.contacts.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#e8734a] hover:underline font-medium"
                  >
                    Visit official website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Illegal Dumping Warning */}
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-amber-900 font-semibold text-sm">Illegal dumping fine: {cityData.illegal_dumping.fine_amount}</p>
              <p className="text-amber-800 text-xs mt-1">{cityData.illegal_dumping.citation}</p>
            </div>
          </div>

          {/* Drop-off Locations */}
          {cityData.drop_off_locations && cityData.drop_off_locations.length > 0 && (
            <div>
              <h3 className="text-[#1a2830] font-bold text-xl mb-6">Drop-off Locations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <LocationMap
                  locations={cityData.drop_off_locations}
                  cityName={cityData.city_name}
                />

                <div className="flex flex-col gap-4">
                  {cityData.drop_off_locations.map((location, index) => (
                    <div key={index} className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-xl p-5 hover:border-[#e8734a] transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-[#1a2830] text-sm">{location.name}</h4>
                        <span className="px-2 py-0.5 bg-[#1a2830]/10 text-[#1a2830] rounded text-xs font-medium">
                          {location.type}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 text-[#5a6e78] text-sm">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#8a9ca5] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#8a9ca5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{location.hours}</span>
                        </div>
                        {location.notes && (
                          <p className="text-[#8a9ca5] text-xs italic mt-1 pl-6">
                            {location.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - uses distinct city disposal image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/city-disposal.jpg"
            alt="Municipal disposal facility"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a2830]/80" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-4 text-balance">
            Need help with disposal in {cityData.city_name}?
          </h2>
          <p className="text-[#b0c4ce] text-lg mb-8 leading-relaxed">
            Book a professional pickup and let our vetted team handle everything for you.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#d4623b] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Book a Pickup
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
