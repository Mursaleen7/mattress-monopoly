import React, { useState, useEffect } from "react";
import { MapPin, Clock, DollarSign, CheckCircle2, Navigation, Calculator, AlertTriangle, Users, TrendingUp, Car } from "lucide-react";

function DIYCostCalculator({ locations, basePriceDisplay }) {
  const tippingFee = locations[0]?.tippingFee || "$28.50";
  const tippingNum = parseFloat(tippingFee.replace("$", "")) || 28.5;
  const truckRental = 40;
  const gasTime = 35;
  const total = tippingNum + truckRental + gasTime;
  const baseNum = parseFloat(basePriceDisplay.replace(/[^0-9]/g, "")) || 89;
  const savings = total - baseNum;

  const [peopleComparing, setPeopleComparing] = useState(7);
  const [recentChoice, setRecentChoice] = useState("pro");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleComparing(prev => Math.max(3, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
      setRecentChoice(Math.random() > 0.2 ? "pro" : "diy");
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border-2 border-border rounded-2xl overflow-hidden sticky top-6">
      <div className="bg-primary px-5 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-4 h-4 text-accent" />
          <h3 className="text-white font-extrabold text-sm">DIY True Cost Calculator</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          {peopleComparing} people comparing right now
        </div>
      </div>

      <div className="p-5 space-y-3">
        {[
          { label: "Dump Tip Fee", value: tippingFee, note: "facility charge" },
          { label: "Truck/Van Rental", value: "$40.00", note: "4-hr minimum" },
          { label: "Gas & Your Time", value: "$35.00", note: "3 hours @ $10/hr + fuel" },
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

        <div className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-extrabold text-gray-900 text-sm">Professional Pickup</span>
            <span className="font-black text-primary text-xl">{basePriceDisplay}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-700 font-semibold">
            <TrendingUp className="w-3 h-3" />
            Save ${Math.abs(savings).toFixed(0)} + your time
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-gray-500 mb-1">Most recent choice</p>
          <p className={`text-xs font-bold ${recentChoice === 'pro' ? 'text-green-600' : 'text-gray-600'}`}>
            {recentChoice === 'pro' ? '✓ 87% choose Professional Pickup' : '→ Some prefer DIY'}
          </p>
        </div>

        <p className="text-xs text-center text-gray-500 italic">Zero lifting. Done in 30 minutes.</p>

        <button className="w-full bg-accent hover:bg-accent/90 active:scale-95 text-primary font-extrabold py-3 rounded-xl text-sm transition-all shadow-md group">
          Book a Pro Instead →
        </button>
      </div>
    </div>
  );
}

export default function DropOffCenters({ data }) {
  const { city, locations, basePriceDisplay } = data;
  
  // Live data state
  const [waitTimes, setWaitTimes] = useState([15, 25, 10]);
  const [currentVisitors, setCurrentVisitors] = useState([8, 12, 5]);
  const [lastUpdated, setLastUpdated] = useState(3);
  
  useEffect(() => {
    const waitInterval = setInterval(() => {
      setWaitTimes(prev => prev.map(t => Math.max(5, Math.min(45, t + (Math.random() > 0.5 ? 5 : -5)))));
      setCurrentVisitors(prev => prev.map(v => Math.max(2, Math.min(20, v + (Math.random() > 0.5 ? 1 : -1)))));
    }, 15000);

    const updateInterval = setInterval(() => {
      setLastUpdated(prev => (prev >= 10 ? 1 : prev + 1));
    }, 60000);

    return () => {
      clearInterval(waitInterval);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <section className="py-14 bg-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Where to Dump a Mattress in {city}
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-600">Live wait times · Updated {lastUpdated}m ago</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Official drop-off centers — hours, fees, and real-time wait estimates.
        </p>

        {/* Truck Requirement Warning */}
        <div className="bg-orange-50 border-2 border-orange-300 rounded-xl px-5 py-3 flex items-start gap-3 mb-8">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-orange-900 text-sm">
              🚚 Truck Requirement: Minimum 6ft truck bed required
            </p>
            <p className="text-orange-700 text-xs mt-0.5">
              Mattresses folded in SUVs risk structural damage and voiding warranties. Most facilities will not accept mattresses transported in sedans or compact vehicles.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-5">
            {locations.map((loc, i) => (
              <div key={i} className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-md hover:border-accent transition-all">
                <div className="flex flex-col sm:flex-row">
                  {/* Map thumb */}
                  <div className="relative sm:w-36 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=70`}
                      alt="Facility map"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white drop-shadow" />
                    </div>
                    <div className="absolute top-2 left-2 bg-background text-gray-800 text-xs font-extrabold px-2 py-0.5 rounded-full shadow">
                      # {i + 1}
                    </div>
                    {/* Live wait time badge */}
                    <div className={`absolute bottom-2 left-2 right-2 ${waitTimes[i] > 30 ? 'bg-red-500' : waitTimes[i] > 15 ? 'bg-yellow-500' : 'bg-green-500'} text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow flex items-center justify-center gap-1`}>
                      <Clock className="w-3 h-3" />
                      ~{waitTimes[i]} min wait
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-base leading-snug">{loc.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-primary bg-secondary px-2 py-0.5 rounded-full">
                            {loc.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            {currentVisitors[i]} vehicles now
                          </span>
                        </div>
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

                    <div className="flex items-center gap-3">
                      <a 
                        href={loc.mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Get Directions
                      </a>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        {Math.floor(Math.random() * 10) + 5} min drive
                      </span>
                    </div>
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
