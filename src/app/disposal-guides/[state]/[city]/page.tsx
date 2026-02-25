import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import citiesData from '@/../data/cities.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationMap from '@/components/LocationMap';
import FOMOCountdown from '@/components/FOMOCountdown';
import WeatherWarning from '@/components/WeatherWarning';
import PriceComparison from '@/components/PriceComparison';

interface City {
  city_slug: string;
  city_name: string;
  state_slug: string;
  state_name: string;
  state_abbr: string;
  geo?: {
    latitude: number;
    longitude: number;
    zip_codes: string[];
  };
  seo?: {
    title_override?: string;
    meta_desc_override?: string;
  };
  hero_hook?: string;
  neighborhoods?: string;
  population: {
    count: number | null;
    year: number | null;
    source: string | null;
  };
  contacts: {
    official_phone: string | null;
    department_name: string | null;
    website_url: string | null;
  };
  curbside_rules: {
    is_available: boolean | null;
    mattress_specific_rule: string | null;
    placement_time: string | null;
    size_limits: string | null;
    the_catch?: string | null;
    schedule_logic?: {
      type: string;
      dates_2026: string[];
      frequency_display: string;
      missed_msg?: string;
    } | string | null;
  };
  weather_profile?: {
    is_rain_heavy: boolean;
    rejection_risk_copy: string | null;
  };
  drop_off_locations: {
    name: string;
    address: string;
    google_maps_url?: string;
    type: string;
    hours: string;
    tipping_fee?: string | null;
    residency_required?: boolean | null;
    notes: string;
    accepted_items?: string[] | null;
    source?: string;
  }[];
  affiliate_config?: {
    partner_name: string;
    custom_link_slug: string;
    base_price_display: string;
    competitor_comparison?: {
      competitor_name: string;
      competitor_price: string;
      value_prop: string;
    };
  };
  donation_policy?: string | null;
  illegal_dumping: {
    fine_amount: string | null;
    citation: string | null;
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

const cities = citiesData as City[];

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    state: city.state_slug,
    city: city.city_slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const cityData = cities.find(
    (c) => c.state_slug === state && c.city_slug === city
  );

  if (!cityData) {
    return { title: 'City Not Found' };
  }

  // Use SEO overrides if available (God Mode v4.0)
  const title = cityData.seo?.title_override || 
    `Mattress Disposal in ${cityData.city_name}, ${cityData.state_abbr} | 2026 Guide`;
  
  const description = cityData.seo?.meta_desc_override || 
    `${cityData.hero_hook || `Find drop-off centers, curbside rules, and instant pickup quotes for mattress disposal in ${cityData.city_name}.`} Official regulations and professional removal services in ${cityData.state_name}.`;

  return {
    title,
    description,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const cityData = cities.find(
    (c) => c.state_slug === state && c.city_slug === city
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
      {/* Schema.org JSON-LD for Local Business / Service (God Mode v4.0) */}
      {cityData.geo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Mattress Disposal Service',
              provider: {
                '@type': 'Organization',
                name: 'Mattress Disposal Guide',
              },
              areaServed: {
                '@type': 'City',
                name: cityData.city_name,
                '@id': `https://www.wikidata.org/wiki/${cityData.city_slug}`,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: cityData.geo.latitude.toString(),
                  longitude: cityData.geo.longitude.toString(),
                },
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: cityData.city_name,
                  addressRegion: cityData.state_abbr,
                  addressCountry: 'US',
                  postalCode: cityData.geo.zip_codes[0],
                },
              },
              offers: cityData.affiliate_config
                ? {
                    '@type': 'Offer',
                    price: cityData.affiliate_config.base_price_display.replace(/[^0-9]/g, ''),
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    description: `Professional mattress removal service in ${cityData.city_name}`,
                  }
                : undefined,
            }),
          }}
        />
      )}
      
      <Header />

      {/* SECTION 1: THE HERO */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/city-hero.jpg"
            alt={`Mattress disposal in ${cityData.city_name}`}
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

          <h1 className="text-white font-extrabold text-4xl md:text-5xl mb-4 leading-tight">
            Mattress Disposal in {cityData.city_name}, {cityData.state_abbr}
          </h1>
          <p className="text-[#b0c4ce] text-lg max-w-2xl leading-relaxed mb-6">
            The 2026 Guide to Drop-off Centers, Curbside Rules, and Private Haulers
          </p>
          <p className="text-[#e8734a] text-xl font-semibold mb-8">
            {cityData.hero_hook || `Need to dispose of a mattress in ${cityData.city_name}?`}
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#d4623b] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Get a Pickup Price (Instant Quote)
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* v5.0 PSYCHOLOGICAL TRIGGERS */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* FOMO Countdown (v5.0) */}
          {cityData.curbside_rules.schedule_logic && (
            <FOMOCountdown 
              scheduleLogic={cityData.curbside_rules.schedule_logic}
              cityName={cityData.city_name}
            />
          )}
          
          {/* Weather Warning (v5.0) */}
          {cityData.weather_profile && (
            <WeatherWarning weatherProfile={cityData.weather_profile} />
          )}
          
          {/* Price Comparison (v5.0) */}
          {cityData.affiliate_config?.competitor_comparison && (
            <PriceComparison 
              affiliateConfig={cityData.affiliate_config}
              cityName={cityData.city_name}
            />
          )}
        </div>
      </section>

      {/* SECTION 2: THE BINARY CHOICE */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#1a2830] font-bold text-3xl mb-4">
            How to Get Rid of a Mattress in {cityData.city_name}
          </h2>
          <p className="text-[#5a6e78] text-lg mb-8">
            You have two options in {cityData.city_name}:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Option A: The City Route (Path of Pain) */}
            <div className="bg-white rounded-2xl border-2 border-[#e2e8ed] p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1a2830] text-xl">Option A: The City Route (DIY)</h3>
              </div>
              <div className="mb-4">
                <p className="text-green-600 font-bold text-lg mb-2">Pros:</p>
                <p className="text-[#5a6e78] text-sm">Cheaper (usually free or low cost)</p>
              </div>
              <div>
                <p className="text-red-600 font-bold text-lg mb-2">Cons:</p>
                <ul className="text-[#5a6e78] text-sm space-y-1 list-disc list-inside">
                  <li>Requires a truck or vehicle</li>
                  <li>Heavy lifting required</li>
                  <li>Strict bagging/wrapping rules</li>
                  <li>Specific hours and days</li>
                  {cityData.curbside_rules.the_catch && <li className="font-semibold text-red-600">{cityData.curbside_rules.the_catch}</li>}
                </ul>
              </div>
            </div>

            {/* Option B: The Private Route (Path of Power) */}
            <div className="bg-gradient-to-br from-[#e8734a] to-[#d4623b] rounded-2xl border-2 border-[#e8734a] p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl">Option B: The Private Route (Done-For-You)</h3>
              </div>
              <div className="mb-4">
                <p className="font-bold text-lg mb-2">Pros:</p>
                <ul className="text-white/90 text-sm space-y-1 list-disc list-inside">
                  <li>They enter your home</li>
                  <li>Do all the heavy lifting</li>
                  <li>Recycle it properly</li>
                  <li>Same-day or next-day available</li>
                </ul>
              </div>
              <div className="mb-6">
                <p className="font-bold text-lg mb-2">Cons:</p>
                <p className="text-white/90 text-sm">
                  Costs money (typically {cityData.affiliate_config?.base_price_display || '$80-150'})
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#e8734a] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all w-full"
              >
                Check Availability in Your Zip Code
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CURBSIDE RULES (The Hassle Section) */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#1a2830] font-bold text-3xl mb-4">
            Can I Leave It on the Curb in {cityData.city_name}?
          </h2>
          
          {cityData.curbside_rules.is_available ? (
            <>
              <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-2xl p-8 mb-6">
                <h3 className="font-semibold text-[#1a2830] text-lg mb-4">The Rule:</h3>
                <p className="text-[#5a6e78] leading-relaxed mb-6">
                  {cityData.curbside_rules.mattress_specific_rule}
                </p>
                
                {cityData.curbside_rules.placement_time && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#1a2830] text-sm mb-2">Placement Time:</h4>
                    <p className="text-[#5a6e78] text-sm">{cityData.curbside_rules.placement_time}</p>
                  </div>
                )}
                
                {cityData.curbside_rules.size_limits && (
                  <div>
                    <h4 className="font-semibold text-[#1a2830] text-sm mb-2">Size and Weight Limits:</h4>
                    <p className="text-[#5a6e78] text-sm">{cityData.curbside_rules.size_limits}</p>
                  </div>
                )}
              </div>

              {/* Warning Box */}
              <div className="flex items-start gap-4 bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-8">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-red-900 font-bold text-lg mb-1">Warning:</p>
                  <p className="text-red-800 mb-2">
                    In {cityData.city_name}, leaving a mattress without following these requirements can result in a fine of up to {cityData.illegal_dumping.fine_amount}.
                  </p>
                  {cityData.curbside_rules.the_catch && (
                    <p className="text-red-800 font-semibold">
                      {cityData.curbside_rules.the_catch}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-[#e8734a]/10 border border-[#e8734a] rounded-xl p-6">
                <p className="text-[#1a2830] font-semibold mb-3">
                  If you can't meet these requirements, book a removal:
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-[#e8734a] hover:bg-[#d4623b] text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Book a Pickup Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-400 rounded-xl p-6">
              <p className="text-[#1a2830]">
                Curbside pickup is not available in {cityData.city_name}. You must either drop off at a facility or use a private removal service.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#e2e8ed]">
            <p className="text-sm text-[#5a6e78] mb-2">
              <span className="font-semibold text-[#1a2830]">{cityData.contacts.department_name}</span>
              <span className="mx-2">&middot;</span>
              <a href={`tel:${cityData.contacts.official_phone}`} className="text-[#e8734a] hover:underline">
                {cityData.contacts.official_phone}
              </a>
            </p>
            {cityData.contacts.website_url && (
              <a
                href={cityData.contacts.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#e8734a] hover:underline font-medium"
              >
                Visit official website →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: DROP-OFF LOCATIONS (The Map) */}
      {cityData.drop_off_locations && cityData.drop_off_locations.length > 0 && (
        <section className="py-16 bg-[#f8f9fa]">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[#1a2830] font-bold text-3xl mb-4">
              Where to Dump a Mattress in {cityData.city_name}
            </h2>
            <p className="text-[#5a6e78] mb-8">
              Self-haul drop-off locations (vehicle required):
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <LocationMap
                locations={cityData.drop_off_locations}
                cityName={cityData.city_name}
              />

              <div className="flex flex-col gap-4">
                {cityData.drop_off_locations.slice(0, 3).map((location, index) => (
                  <div key={index} className="bg-white border-2 border-[#e2e8ed] rounded-xl p-6 hover:border-[#e8734a] transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-[#1a2830]">{location.name}</h3>
                      <span className="px-2 py-1 bg-[#1a2830]/10 text-[#1a2830] rounded text-xs font-medium whitespace-nowrap ml-2">
                        {location.type}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 text-[#5a6e78] text-sm mb-4">
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
                      {location.tipping_fee && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#8a9ca5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-[#e8734a]">Cost: {location.tipping_fee}</span>
                        </div>
                      )}
                      {location.accepted_items && Array.isArray(location.accepted_items) && location.accepted_items.length > 0 && (
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#8a9ca5] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs">Accepts: {location.accepted_items.join(', ')}</span>
                        </div>
                      )}
                      {location.residency_required && (
                        <p className="text-[#8a9ca5] text-xs italic">
                          ⚠️ Proof of residency required
                        </p>
                      )}
                    </div>
                    {location.google_maps_url && (
                      <a
                        href={location.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#0055FF] hover:bg-[#0044DD] text-white px-4 py-2.5 rounded-lg font-semibold transition-all text-sm group"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Get Directions
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Comparison Callout (God Mode v4.0 - Price Anchor) */}
            {cityData.affiliate_config && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a2830] text-lg mb-2">DIY Cost Calculator</h3>
                    <div className="space-y-1 text-sm text-[#5a6e78] mb-3">
                      <div className="flex justify-between">
                        <span>Dump fee:</span>
                        <span className="font-semibold">$20-30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Truck rental (Home Depot):</span>
                        <span className="font-semibold">$30-40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gas + your time (2-3 hours):</span>
                        <span className="font-semibold">$20-30</span>
                      </div>
                      <div className="border-t border-blue-300 pt-2 mt-2 flex justify-between text-base">
                        <span className="font-bold text-[#1a2830]">Total DIY Cost:</span>
                        <span className="font-bold text-[#1a2830]">$70-100</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-2 border-[#e8734a]">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1a2830]">Professional Pickup:</span>
                        <span className="text-2xl font-black text-[#e8734a]">{cityData.affiliate_config.base_price_display}</span>
                      </div>
                      <p className="text-xs text-[#5a6e78] mt-1">They do all the work. You do nothing.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border-2 border-[#e8734a] rounded-xl p-6">
              <p className="text-[#1a2830] font-semibold mb-3">
                Don't have a truck to get there? We can pick it up from your home:
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#e8734a] hover:bg-[#d4623b] text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                Book a Pickup Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: FAQ & SEO JUICE */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#1a2830] font-bold text-3xl mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-xl p-6">
              <h3 className="font-bold text-[#1a2830] mb-2">
                Is mattress disposal free in {cityData.city_name}?
              </h3>
              <p className="text-[#5a6e78]">
                {cityData.curbside_rules.is_available 
                  ? `Curbside pickup is typically free, but you must follow specific rules.${cityData.curbside_rules.the_catch ? ` ${cityData.curbside_rules.the_catch}` : ''} Drop-off facilities may charge fees.`
                  : `No free curbside pickup is available. You must either pay to drop off at a facility or use a private removal service.`
                }
              </p>
            </div>

            {cityData.curbside_rules.mattress_specific_rule && 
              (cityData.curbside_rules.mattress_specific_rule.toLowerCase().includes('plastic') || 
              cityData.curbside_rules.mattress_specific_rule.toLowerCase().includes('bag')) && (
              <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-xl p-6">
                <h3 className="font-bold text-[#1a2830] mb-2">
                  How do I wrap a mattress for disposal in {cityData.city_name}?
                </h3>
                <p className="text-[#5a6e78]">
                  {cityData.city_name} requires mattresses to be sealed in plastic bags or wrapped completely in plastic sheeting. 
                  This protects sanitation workers from bed bugs. You can purchase mattress disposal bags at hardware stores or online.
                </p>
              </div>
            )}

            {cityData.donation_policy && (
              <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-xl p-6">
                <h3 className="font-bold text-[#1a2830] mb-2">
                  Can I donate a mattress in {cityData.city_name}?
                </h3>
                <p className="text-[#5a6e78]">
                  {cityData.donation_policy} We recommend using a junk removal service that attempts to recycle or donate when possible.
                </p>
              </div>
            )}

            <div className="bg-[#f8f9fa] border border-[#e2e8ed] rounded-xl p-6">
              <h3 className="font-bold text-[#1a2830] mb-2">
                What happens if I illegally dump a mattress in {cityData.city_name}?
              </h3>
              <p className="text-[#5a6e78]">
                Illegal dumping in {cityData.city_name} can result in fines of {cityData.illegal_dumping.fine_amount}. 
                Always use proper disposal methods to avoid penalties.
              </p>
            </div>
          </div>

          {cityData.neighborhoods && (
            <div className="mt-12 pt-8 border-t border-[#e2e8ed]">
              <p className="text-sm text-[#8a9ca5]">
                <span className="font-semibold text-[#1a2830]">Serving neighborhoods including:</span> {cityData.neighborhoods}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/city-disposal.jpg"
            alt="Professional mattress disposal service"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a2830]/80" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
            Skip the Hassle in {cityData.city_name}
          </h2>
          <p className="text-[#b0c4ce] text-lg mb-8 leading-relaxed">
            Let our professional team handle your mattress removal. Same-day and next-day pickup available.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#d4623b] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Book a Pickup in {cityData.city_name}
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
