import React from "react";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Ruler, FileText, Phone, Globe, ArrowUpRight, Info } from "lucide-react";

export default function MunicipalRulebook({ data }) {
  const {
    city, availabilityStatus, mattressSpecificRule, placementTime, sizeLimits,
    fineAmount, officialDept, officialPhone, websiteUrl
  } = data;

  const isAllowed = availabilityStatus === "yes";
  const isConditional = availabilityStatus === "conditional";

  return (
    <section className="py-12 lg:py-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header with asymmetric layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
          <div>
            <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-2">City Rules</span>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-4 text-balance">
              Can I Leave It on the Curb in {city}?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Official municipal rules sourced directly from city sanitation departments. Know before you dump.
            </p>
          </div>
          
          {/* Status card */}
          <div className="flex items-center">
            {isConditional && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 w-full">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-black text-amber-900 text-lg mb-1">Conditionally Allowed</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Curbside pickup available but requires advance scheduling and strict compliance. Items rejected if rules aren't followed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isAllowed && (
              <div className="bg-green-50 border-2 border-green-300 rounded-3xl p-6 w-full">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-200 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-black text-green-900 text-lg mb-1">Curbside Allowed</h3>
                    <p className="text-green-700 text-sm leading-relaxed">
                      Schedule required. Review the rules below before placing items at the curb.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!isAllowed && !isConditional && (
              <div className="bg-red-50 border-2 border-red-400 rounded-3xl p-6 w-full">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-200 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-7 h-7 text-red-700" />
                  </div>
                  <div>
                    <h3 className="font-black text-red-900 text-lg mb-1">Not Allowed</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      {city} prohibits curbside mattress disposal. See alternative options below.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules bento grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Mattress Rule */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Mattress Rule</span>
            </div>
            <p className="text-foreground font-semibold leading-relaxed">{mattressSpecificRule}</p>
          </div>

          {/* Placement Time */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Placement Time</span>
            </div>
            <p className="text-foreground font-semibold leading-relaxed">{placementTime}</p>
          </div>

          {/* Size Limits */}
          <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Size Limits</span>
            </div>
            <p className="text-foreground font-semibold leading-relaxed">{sizeLimits}</p>
          </div>
        </div>

        {/* Fine warning - full width dramatic */}
        <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 lg:p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-red-200 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
              </div>
              <div>
                <h3 className="font-black text-red-900 text-xl lg:text-2xl mb-1">Illegal Dumping Warning</h3>
                <p className="text-red-700 text-sm lg:text-base leading-relaxed max-w-xl">
                  Fines in {city} reach up to <span className="font-black text-red-900">{fineAmount}</span> per incident. Active enforcement cameras and anonymous reporting hotlines are in high-violation areas.
                </p>
              </div>
            </div>
            
            <div className="lg:ml-auto flex-shrink-0">
              <div className="bg-red-100 rounded-2xl px-6 py-4 text-center">
                <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Max Fine</p>
                <p className="text-3xl lg:text-4xl font-black text-red-800">{fineAmount}</p>
                <p className="text-xs text-red-600">per item</p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Contact */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Official Authority</span>
              <p className="font-bold text-foreground">{officialDept}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href={`tel:${officialPhone}`} 
              className="flex items-center gap-2 bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" /> {officialPhone}
            </a>
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Globe className="w-4 h-4" /> Visit Site <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
