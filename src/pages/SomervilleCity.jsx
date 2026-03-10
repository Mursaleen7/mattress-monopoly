import React from "react";
import CityHero from "@/components/city/CityHero";
import TriggerRibbon from "@/components/city/TriggerRibbon";
import CityProFeed from "@/components/city/CityProFeed";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MunicipalRulebook from "@/components/city/MunicipalRulebook";
import DropOffCenters from "@/components/city/DropOffCenters";
import CityFAQ from "@/components/city/CityFAQ";
import MarketplaceFooter from "@/components/marketplace/MarketplaceFooter";

// Somerville City Data - Scraped March 6, 2026
const SOMERVILLE_DATA = {
  city: "Somerville",
  state: "Massachusetts",
  stateAbbr: "MA",
  citySlug: "somerville",
  zipCodes: ["02143", "02144", "02145", "02176", "02143", "02144"],
  cityGeoCoords: { lat: 42.3876, lng: -71.0995 },
  population: "81,045",
  lastUpdated: "March 06, 2026",
  heroHookStatement: "Don't risk a $1,000 citation for illegal dumping in Somerville.",
  fineAmount: "Up to $1,000",
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 9,
  competitorComparisonPrice: "$75–$180",
  basePriceDisplay: "From $89",
  cityCostInfo: "Free (appointment required) or $25.00 tip fee",
  baggingRules: "Check with local department",
  hoursDays: "Call for hours",
  theCatch: "Must schedule appointment in advance",
  availabilityStatus: "conditional",
  mattressSpecificRule: "Check with Somerville DPW for specific requirements",
  placementTime: "Check local schedule",
  sizeLimits: "Check with local department",
  officialDept: "Somerville DPW - Sanitation",
  officialPhone: "(617) 625-6600",
  websiteUrl: "https://www.somervillema.gov/departments/dpw/sanitation",
  donationPolicy: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only",
  neighborhoods: [
    "Davis Square", "Union Square", "Assembly Square", "Ball Square", "Teele Square",
    "Winter Hill", "Spring Hill", "East Somerville", "West Somerville", "Magoun Square",
    "Porter Square Area", "Powder House Square", "Clarendon Hill", "Prospect Hill",
    "Ten Hills", "Gilman Square", "Brickbottom", "Inner Belt", "Boynton Yards", "Union Square"
  ],
  locations: [
    {
      name: "Somerville DPW Yard",
      type: "Municipal DPW Facility",
      address: "1 Franey Rd, Somerville, MA 02145",
      phone: "(617) 625-6600",
      hours: "Call for hours",
      tippingFee: "$25.00",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Somerville residents only. Photo ID required.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=1+Franey+Rd+Somerville+MA+02145",
      lat: 42.3875,
      lon: -71.0995
    },
    {
      name: "Somerville Recycling Center",
      type: "Transfer Station / Recycling Center",
      address: "1 Franey Rd, Somerville, MA 02145",
      phone: "(617) 625-6600",
      hours: "Call for hours",
      tippingFee: "$25.00",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Somerville residents only. Utility bill required.",
      mapsUrl: "https://www.somervillema.gov/trash-and-recycling",
      lat: 42.3875,
      lon: -71.0995
    },
    {
      name: "Private Transfer Station",
      type: "Private Transfer Station",
      address: "Contact for nearest location",
      hours: "Mon–Fri 6:00AM–5:00PM, Sat 7:00AM–12:00PM",
      tippingFee: "$35.00",
      accepted: ["Mattresses", "Box Springs", "Electronics", "Furniture", "Appliances"],
      residencyReq: "Open to all MA residents and businesses.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=transfer+station+somerville+ma",
      lat: 42.3875,
      lon: -71.0995
    }
  ],
  faqs: [
    {
      q: "Is mattress disposal free in Somerville?",
      a: "The City of Somerville offers bulky item pickup, but requirements vary. Check with your local sanitation department for scheduling and any fees. Many residents find professional haulers more convenient."
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
      q: "What are the fines for illegal dumping in Somerville?",
      a: "Illegal dumping fines in Somerville can be up to $1,000. The city has active enforcement."
    }
  ]
};

export default function SomervilleCity() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <CityHero data={SOMERVILLE_DATA} />
      <TriggerRibbon data={SOMERVILLE_DATA} />
      <CityProFeed data={SOMERVILLE_DATA} />
      <MunicipalRulebook data={SOMERVILLE_DATA} />
      <DropOffCenters data={SOMERVILLE_DATA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UGCCarousel city={SOMERVILLE_DATA.city} />
      </div>
      <CityFAQ data={SOMERVILLE_DATA} />
      <MarketplaceFooter city={SOMERVILLE_DATA.city} />
    </div>
  );
}
