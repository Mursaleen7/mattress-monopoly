import React from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function MunicipalityHero({ data }) {
  const { name, parentCity, stateAbbr, state, hookStatement, fineAmount, lastUpdated, zipCodes, waitDays, basePriceDisplay } = data;

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 font-medium flex-wrap">
          <a href={createPageUrl("Home")} className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href={createPageUrl("City")} className="hover:text-white transition-colors">{parentCity}</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-semibold">{name}</span>
        </nav>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-3 py-1 mb-5">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">{name}, {stateAbbr} · Updated {lastUpdated}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight mb-3">
            Mattress Removal<br />in <span className="text-blue-400">{name}</span>
          </h1>

          <h2 className="text-gray-300 text-lg font-light mb-5 leading-relaxed">
            Skip the {waitDays}-day city wait. Local haulers available today.
          </h2>

          <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300 text-sm font-semibold leading-snug">{hookStatement}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-red-400">{waitDays} days</div>
              <div className="text-gray-400 text-xs mt-1 font-medium">City pickup wait</div>
              <div className="text-gray-500 text-[10px] mt-0.5">Scheduling required 3 weeks out</div>
            </div>
            <div className="bg-blue-600/20 border border-blue-400/40 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-blue-400">Today</div>
              <div className="text-gray-300 text-xs mt-1 font-medium">Pro hauler availability</div>
              <div className="text-blue-400/70 text-[10px] mt-0.5">{basePriceDisplay} · free quote</div>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-xl text-base tracking-wide transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 justify-center w-full sm:w-auto">
            <Zap className="w-4 h-4" />
            See Who's Available in {name} Now
          </button>

          <div className="mt-5 flex flex-wrap gap-2">
            {zipCodes.map(z => (
              <span key={z} className="bg-gray-800 text-gray-400 text-xs font-mono px-2.5 py-1 rounded-md border border-gray-700">{z}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Verified {name} Pros</div>
                <div className="text-gray-400 text-xs">Background-checked, licensed & insured</div>
              </div>
            </div>
            {[
              { label: "Avg. arrival time", value: "2.4 hrs", color: "text-green-400" },
              { label: "Jobs completed nearby", value: "140+", color: "text-blue-400" },
              { label: "5-star reviews", value: "94%", color: "text-yellow-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-800 last:border-0">
                <span className="text-gray-400 text-sm">{label}</span>
                <span className={`font-extrabold text-sm ${color}`}>{value}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-amber-300 font-bold text-sm">City route: up to {waitDays}-day delay</div>
              <div className="text-amber-400/70 text-xs mt-0.5">Bag, haul to site, wait in line — or book a pro in 2 minutes.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}