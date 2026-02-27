import { ChevronDown, ShieldCheck, Leaf, Zap, Tag } from "lucide-react";
import ProCard from "./ProCard";

const PROS = [
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
      { label: "Background Checked", icon: ShieldCheck, style: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
      { label: "Same-Day", icon: Zap, style: "bg-yellow-50 text-yellow-700 border-yellow-200" },
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
      { label: "Background Checked", icon: ShieldCheck, style: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Upfront Pricing", icon: Tag, style: "bg-purple-50 text-purple-700 border-purple-200" },
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
      { label: "Licensed & Insured", icon: ShieldCheck, style: "bg-blue-50 text-blue-700 border-blue-200" },
      { label: "Eco-Partner", icon: Leaf, style: "bg-green-50 text-green-700 border-green-200" },
      { label: "Same-Day", icon: Zap, style: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    ]
  }
];

export default function ProFeed({ city, zip, filters }) {
  return (
    <div>
      {/* Feed Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">12 Available Haulers near {zip || city}</h2>
          <p className="text-gray-600 text-xs mt-0.5">matching your criteria · updated 2 min ago</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Sort by:</span>
          <button className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
            Best Match <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Active filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.ecoFriendly && <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-full">✓ Eco-Friendly</span>}
        {filters.sameDay && <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium px-2.5 py-1 rounded-full">✓ Same-Day</span>}
        {filters.licensed && <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium px-2.5 py-1 rounded-full">✓ Licensed</span>}
        {filters.upfrontPricing && <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium px-2.5 py-1 rounded-full">✓ Upfront Pricing</span>}
      </div>

      {/* Pro Cards */}
      <div className="flex flex-col gap-4">
        {PROS.map((pro, i) => (
          <ProCard key={i} pro={pro} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="bg-white border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-sm">
          Show 9 More Haulers
        </button>
      </div>
    </div>
  );
}
