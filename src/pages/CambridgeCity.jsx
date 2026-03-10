import React from "react";
import CityHero from "@/components/city/CityHero";
import TriggerRibbon from "@/components/city/TriggerRibbon";
import CityProFeed from "@/components/city/CityProFeed";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MunicipalRulebook from "@/components/city/MunicipalRulebook";
import DropOffCenters from "@/components/city/DropOffCenters";
import CityFAQ from "@/components/city/CityFAQ";
import MarketplaceFooter from "@/components/marketplace/MarketplaceFooter";

// Cambridge City Data - Scraped March 6, 2026
const CAMBRIDGE_DATA = {
  city: "Cambridge",
  state: "Massachusetts",
  stateAbbr: "MA",
  citySlug: "cambridge",
  zipCodes: ["02138", "02139", "02140", "02141", "02142", "02238"],
  cityGeoCoords: { lat: 42.3736, lng: -71.1097 },
  population: "118,403",
  lastUpdated: "March 06, 2026",
  heroHookStatement: "Don't risk a $1,000 citation for illegal dumping in Cambridge.",
  fineAmount: "Up to $1,000",
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 9,
  competitorComparisonPrice: "$75–$180",
  basePriceDisplay: "From $89",
  cityCostInfo: "Free (appointment required) or $25.00 tip fee",
  baggingRules: "Check with local department",
  hoursDays: "Tue, Thu 4:00PM–7:30PM",
  theCatch: "Must schedule appointment in advance",
  availabilityStatus: "conditional",
  mattressSpecificRule: "Check with Cambridge Sanitation for specific requirements",
  placementTime: "Check local schedule",
  sizeLimits: "Check with local department",
  officialDept: "Cambridge Sanitary Division",
  officialPhone: "(617) 349-4800",
  websiteUrl: "https://www.cambridgema.gov/inspection/aboutus/sanitarydivision",
  donationPolicy: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only",
  neighborhoods: [
    "Harvard Square", "Central Square", "Kendall Square", "Porter Square", "Inman Square",
    "East Cambridge", "North Cambridge", "West Cambridge", "Cambridgeport", "Riverside",
    "MIT Area", "Agassiz", "Neighborhood Nine", "Mid-Cambridge", "Wellington-Harrington",
    "The Port", "Area 2", "Area 4", "Strawberry Hill", "Fresh Pond"
  ],
  locations: [
    {
      name: "Cambridge Recycling Center",
      type: "Municipal Recycling Center",
      address: "147 Hampshire St, Cambridge, MA 02139",
      phone: "(617) 349-4800",
      hours: "Tue, Thu 4:00PM–7:30PM",
      tippingFee: "$25.00",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Cambridge residents only. Photo ID required.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=147+Hampshire+St+Cambridge+MA+02139",
      lat: 42.3736,
      lon: -71.0995
    },
    {
      name: "Cambridge DPW Facility",
      type: "Transfer Station / Recycling Center",
      address: "795 Massachusetts Ave, Cambridge, MA 02139",
      phone: "(617) 349-4800",
      hours: "Call for hours",
      tippingFee: "$25.00",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Cambridge residents only. Utility bill required.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=795+Massachusetts+Ave+Cambridge+MA",
      lat: 42.3736,
      lon: -71.1097
    },
    {
      name: "Private Transfer Station",
      type: "Private Transfer Station",
      address: "Contact for nearest location",
      hours: "Mon–Fri 6:00AM–5:00PM, Sat 7:00AM–12:00PM",
      tippingFee: "$35.00",
      accepted: ["Mattresses", "Box Springs", "Electronics", "Furniture", "Appliances"],
      residencyReq: "Open to all MA residents and businesses.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=transfer+station+cambridge+ma",
      lat: 42.3736,
      lon: -71.1097
    }
  ],
  faqs: [
    {
      q: "Is mattress disposal free in Cambridge?",
      a: "The City of Cambridge offers bulky item pickup, but requirements vary. Check with your local sanitation department for scheduling and any fees. Many residents find professional haulers more convenient."
    },
    {
      q: "Does a mattress need to be wrapped or bagged?",
      a: "Check with local department. Unwrapped mattresses may not be collected."
    },
    {
      q: "Can I donate my mattress instead?",
      a: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only"
    },
    {
      q: "What are the fines for illegal dumping in Cambridge?",
      a: "Illegal dumping fines in Cambridge can be up to $1,000. The city has active enforcement."
    }
  ]
};

export default function CambridgeCity() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <CityHero data={CAMBRIDGE_DATA} />
      <TriggerRibbon data={CAMBRIDGE_DATA} />
      <CityProFeed data={CAMBRIDGE_DATA} />
      <MunicipalRulebook data={CAMBRIDGE_DATA} />
      <DropOffCenters data={CAMBRIDGE_DATA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UGCCarousel city={CAMBRIDGE_DATA.city} />
      </div>
      <CityFAQ data={CAMBRIDGE_DATA} />
      <MarketplaceFooter city={CAMBRIDGE_DATA.city} />
    </div>
  );
}
