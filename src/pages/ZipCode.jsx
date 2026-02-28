import React from "react";
import ZipHero from "@/components/zipcode/ZipHero";
import ZipProFeed from "@/components/zipcode/ZipProFeed";
import ZipTrustBar from "@/components/zipcode/ZipTrustBar";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import ZipCTA from "@/components/zipcode/ZipCTA";

// ─── Tier 3: High-Density Zip Code Data ──────────────────────────────────────
const ZIP_DATA = {
  zip: "90028",
  neighborhood: "Hollywood",
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  activePros: 11,
  nextAvailable: "Today",
  urgencyNote: "3 other residents in this zip booked removal in the last 2 hours.",
  hookStatement: "Illegal dumping fines in 90028 start at $500. Don't risk it.",
  fineAmount: "$500",
  basePriceDisplay: "From $79",
  avgWaitCityDays: 14,
  diyCostEstimate: "$55–$110",
  proPrice: "$79–$149",
  recentJobsCount: 47,
};

export default function ZipCode() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <ZipHero data={ZIP_DATA} />
      <ZipTrustBar data={ZIP_DATA} />
      <ZipProFeed data={ZIP_DATA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UGCCarousel city={ZIP_DATA.neighborhood} />
      </div>
      <ZipCTA data={ZIP_DATA} />
    </div>
  );
}