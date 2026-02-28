import React from "react";
import { MapPin, Phone, ShieldCheck, Leaf, Clock } from "lucide-react";

const NEARBY_CITIES = [
  "Mattress Removal in Santa Monica",
  "Mattress Removal in Burbank",
  "Junk Removal in Pasadena",
  "Mattress Removal in Glendale",
  "Junk Removal in Long Beach",
  "Mattress Removal in Torrance",
  "Junk Removal in Inglewood",
  "Mattress Removal in El Monte",
  "Junk Removal in Hawthorne",
  "Mattress Removal in Compton",
  "Junk Removal in Pomona",
  "Mattress Removal in West Covina",
];

const SERVICES = [
  "Mattress Removal", "Sofa & Couch Removal", "Appliance Haul-Away",
  "Full Junk Cleanout", "Estate Cleanout", "Furniture Removal",
  "Refrigerator Disposal", "Hot Tub Removal", "Garage Cleanout"
];

export default function MarketplaceFooter({ city }) {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      {/* Trust bar */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap justify-center gap-8">
          {[
            { icon: ShieldCheck, label: "4,500+ Verified Pros Nationwide" },
            { icon: Leaf, label: "Eco-Compliant Disposal Partners" },
            { icon: Clock, label: "Same-Day Availability in Most Areas" },
            { icon: Phone, label: "Live Support 7am–9pm Daily" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-gray-200">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0 mb-4">
              <span className="font-black text-white text-2xl tracking-tight italic">
                <span className="text-white">Disposal</span>
                <span className="text-accent">Grid</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              The #1 local directory for verified mattress and junk removal professionals. Compare pricing, read real reviews, and book in minutes.
            </p>
            <div className="mt-5 flex gap-3">
              <button className="bg-accent hover:opacity-90 text-accent-foreground text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950 active:scale-95 shadow-lg">
                Get a Free Quote
              </button>
              <button className="border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950 active:scale-95">
                For Pros
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-accent hover:underline text-sm transition-all duration-200 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950 rounded">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby Service Areas */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" /> Nearby Service Areas
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {NEARBY_CITIES.map((c, i) => (
                <a key={i} href="#" className="text-gray-300 hover:text-accent hover:underline text-sm transition-all duration-200 flex items-center gap-1.5 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950 rounded">
                  <span className="w-1 h-1 rounded-full bg-gray-500 flex-shrink-0" />
                  {c}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 HaulPros. All rights reserved. Serving {city} and surrounding areas.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap", "Accessibility"].map((l, i) => (
              <a key={i} href="#" className="text-gray-400 hover:text-gray-200 hover:underline text-xs transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
