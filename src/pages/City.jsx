import React, { useState } from "react";
import CityHero from "@/components/city/CityHero";
import TriggerRibbon from "@/components/city/TriggerRibbon";
import ChoiceMatrix from "@/components/city/ChoiceMatrix";
import MunicipalRulebook from "@/components/city/MunicipalRulebook";
import DropOffCenters from "@/components/city/DropOffCenters";
import CityFAQ from "@/components/city/CityFAQ";
import CityCTA from "@/components/city/CityCTA";

// ─── Dynamic City Data (replace via DB injection) ───────────────────────────
const CITY_DATA = {
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90001", "90012", "90021", "90028", "90035", "90045"],
  cityGeoCoords: { lat: 34.0522, lng: -118.2437 },
  population: "3,979,576",
  lastUpdated: "February 27, 2026",
  heroHookStatement: "Don't risk a $500 citation for illegal dumping in LA.",
  fineAmount: "$500",
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 9,
  competitorComparisonPrice: "$75–$180",
  basePriceDisplay: "From $89",
  cityCostInfo: "Free (permit required) or $28.50 tip fee",
  baggingRules: "Plastic wrap required (city mandate)",
  hoursDays: "Sat–Sun 7AM–3PM only",
  theCatch: "Must schedule 14 days in advance online",
  availabilityStatus: "conditional",
  mattressSpecificRule: "Must be wrapped in plastic before curbside placement",
  placementTime: "No earlier than 6PM the night before pickup",
  sizeLimits: "Max 2 mattresses per household per collection",
  officialDept: "LA Sanitation & Environment",
  officialPhone: "(800) 773-2489",
  websiteUrl: "https://www.lacity.org/lasan",
  donationPolicy: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only",
  neighborhoods: [
    "Downtown LA", "Silver Lake", "Echo Park", "Koreatown", "Mid-Wilshire",
    "West Adams", "Culver City", "Mar Vista", "Venice", "Santa Monica",
    "Westwood", "Brentwood", "Sherman Oaks", "North Hollywood", "Burbank",
    "Pasadena", "Alhambra", "Inglewood", "Compton", "Long Beach"
  ],
  locations: [
    {
      name: "Antelope Valley Recycling & Reclamation Center",
      type: "City Landfill / Transfer Station",
      address: "1200 W. City Ranch Rd, Palmdale, CA 93551",
      hours: "Mon–Sat 7:00AM–4:00PM",
      tippingFee: "$28.50",
      accepted: ["Mattresses", "Box Springs", "Furniture", "Appliances"],
      residencyReq: "LA County residents only. Photo ID required.",
      mapsUrl: "https://maps.google.com/?q=Antelope+Valley+Recycling+Center"
    },
    {
      name: "Sun Valley Recycle Center",
      type: "Municipal Recycling Facility",
      address: "11025 Randall St, Sun Valley, CA 91352",
      hours: "Tue, Thu, Sat 8:00AM–3:00PM",
      tippingFee: "$18.00",
      accepted: ["Mattresses", "Box Springs", "Yard Waste"],
      residencyReq: "City of LA residents only. Utility bill required.",
      mapsUrl: "https://maps.google.com/?q=Sun+Valley+Recycle+Center"
    },
    {
      name: "GreenWaste Solutions — Commerce",
      type: "Private Transfer Station",
      address: "6100 S. Soto St, Commerce, CA 90040",
      hours: "Mon–Fri 6:00AM–5:00PM, Sat 7:00AM–12:00PM",
      tippingFee: "$35.00",
      accepted: ["Mattresses", "Box Springs", "Electronics", "Furniture", "Appliances"],
      residencyReq: "Open to all LA County residents and businesses.",
      mapsUrl: "https://maps.google.com/?q=GreenWaste+Solutions+Commerce"
    }
  ],
  faqs: [
    {
      q: "Is mattress disposal free in Los Angeles?",
      a: "The City of LA offers free bulky item pickup twice per year per household, but it requires scheduling 14+ days in advance. Walk-in drop-off at city facilities costs $18–$35 per mattress. Many residents find a private hauler ($89–$180) more cost-effective when factoring in truck rental, fuel, and time."
    },
    {
      q: "Does a mattress need to be wrapped or bagged?",
      a: "Yes. LA Sanitation requires all mattresses placed at the curb to be wrapped in plastic. Unwrapped mattresses will not be collected and may result in a citation. Many hardware stores sell mattress disposal bags for $5–$8."
    },
    {
      q: "Can I donate my mattress instead?",
      a: "Possibly. Goodwill and Habitat for Humanity ReStores accept mattresses that are clean, free of stains, tears, or pest damage. Call ahead — acceptance is not guaranteed. Charities will reject any mattress showing signs of bed bugs, mold, or major wear."
    },
    {
      q: "What are the fines for illegal dumping in Los Angeles?",
      a: "Illegal dumping fines in Los Angeles range from $250 to $10,000 depending on volume and repeat offenses. First-time mattress dumping citations typically start at $500. The City of LA has active enforcement cameras and anonymous reporting hotlines in high-violation areas."
    }
  ]
};

export default function City() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <CityHero data={CITY_DATA} />
      <TriggerRibbon data={CITY_DATA} />
      <ChoiceMatrix data={CITY_DATA} />
      <MunicipalRulebook data={CITY_DATA} />
      <DropOffCenters data={CITY_DATA} />
      <CityFAQ data={CITY_DATA} />
      <CityCTA data={CITY_DATA} />
    </div>
  );
}
