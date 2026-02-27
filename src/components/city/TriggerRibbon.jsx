import React from "react";
import { Cloud, Calendar, TrendingDown } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city } = data;

  const cards = [
    {
      icon: Cloud,
      label: "Weather Risk",
      title: `Weather Profile: ${weatherProfile}`,
      body: "Warning: Wet mattresses are automatically rejected by city sanitation crews.",
      accent: "yellow",
      badge: "HIGH RISK",
    },
    {
      icon: Calendar,
      label: "Pickup Countdown",
      title: `Next Municipal Pickup`,
      body: `The next available bulk pickup in ${city} is ${nextPickupDays} days away. Schedules fill quickly.`,
      accent: "orange",
      badge: `${nextPickupDays} DAYS`,
    },
    {
      icon: TrendingDown,
      label: "Market Rate",
      title: `Current Pro Rates in ${city}`,
      body: `Local haulers are currently quoting ${competitorComparisonPrice}. Prices rise on weekends.`,
      accent: "blue",
      badge: "LIVE DATA",
    },
  ];

  const accentMap = {
    yellow: { 
      bg: "bg-yellow-50", 
      border: "border-yellow-200", 
      icon: "text-yellow-600", 
      badge: "bg-yellow-100 text-yellow-800", 
      title: "text-yellow-900" 
    },
    orange: { 
      bg: "bg-orange-50", 
      border: "border-orange-200", 
      icon: "text-orange-600", 
      badge: "bg-orange-100 text-orange-800", 
      title: "text-orange-900" 
    },
    blue: { 
      bg: "bg-blue-50", 
      border: "border-blue-200", 
      icon: "text-blue-600", 
      badge: "bg-blue-100 text-blue-800", 
      title: "text-blue-900" 
    },
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map(({ icon: Icon, label, title, body, accent, badge }, i) => {
            const a = accentMap[accent];
            return (
              <div key={i} className={`flex gap-4 p-4 rounded-2xl border ${a.bg} ${a.border}`}>
                <div className={`w-10 h-10 rounded-xl bg-white border ${a.border} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon className={`w-5 h-5 ${a.icon}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                      {label}
                    </span>
                    <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-md ${a.badge}`}>
                      {badge}
                    </span>
                  </div>
                  <p className={`font-extrabold text-sm ${a.title} mb-0.5`}>{title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
