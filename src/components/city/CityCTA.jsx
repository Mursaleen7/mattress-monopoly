import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, Leaf, Clock, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles, Store, Star } from "lucide-react";

export default function CityCTA({ data }) {
  const { city, basePriceDisplay } = data;
  
  const [prosAvailable, setProsAvailable] = useState(8);
  const [recentBookings, setRecentBookings] = useState([
    { name: "Michael S.", area: "Echo Park", time: "2 min ago", rating: 5 },
    { name: "Lisa K.", area: "Silver Lake", time: "5 min ago", rating: 5 },
    { name: "David R.", area: "Koreatown", time: "12 min ago", rating: 4 },
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

  const currentBooking = recentBookings[currentBookingIndex];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Market pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live booking notification */}
        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-white/90 text-sm">
              <span className="font-bold">{currentBooking.name}</span> just booked in{' '}
              <span className="text-accent font-semibold">{currentBooking.area}</span>
            </span>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= currentBooking.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} />
              ))}
            </div>
          </div>
          <span className="text-white/50 text-xs">{currentBooking.time}</span>
        </div>

        {/* Main heading */}
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-5 py-2 mb-6">
          <Store className="w-4 h-4 text-accent" />
          <span className="text-accent text-sm font-bold tracking-wide uppercase">
            {prosAvailable} Vendors Available Now
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Your {city} Mattress
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-accent">Marketplace</span>
            <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-accent/80" />
          </span>
        </h2>

        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Connect with trusted local pros in minutes. No truck rental. No heavy lifting. 
          Just instant, in-home removal — starting at <span className="text-accent font-bold">{basePriceDisplay}</span>.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white">{prosAvailable}</div>
              <div className="text-white/50 text-xs uppercase tracking-wide">Online now</div>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white">{slotsToday}</div>
              <div className="text-white/50 text-xs uppercase tracking-wide">Slots left today</div>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white">~7 min</div>
              <div className="text-white/50 text-xs uppercase tracking-wide">Avg response</div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60 mb-10">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            Background-checked pros
          </span>
          <span className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            Eco-compliant disposal
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Same-day available
          </span>
        </div>

        {/* CTA Button */}
        <div className="relative inline-block">
          <button className="relative z-10 bg-accent hover:bg-accent/90 text-foreground font-black text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 rounded-2xl transition-all shadow-2xl shadow-accent/40 hover:shadow-accent/50 group flex items-center gap-3">
            <Zap className="w-6 h-6" />
            Browse {city} Vendors
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl bg-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>

        <p className="text-white/40 text-sm mt-6 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          No credit card required · Free cancellation up to 24hrs
        </p>
      </div>
    </section>
  );
}
