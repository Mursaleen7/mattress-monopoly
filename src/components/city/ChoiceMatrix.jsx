import React from "react";
import { X, Check, Truck, AlertTriangle, Clock, Leaf, Zap, HeartHandshake } from "lucide-react";

export default function ChoiceMatrix({ data }) {
  const { city, cityCostInfo, baggingRules, hoursDays, theCatch, basePriceDisplay } = data;

  const diyPros = [
    `Cost: ${cityCostInfo}`
  ];

  const diyCons = [
    "Truck or large vehicle required",
    "Heavy lifting (75–100 lbs)",
    `Strict rule: ${baggingRules}`,
    `Only available: ${hoursDays}`,
    `The Catch: ${theCatch}`,
  ];

  const networkPros = [
    "In-home removal from any room",
    "Zero heavy lifting — crews handle it all",
    "Certified eco-recycling & landfill diversion",
    "Same-day and next-day availability",
    "Instant online pricing — no haggling",
  ];

  const networkCon = `Cost: ${basePriceDisplay}`;

  return (
    <section className="py-14 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center mb-2">
          Compare Your Options in {city}
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">Professional haulers vs. DIY — see the difference</p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Option A: DIY */}
          <div className="bg-background border-2 border-border rounded-2xl overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">DIY Option</span>
                <h3 className="font-extrabold text-gray-900 text-lg">City Drop-Off / Self-Haul</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <Truck className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            <div className="p-6 space-y-4">
              {diyPros.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">{p}</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-4 space-y-2.5">
                {diyCons.map((c, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-2.5 ${
                      i === diyCons.length - 1 
                        ? "bg-red-50 -mx-2 px-2 py-2 rounded-xl border border-red-100" 
                        : ""
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-600" />
                    </div>
                    <span className={`text-sm ${
                      i === diyCons.length - 1 
                        ? "text-red-700 font-bold" 
                        : "text-gray-600"
                    }`}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-2 text-xs text-gray-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                High friction — most people abandon this route
              </div>
            </div>
          </div>

          {/* Option B: Network */}
          <div className="bg-background border-2 border-accent rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-accent border-b border-accent px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary/70 uppercase tracking-widest">Professional Haulers</span>
                <h3 className="font-extrabold text-primary text-lg">Licensed Network Pros</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/80 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="p-6 space-y-2.5">
              {networkPros.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 font-semibold">{p}</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-xs font-bold">$</span>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">{networkCon}</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    const haulerSection = document.querySelector('section.bg-gray-50.py-12');
                    if (haulerSection) {
                      haulerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full bg-accent hover:bg-accent/90 active:scale-95 text-primary font-extrabold py-3.5 rounded-xl text-sm tracking-wide transition-all shadow-lg"
                >
                  See Available Haulers Below ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
