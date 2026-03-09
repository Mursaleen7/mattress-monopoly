import React from "react";
import { Check, Zap } from "lucide-react";

function ChoiceMatrix({ data }) {
  const { city, basePriceDisplay } = data;

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
          Professional Junk Removal in {city}
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">Licensed network pros ready to help</p>

        <div className="max-w-2xl mx-auto">
          {/* Professional Network Option */}
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
