import React, { useState } from "react";
import { SlidersHorizontal, Leaf, Zap, ShieldCheck, Tag, ChevronDown } from "lucide-react";
import ProCard from "@/components/marketplace/ProCard.jsx";

const CITY_PROS = [
  {
    name: "LoadUp",
    location: "Nationwide Service · Available in 170+ Cities",
    rating: 4.8,
    reviewCount: 2847,
    hires: 1523,
    responseTime: "5 mins",
    price: "$89",
    priceValue: 89,
    hasVideo: true,
    mainImage: "/img/LOADimg.png",
    beforeImage: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&q=80",
    description: "Affordable junk removal with upfront pricing. Book online in 2 minutes. We recycle and donate 70% of items. No hidden fees, guaranteed pricing, and same-day service available.",
    features: {
      ecoFriendly: true,
      sameDay: true,
      licensed: true,
      upfrontPricing: true,
    },
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-300" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-300" },
    ]
  },
  {
    name: "1-800-GOT-JUNK?",
    location: "Nationwide Service · 200+ Locations",
    rating: 4.7,
    reviewCount: 5621,
    hires: 3842,
    responseTime: "15 mins",
    price: "$149",
    priceValue: 149,
    hasVideo: true,
    mainImage: "/img/1800img.png",
    beforeImage: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    description: "North America's largest junk removal service. Full-service hauling from anywhere on your property. We do all the lifting and loading. Licensed, insured, and eco-friendly disposal.",
    features: {
      ecoFriendly: true,
      sameDay: true,
      licensed: true,
      upfrontPricing: false,
    },
    tags: [
      { label: "Licensed & Insured", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-300" },
      { label: "Same-Day", icon: Zap, style: "bg-accent/10 text-accent-foreground border-accent/40" },
    ]
  },
  {
    name: "College HUNKS Hauling Junk & Moving",
    location: "Nationwide Service · 150+ Locations",
    rating: 4.6,
    reviewCount: 3214,
    hires: 2156,
    responseTime: "12 mins",
    price: "$129",
    priceValue: 129,
    hasVideo: false,
    mainImage: "/img/COLLEGEHUNKS.jpg",
    beforeImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    description: "Honest, Uniformed, Nice, Knowledgeable Service. Full-service junk removal and moving. We donate and recycle whenever possible. Professional crews with background checks.",
    features: {
      ecoFriendly: false,
      sameDay: true,
      licensed: true,
      upfrontPricing: true,
    },
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-300" },
      { label: "Same-Day", icon: Zap, style: "bg-accent/10 text-accent-foreground border-accent/40" },
    ]
  },
  {
    name: "Muvr",
    location: "Nationwide Service · On-Demand Platform",
    rating: 4.5,
    reviewCount: 1892,
    hires: 1247,
    responseTime: "8 mins",
    price: "$79",
    priceValue: 79,
    hasVideo: true,
    mainImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80",
    description: "On-demand moving and junk removal platform. Book vetted local movers instantly. Transparent pricing, real-time tracking, and flexible scheduling. Perfect for small to medium jobs.",
    features: {
      ecoFriendly: false,
      sameDay: false,
      licensed: true,
      upfrontPricing: true,
    },
    tags: [
      { label: "Background Checked", icon: ShieldCheck, style: "bg-secondary text-primary border-border" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-300" },
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
  const { city } = data;
  const [filters, setFilters] = useState({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false });
  const [showAll, setShowAll] = useState(false);
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  // Filter pros based on selected criteria
  const filteredPros = CITY_PROS.filter(pro => {
    // Check eco-friendly filter
    if (filters.ecoFriendly && !pro.features?.ecoFriendly) return false;
    
    // Check same-day filter
    if (filters.sameDay && !pro.features?.sameDay) return false;
    
    // Check licensed filter
    if (filters.licensed && !pro.features?.licensed) return false;
    
    // Check upfront pricing filter
    if (filters.upfrontPricing && !pro.features?.upfrontPricing) return false;
    
    return true;
  });

  // Show first 3 pros initially, all when "Show More" is clicked
  const displayedPros = showAll ? filteredPros : filteredPros.slice(0, 3);
  const remainingCount = filteredPros.length - 3;

  return (
    <section className="py-10 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-20">
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
                  {filteredPros.length} Available Hauler{filteredPros.length !== 1 ? 's' : ''} in {city}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">matching your criteria · updated 2 min ago</p>
              </div>
              <button className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-sm font-semibold text-card-foreground hover:border-primary/30 transition-colors shadow-sm">
                Best Match <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {displayedPros.length > 0 ? (
                displayedPros.map((pro, i) => (
                  <ProCard key={i} pro={pro} />
                ))
              ) : (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No haulers match your filters</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!showAll && remainingCount > 0 && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setShowAll(true)}
                  className="bg-card border-2 border-primary text-primary font-bold px-8 py-3 rounded-xl hover:bg-secondary transition-colors text-sm"
                >
                  Show {remainingCount} More Hauler{remainingCount > 1 ? 's' : ''}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}