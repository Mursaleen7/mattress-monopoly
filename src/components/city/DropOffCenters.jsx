import React from "react";
import { MapPin, Clock, CheckCircle2, Navigation, Calculator, AlertTriangle, Truck, ArrowRight, DollarSign } from "lucide-react";

function DIYCostCalculator({ locations, basePriceDisplay }) {
  const tippingFee = locations[0]?.tippingFee || "$28.50";
  const tippingNum = parseFloat(tippingFee.replace("$", "")) || 28.5;
  const truckRental = 40;
  const gasTime = 35;
  const total = tippingNum + truckRental + gasTime;
  const baseNum = parseFloat(basePriceDisplay.replace(/[^0-9]/g, "")) || 89;
  const savings = total - baseNum;

  return (
    <div className="bg-card border-2 border-border rounded-3xl overflow-hidden sticky top-6">
      <div className="bg-primary px-6 py-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-primary-foreground font-black text-base">True Cost Calculator</h3>
          <p className="text-primary-foreground/70 text-xs">DIY vs Professional</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-3">
          {[
            { label: "Dump Tip Fee", value: tippingFee, note: "facility charge" },
            { label: "Truck Rental", value: "$40.00", note: "4-hr minimum" },
            { label: "Your Time + Gas", value: "$35.00", note: "~3 hours" },
          ].map(({ label, value, note }, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{note}</p>
              </div>
              <span className="text-sm font-bold text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-red-900 text-sm">Total DIY Cost</span>
            <span className="font-black text-red-700 text-2xl">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-semibold">vs</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-green-900 text-sm">Professional Pickup</span>
            <span className="font-black text-green-700 text-2xl">{basePriceDisplay}</span>
          </div>
          <p className="text-green-700 text-xs">Zero lifting. Done in 30 minutes.</p>
        </div>

        {savings > 0 && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 text-center">
            <p className="text-sm font-bold text-accent">You save ${savings.toFixed(0)} + your weekend</p>
          </div>
        )}

        <button className="w-full bg-accent hover:bg-accent/90 active:scale-[0.98] text-accent-foreground font-bold py-4 rounded-2xl text-base transition-all shadow-lg flex items-center justify-center gap-2">
          Book a Pro Instead <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function DropOffCenters({ data }) {
  const { city, locations, basePriceDisplay } = data;

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="mb-8">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-2">Drop-off Locations</span>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-4">
            Where to Dump in {city}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Official drop-off centers with verified 2026 hours and fees. All locations require proof of residency.
          </p>
        </div>

        {/* Truck requirement banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-5 py-4 flex items-start gap-4 mb-8">
          <div className="w-11 h-11 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Truck Required: Min 6ft bed</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Mattresses folded in SUVs risk structural damage. Most facilities reject items transported in sedans or compact vehicles.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-5">
            {locations.map((loc, i) => (
              <div key={i} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex flex-col sm:flex-row">
                  {/* Rank badge & map preview */}
                  <div className="relative sm:w-40 h-36 sm:h-auto flex-shrink-0 overflow-hidden bg-secondary">
                    <img
                      src={`https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=70`}
                      alt="Facility map"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-card text-foreground text-sm font-black px-3 py-1 rounded-lg shadow">
                      #{i + 1}
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-base leading-tight mb-1">{loc.name}</h3>
                        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {loc.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-foreground">{loc.tippingFee}</p>
                        <p className="text-xs text-muted-foreground">per item</p>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary/60" />
                        <span className="leading-tight">{loc.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary/60" />
                        <span className="leading-tight">{loc.hours}</span>
                      </div>
                    </div>

                    {/* Accepted items */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {loc.accepted.map(item => (
                        <span key={item} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> {item}
                        </span>
                      ))}
                    </div>

                    {/* Residency note */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-800 font-medium mb-4">
                      Residency: {loc.residencyReq}
                    </div>

                    {/* Action */}
                    <a 
                      href={loc.mapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      <Navigation className="w-4 h-4" /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calculator Sidebar */}
          <div>
            <DIYCostCalculator locations={locations} basePriceDisplay={basePriceDisplay} />
          </div>
        </div>
      </div>
    </section>
  );
}
