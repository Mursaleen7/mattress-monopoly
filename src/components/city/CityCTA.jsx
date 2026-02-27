import React from "react";
import { Zap, ShieldCheck, Leaf, Clock } from "lucide-react";

export default function CityCTA({ data }) {
  const { city, basePriceDisplay } = data;

  return (
    <section className="bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">Local Pros Available Now</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-4">
          Skip the Hassle<br />in <span className="text-blue-400">{city}.</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-3 leading-relaxed">
          Book a verified local hauler in minutes. No truck rental. No plastic wrap. No 14-day wait. Just instant, in-home removal — starting {basePriceDisplay}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400 mb-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> Background-checked pros
          </span>
          <span className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-green-400" /> Eco-compliant disposal
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-yellow-400" /> Same-day available
          </span>
        </div>

        <button className="relative bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-lg px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-blue-700/40 hover:shadow-blue-500/50">
          <span className="relative z-10 flex items-center gap-3">
            <Zap className="w-5 h-5" />
            Check Availability in {city}
          </span>
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-2xl animate-ping bg-blue-600 opacity-20 pointer-events-none" />
        </button>

        <p className="text-gray-500 text-xs mt-5">
          No credit card required to check pricing. Free cancellation up to 24hrs.
        </p>
      </div>
    </section>
  );
}
