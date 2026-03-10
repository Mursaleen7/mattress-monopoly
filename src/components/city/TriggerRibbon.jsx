import React from "react";
import { Cloud, Calendar, DollarSign, MapPin, AlertTriangle, Shield, Clock, FileText } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city, fineAmount, hoursDays } = data;

  const items = [
    { icon: MapPin, text: city, type: "location" },
    { icon: AlertTriangle, text: `Illegal dumping fines: ${fineAmount}`, type: "warning" },
    { icon: Calendar, text: `City pickup wait: ${nextPickupDays}+ days`, type: "info" },
    { icon: Cloud, text: weatherProfile, type: "info" },
    { icon: DollarSign, text: `Market rates: ${competitorComparisonPrice}`, type: "stat" },
    { icon: Shield, text: "Plastic wrap required by law", type: "warning" },
    { icon: Clock, text: `Facilities: ${hoursDays}`, type: "info" },
    { icon: FileText, text: "Photo ID required at drop-off", type: "warning" },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="bg-white border-y border-border overflow-hidden">
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-4 whitespace-nowrap border-r border-border"
            >
              {item.icon && (
                <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              )}
              <span className={`text-base font-medium leading-relaxed ${
                item.type === "warning" ? "text-orange-600" :
                item.type === "location" ? "text-gray-900 font-semibold" :
                item.type === "stat" ? "text-gray-700" :
                "text-gray-600"
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
