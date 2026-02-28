import React from "react";
import { Leaf, Zap, ShieldCheck, Tag, SlidersHorizontal } from "lucide-react";

const Toggle = ({ checked, onChange, label, icon: Icon, color = "blue" }) => (
  <label className="flex items-center justify-between cursor-pointer group py-2.5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors duration-200 -mx-1 px-1 rounded gap-3">
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <Icon className={`w-4 h-4 text-${color}-500 flex-shrink-0`} />
      <span className="text-sm font-medium text-gray-700 group-hover:text-foreground transition-colors">{label}</span>
    </div>
    <div
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 flex-shrink-0 ${
        checked ? "bg-primary shadow-sm" : "bg-gray-300 hover:bg-gray-400"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  </label>
);

export default function FilterSidebar({ filters, setFilters }) {
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-200">
      <div className="bg-secondary border-b border-border px-5 py-4 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <h2 className="font-bold text-foreground text-sm tracking-wide uppercase">Refine Your Search</h2>
      </div>

      <div className="px-5 py-3">
        <Toggle checked={filters.ecoFriendly} onChange={() => toggle("ecoFriendly")} label="Eco-Friendly / Recycling Focus" icon={Leaf} color="green" />
        <Toggle checked={filters.sameDay} onChange={() => toggle("sameDay")} label="Same-Day Availability" icon={Zap} color="yellow" />
        <Toggle checked={filters.licensed} onChange={() => toggle("licensed")} label="Licensed & Insured Guarantee" icon={ShieldCheck} color="blue" />
        <Toggle checked={filters.upfrontPricing} onChange={() => toggle("upfrontPricing")} label="Upfront Pricing Only" icon={Tag} color="purple" />
      </div>

      <div className="px-5 pb-5">
        <div className="bg-secondary rounded-xl p-4 mt-1 border border-border/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Max Budget</span>
            <span className="text-primary font-bold text-sm">${filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min={50}
            max={600}
            step={25}
            value={filters.maxPrice}
            onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full accent-primary cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$50</span>
            <span>$600+</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 text-center shadow-sm">
          <p className="text-primary text-xs font-semibold">🔒 All pros are background-checked &amp; verified on this platform.</p>
        </div>
      </div>
    </div>
  );
}
