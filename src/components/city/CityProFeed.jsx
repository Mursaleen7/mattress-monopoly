import React, { useState } from "react";
import { X, Check, AlertTriangle, Truck, SlidersHorizontal, Leaf, Zap, ShieldCheck, Tag, ChevronDown, Star, Clock, BadgeCheck, MapPin, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

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
    description: "Affordable junk removal with upfront pricing. Book online in 2 minutes. We recycle and donate 70% of items.",
    features: { ecoFriendly: true, sameDay: true, licensed: true, upfrontPricing: true },
    tags: [
      { label: "Eco-Partner", color: "green" },
      { label: "Same-Day", color: "orange" },
      { label: "Top Rated", color: "primary" },
    ],
    featured: true
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
    description: "North America's largest junk removal service. Full-service hauling from anywhere on your property.",
    features: { ecoFriendly: true, sameDay: true, licensed: true, upfrontPricing: false },
    tags: [
      { label: "Licensed", color: "blue" },
      { label: "Eco-Partner", color: "green" },
    ]
  },
  {
    name: "College HUNKS",
    location: "Nationwide Service · 150+ Locations",
    rating: 4.6,
    reviewCount: 3214,
    hires: 2156,
    responseTime: "12 mins",
    price: "$129",
    priceValue: 129,
    hasVideo: false,
    mainImage: "/img/COLLEGEHUNKS.jpg",
    description: "Honest, Uniformed, Nice, Knowledgeable Service. Full-service junk removal and moving.",
    features: { ecoFriendly: false, sameDay: true, licensed: true, upfrontPricing: true },
    tags: [
      { label: "Background Checked", color: "primary" },
      { label: "Upfront Pricing", color: "accent" },
    ]
  },
  {
    name: "Muvr",
    location: "On-Demand Platform",
    rating: 4.5,
    reviewCount: 1892,
    hires: 1247,
    responseTime: "8 mins",
    price: "$79",
    priceValue: 79,
    hasVideo: true,
    mainImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    description: "On-demand moving and junk removal platform. Book vetted local movers instantly.",
    features: { ecoFriendly: false, sameDay: false, licensed: true, upfrontPricing: true },
    tags: [
      { label: "Budget-Friendly", color: "green" },
      { label: "Upfront Pricing", color: "accent" },
    ]
  }
];

const tagColors = {
  green: "bg-green-100 text-green-800 border-green-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/20"
};

const FilterToggle = ({ checked, onChange, label, icon: Icon }) => (
  <button 
    onClick={onChange} 
    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all ${
      checked 
        ? "bg-primary text-primary-foreground border-primary" 
        : "bg-card text-foreground border-border hover:border-primary/50"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

function ProCardMarketplace({ pro, index }) {
  const isFeatured = pro.featured;
  
  return (
    <div className={`group relative bg-card rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
      isFeatured 
        ? "border-2 border-accent shadow-lg" 
        : "border border-border hover:border-primary/30"
    }`}>
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-xs font-bold py-1.5 text-center flex items-center justify-center gap-1.5 z-10">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Pro · Best Value
        </div>
      )}
      
      <div className={`flex flex-col lg:flex-row ${isFeatured ? "pt-8" : ""}`}>
        {/* Image section */}
        <div className="lg:w-64 h-48 lg:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={pro.mainImage}
            alt={pro.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
          
          {/* Price badge */}
          <div className="absolute bottom-4 left-4 lg:bottom-auto lg:top-4">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <p className="text-xs text-muted-foreground font-medium">Starting at</p>
              <p className="text-2xl font-black text-green-600">{pro.price}</p>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-5 lg:p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-foreground text-lg">{pro.name}</h3>
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {pro.location}
              </p>
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 mb-0.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-foreground">{pro.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{pro.reviewCount.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MessageSquare className="w-3.5 h-3.5" />
              {pro.hires.toLocaleString()} hires
            </span>
            <span className="flex items-center gap-1.5 text-green-600 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {pro.responseTime} response
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {pro.tags.map((tag, i) => (
              <span key={i} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${tagColors[tag.color]}`}>
                {tag.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">{pro.description}</p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
            <button className={`flex-1 font-bold py-3 px-5 rounded-xl text-sm transition-all active:scale-[0.98] ${
              isFeatured 
                ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" 
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}>
              Get Quote
            </button>
            <button className="flex-1 border-2 border-border hover:border-primary/50 text-foreground font-semibold py-3 px-5 rounded-xl text-sm transition-all hover:bg-secondary">
              View Profile
            </button>
            <button className="hidden sm:flex items-center gap-1 text-primary hover:opacity-80 text-sm font-semibold transition-all whitespace-nowrap">
              Reviews <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CityProFeed({ data }) {
  const { city, cityCostInfo, baggingRules, hoursDays, theCatch } = data;
  const [filters, setFilters] = useState({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false });
  const [showAll, setShowAll] = useState(false);
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  const filteredPros = CITY_PROS.filter(pro => {
    if (filters.ecoFriendly && !pro.features?.ecoFriendly) return false;
    if (filters.sameDay && !pro.features?.sameDay) return false;
    if (filters.licensed && !pro.features?.licensed) return false;
    if (filters.upfrontPricing && !pro.features?.upfrontPricing) return false;
    return true;
  });

  const displayedPros = showAll ? filteredPros : filteredPros.slice(0, 3);
  const remainingCount = filteredPros.length - 3;

  const diyCons = [
    `Only: ${hoursDays}`,
    `Rule: ${baggingRules}`,
    `Catch: ${theCatch}`,
    "Need truck (75–100 lbs)",
  ];

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-block text-sm font-bold text-accent uppercase tracking-wider mb-2">Marketplace</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-2">
              Available Haulers in {city}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredPros.length} verified pros ready to help · Updated 2 min ago
            </p>
          </div>
          
          {/* Sort dropdown */}
          <button className="self-start lg:self-auto flex items-center gap-2 bg-card border-2 border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors shadow-sm">
            Best Match <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-border">
          <FilterToggle checked={filters.ecoFriendly} onChange={() => toggle("ecoFriendly")} label="Eco-Friendly" icon={Leaf} />
          <FilterToggle checked={filters.sameDay} onChange={() => toggle("sameDay")} label="Same-Day" icon={Zap} />
          <FilterToggle checked={filters.licensed} onChange={() => toggle("licensed")} label="Licensed" icon={ShieldCheck} />
          <FilterToggle checked={filters.upfrontPricing} onChange={() => toggle("upfrontPricing")} label="Upfront Pricing" icon={Tag} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main feed */}
          <main className="lg:col-span-8 space-y-6">
            {displayedPros.length > 0 ? (
              displayedPros.map((pro, i) => (
                <ProCardMarketplace key={i} pro={pro} index={i} />
              ))
            ) : (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">:(</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No haulers match your filters</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={() => setFilters({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false })}
                  className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {!showAll && remainingCount > 0 && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowAll(true)}
                  className="bg-card border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/5 transition-colors text-base"
                >
                  Show {remainingCount} More Hauler{remainingCount > 1 ? "s" : ""}
                </button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* DIY comparison card */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl overflow-hidden sticky top-6">
              <div className="bg-amber-100 border-b border-amber-200 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Alternative</span>
                  <h3 className="font-bold text-amber-900">DIY / City Route</h3>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-700" />
                  </div>
                  <span className="text-sm text-amber-900 font-semibold">Cost: {cityCostInfo}</span>
                </div>
                
                {diyCons.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-sm text-amber-800">{c}</span>
                  </div>
                ))}
                
                <div className="pt-3 mt-3 border-t border-amber-200 flex items-center gap-2 text-xs text-amber-700 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Most residents choose a pro instead
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-1">100% Verified</h4>
              <p className="text-sm text-muted-foreground">All pros are background-checked and insured</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
