import React, { useState, useEffect } from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck, TrendingUp, Users, Clock, Check } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function CityHero({ data }) {
  const { city, state, stateAbbr, heroHookStatement, fineAmount, lastUpdated, zipCodes } = data;
  
  // Live stats
  const [prosOnline, setProsOnline] = useState(8);
  const [quotesToday, setQuotesToday] = useState(127);
  const [avgResponseTime, setAvgResponseTime] = useState(7);
  const [recentActivity, setRecentActivity] = useState([
    { action: "quote_requested", area: "Silver Lake", time: "1m" },
    { action: "booking_confirmed", area: "Koreatown", time: "3m" },
    { action: "pickup_completed", area: "Echo Park", time: "12m" },
  ]);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    // Rotate through recent activity
    const activityTimer = setInterval(() => {
      setActivityIndex(prev => (prev + 1) % recentActivity.length);
    }, 4000);

    // Simulate live changes
    const statsTimer = setInterval(() => {
      setProsOnline(prev => Math.max(5, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
      setQuotesToday(prev => prev + Math.floor(Math.random() * 3));
      setAvgResponseTime(prev => Math.max(3, Math.min(12, prev + (Math.random() > 0.6 ? 1 : -1))));
    }, 10000);

    return () => {
      clearInterval(activityTimer);
      clearInterval(statsTimer);
    };
  }, []);

  const currentActivity = recentActivity[activityIndex];
  const activityMessages = {
    quote_requested: `New quote requested in ${currentActivity.area}`,
    booking_confirmed: `Pickup confirmed in ${currentActivity.area}`,
    pickup_completed: `Mattress removed from ${currentActivity.area}`,
  };

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      {/* Breadcrumb */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <a href={createPageUrl("Home")} className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span>Cities</span>
          <ChevronRight className="w-3 h-3" />
          <span>{state}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-semibold">{city}</span>
        </nav>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Content */}
        <div>
          {/* Live Activity Ticker */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white/90 text-xs font-medium transition-all duration-500">
                {activityMessages[currentActivity.action]}
              </span>
              <span className="text-white/50 text-xs">{currentActivity.time} ago</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-3 py-1 mb-5">
            <MapPin className="w-3 h-3 text-accent" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              {city}, {stateAbbr} · Updated {lastUpdated}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight mb-3">
            Mattress Disposal<br />in <span className="text-accent">{city}, {state}</span>
          </h1>

          <h2 className="text-gray-300 text-lg font-light mb-5 leading-relaxed">
            The 2026 Guide to Drop-off Centers, Curbside Rules, and Private Haulers.
          </h2>

          <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-red-300 text-sm font-semibold leading-snug">{heroHookStatement}</p>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-accent text-xl font-black">{prosOnline}</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">Pros Online</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-white text-xl font-black">{quotesToday}</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">Quotes Today</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
              <div className="text-green-400 text-xl font-black">{avgResponseTime}m</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">Avg Response</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-accent hover:bg-accent/90 active:scale-95 text-accent-foreground font-extrabold px-8 py-4 rounded-xl text-base tracking-wide transition-all shadow-xl shadow-accent/30 hover:shadow-accent/50 flex items-center gap-2 justify-center group">
              <Zap className="w-4 h-4 group-hover:animate-pulse" />
              Skip the Hassle — See Instant Pro Pricing
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {zipCodes.map(z => (
              <span key={z} className="bg-gray-800 text-gray-400 text-xs font-mono px-2.5 py-1 rounded-md border border-gray-700 hover:border-accent/50 hover:text-accent transition-colors cursor-pointer">
                {z}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Map Placeholder */}
        <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80"
            alt={`${city} map`}
            className="w-full h-full object-cover opacity-50 blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-gray-900/60 to-transparent" />

          {/* Radar Blip */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-accent rounded-full z-10 relative shadow-lg" />
              <div className="absolute inset-0 -m-4 w-12 h-12 rounded-full border-2 border-accent/60 animate-ping" />
              <div className="absolute inset-0 -m-8 w-20 h-20 rounded-full border border-accent/30 animate-pulse" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-accent/90 text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> {city}, {stateAbbr}
            </span>
            <div className="flex items-center gap-1.5 bg-gray-900/80 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/30">
              <ShieldCheck className="w-3 h-3" /> Live Coverage Area
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
