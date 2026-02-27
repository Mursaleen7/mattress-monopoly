import React from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function CityHero({ data }) {
  const { city, state, stateAbbr, heroHookStatement, fineAmount, lastUpdated, zipCodes } = data;

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
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
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-3 py-1 mb-5">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">
              {city}, {stateAbbr} · Updated {lastUpdated}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-[1.06] tracking-tight mb-3">
            Mattress Disposal<br />in <span className="text-blue-400">{city}, {state}</span>
          </h1>

          <h2 className="text-gray-300 text-lg font-light mb-5 leading-relaxed">
            The 2026 Guide to Drop-off Centers, Curbside Rules, and Private Haulers.
          </h2>

          <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 mb-7 flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-red-300 text-sm font-semibold leading-snug">{heroHookStatement}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-xl text-base tracking-wide transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Skip the Hassle — See Instant Pro Pricing
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {zipCodes.map(z => (
              <span key={z} className="bg-gray-800 text-gray-400 text-xs font-mono px-2.5 py-1 rounded-md border border-gray-700">
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-gray-900/60 to-transparent" />

          {/* Radar Blip */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-400 rounded-full z-10 relative shadow-lg" />
              <div className="absolute inset-0 -m-4 w-12 h-12 rounded-full border-2 border-blue-400/60 animate-ping" />
              <div className="absolute inset-0 -m-8 w-20 h-20 rounded-full border border-blue-400/30 animate-pulse" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
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
