import React, { useState } from "react";
import { X, Check, AlertTriangle, Truck, SlidersHorizontal, Leaf, Zap, ShieldCheck, Tag, ChevronDown } from "lucide-react";
import ProCard from "@/components/marketplace/ProCard.jsx";

const CITY_PROS = [
  {
    name: "Apex Eco-Haulers of Los Angeles",
    location: "Serving Los Angeles & 25 mi radius",
    rating: 4.9,
    reviewCount: 312,
    hires: 142,
    responseTime: "10 mins",
    price: "$129",
    hasVideo: true,
    mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&q=80",
    description: "We specialize in rapid, eco-compliant mattress and bulky item removal. No wall scrapes, transparent pricing, and a certified green disposal process that diverts 80% from landfills.",
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
      { label: "Same-Day", icon: Zap, style: "bg-accent/10 text-accent-foreground border-accent/30" },
    ]
  },
  {
    name: "GreenLift Junk Pros",
    location: "West LA, Santa Monica, Culver City",
    rating: 4.8,
    reviewCount: 218,
    hires: 97,
    responseTime: "18 mins",
    price: "$99",
    hasVideo: false,
    mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    description: "Full-service junk hauling with upfront quotes and zero hidden fees. Mattresses, furniture, appliances — we haul it all with a crew that treats your home with respect.",
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-secondary text-primary border-border" },
    ]
  },
  {
    name: "Metro Haul & Removal Co.",
    location: "Downtown LA, Echo Park, Silver Lake",
    rating: 4.7,
    reviewCount: 178,
    hires: 84,
    responseTime: "25 mins",
    price: "$149",
    hasVideo: true,
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    description: "Licensed, insured, and highly reviewed by 170+ local customers. We handle full-load hauls, single-item pickups, and estate cleanouts with military-grade efficiency.",
    tags: [
      { label: "Licensed & Insured", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
      { label: "Same-Day", icon: Zap, style: "bg-accent/10 text-accent-foreground border-accent/30" },
    ]
  },
  {
    name: "BulkHaul Express LA",
    location: "Pasadena, Glendale, Burbank",
    rating: 4.6,
    reviewCount: 134,
    hires: 61,
    responseTime: "30 mins",
    price: "$89",
    hasVideo: false,
    mainImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80",
    description: "Budget-friendly removal without cutting corners. BulkHaul Express offers same-week scheduling, upfront flat-rate pricing, and a 100% satisfaction guarantee on every job.",
    tags: [
      { label: "Upfront Pricing", icon: Tag, style: "bg-secondary text-primary border-border" },
      { label: "Same-Day", icon: Zap, style: "bg-accent/10 text-accent-foreground border-accent/30" },
    ]
  }
];

const Toggle = ({ checked, onChange, label, icon: Icon, color = "blue" }) => (
  <label className="flex items-center justify-between cursor-pointer group py-2.5 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2.5">
      <Icon className={`w-4 h-4 text-${color}-500`} />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div onClick={onChange} className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-primary" : "bg-gray-200"}`}>
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </div>
  </label>
);

export default function CityProFeed({ data }) {
  const { city, cityCostInfo, baggingRules, hoursDays, theCatch } = data;
  const [filters, setFilters] = useState({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false });
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  const diyCons = [
    `Only available: ${hoursDays}`,
    `Rule: ${baggingRules}`,
    `Catch: ${theCatch}`,
    "Truck or large vehicle required",
    "Heavy lifting (75–100 lbs)",
  ];

  return (
    <section className="py-10 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
            {/* DIY Info Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden mb-5">
              <div className="bg-amber-100 border-b border-amber-200 px-4 py-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700" />
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Option A</span>
                  <h3 className="font-extrabold text-amber-900 text-sm">DIY / City Route</h3>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-700 font-semibold">Cost: {cityCostInfo}</span>
                </div>
                {diyCons.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5 text-red-500" />
                    </div>
                    <span className="text-xs text-gray-600">{c}</span>
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium border-t border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  Most residents abandon this route
                </div>
              </div>
            </div>

            {/* Filter Sidebar */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-secondary border-b border-border px-5 py-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h2 className="font-bold text-card-foreground text-sm tracking-wide uppercase">Refine Search</h2>
              </div>
              <div className="px-5 py-3">
                <Toggle checked={filters.ecoFriendly} onChange={() => toggle("ecoFriendly")} label="Eco-Friendly / Recycling" icon={Leaf} color="green" />
                <Toggle checked={filters.sameDay} onChange={() => toggle("sameDay")} label="Same-Day Availability" icon={Zap} color="yellow" />
                <Toggle checked={filters.licensed} onChange={() => toggle("licensed")} label="Licensed & Insured" icon={ShieldCheck} color="blue" />
                <Toggle checked={filters.upfrontPricing} onChange={() => toggle("upfrontPricing")} label="Upfront Pricing Only" icon={Tag} color="purple" />
              </div>
              <div className="px-5 pb-5">
                <div className="bg-secondary border border-border rounded-xl p-3 text-center">
                  <p className="text-primary text-xs font-semibold">🔒 All pros are background-checked & verified.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  {CITY_PROS.length + 8} Available Haulers in {city}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">matching your criteria · updated 2 min ago</p>
              </div>
              <button className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-sm font-semibold text-card-foreground hover:border-primary/30 transition-colors shadow-sm">
                Best Match <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {CITY_PROS.map((pro, i) => (
                <ProCard key={i} pro={pro} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-card border-2 border-primary text-primary font-bold px-8 py-3 rounded-xl hover:bg-secondary transition-colors text-sm">
                Show 8 More Haulers
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}