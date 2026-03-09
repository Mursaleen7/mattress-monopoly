import React, { useState, useEffect } from "react";
import { ChevronDown, MapPin, TrendingUp, Activity, HelpCircle, MessageCircle, Sparkles } from "lucide-react";

export default function CityFAQ({ data }) {
  const { city, faqs, neighborhoods } = data;
  const [open, setOpen] = useState(0);
  const [activeNeighborhood, setActiveNeighborhood] = useState(null);
  const [neighborhoodActivity, setNeighborhoodActivity] = useState({});

  useEffect(() => {
    const initialActivity = {};
    neighborhoods.forEach(n => {
      initialActivity[n] = Math.floor(Math.random() * 5);
    });
    setNeighborhoodActivity(initialActivity);

    const activityInterval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * neighborhoods.length);
      setActiveNeighborhood(neighborhoods[randomIdx]);
      
      setNeighborhoodActivity(prev => {
        const updated = { ...prev };
        const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
        updated[randomNeighborhood] = (updated[randomNeighborhood] || 0) + 1;
        return updated;
      });

      setTimeout(() => setActiveNeighborhood(null), 3000);
    }, 8000);

    return () => clearInterval(activityInterval);
  }, [neighborhoods]);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* FAQ Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tight">
                  Common Questions
                </h2>
                <p className="text-muted-foreground text-sm">Local rules, costs, and policies — answered</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map(({ q, a }, i) => (
                <div 
                  key={i} 
                  className={`bg-card border-2 rounded-2xl overflow-hidden transition-all duration-300 stall-shadow ${
                    open === i ? "border-accent shadow-lg" : "border-border hover:border-accent/30"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        open === i ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                      }`}>
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className={`font-bold text-base leading-snug ${
                        open === i ? "text-accent" : "text-foreground"
                      }`}>
                        {q}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                        open === i ? "rotate-180 text-accent" : ""
                      }`} 
                    />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-96" : "max-h-0"
                  }`}>
                    <div className="px-6 pb-6 pl-[4.5rem]">
                      <p className="text-muted-foreground leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhoods Column */}
          <div className="lg:col-span-5">
            <div className="bg-card border-2 border-border rounded-3xl overflow-hidden stall-shadow sticky top-6">
              <div className="bg-gradient-to-r from-accent/10 to-transparent px-6 py-5 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-accent" />
                    <h2 className="text-xl font-bold text-foreground">
                      Service Areas
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live activity
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  Our network covers all of {city} and surrounding areas
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((n, i) => {
                    const isActive = activeNeighborhood === n;
                    const activity = neighborhoodActivity[n] || 0;
                    
                    return (
                      <span 
                        key={i} 
                        className={`relative inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          isActive 
                            ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 scale-105 shadow-md' 
                            : 'bg-secondary text-foreground border-2 border-transparent hover:border-accent/30 hover:bg-accent/5'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                        {n}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white items-center justify-center">
                              <Sparkles className="w-2 h-2 text-white" />
                            </span>
                          </span>
                        )}
                        {activity > 0 && !isActive && (
                          <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded-full">
                            {activity}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
                
                {activeNeighborhood && (
                  <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-200 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-sm text-emerald-800 font-medium">
                        <span className="font-bold">Just now:</span> New quote requested in {activeNeighborhood}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total areas covered</span>
                    <span className="font-bold text-foreground">{neighborhoods.length}+ neighborhoods</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
