import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CityFAQ({ data }) {
  const { city, faqs, neighborhoods } = data;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm mb-6">Local rules, costs, and policies — answered.</p>

            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <div 
                  key={i} 
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    open === i ? "border-blue-300 shadow-sm" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`font-bold text-sm ${
                      open === i ? "text-blue-700" : "text-gray-800"
                    }`}>
                      {q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5">
                      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
              Neighborhoods Served in {city}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Our pro network covers all of these areas — and more.
            </p>

            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((n, i) => (
                <span 
                  key={i} 
                  className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  📍 {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
