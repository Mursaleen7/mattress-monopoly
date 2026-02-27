import React from "react";
import { MapPin, Clock, DollarSign, CheckCircle2, Navigation, Calculator } from "lucide-react";

function DIYCostCalculator({ locations, basePriceDisplay }) {
  const tippingFee = locations[0]?.tippingFee || "$28.50";
  const tippingNum = parseFloat(tippingFee.replace("$", "")) || 28.5;
  const truckRental = 40;
  const gasTime = 25;
  const total = tippingNum + truckRental + gasTime;
  const baseNum = parseFloat(basePriceDisplay.replace(/[^0-9]/g, "")) || 89;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden sticky top-6">
      <div className="bg-gray-900 px-5 py-4 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-blue-400" />
        <h3 className="text-white font-extrabold text-sm">DIY True Cost Calculator</h3>
      </div>

      <div className="p-5 space-y-3">
        {[
          { label: "Dump Tip Fee", value: tippingFee, note: "facility charge" },
          { label: "Truck/Van Rental", value: "$40.00", note: "4-hr minimum" },
          { label: "Gas & Your Time", value: "$25.00", note: "estimated" },
        ].map(({ label, value, note }, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
              <p className="text-sm font-semibold text-gray-700">{label}</p>
              <p className="text-xs text-gray-400">{note}</p>
            </div>
            <span className="text-sm font-bold text-gray-900">{value}</span>
          </div>
        ))}

        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="font-extrabold text-gray-900 text-sm">Total DIY Cost</span>
          <span className="font-black text-red-600 text-xl">${total.toFixed(2)}</span>
        </div>

        <div className="text-center text-xs text-gray-400 font-medium">vs.</div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="font-extrabold text-gray-900 text-sm">Professional Pickup</span>
          <span className="font-black text-blue-600 text-xl">{basePriceDisplay}</span>
        </div>

        <p className="text-xs text-center text-gray-500 italic">Zero lifting. Done in 30 minutes.</p>

        <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-100">
          Book a Pro Instead →
        </button>
      </div>
    </div>
  );
}

export default function DropOffCenters({ data }) {
  const { city, locations, basePriceDisplay } = data;

  return (
    <section className="py-14 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
          Where to Dump a Mattress in {city}
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Official drop-off centers — hours and fees verified for 2026.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-5">
            {locations.map((loc, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex flex-col sm:flex-row">
                  {/* Map thumb */}
                  <div className="relative sm:w-36 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=70`}
                      alt="Facility map"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white drop-shadow" />
                    </div>
                    <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-extrabold px-2 py-0.5 rounded-full shadow">
                      # {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-base leading-snug">{loc.name}</h3>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {loc.type}
                        </span>
                      </div>
                      <span className="text-xl font-black text-gray-900 whitespace-nowrap">
                        {loc.tippingFee}
                        <span className="text-xs text-gray-400 font-normal">/item</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        <span>{loc.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {loc.accepted.map(item => (
                        <span key={item} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-2.5 h-2.5" /> {item}
                        </span>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800 font-semibold mb-3">
                      🪪 Residency Requirement: {loc.residencyReq}
                    </div>

                    <a 
                      href={loc.mapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calculator */}
          <div>
            <DIYCostCalculator locations={locations} basePriceDisplay={basePriceDisplay} />
          </div>
        </div>
      </div>
    </section>
  );
}
