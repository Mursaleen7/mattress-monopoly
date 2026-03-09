import React, { useState, useEffect } from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck, TrendingUp, Users, Clock, Sparkles, ArrowRight, Store, Star } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function CityHero({ data }) {
  const { city, state, stateAbbr, heroHookStatement, fineAmount, lastUpdated, zipCodes } = data;
  
  const [prosOnline, setProsOnline] = useState(8);
  const [quotesToday, setQuotesToday] = useState(127);
  const [avgResponseTime, setAvgResponseTime] = useState(7);
  const [activeVendor, setActiveVendor] = useState(0);
  
  const vendors = [
    { name: "LoadUp", area: "Silver Lake", rating: 4.9 },
    { name: "1-800-GOT-JUNK?", area: "Echo Park", rating: 4.8 },
    { name: "College HUNKS", area: "Koreatown", rating: 4.7 },
  ];

  useEffect(() => {
    const vendorTimer = setInterval(() => {
      setActiveVendor(prev => (prev + 1) % vendors.length);
    }, 3000);

    const statsTimer = setInterval(() => {
      setProsOnline(prev => Math.max(5, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
      setQuotesToday(prev => prev + Math.floor(Math.random() * 3));
      setAvgResponseTime(prev => Math.max(3, Math.min(12, prev + (Math.random() > 0.6 ? 1 : -1))));
    }, 10000);

    return () => {
      clearInterval(vendorTimer);
      clearInterval(statsTimer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(35_100%_97%)] via-background to-background">
      {/* Decorative market pattern overlay */}
      <div className="absolute inset-0 market-pattern opacity-60" />
      
      {/* Warm decorative shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(35_80%_90%)] rounded-full blur-3xl opacity-50" />

      {/* Breadcrumb */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm">
          <a href={createPageUrl("Home")} className="text-muted-foreground hover:text-foreground transition-colors font-medium">Home</a>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-muted-foreground">Cities</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-muted-foreground">{state}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-foreground font-semibold">{city}</span>
        </nav>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Main Content - 7 cols */}
          <div className="lg:col-span-7">
            {/* Marketplace Badge */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 stall-shadow">
                <Store className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-foreground tracking-tight">
                  {city} Marketplace
                </span>
                <span className="w-px h-4 bg-border" />
                <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-4">
              Your Local<br />
              <span className="relative inline-block">
                <span className="relative z-10">Mattress Removal</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-accent/30 -rotate-1 rounded" />
              </span>
              <br />
              <span className="text-accent">Marketplace</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-xl">
              Connect with trusted local haulers in {city}. Compare prices, read reviews, and book same-day pickups.
            </p>

            {/* Warning Card */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl px-5 py-4 mb-8 inline-flex items-start gap-3 max-w-lg">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-red-800 font-bold text-sm mb-1">City Fine Alert</p>
                <p className="text-red-700 text-sm leading-snug">{heroHookStatement}</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-2xl text-base transition-all stall-shadow hover:shadow-xl flex items-center justify-center gap-3">
                <Zap className="w-5 h-5" />
                <span>Browse Local Haulers</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-card hover:bg-secondary border-2 border-border text-foreground font-semibold px-6 py-4 rounded-2xl text-base transition-all flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>View Drop-off Centers</span>
              </button>
            </div>

            {/* Zip Codes as market tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground font-medium mr-2">Serving:</span>
              {zipCodes.map(z => (
                <span 
                  key={z} 
                  className="vendor-badge text-foreground text-sm font-mono font-semibold px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                >
                  {z}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Activity Card - 5 cols */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live Marketplace Stats */}
            <div className="bg-card border-2 border-border rounded-3xl overflow-hidden stall-shadow">
              <div className="bg-gradient-to-r from-accent/10 to-transparent px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-bold text-foreground">Live Market Activity</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">Real-time</span>
                </div>
              </div>
              
              <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent mb-1">{prosOnline}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Vendors Online</div>
                  </div>
                  <div className="text-center border-x border-border">
                    <div className="text-3xl font-black text-foreground mb-1">{quotesToday}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Quotes Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-600 mb-1">{avgResponseTime}m</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Avg Response</div>
                  </div>
                </div>

                {/* Active Vendor Showcase */}
                <div className="bg-gradient-to-r from-secondary to-transparent rounded-2xl p-4 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Store className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground truncate">{vendors[activeVendor].name}</span>
                        <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vendors[activeVendor].area}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          {vendors[activeVendor].rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
                      Just booked
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 stall-shadow">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Verified Pros</div>
                  <div className="text-xs text-muted-foreground">Background checked</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 stall-shadow">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Eco-Friendly</div>
                  <div className="text-xs text-muted-foreground">70%+ recycled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
