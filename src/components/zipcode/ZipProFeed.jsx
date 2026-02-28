import React, { useState } from "react";
import { Zap, ShieldCheck, Leaf, Tag, ChevronDown, Clock, TrendingUp } from "lucide-react";
import ProCard from "@/components/marketplace/ProCard.jsx";

const ZIP_PROS = [
  {
    name: "Hollywood Fast Haul",
    location: "90028 · Hollywood",
    rating: 4.9,
    reviewCount: 203,
    hires: 118,
    responseTime: "8 mins",
    price: "$99",
    hasVideo: true,
    mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&q=80",
    description: "We're based in Hollywood and know every block. Rapid dispatch, in-and-out in under 90 minutes, and a crew that handles tight building access.",
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Same-Day", icon: Zap, style: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
    ]
  },
  {
    name: "Apex Eco-Haulers",
    location: "Serving 90028 & nearby zips",
    rating: 4.8,
    reviewCount: 312,
    hires: 142,
    responseTime: "14 mins",
    price: "$129",
    hasVideo: false,
    mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    description: "Eco-certified removal that diverts 80% of materials from landfill. Transparent pricing, no surprise charges, and a guaranteed on-time arrival window.",
    tags: [
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-200" },
    ]
  },
  {
    name: "BulkHaul Express",
    location: "Hollywood, Koreatown, Silver Lake",
    rating: 4.7,
    reviewCount: 156,
    hires: 79,
    responseTime: "20 mins",
    price: "$79",
    hasVideo: false,
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    description: "Flat-rate pricing, no haggling. BulkHaul Express is the budget-friendly option that never cuts corners — same-week guaranteed.",
    tags: [
      { label: "Licensed & Insured", icon: ShieldCheck, style: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-200" },
    ]
  }
];

export default function ZipProFeed({ data }) {
  const { zip, neighborhood, activePros, avgWaitCityDays, proPrice, diyCostEstimate } = data;
  const [filters, setFilters] = useState({ ecoFriendly: false, sameDay: false, licensed: false });
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  return (
    <section className="py-10 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-3 gap-4 mb-8 bg-secondary border border-border rounded-2xl p-4">
          <div className="text-center">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">DIY Cost</div>
            <div className="text-2xl font-black text-gray-400 line-through">{diyCostEstimate}</div>
            <div className="text-gray-400 text-[11px] mt-0.5">Truck rental + tip fee + time</div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">City Wait</div>
            <div className="text-2xl font-black text-red-400">{avgWaitCityDays} days</div>
            <div className="text-gray-400 text-[11px] mt-0.5">Bag, schedule, wait, haul yourself</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Pro Hauler</div>
            <div className="text-2xl font-black text-primary">{proPrice}</div>
            <div className="text-accent text-[11px] mt-0.5">Today · Door-to-door · Done</div>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20">
            <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-accent px-5 py-4">
                <h2 className="font-bold text-primary text-sm tracking-wide uppercase">Filter Pros in {zip}</h2>
              </div>
              <div className="px-5 py-3 space-y-0">
                {[
                  { key: "ecoFriendly", label: "Eco-Friendly", icon: Leaf, color: "green" },
                  { key: "sameDay", label: "Same-Day Only", icon: Zap, color: "yellow" },
                  { key: "licensed", label: "Licensed & Insured", icon: ShieldCheck, color: "blue" },
                ].map(({ key, label, icon: Icon }) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer py-2.5 border-b border-border last:border-0">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <div onClick={() => toggle(key)} className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${filters[key] ? "bg-accent" : "bg-gray-200"}`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-background rounded-full shadow transition-transform duration-200 ${filters[key] ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                  </label>
                ))}
              </div>
              <div className="px-5 pb-5 pt-1">
                <div className="bg-secondary border border-border rounded-xl p-3 text-center">
                  <div className="text-primary text-xs font-bold">✅ All {activePros} pros verified & insured</div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-secondary border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold text-xs uppercase tracking-wider">Trending in {zip}</span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">Same-day bookings in {neighborhood} are up 34% this week. Slots fill fast on weekends.</p>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  {activePros} Haulers Active in {zip}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">Sorted by fastest response · updated just now</p>
              </div>
              <button className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:border-accent transition-colors shadow-sm">
                Fastest First <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 mb-5">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-orange-700 text-sm font-semibold">🔥 Top slot fills in under 14 min at this time of day.</span>
            </div>

            <div className="flex flex-col gap-5">
              {ZIP_PROS.map((pro, i) => (
                <ProCard key={i} pro={pro} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-background border-2 border-accent text-accent font-bold px-8 py-3 rounded-xl hover:bg-secondary transition-colors text-sm">
                Show {activePros - ZIP_PROS.length} More Haulers
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}