import React from "react";
import { AlertTriangle, Phone, ExternalLink, Clock, FileText, ShieldOff } from "lucide-react";

export default function MunicipalityRules({ data }) {
  const { name, availabilityStatus, baggingRules, hoursDays, theCatch, fineAmount, officialDept, officialPhone, websiteUrl, waitDays } = data;

  return (
    <section className="py-10 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                {name} Municipal Pickup Rules
              </h2>
            </div>

            <div className={`rounded-xl border px-4 py-3 mb-5 flex items-start gap-3 ${availabilityStatus === "conditional" ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"}`}>
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${availabilityStatus === "conditional" ? "text-yellow-500" : "text-red-500"}`} />
              <div>
                <div className={`font-bold text-sm ${availabilityStatus === "conditional" ? "text-yellow-800" : "text-red-800"}`}>
                  {availabilityStatus === "conditional" ? "Conditional Free Pickup" : "No Free Curbside Pickup"}
                </div>
                <div className={`text-xs mt-1 ${availabilityStatus === "conditional" ? "text-yellow-700" : "text-red-700"}`}>
                  {availabilityStatus === "conditional"
                    ? `City pickup is available but requires ${waitDays}+ days advance booking and strict compliance.`
                    : "This municipality does not offer free curbside bulky item removal. Use a private hauler or pay drop-off fees."}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Clock, label: "Pickup Windows", value: hoursDays, color: "blue" },
                { icon: FileText, label: "Bagging Requirement", value: baggingRules, color: "orange" },
                { icon: AlertTriangle, label: "Key Restriction", value: theCatch, color: "red" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                  <p className="text-gray-800 text-sm font-semibold leading-snug">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-4">
              <ShieldOff className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-bold text-red-800 text-sm">Fines for non-compliance: up to {fineAmount}</div>
                <p className="text-red-700 text-xs mt-1 leading-relaxed">
                  Leaving an unwrapped or improperly placed mattress can result in a citation. Illegal dumping carries even steeper penalties and code enforcement cameras are active throughout {name}.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Official Contact</div>
              <div className="font-bold text-gray-900 text-sm mb-3">{officialDept}</div>
              <a href={`tel:${officialPhone}`} className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-2 hover:underline">
                <Phone className="w-3.5 h-3.5" /> {officialPhone}
              </a>
              <a href={websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 text-xs hover:text-blue-600 transition-colors">
                <ExternalLink className="w-3 h-3" /> Official Website
              </a>
            </div>

            <div className="bg-blue-600 rounded-2xl p-5 text-white text-center shadow-lg">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Skip the Wait</div>
              <div className="text-2xl font-black mb-1">Same-Day Available</div>
              <p className="text-blue-200 text-xs mb-4 leading-relaxed">No bags, no scheduling, no forms. A pro handles everything.</p>
              <button className="w-full bg-white text-blue-700 font-extrabold py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors">
                Get Instant Quote →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}