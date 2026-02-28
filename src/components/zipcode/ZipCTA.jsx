import React from "react";
import { Zap, ShieldCheck, Clock, Users } from "lucide-react";

export default function ZipCTA({ data }) {
  const { zip, neighborhood, activePros, basePriceDisplay, urgencyNote } = data;

  return (
    <section className="py-14 bg-primary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-400/30 rounded-full px-4 py-1.5 mb-5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-300 text-xs font-bold tracking-widest uppercase">{activePros} Active Pros in {zip}</span>
        </div>

        <h2 className="text-4xl font-black tracking-tight mb-3">
          Your Mattress Gone.<br />
          <span className="text-accent">Today. Done.</span>
        </h2>

        <p className="text-gray-400 text-base mb-4 leading-relaxed">
          {neighborhood} pros are standing by. No truck rental, no city forms, no 14-day wait. Just show up, they take it.
        </p>

        <div className="flex items-center justify-center gap-2 bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-2.5 mb-8 w-fit mx-auto">
          <Users className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300 text-sm font-semibold">{urgencyNote}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-accent hover:bg-accent/90 active:scale-95 text-primary font-extrabold px-10 py-4 rounded-xl text-lg transition-all shadow-xl flex items-center gap-2 justify-center">
            <Zap className="w-5 h-5" />
            Book My Same-Day Pickup — {basePriceDisplay}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-400">
          {[
            { icon: ShieldCheck, label: "All pros insured" },
            { icon: Clock, label: "2-hour arrival windows" },
            { icon: Zap, label: "Same-day guaranteed" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-4 h-4 text-gray-500" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs mt-6">Free quote · No obligation · Instant confirmation</p>
      </div>
    </section>
  );
}