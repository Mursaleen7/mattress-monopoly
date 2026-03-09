import React, { useState, useEffect } from "react";
import { ChevronDown, MapPin, TrendingUp, Activity } from "lucide-react";

export default function CityFAQ({ data }) {
  const { city, faqs, neighborhoods } = data;
  const [open, setOpen] = useState(0);
  const [activeNeighborhood, setActiveNeighborhood] = useState(null);
  const [neighborhoodActivity, setNeighborhoodActivity] = useState({});

  // Simulate live neighborhood activity
  useEffect(() => {
    // Initialize random activity for neighborhoods
    const initialActivity = {};
    neighborhoods.forEach(n => {
      initialActivity[n] = Math.floor(Math.random() * 5);
    });
    setNeighborhoodActivity(initialActivity);

    // Randomly highlight active neighborhoods
    const activityInterval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * neighborhoods.length);
      setActiveNeighborhood(neighborhoods[randomIdx]);
      
      // Update activity counts
      setNeighborhoodActivity(prev => {
        const updated = { ...prev };
        const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
        updated[randomNeighborhood] = (updated[randomNeighborhood] || 0) + 1;
        return updated;
      });

      // Clear highlight after 3 seconds
      setTimeout(() => setActiveNeighborhood(null), 3000);
    }, 8000);

    return () => clearInterval(activityInterval);
  }, [neighborhoods]);

  return (
    <section className="py-14 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm mb-6">Local rules, costs, and policies — answered.</p>

            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <div 
                  key={i} 
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    open === i ? "border-primary/30 shadow-sm" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`font-bold text-sm ${
                      open === i ? "text-primary" : "text-card-foreground"
                    }`}>
                      {q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Neighborhoods Served in {city}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Activity className="w-3.5 h-3.5 text-green-500" />
                <span>Live activity</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Our pro network covers all of these areas — and more.
            </p>

            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((n, i) => {
                const isActive = activeNeighborhood === n;
                const activity = neighborhoodActivity[n] || 0;
                return (
                  <span 
                    key={i} 
                    className={`relative bg-secondary border text-card-foreground text-xs font-semibold px-3 py-1.5 rounded-full hover:border-primary/30 hover:bg-accent/10 hover:text-accent-foreground transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive ? 'border-green-400 bg-green-50 scale-105 shadow-md' : 'border-border'
                    }`}
                  >
                    <MapPin className={`w-3 h-3 ${isActive ? 'text-green-500' : ''}`} />
                    {n}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
                      </span>
                    )}
                    {activity > 0 && (
                      <span className="text-[10px] text-gray-400 ml-1">
                        ({activity})
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            
            {activeNeighborhood && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 animate-pulse">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">
                  <span className="font-bold">Just now:</span> New quote requested in {activeNeighborhood}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
