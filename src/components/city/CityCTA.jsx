import React from "react";
import { Zap, ShieldCheck, Leaf, Clock, ArrowRight, Star, Users } from "lucide-react";

export default function CityCTA({ data }) {
  const { city, basePriceDisplay } = data;

  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      {/* Organic background shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social proof row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-foreground/60" />
                </div>
              ))}
            </div>
            <span className="text-primary-foreground/80 text-sm font-medium ml-2">2,300+ jobs completed</span>
          </div>
          
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
            <span className="text-primary-foreground/80 text-sm font-medium ml-1">4.8/5 average rating</span>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tight leading-[1.05] mb-6 text-balance">
          Ready to Clear Out<br />
          <span className="text-accent">Your Space?</span>
        </h2>

        <p className="text-primary-foreground/70 text-lg lg:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Connect with verified local haulers in {city}. Get instant quotes, compare prices, and book eco-friendly removal — starting at just {basePriceDisplay}.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-primary-foreground/60 mb-10">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary-foreground/80" /> Background-checked pros
          </span>
          <span className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" /> Eco-certified disposal
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-foreground/80" /> Same-day available
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="relative bg-accent hover:bg-accent/90 active:scale-[0.98] text-accent-foreground font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-2xl hover:shadow-accent/30 flex items-center gap-3">
            <Zap className="w-6 h-6" />
            Get Instant Quotes
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-2 border-primary-foreground/20 text-primary-foreground font-semibold text-lg px-8 py-5 rounded-2xl transition-all">
            Compare Haulers
          </button>
        </div>

        <p className="text-primary-foreground/50 text-sm mt-6">
          No credit card required. Free cancellation up to 24 hours before pickup.
        </p>
      </div>
    </section>
  );
}
