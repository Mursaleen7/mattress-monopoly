import React from "react";
import { Cloud, Calendar, TrendingDown, ArrowRight } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city } = data;

  return (
    <div className="bg-card border-y border-border">
      {/* Scrolling ticker tape effect */}
      <div className="overflow-hidden py-3 bg-primary/5">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                47 haulers online now
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                12 jobs booked today in {city}
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Avg response: 8 minutes
              </span>
              <span className="text-muted-foreground">|</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Weather Alert */}
          <div className="group relative overflow-hidden bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 hover:border-amber-300 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-amber-200 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-amber-700" />
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
                  Weather Alert
                </span>
              </div>
              <h3 className="font-bold text-amber-900 text-base mb-1">{weatherProfile}</h3>
              <p className="text-amber-700 text-sm leading-relaxed">Wet mattresses rejected by city crews</p>
            </div>
          </div>

          {/* Pickup Countdown */}
          <div className="group relative overflow-hidden bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 hover:border-orange-300 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-orange-200 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-700" />
                </div>
                <div className="flex items-center gap-1 bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                  <span className="text-lg font-black">{nextPickupDays}</span>
                  <span className="text-[10px] font-bold uppercase">days</span>
                </div>
              </div>
              <h3 className="font-bold text-orange-900 text-base mb-1">Next City Pickup</h3>
              <p className="text-orange-700 text-sm leading-relaxed">Schedules fill up fast. Book a pro instead</p>
            </div>
          </div>

          {/* Market Rate */}
          <div className="group relative overflow-hidden bg-secondary border-2 border-border rounded-2xl p-5 hover:border-primary/30 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live Rates
                </span>
              </div>
              <h3 className="font-bold text-foreground text-base mb-1">{competitorComparisonPrice}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex items-center gap-1">
                Current quotes in {city}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
