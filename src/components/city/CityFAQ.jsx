import React, { useState } from "react";
import { ChevronDown, MapPin, HelpCircle, ArrowRight } from "lucide-react";

export default function CityFAQ({ data }) {
  const { city, faqs, neighborhoods } = data;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-12 lg:py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric two-column layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          
          {/* FAQ Column - wider */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">FAQ</span>
                <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">
                  Common Questions
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <div 
                  key={i} 
                  className={`bg-background border-2 rounded-2xl overflow-hidden transition-all ${
                    open === i ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`font-semibold text-base leading-snug ${
                      open === i ? "text-primary" : "text-foreground"
                    }`}>
                      {q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      open === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          open === i ? "rotate-180" : ""
                        }`} 
                      />
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-200 ${
                    open === i ? "max-h-96" : "max-h-0"
                  }`}>
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground leading-relaxed">{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More questions prompt */}
            <div className="mt-6 p-5 bg-secondary rounded-2xl border border-border">
              <p className="text-foreground font-semibold mb-2">Still have questions?</p>
              <p className="text-muted-foreground text-sm mb-4">Our team is here to help you navigate local disposal rules.</p>
              <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                Contact Support <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Neighborhoods Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">Coverage</span>
                <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">
                  Neighborhoods
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Our verified hauler network serves all of {city} and surrounding areas.
            </p>

            {/* Neighborhood cloud */}
            <div className="flex flex-wrap gap-2 mb-6">
              {neighborhoods.slice(0, 12).map((n, i) => (
                <span 
                  key={i} 
                  className="bg-background border border-border text-foreground text-sm font-medium px-4 py-2 rounded-xl hover:border-primary/50 hover:bg-secondary transition-all cursor-pointer"
                >
                  {n}
                </span>
              ))}
            </div>

            {neighborhoods.length > 12 && (
              <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline mb-8">
                View all {neighborhoods.length} neighborhoods <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Service area map placeholder */}
            <div className="relative h-48 rounded-2xl overflow-hidden bg-secondary border border-border">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80"
                alt={`${city} service area`}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <p className="font-black text-3xl mb-1">100%</p>
                  <p className="text-sm font-semibold opacity-90">Coverage in {city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
