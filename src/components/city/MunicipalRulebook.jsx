import React from "react";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Ruler, FileText, Phone, Globe, ShieldAlert, Scale, Book, ExternalLink } from "lucide-react";

export default function MunicipalRulebook({ data }) {
  const {
    city, availabilityStatus, mattressSpecificRule, placementTime, sizeLimits,
    fineAmount, officialDept, officialPhone, websiteUrl
  } = data;

  const isAllowed = availabilityStatus === "yes";
  const isConditional = availabilityStatus === "conditional";

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Book className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              City Regulations
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Official {city} curbside disposal rules — sourced from city sanitation
          </p>
        </div>

        {/* Status Banner */}
        {isConditional && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl px-6 py-5 flex items-start gap-5 mb-10 max-w-4xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-xl mb-2">
                ⚠️ Conditionally Allowed
              </h3>
              <p className="text-amber-800 leading-relaxed">
                Curbside mattress pickup is available in {city} but requires advance scheduling and strict compliance. 
                <strong> Items may be rejected at curb if:</strong> not wrapped, placed too early, or suspected of bed bugs.
              </p>
            </div>
          </div>
        )}

        {isAllowed && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl px-6 py-5 flex items-start gap-5 mb-10 max-w-4xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-200 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 text-xl mb-2">
                ✅ Curbside Pickup Allowed
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                {city} permits curbside mattress disposal with proper scheduling. Review the rules below to ensure compliance.
              </p>
            </div>
          </div>
        )}

        {!isAllowed && !isConditional && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-400 rounded-3xl px-6 py-5 flex items-start gap-5 mb-10 max-w-4xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-red-200 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-7 h-7 text-red-700" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-xl mb-2">
                🚫 Curbside Disposal Prohibited
              </h3>
              <p className="text-red-800 leading-relaxed">
                {city} does not allow curbside mattress disposal. See drop-off locations or professional haulers for alternatives.
              </p>
            </div>
          </div>
        )}

        {/* Rules Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-card border-2 border-border rounded-3xl p-6 market-hover">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Wrapping Rule</h3>
            <p className="font-bold text-foreground text-lg leading-snug">{mattressSpecificRule}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-3xl p-6 market-hover">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Placement Time</h3>
            <p className="font-bold text-foreground text-lg leading-snug">{placementTime}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-3xl p-6 market-hover">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
              <Ruler className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Size Limits</h3>
            <p className="font-bold text-foreground text-lg leading-snug">{sizeLimits}</p>
          </div>
        </div>

        {/* Fine Warning - Full Width Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 mb-10 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
              backgroundSize: '10px 10px'
            }} />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-black text-white text-2xl mb-2">
                Illegal Dumping Fine
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Fines in <strong>{city}</strong> reach up to <strong className="text-3xl mx-2">{fineAmount}</strong> per incident. 
                The city has active enforcement cameras and anonymous reporting hotlines in high-violation areas.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl p-4 text-center">
                <div className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Maximum Fine</div>
                <div className="text-4xl font-black text-red-600">{fineAmount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Contact Card */}
        <div className="bg-gradient-to-r from-secondary to-card border-2 border-border rounded-3xl p-6 stall-shadow max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center flex-shrink-0">
                <Scale className="w-7 h-7 text-background" />
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                  Official Authority
                </span>
                <h3 className="font-bold text-foreground text-xl">{officialDept}</h3>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href={`tel:${officialPhone}`} 
                className="flex items-center gap-2 bg-card border-2 border-border rounded-xl px-5 py-3 font-semibold text-foreground hover:border-accent/50 transition-colors stall-shadow"
              >
                <Phone className="w-5 h-5 text-accent" />
                {officialPhone}
              </a>
              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-foreground text-background rounded-xl px-5 py-3 font-semibold hover:bg-foreground/90 transition-colors"
              >
                <Globe className="w-5 h-5" />
                Official Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
