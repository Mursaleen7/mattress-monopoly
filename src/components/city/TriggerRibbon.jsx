import React, { useState, useEffect } from "react";
import { Cloud, Calendar, TrendingDown, Activity, Users, Clock } from "lucide-react";

export default function TriggerRibbon({ data }) {
  const { weatherProfile, nextPickupDays, competitorComparisonPrice, city } = data;
  
  // Live-updating state
  const [viewerCount, setViewerCount] = useState(12);
  const [lastBookingTime, setLastBookingTime] = useState(4);
  const [priceDirection, setPriceDirection] = useState("up");
  const [countdown, setCountdown] = useState({ hours: 14, mins: 32, secs: 18 });

  // Simulate real-time updates
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

    const priceInterval = setInterval(() => {
      setPriceDirection(Math.random() > 0.6 ? "up" : "stable");
    }, 30000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        let { hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; mins = 59; secs = 59; }
        return { hours, mins, secs };
      });
    }, 1000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(bookingInterval);
      clearInterval(priceInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Activity Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-600">
                <span className="text-green-600 font-bold">{viewerCount}</span> people viewing {city} right now
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>Last booking: <span className="font-semibold text-gray-700">{lastBookingTime}m ago</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold text-primary">
              {String(countdown.hours).padStart(2, '0')}:{String(countdown.mins).padStart(2, '0')}:{String(countdown.secs).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500">until weekend surge pricing</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Weather Card */}
          <div className="flex gap-4 p-4 rounded-2xl border bg-yellow-50 border-yellow-200 group hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-background border border-yellow-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Cloud className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Weather Risk</span>
                <span className="text-xs font-extrabold px-1.5 py-0.5 rounded-md bg-yellow-100 text-yellow-800 animate-pulse">
                  HIGH RISK
                </span>
              </div>
              <p className="font-extrabold text-sm text-yellow-900 mb-0.5">{weatherProfile}</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Wet mattresses are rejected by city crews.
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-yellow-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                Rain forecast this week
              </div>
            </div>
          </div>

          {/* Pickup Countdown Card */}
          <div className="flex gap-4 p-4 rounded-2xl border bg-orange-50 border-orange-200 group hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-background border border-orange-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Municipal Pickup</span>
                <span className="text-xs font-extrabold px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-800">
                  {nextPickupDays} DAYS
                </span>
              </div>
              <p className="font-extrabold text-sm text-orange-900 mb-0.5">Next Available Slot</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Schedules fill fast. Online booking required.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-orange-200 border-2 border-orange-50 flex items-center justify-center">
                      <Users className="w-2.5 h-2.5 text-orange-600" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-orange-700 font-medium">47 waiting in queue</span>
              </div>
            </div>
          </div>

          {/* Market Rate Card */}
          <div className="flex gap-4 p-4 rounded-2xl border bg-secondary border-border group hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 shadow-sm relative">
              <TrendingDown className={`w-5 h-5 text-primary transition-transform ${priceDirection === 'up' ? 'rotate-180 text-red-500' : ''}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Live Rates</span>
                <span className="flex items-center gap-1 text-xs font-extrabold px-1.5 py-0.5 rounded-md bg-secondary text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  LIVE
                </span>
              </div>
              <p className="font-extrabold text-sm text-primary mb-0.5">{competitorComparisonPrice}</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Current pro quotes in {city}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-600 font-medium">
                {priceDirection === 'up' ? (
                  <>
                    <span className="text-red-500">↑ Trending up</span>
                    <span className="text-gray-400">· Weekend approaching</span>
                  </>
                ) : (
                  <>
                    <span className="text-green-600">→ Stable</span>
                    <span className="text-gray-400">· Good time to book</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
