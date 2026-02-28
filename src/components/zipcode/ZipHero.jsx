import React, { useState, useEffect } from "react";
import { MapPin, Zap, ShieldCheck, Clock, Users, AlertTriangle } from "lucide-react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

export default function ZipHero({ data }) {
  const { zip, neighborhood, city, stateAbbr, activePros, nextAvailable, urgencyNote, hookStatement, basePriceDisplay, avgWaitCityDays } = data;
  const [countdown, setCountdown] = useState(847);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 847), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium flex-wrap">
          <Link to={createPageUrl("Home")} className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-600">›</span>
          <Link to={createPageUrl("City")} className="hover:text-white transition-colors">{city}</Link>
          <span className="text-gray-600">›</span>
          <span className="text-white font-semibold">{zip}</span>
        </nav>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-full px-3 py-1 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-bold tracking-widest uppercase">{activePros} Pros Active in {zip} Right Now</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight mb-3">
            Mattress Pickup<br />
            <span className="text-accent">{neighborhood}</span>
            <span className="text-gray-500 text-3xl"> · {zip}</span>
          </h1>

          <p className="text-gray-300 text-lg font-light mb-5 leading-relaxed">
            Same-day removal available. No truck, no wait, no city scheduling hassle.
          </p>

          <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300 text-sm font-semibold leading-snug">{hookStatement}</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5 mb-6 w-fit">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-semibold">{urgencyNote}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-accent hover:bg-accent/90 active:scale-95 text-primary font-extrabold px-8 py-4 rounded-xl text-base tracking-wide transition-all shadow-xl flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Get My Free Quote — {basePriceDisplay}
            </button>
            <button className="border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white font-semibold px-6 py-4 rounded-xl text-sm transition-all">
              Browse {activePros} Available Pros
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-5 text-center">
            <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Next Same-Day Slot Fills In</div>
            <div className="text-5xl font-black text-white tabular-nums">{mins}:{secs.toString().padStart(2, "0")}</div>
            <div className="text-gray-400 text-xs mt-1.5">Book now to lock in today's availability</div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-700">
              <div className="p-4 text-center opacity-70">
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">City Route</div>
                <div className="text-2xl font-black text-red-400">{avgWaitCityDays}d</div>
                <div className="text-gray-500 text-[10px] mt-1">Avg. wait to pickup</div>
                <div className="mt-2 text-[10px] text-gray-600 leading-relaxed">Bag required · Schedule 2+ weeks out · Limited slots</div>
              </div>
              <div className="p-4 text-center bg-accent/10">
                <div className="text-xs text-accent font-bold uppercase tracking-wider mb-1.5">Pro Hauler</div>
                <div className="text-2xl font-black text-accent">{nextAvailable}</div>
                <div className="text-gray-400 text-[10px] mt-1">Availability</div>
                <div className="mt-2 text-[10px] text-accent/70 leading-relaxed">{basePriceDisplay} · Door-to-door · Eco-certified</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div className="text-xs text-gray-400 leading-relaxed">All haulers in {zip} are background-checked, licensed & carry full liability insurance.</div>
          </div>
        </div>
      </div>
    </section>
  );
}