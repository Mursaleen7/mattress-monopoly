import React, { useState, useEffect } from "react";
import { Cloud, Calendar, TrendingDown, TrendingUp, Activity, Users, Clock, Zap, Tag, MapPin } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city } = data;
  
  const [viewerCount, setViewerCount] = useState(12);
  const [lastBookingTime, setLastBookingTime] = useState(4);
  const [priceDirection, setPriceDirection] = useState("stable");
  const [recentAreas, setRecentAreas] = useState(["Silver Lake", "Echo Park", "Koreatown"]);
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => Math.max(5, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);

    const bookingInterval = setInterval(() => {
      setLastBookingTime(prev => {
        if (prev >= 15) return Math.floor(Math.random() * 3) + 1;
        return prev + 1;
      });
    }, 60000);

    const areaInterval = setInterval(() => {
      setCurrentAreaIndex(prev => (prev + 1) % recentAreas.length);
    }, 4000);

    const priceInterval = setInterval(() => {
      setPriceDirection(Math.random() > 0.6 ? "up" : "stable");
    }, 30000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(bookingInterval);
      clearInterval(areaInterval);
      clearInterval(priceInterval);
    };
  }, []);

  return (
    <div className="bg-card border-y border-border">
      {/* Live activity marquee */}
      <div className="bg-gradient-to-r from-accent/5 via-transparent to-accent/5 border-b border-border/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-foreground">
                  <span className="text-green-600">{viewerCount}</span> people browsing
                </span>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Recent activity in <span className="font-semibold text-foreground">{recentAreas[currentAreaIndex]}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Last booking: <span className="font-semibold text-foreground">{lastBookingTime}m ago</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main ribbon content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Weather Risk */}
          <div className="group bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 market-hover cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Cloud className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Weather Alert</span>
                </div>
                <p className="font-bold text-amber-900 text-sm mb-1 leading-tight">{weatherProfile}</p>
                <p className="text-xs text-amber-700">Wet items rejected at curb</p>
              </div>
            </div>
          </div>

          {/* Municipal Queue */}
          <div className="group bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-5 market-hover cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">City Queue</span>
                  <span className="px-1.5 py-0.5 bg-orange-200 text-orange-800 text-[10px] font-bold rounded-full">
                    {nextPickupDays} days
                  </span>
                </div>
                <p className="font-bold text-orange-900 text-sm mb-1 leading-tight">Next City Pickup</p>
                <p className="text-xs text-orange-700">47 residents in queue</p>
              </div>
            </div>
          </div>

          {/* Price Insight */}
          <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 market-hover cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Tag className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Market Prices</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="font-bold text-emerald-900 text-sm mb-1 leading-tight">{competitorComparisonPrice}</p>
                <div className="flex items-center gap-1 text-xs text-emerald-700">
                  {priceDirection === "up" ? (
                    <>
                      <TrendingUp className="w-3 h-3" />
                      <span>Weekend pricing soon</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3" />
                      <span>Good time to book</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="group bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl p-5 market-hover cursor-pointer hover:border-accent/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">Same Day</span>
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                    Available
                  </span>
                </div>
                <p className="font-bold text-foreground text-sm mb-1 leading-tight">Skip the wait</p>
                <p className="text-xs text-muted-foreground">Book in 2 minutes →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
