import React from "react";
import { Leaf, Zap, ShieldCheck, Tag, SlidersHorizontal } from "lucide-react";

const Toggle = ({ checked, onChange, label, icon: Icon, color = "blue" }) => (
  <label className="flex items-center justify-between cursor-pointer group py-2.5 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2.5">
      <Icon className={`w-4 h-4 text-${color}-500`} />
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
    </div>
    <div
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  </label>
);

export default function FilterSidebar({ filters, setFilters }) {
  const toggle = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-blue-600" />
        <h2 className="font-bold text-gray-800 text-sm tracking-wide uppercase">Refine Your Search</h2>
      </div>

      <div className="px-5 py-3">
        <Toggle checked={filters.ecoFriendly} onChange={() => toggle("ecoFriendly")} label="Eco-Friendly / Recycling Focus" icon={Leaf} color="green" />
        <Toggle checked={filters.sameDay} onChange={() => toggle("sameDay")} label="Same-Day Availability" icon={Zap} color="yellow" />
        <Toggle checked={filters.licensed} onChange={() => toggle("licensed")} label="Licensed & Insured Guarantee" icon={ShieldCheck} color="blue" />
        <Toggle checked={filters.upfrontPricing} onChange={() => toggle("upfrontPricing")} label="Upfront Pricing Only" icon={Tag} color="purple" />
      </div>

      <div className="px-5 pb-5">
        <div className="bg-gray-50 rounded-xl p-4 mt-1">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max Budget</span>
            <span className="text-blue-600 font-bold text-sm">${filters.maxPrice}</span>
          </div>
          <input
            type="range"
            min={50}
            max={600}
            step={25}
            value={filters.maxPrice}
            onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$50</span>
            <span>$600+</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-center">
          <p className="text-blue-700 text-xs font-semibold">🔒 All pros are background-checked &amp; verified on this platform.</p>
        </div>
      </div>
    </div>
  );
}
