import React from "react";
import { ShieldCheck, Leaf, Zap, Star } from "lucide-react";

export default function ZipTrustBar({ data }) {
  const { activePros, zip, recentJobsCount } = data;

  const items = [
    { icon: ShieldCheck, label: "Background Checked", sub: "Every pro verified", color: "blue" },
    { icon: Leaf, label: "Eco-Certified Disposal", sub: "80%+ diverted from landfill", color: "green" },
    { icon: Zap, label: "Same-Day Slots Open", sub: `${activePros} pros active in ${zip}`, color: "yellow" },
    { icon: Star, label: `${recentJobsCount} Jobs Nearby`, sub: "In the last 30 days", color: "purple" },
  ];

  return (
    <div className="bg-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">{label}</div>
                <div className="text-gray-500 text-[11px]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}