import React from "react";
import { MapPin, Users, TrendingDown, Zap, AlertTriangle } from "lucide-react";

export default function ZipTriggerRibbon({ data }) {
  const { zip, neighborhood, city, activePros, nextAvailable, basePriceDisplay, recentJobsCount } = data;

  const items = [
    { icon: MapPin, text: `${neighborhood} (${zip})`, type: "location" },
    { icon: Users, text: `${activePros} pros active in this zip`, type: "stat" },
    { icon: Zap, text: `Next available: ${nextAvailable}`, type: "live" },
    { icon: null, text: `${recentJobsCount} jobs completed this month`, type: "stat" },
    { icon: TrendingDown, text: `Current rates: ${basePriceDisplay}`, type: "stat" },
    { icon: null, text: "Same-day service available", type: "live" },
    { icon: AlertTriangle, text: `${city} fines start at $500`, type: "warning" },
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
                <item.icon className="w-4 h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
              )}
              <span className={`text-base font-medium leading-relaxed ${
                item.type === "live" ? "text-green-600" :
                item.type === "warning" ? "text-yellow-600" :
                item.type === "location" ? "text-gray-900 font-semibold" :
                "text-gray-700"
              }`}>
                {item.text}
              </span>
              {item.type === "live" && (
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
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
