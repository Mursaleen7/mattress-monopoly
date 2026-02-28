import React from "react";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Ruler, FileText, Phone, Globe } from "lucide-react";

export default function MunicipalRulebook({ data }) {
  const {
    city, availabilityStatus, mattressSpecificRule, placementTime, sizeLimits,
    fineAmount, officialDept, officialPhone, websiteUrl
  } = data;

  const isAllowed = availabilityStatus === "yes";
  const isConditional = availabilityStatus === "conditional";

  return (
    <section className="py-14 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
          Can I Leave It on the Curb in {city}?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Official municipal rules — sourced from city sanitation.
        </p>

        {/* Status Banner */}
        {isConditional && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl px-6 py-4 flex items-start gap-4 mb-7">
            <CheckCircle2 className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-yellow-900 text-base">
                ⚠️ Conditionally Allowed — Strict Rules Apply
              </p>
              <p className="text-yellow-700 text-sm mt-1">
                Curbside mattress pickup is available in {city} but requires advance scheduling and strict compliance. <strong>Rejected at the curb if:</strong> not wrapped, placed too early, or suspected of bed bugs.
              </p>
            </div>
          </div>
        )}

        {isAllowed && (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl px-6 py-4 flex items-start gap-4 mb-7">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-extrabold text-green-900">
              ✅ Allowed — Schedule required. See rules below.
            </p>
          </div>
        )}

        {!isAllowed && !isConditional && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl px-6 py-4 flex items-start gap-4 mb-7">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-extrabold text-red-900">
              🚫 NOT ALLOWED — {city} prohibits curbside mattress disposal. See alternatives below.
            </p>
          </div>
        )}

        {/* Data Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: FileText, label: "Mattress Rule", value: mattressSpecificRule, color: "blue" },
            { icon: Clock, label: "Placement Time", value: placementTime, color: "orange" },
            { icon: Ruler, label: "Size Limits", value: sizeLimits, color: "purple" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={i} className={color === "blue" ? "bg-secondary border border-border rounded-2xl p-5" : `bg-${color}-50 border border-${color}-200 rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={color === "blue" ? "w-4 h-4 text-primary" : `w-4 h-4 text-${color}-600`} />
                <span className={color === "blue" ? "text-xs font-bold text-primary uppercase tracking-wide" : `text-xs font-bold text-${color}-700 uppercase tracking-wide`}>
                  {label}
                </span>
              </div>
              <p className="text-gray-800 font-semibold text-sm leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Fine Warning */}
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-red-900 text-base mb-1">
                ⚠️ ILLEGAL DUMPING WARNING
              </p>
              <p className="text-red-700 text-sm leading-relaxed">
                Fines in <strong>{city}</strong> reach up to <strong className="text-red-900 text-base">{fineAmount}</strong> per incident. The City of LA has active enforcement cameras and anonymous reporting hotlines in high-violation neighborhoods. Fines are issued per item, per location.
              </p>
            </div>
          </div>
        </div>

        {/* Official Contact Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
              Official Authority
            </span>
            <p className="font-extrabold text-gray-900 text-base">{officialDept}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href={`tel:${officialPhone}`} 
              className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-accent transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-accent" /> {officialPhone}
            </a>
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-accent transition-colors shadow-sm"
            >
              <Globe className="w-4 h-4 text-accent" /> Official Site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
