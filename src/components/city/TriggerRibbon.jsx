import React from "react";
import { Cloud, Calendar, TrendingDown, Users, MapPin } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city } = data;

  const items = [
    { icon: MapPin, text: city, type: "location" },
    { icon: null, text: `Avg response: ${nextPickupDays} minutes`, type: "stat" },
    { icon: Users, text: "47 haulers online now", type: "live" },
    { icon: Calendar, text: "12 jobs booked today", type: "stat" },
    { icon: null, text: `Weather Profile: ${weatherProfile}`, type: "warning" },
    { icon: TrendingDown, text: `Current rates: ${competitorComparisonPrice}`, type: "stat" },
    { icon: null, text: `Next municipal pickup: ${nextPickupDays} days`, type: "info" },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="bg-white border-y border-gray-200 overflow-hidden">
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 whitespace-nowrap border-r border-gray-200"
            >
              {item.icon && (
                <item.icon className="w-4 h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
              )}
              <span className={`text-sm font-medium ${
                item.type === "live" ? "text-green-600" :
                item.type === "warning" ? "text-yellow-600" :
                item.type === "location" ? "text-gray-900 font-bold" :
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
