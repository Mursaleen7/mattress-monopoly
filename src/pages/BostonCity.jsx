import React from "react";
import CityHero from "@/components/city/CityHero";
import TriggerRibbon from "@/components/city/TriggerRibbon";
import CityProFeed from "@/components/city/CityProFeed";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MunicipalRulebook from "@/components/city/MunicipalRulebook";
import DropOffCenters from "@/components/city/DropOffCenters";
import CityFAQ from "@/components/city/CityFAQ";
import MarketplaceFooter from "@/components/marketplace/MarketplaceFooter";

// Boston City Data - Scraped March 6, 2026 (Final Enhanced Version)
const BOSTON_DATA = {
  city: "Boston",
  state: "Massachusetts",
  stateAbbr: "MA",
  citySlug: "boston",
  zipCodes: ["02108", "02109", "02110", "02111", "02113", "02114"],
  cityGeoCoords: { lat: 42.3601, lng: -71.0589 },
  population: "675,647",
  lastUpdated: "March 06, 2026",
  heroHookStatement: "Don't risk a $50 citation for illegal dumping in Boston.",
  fineAmount: "$50",
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 7,  // Default - varies by neighborhood
  competitorComparisonPrice: "$50–$200",
  basePriceDisplay: "From $50",
  cityCostInfo: "Free (appointment required) or $140 tip fee",
  baggingRules: "Plastic wrap required (city mandate)",
  hoursDays: "Call for hours - varies by facility",
  theCatch: "Appointment or scheduling may be required",
  availabilityStatus: "conditional",
  mattressSpecificRule: "Must be wrapped in plastic before curbside placement",
  placementTime: "After 7AM on day of pickup",
  sizeLimits: "Contact local department for limits",
  officialDept: "Environmental Sanitation Division",
  officialPhone: "617-635-5300",
  websiteUrl: "https://www.boston.gov/departments/inspectional-services/environmental-sanitation-division",
  donationPolicy: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only",
  neighborhoods: [
    "Allston", "Back Bay", "Bay Village", "Beacon Hill", "Brighton",
    "Charlestown", "Chinatown", "Dorchester", "Downtown", "East Boston",
    "Fenway", "Hyde Park", "Jamaica Plain", "Mattapan", "Mission Hill",
    "North End", "Roslindale", "Roxbury", "Seaport", "South Boston",
    "South End", "West End", "West Roxbury"
  ],
  locations: [
    {
      name: "Boston Recycling & Trash Services",
      type: "Municipal Service",
      address: "Contact Boston.gov for nearest location",
      phone: "(617) 561-0331",
      hours: "Call for hours - varies by location",
      tippingFee: "$140",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Boston residents only. Photo ID may be required.",
      mapsUrl: "https://www.boston.gov/trash-and-recycling",
      lat: 42.3601,
      lon: -71.0589
    },
    {
      name: "Wayland Transfer Station & Recycling Center",
      type: "Transfer Station / Recycling Center",
      address: "484 Boston Post Road, Wayland, MA 01778",
      phone: "(508) 358-3877",
      hours: "Call for hours",
      tippingFee: "Call for fees",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "Boston area residents. Photo ID may be required.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=484+Boston+Post+Road+Wayland+MA",
      lat: 42.3626,
      lon: -71.3631
    },
    {
      name: "MA DEP Recycling Facility",
      type: "State Recycling Facility",
      address: "100 Cambridge St, Boston, MA 02114",
      phone: "617-292-5500",
      hours: "Call for hours",
      tippingFee: "Call for fees",
      accepted: ["Mattresses", "Box Springs", "Furniture", "Appliances"],
      residencyReq: "Open to all MA residents.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=100+Cambridge+St+Boston+MA",
      lat: 42.3603,
      lon: -71.0623
    }
  ],
  faqs: [
    {
      q: "Is mattress disposal free in Boston?",
      a: "The City of Boston offers bulky item pickup, but appointment or scheduling may be required. Check with your local sanitation department for scheduling and any fees. Many residents find professional haulers more convenient."
    },
    {
      q: "Does a mattress need to be wrapped or bagged?",
      a: "Plastic wrap required (city mandate). Unwrapped mattresses may not be collected."
    },
    {
      q: "Can I donate my mattress instead?",
      a: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only"
    },
    {
      q: "What are the fines for illegal dumping in Boston?",
      a: "Illegal dumping fines in Boston can be $50 or more. The city has active enforcement including surveillance cameras."
    }
  ]
};

export default function BostonCity() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <CityHero data={BOSTON_DATA} />
      <TriggerRibbon data={BOSTON_DATA} />
      <CityProFeed data={BOSTON_DATA} />
      <MunicipalRulebook data={BOSTON_DATA} />
      <DropOffCenters data={BOSTON_DATA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UGCCarousel city={BOSTON_DATA.city} />
      </div>
      <CityFAQ data={BOSTON_DATA} />
      <MarketplaceFooter city={BOSTON_DATA.city} />
    </div>
  );
}
