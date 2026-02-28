import React from "react";
import MunicipalityHero from "@/components/municipality/MunicipalityHero";
import MunicipalityProFeed from "@/components/municipality/MunicipalityProFeed";
import MunicipalityRules from "@/components/municipality/MunicipalityRules";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MunicipalityCTA from "@/components/municipality/MunicipalityCTA";
import MunicipalityFAQ from "@/components/municipality/MunicipalityFAQ";

// ─── Tier 2: Inner Core Municipality Data ────────────────────────────────────
const MUNI_DATA = {
  name: "Culver City",
  parentCity: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90230", "90232"],
  population: "40,048",
  lastUpdated: "February 27, 2026",
  hookStatement: "Culver City has strict bulky item rules — missed pickup windows mean a 30-day wait.",
  fineAmount: "$350",
  waitDays: 30,
  basePriceDisplay: "From $79",
  cityCostInfo: "Free (bi-monthly, schedule required)",
  pickupSchedule: "Every other month, Saturdays 8AM–12PM",
  baggingRules: "Must be in sealed plastic bag or wrapped",
  theCatch: "Requires 21-day advance online booking",
  availabilityStatus: "conditional",
  officialDept: "Culver City Public Works",
  officialPhone: "(310) 253-5993",
  websiteUrl: "https://www.culvercity.org/publicworks",
  neighborhoods: [
    "Downtown Culver City", "Sunkist Park", "Lucerne Park",
    "Fox Hills", "Culver West", "Blair Hills"
  ],
  faqs: [
    {
      q: "How often does Culver City collect bulky items?",
      a: "Culver City offers bulky item pickup on a bi-monthly schedule (every 2 months). You must book online at least 21 days in advance. Missed or cancelled appointments cannot be rescheduled until the next cycle."
    },
    {
      q: "What happens if my mattress isn't bagged?",
      a: "Culver City will not collect an unwrapped mattress. You'll receive a notice and have to reschedule your next available slot, which could be 60+ days away. Fines up to $350 apply for repeat violations or illegal dumping."
    },
    {
      q: "Is a private hauler worth it in Culver City?",
      a: "For most residents, yes. Private haulers typically arrive same-day or next-day for $79–$140, compared to a 3–6 week wait for city pickup. When you factor in the bag cost ($8), fuel, and time off work, the price difference is often negligible."
    }
  ]
};

export default function Municipality() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <MunicipalityHero data={MUNI_DATA} />
      <MunicipalityProFeed data={MUNI_DATA} />
      <MunicipalityRules data={MUNI_DATA} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UGCCarousel city={MUNI_DATA.name} />
      </div>
      <MunicipalityFAQ data={MUNI_DATA} />
      <MunicipalityCTA data={MUNI_DATA} />
    </div>
  );
}