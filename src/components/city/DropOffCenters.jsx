import React from "react";
import { MapPin, Clock, CheckCircle2, Navigation, Calculator } from "lucide-react";

function DIYCostCalculator({ locations, basePriceDisplay }) {
  const tippingFee = locations[0]?.tippingFee || "$28.50";
  const tippingNum = parseFloat(tippingFee.replace("$", "")) || 28.5;
  const truckRental = 40;
  const gasTime = 35;
  const total = tippingNum + truckRental + gasTime;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm sticky top-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-gray-600" />
          <h3 className="text-gray-900 font-semibold text-sm">Cost Comparison</h3>
        </div>
      </div>

      <div className="p-5">
        {/* DIY Costs */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">DIY Option</p>
          
          <div className="space-y-2.5 mb-3">
            {[
              { label: "Dump Tip Fee", value: tippingFee, note: "facility charge" },
              { label: "Truck Rental", value: "$40.00", note: "4-hour minimum" },
              { label: "Gas + Time", value: "$35.00", note: "3 hours of work" },
            ].map(({ label, value, note }, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">{note}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 tabular-nums">{value}</span>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total DIY Cost</span>
              <span className="font-bold text-orange-600 text-xl tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium text-gray-400">versus</span>
          </div>
        </div>

        {/* Professional Option */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Professional Service</p>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg px-4 py-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Professional Pickup</span>
              <span className="font-bold text-emerald-700 text-xl tabular-nums">{basePriceDisplay}</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">• Done in 30 minutes</p>
              <p className="text-xs text-gray-600">• No heavy lifting required</p>
              <p className="text-xs text-gray-600">• No truck rental needed</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg text-sm transition-colors shadow-sm hover:shadow-md">
          Book Professional Pickup
        </button>
      </div>
    </div>
  );
}

export default function DropOffCenters({ data }) {
  const { city, locations, basePriceDisplay } = data;

  // Generate static map using OpenStreetMap tiles
  // This creates a more accurate centered view
  const getMapThumbnail = (location) => {
    if (location.lat && location.lon) {
      const lat = location.lat;
      const lon = location.lon;
      const zoom = 15; // Higher zoom for better detail
      
      // Calculate tile coordinates
      const n = Math.pow(2, zoom);
      const xtile = Math.floor((lon + 180) / 360 * n);
      const ytile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
      
      // Different tile server options with native color schemes (no filters needed):
      
      // Option 1: Standard OSM (default bright colors)
      // const tileUrl = `https://tile.openstreetmap.org/${zoom}/${xtile}/${ytile}.png`;
      
      // Option 2: CartoDB Positron (light, minimal, Google Maps-like)
      const tileUrl = `https://a.basemaps.cartocdn.com/light_all/${zoom}/${xtile}/${ytile}.png`;
      
      // Option 3: CartoDB Voyager (balanced, clean)
      // const tileUrl = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${xtile}/${ytile}.png`;
      
      // Option 4: Stamen Toner Lite (minimal black & white)
      // const tileUrl = `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/${zoom}/${xtile}/${ytile}.png`;
      
      // Option 5: ESRI World Street Map (professional, muted colors)
      // const tileUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${zoom}/${ytile}/${xtile}`;
      
      console.log(`Map tile for ${location.name}: zoom=${zoom}, x=${xtile}, y=${ytile}`);
      return tileUrl;
    }
    
    return null;
  };

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Where to Dump a Mattress in {city}
        </h2>
        <p className="text-gray-600 text-base mb-10">
          Official drop-off centers — hours and fees verified for 2026.
        </p>

        <div className="grid lg:grid-cols-3 gap-7">
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-4">
            {locations.map((loc, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                <div className="flex flex-col sm:flex-row">
                  {/* Location thumbnail with map */}
                  <div className="relative sm:w-36 h-32 sm:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                    {getMapThumbnail(loc) ? (
                      <>
                        <img
                          src={getMapThumbnail(loc)}
                          alt={`Map of ${loc.name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement.querySelector('.fallback-bg');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Subtle overlay for Google Maps look */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5"></div>
                        
                        {/* Exact Google Maps pin with 3D shading */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="relative" style={{ marginTop: '-12px' }}>
                            {/* Pin shadow - very small and faint at the tip */}
                            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-3 h-1 bg-black/15 rounded-full blur-[2px]"></div>
                            
                            {/* Google Maps pin with 3D gradient shading */}
                            <svg width="27" height="43" viewBox="0 0 27 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                {/* Left-to-right gradient for 3D effect: lighter left, darker right */}
                                <linearGradient id="pin3DGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                                  <stop offset="0%" stopColor="#F25C54" />
                                  <stop offset="30%" stopColor="#EA4335" />
                                  <stop offset="70%" stopColor="#E33B2E" />
                                  <stop offset="100%" stopColor="#C5221F" />
                                </linearGradient>
                                
                                {/* Subtle highlight on left edge */}
                                <linearGradient id="pinHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                                  <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              
                              {/* Main pin shape - inverted teardrop with 3D gradient */}
                              <path d="M13.5 0C6.044 0 0 6.044 0 13.5C0 23.8 13.5 43 13.5 43C13.5 43 27 23.8 27 13.5C27 6.044 20.956 0 13.5 0Z" fill="url(#pin3DGradient)"/>
                              
                              {/* Subtle highlight overlay on left side */}
                              <path d="M13.5 0C6.044 0 0 6.044 0 13.5C0 23.8 13.5 43 13.5 43L13.5 0Z" fill="url(#pinHighlight)"/>
                              
                              {/* Darker maroon center circle */}
                              <circle cx="13.5" cy="13.5" r="4.5" fill="#8B1A1A"/>
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="fallback-bg absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex-col items-center justify-center" style={{ display: getMapThumbnail(loc) ? 'none' : 'flex' }}>
                      <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                      <p className="text-xs font-semibold text-blue-800 leading-tight text-center px-2">{loc.type}</p>
                    </div>
                    <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-md">
                      # {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1.5">{loc.name}</h3>
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {loc.type}
                        </span>
                      </div>
                      <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        {loc.tippingFee}
                        <span className="text-xs text-gray-500 font-normal">/item</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3.5">
                      <div className="flex items-start gap-2 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400 mt-0.5" />
                        <span className="leading-relaxed">{loc.address}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-400 mt-0.5" />
                        <span className="leading-relaxed">{loc.hours}</span>
                      </div>
                    </div>

                    {loc.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-semibold">
                        <span className="text-gray-400">📞</span>
                        <a href={`tel:${loc.phone}`} className="hover:text-primary transition-colors">
                          {loc.phone}
                        </a>
                        {(loc.hours === 'Call for hours' || loc.tippingFee === 'Call for fees') && (
                          <span className="text-gray-400 italic">(call for hours/fees)</span>
                        )}
                      </div>
                    )}

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
                      className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
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
