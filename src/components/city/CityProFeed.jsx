import React, { useState, useEffect } from "react";
import { X, Check, AlertTriangle, Truck, SlidersHorizontal, Leaf, Zap, ShieldCheck, Tag, ChevronDown, TrendingUp, Clock, Users, Sparkles, Store, Filter, Star, BadgeCheck, MapPin, ArrowRight } from "lucide-react";

const CITY_PROS = [
  {
    name: "LoadUp",
    location: "Nationwide · 170+ Cities",
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
    specialty: "Best Value",
    specialtyColor: "emerald"
  },
  {
    name: "1-800-GOT-JUNK?",
    location: "Nationwide · 200+ Locations",
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
    specialty: "Most Trusted",
    specialtyColor: "blue"
  },
  {
    name: "College HUNKS Hauling Junk",
    location: "Nationwide · 150+ Locations",
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
    specialty: "Top Rated",
    specialtyColor: "amber"
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
    description: "On-demand moving and junk removal. Book vetted local movers instantly with transparent pricing.",
    features: { ecoFriendly: false, sameDay: false, licensed: true, upfrontPricing: true },
    specialty: "Lowest Price",
    specialtyColor: "rose"
  }
];

function VendorCard({ pro, featured = false }) {
  const [viewingNow, setViewingNow] = useState(Math.floor(Math.random() * 8) + 3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewingNow(prev => Math.max(1, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  const colorMap = {
    emerald: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    amber: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
    rose: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" }
  };
  const colors = colorMap[pro.specialtyColor] || colorMap.emerald;

  return (
    <div 
      className={`group bg-card border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
        featured ? 'border-accent shadow-lg' : 'border-border hover:border-accent/50'
      } market-hover`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Banner */}
      {featured && (
        <div className="bg-gradient-to-r from-accent to-amber-500 text-white text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Featured Vendor
        </div>
      )}

      <div className="p-6">
        <div className="flex gap-5">
          {/* Image */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-secondary">
            <img
              src={pro.mainImage}
              alt={pro.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
            />
            {/* Live viewers badge */}
            <div className="absolute bottom-2 left-2 right-2 bg-foreground/80 backdrop-blur-sm text-background text-[10px] font-bold px-2 py-1 rounded-lg flex items-center justify-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              {viewingNow} viewing
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground">{pro.name}</h3>
                  <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{pro.location}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black text-accent">{pro.price}</div>
                <div className="text-xs text-muted-foreground">starting</div>
              </div>
            </div>

            {/* Specialty & Rating */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`${colors.bg} ${colors.text} ${colors.border} border text-xs font-bold px-3 py-1 rounded-full`}>
                {pro.specialty}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">{pro.rating}</span>
                <span className="text-muted-foreground text-sm">({pro.reviewCount.toLocaleString()})</span>
              </div>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-sm text-muted-foreground">{pro.hires.toLocaleString()} hires</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{pro.description}</p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pro.features.ecoFriendly && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                  <Leaf className="w-3 h-3" /> Eco-Friendly
                </span>
              )}
              {pro.features.sameDay && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  <Zap className="w-3 h-3" /> Same-Day
                </span>
              )}
              {pro.features.upfrontPricing && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  <Tag className="w-3 h-3" /> Upfront Pricing
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary text-foreground border border-border">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group/btn">
                Get a Quote
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 border-2 border-border hover:border-accent/50 text-foreground font-semibold rounded-xl text-sm transition-all hover:bg-secondary">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Response time footer */}
      <div className="bg-gradient-to-r from-secondary to-transparent border-t border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-semibold">Responds in {pro.responseTime}</span>
        </div>
        <span className="text-xs text-muted-foreground">Free cancellation</span>
      </div>
    </div>
  );
}

export default function CityProFeed({ data }) {
  const { city, cityCostInfo, baggingRules, hoursDays, theCatch } = data;
  const [filters, setFilters] = useState({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false });
  const [showAll, setShowAll] = useState(false);
  const [activeViewers, setActiveViewers] = useState(23);
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setActiveViewers(prev => Math.max(15, Math.min(35, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);
    return () => clearInterval(viewerInterval);
  }, []);

  const filteredPros = CITY_PROS.filter(pro => {
    if (filters.ecoFriendly && !pro.features?.ecoFriendly) return false;
    if (filters.sameDay && !pro.features?.sameDay) return false;
    if (filters.licensed && !pro.features?.licensed) return false;
    if (filters.upfrontPricing && !pro.features?.upfrontPricing) return false;
    return true;
  });

  const displayedPros = showAll ? filteredPros : filteredPros.slice(0, 3);

  const diyCons = [
    `Only: ${hoursDays}`,
    `Rule: ${baggingRules}`,
    `Catch: ${theCatch}`,
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Store className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                Vendor Marketplace
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {filteredPros.length} trusted haulers ready to serve {city}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live activity indicator */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 stall-shadow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{activeViewers}</span> browsing
              </span>
            </div>

            {/* Sort dropdown */}
            <button className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground hover:border-accent/50 transition-colors stall-shadow">
              <SlidersHorizontal className="w-4 h-4" />
              Best Match
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { key: "ecoFriendly", label: "Eco-Friendly", icon: Leaf, color: "green" },
            { key: "sameDay", label: "Same-Day", icon: Zap, color: "amber" },
            { key: "upfrontPricing", label: "Upfront Pricing", icon: Tag, color: "blue" },
            { key: "licensed", label: "Licensed", icon: ShieldCheck, color: "gray" },
          ].map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setFilters(f => ({ ...f, [key]: !f[key] }))}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filters[key]
                  ? 'bg-accent text-accent-foreground border-2 border-accent'
                  : 'bg-card border-2 border-border text-foreground hover:border-accent/50'
              } stall-shadow`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {filters[key] && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Vendor List */}
          <div className="lg:col-span-8 space-y-6">
            {displayedPros.length > 0 ? (
              displayedPros.map((pro, i) => (
                <VendorCard key={i} pro={pro} featured={i === 0} />
              ))
            ) : (
              <div className="bg-card border-2 border-border rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No vendors match your filters</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={() => setFilters({ ecoFriendly: false, sameDay: false, licensed: false, upfrontPricing: false })}
                  className="text-accent font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {!showAll && filteredPros.length > 3 && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowAll(true)}
                  className="bg-card border-2 border-accent text-accent font-bold px-8 py-4 rounded-2xl hover:bg-accent/10 transition-colors text-base"
                >
                  Show {filteredPros.length - 3} More Vendors
                </button>
              </div>
            )}
          </div>

          {/* DIY Comparison Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 space-y-5">
              {/* DIY Option Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Alternative</span>
                    <h3 className="font-bold text-amber-900">DIY / City Route</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-amber-900 font-semibold">Cost: {cityCostInfo}</span>
                  </div>

                  {diyCons.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-red-500" />
                      </div>
                      <span className="text-sm text-amber-800">{c}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-amber-200 flex items-center gap-2 text-xs text-amber-700 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Most residents abandon this route
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-card border-2 border-border rounded-3xl p-5 stall-shadow">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  Marketplace Guarantee
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    All pros are background-checked
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Licensed and insured
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Free cancellation up to 24hrs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Price match guarantee
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
