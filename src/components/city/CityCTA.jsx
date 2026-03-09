import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, Leaf, Clock, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function CityCTA({ data }) {
  const { city, basePriceDisplay } = data;
  
  const [prosAvailable, setProsAvailable] = useState(8);
  const [recentBookings, setRecentBookings] = useState([
    { name: "Michael S.", area: "Echo Park", time: "2 min ago" },
    { name: "Lisa K.", area: "Silver Lake", time: "5 min ago" },
    { name: "David R.", area: "Koreatown", time: "12 min ago" },
  ]);
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
  const [slotsToday, setSlotsToday] = useState(12);

  useEffect(() => {
    const prosInterval = setInterval(() => {
      setProsAvailable(prev => Math.max(5, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 10000);

    const bookingInterval = setInterval(() => {
      setCurrentBookingIndex(prev => (prev + 1) % recentBookings.length);
    }, 4000);

    const slotsInterval = setInterval(() => {
      setSlotsToday(prev => Math.max(3, prev - 1));
    }, 45000);

    return () => {
      clearInterval(prosInterval);
      clearInterval(bookingInterval);
      clearInterval(slotsInterval);
    };
  }, []);

  return (
    <section className="bg-primary py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Live booking notification */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 transition-all duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-white/90 text-sm">
            <span className="font-bold">{recentBookings[currentBookingIndex].name}</span> just booked in{' '}
            <span className="text-accent font-semibold">{recentBookings[currentBookingIndex].area}</span>
          </span>
          <span className="text-white/50 text-xs">{recentBookings[currentBookingIndex].time}</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
          <Zap className="w-3.5 h-3.5 text-accent" />
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            {prosAvailable} Local Pros Available Now
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4">
          Skip the Hassle<br />in <span className="text-accent">{city}.</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-3 leading-relaxed">
          Book a verified local hauler in minutes. No truck rental. No plastic wrap. No 14-day wait. Just instant, in-home removal — starting {basePriceDisplay}.
        </p>

        {/* Live stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">{prosAvailable}</div>
              <div className="text-gray-500 text-xs">pros online</div>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">{slotsToday}</div>
              <div className="text-gray-500 text-xs">slots left today</div>
            </div>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">~7 min</div>
              <div className="text-gray-500 text-xs">avg response</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400 mb-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-accent" /> Background-checked pros
          </span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-green-400" /> Eco-compliant disposal
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent" /> Same-day available
          </span>
        </div>

        <button className="relative bg-accent hover:bg-accent/90 active:scale-95 text-accent-foreground font-extrabold text-lg px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-accent/40 hover:shadow-accent/50 group">
          <span className="relative z-10 flex items-center gap-3">
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
            Check Availability in {city}
          </span>
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-accent opacity-20 pointer-events-none" />
        </button>

        <p className="text-gray-500 text-xs mt-5 flex items-center justify-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          No credit card required · Free cancellation up to 24hrs
        </p>
      </div>
    </section>
  );
}
