import React from "react";
import { AlertTriangle, Phone, Globe } from "lucide-react";

export default function MunicipalRulebook({ data }) {
  const {
    city, availabilityStatus, mattressSpecificRule, placementTime, sizeLimits,
    fineAmount, officialDept, officialPhone, websiteUrl
  } = data;

  const isAllowed = availabilityStatus === "yes";
  const isConditional = availabilityStatus === "conditional";

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Can I Leave It on the Curb in {city}?
        </h2>

        {/* Status Badge */}
        <div className="mb-6">
          {isConditional && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-md font-bold text-sm flex-shrink-0">
                  ⚠️ Conditionally Allowed
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Curbside pickup is available in {city}, but you'll need to schedule in advance and follow strict rules. If your mattress isn't wrapped properly or you place it out too early, it won't be picked up.
                </p>
              </div>
            </div>
          )}
          {isAllowed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-md font-bold text-sm flex-shrink-0">
                  ✓ Allowed
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Curbside pickup is available in {city}. Schedule required — see rules below.
                </p>
              </div>
            </div>
          )}
          {!isAllowed && !isConditional && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-1.5 rounded-md font-bold text-sm flex-shrink-0">
                  ✗ Not Allowed
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {city} doesn't allow curbside mattress disposal. You'll need to use a drop-off facility or hire a hauler.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rules Paragraph */}
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong className="text-gray-900">The mattress rule:</strong> {mattressSpecificRule}
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong className="text-gray-900">When to put it out:</strong> {placementTime}
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Size limits:</strong> {sizeLimits}
          </p>
        </div>

        {/* Fine Warning - Inline Style */}
        <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 leading-relaxed">
              <strong className="font-bold">Don't risk it.</strong> Illegal dumping fines in {city} can reach <strong>{fineAmount}</strong> per incident. The city uses enforcement cameras and anonymous tip lines in high-violation areas.
            </p>
          </div>
        </div>

        {/* Contact Info - Inline */}
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-600 mb-3">
            Questions? Contact <strong className="text-gray-900">{officialDept}</strong> directly:
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href={`tel:${officialPhone}`} 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" /> {officialPhone}
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-accent transition-colors"
            >
              <Globe className="w-4 h-4" /> Official Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
