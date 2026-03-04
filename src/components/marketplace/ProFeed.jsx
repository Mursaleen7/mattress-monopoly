import { ChevronDown, ShieldCheck, Leaf, Zap, Tag } from "lucide-react";
import { useState } from "react";
import ProCard from "./ProCard";

const PROS = [
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

export default function ProFeed({ city, zip, filters }) {
  const [showAll, setShowAll] = useState(false);
  
  // Filter pros based on selected criteria
  const filteredPros = PROS.filter(pro => {
    // Check eco-friendly filter
    if (filters.ecoFriendly && !pro.features.ecoFriendly) return false;
    
    // Check same-day filter
    if (filters.sameDay && !pro.features.sameDay) return false;
    
    // Check licensed filter
    if (filters.licensed && !pro.features.licensed) return false;
    
    // Check upfront pricing filter
    if (filters.upfrontPricing && !pro.features.upfrontPricing) return false;
    
    // Check max price filter
    if (pro.priceValue > filters.maxPrice) return false;
    
    return true;
  });
  
  // Show first 3 pros initially, all when "Show More" is clicked
  const displayedPros = showAll ? filteredPros : filteredPros.slice(0, 3);
  const remainingCount = filteredPros.length - 3;
  return (
    <div>
      {/* Feed Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">{filteredPros.length} Available Hauler{filteredPros.length !== 1 ? 's' : ''} near {zip || city}</h2>
          <p className="text-gray-600 text-xs mt-0.5">matching your criteria · updated 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Sort by:</span>
          <button className="flex items-center gap-1.5 bg-card border border-border rounded-md px-3 py-1.5 text-sm font-medium text-card-foreground hover:border-primary/50 hover:bg-secondary transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm">
            Best Match <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Active filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.ecoFriendly && <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-300 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">✓ Eco-Friendly</span>}
        {filters.sameDay && <span className="inline-flex items-center gap-1 bg-accent/10 text-accent-foreground border border-accent/40 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">✓ Same-Day</span>}
        {filters.licensed && <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">✓ Licensed</span>}
        {filters.upfrontPricing && <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">✓ Upfront Pricing</span>}
      </div>

      {/* Pro Cards */}
      <div className="flex flex-col gap-4">
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
                Try adjusting your filters or increasing your max budget to see more results.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-accent hover:opacity-90 text-accent-foreground font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-sm focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-95"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Load More */}
      {!showAll && remainingCount > 0 && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="bg-card border border-border text-card-foreground font-medium px-6 py-2.5 rounded-md hover:bg-secondary hover:border-primary/50 transition-all duration-200 text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 shadow-sm"
          >
            Show {remainingCount} More Hauler{remainingCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}
