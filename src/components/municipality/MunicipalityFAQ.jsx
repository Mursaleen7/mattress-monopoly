import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

export default function MunicipalityFAQ({ data }) {
  const { name, faqs, neighborhoods } = data;
  const [open, setOpen] = useState(0);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight">
              Common Questions in {name}
            </h2>
            <p className="text-gray-500 text-sm mb-6">Answered by our local disposal experts.</p>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`border rounded-xl overflow-hidden transition-all ${open === i ? "border-blue-200 shadow-sm" : "border-gray-200"}`}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className={`text-sm font-bold leading-snug ${open === i ? "text-blue-700" : "text-gray-800"}`}>{faq.q}</span>
                    {open === i
                      ? <ChevronUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />}
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-1 tracking-tight">
              Neighborhoods Served
            </h2>
            <p className="text-gray-500 text-sm mb-6">Our pros cover every street in {name}.</p>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map(n => (
                <div key={n} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors rounded-lg px-3 py-2 cursor-pointer group">
                  <MapPin className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-gray-700 group-hover:text-blue-700 text-xs font-semibold">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}