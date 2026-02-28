import React from "react";
import { Zap, ShieldCheck, Leaf, Clock } from "lucide-react";

export default function MunicipalityCTA({ data }) {
  const { name, basePriceDisplay, waitDays } = data;

  return (
    <section className="py-14 bg-primary text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-5">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-xs font-bold tracking-widest uppercase">Same-Day Slots Available in {name}</span>
        </div>

        <h2 className="text-4xl font-black tracking-tight mb-3">
          Skip the {waitDays}-Day City Wait.<br />
          <span className="text-accent">Book a Local Pro Today.</span>
        </h2>

        <p className="text-gray-400 text-base mb-8 leading-relaxed">
          No plastic bags, no advance scheduling, no hauling it yourself. {basePriceDisplay} — a pro takes care of everything door-to-door.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-accent hover:bg-accent/90 active:scale-95 text-accent-foreground font-extrabold px-10 py-4 rounded-xl text-base transition-all shadow-xl shadow-accent/30 flex items-center gap-2 justify-center">
            <Zap className="w-4 h-4" />
            Get My Free Quote — {basePriceDisplay}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-400">
          {[
            { icon: ShieldCheck, label: "Background-checked pros" },
            { icon: Leaf, label: "Eco-certified disposal" },
            { icon: Clock, label: "Same-day availability" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-4 h-4 text-gray-500" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs mt-6">Free to quote · No obligation · Cancel anytime</p>
      </div>
    </section>
  );
}