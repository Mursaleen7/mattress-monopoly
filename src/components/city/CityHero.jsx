import React from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck } from "lucide-react";
import { createPageUrl } from "@/utils";
import { getHeroImageForCity } from "@/data/cities";
import CitySearchBar from "./CitySearchBar";

export default function CityHero({ data }) {
  const { city, state, stateAbbr, heroHookStatement, fineAmount, lastUpdated, zipCodes, citySlug } = data;
  
  // Get the appropriate hero image based on metro area
  const heroImage = getHeroImageForCity(citySlug || city.toLowerCase()) || "/GreaterBostonArea_hero.png";

  return (
    <section className="relative overflow-hidden min-h-[680px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={`${city} mattress removal service`}
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay for text readability - lighter and more professional */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/70 font-medium">
          <a href={createPageUrl("Home")} className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span>Cities</span>
          <ChevronRight className="w-3 h-3" />
          <span>{state}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-semibold">{city}</span>
        </nav>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {city}, {stateAbbr}
            </span>
            <span className="text-white/60 text-sm">•</span>
            <span className="text-white/80 text-sm">Updated {lastUpdated}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-white">
            Mattress Disposal<br />in {city}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/90 font-light mb-8 leading-relaxed">
            The 2026 Guide to Drop-off Centers, Curbside Rules, and Private Haulers.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <CitySearchBar currentCity={citySlug || city.toLowerCase()} />
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent hover:bg-accent/90 active:scale-[0.98] text-accent-foreground font-bold px-10 py-5 rounded-xl text-lg tracking-wide transition-all shadow-2xl hover:shadow-accent/50 flex items-center gap-3 justify-center group">
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              See Instant Pro Pricing
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-10 py-5 rounded-xl text-lg transition-all flex items-center gap-3 justify-center">
              <ShieldCheck className="w-5 h-5" />
              View City Rules
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
