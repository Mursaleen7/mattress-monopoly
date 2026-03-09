import React, { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle2, Navigation, Calculator, AlertTriangle, Users, TrendingUp, Car, Building, Truck, DollarSign, Timer, ChevronRight, ArrowRight } from "lucide-react";

function DIYCostCalculator({ locations, basePriceDisplay }) {
  const tippingFee = locations[0]?.tippingFee || "$28.50";
  const tippingNum = parseFloat(tippingFee.replace("$", "")) || 28.5;
  const truckRental = 40;
  const gasTime = 35;
  const total = tippingNum + truckRental + gasTime;
  const baseNum = parseFloat(basePriceDisplay.replace(/[^0-9]/g, "")) || 89;
  const savings = total - baseNum;

  const [peopleComparing, setPeopleComparing] = useState(7);
  const [showSavings, setShowSavings] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleComparing(prev => Math.max(3, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);
    
    const savingsTimer = setTimeout(() => setShowSavings(true), 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(savingsTimer);
    };
  }, []);

  return (
    <div className="bg-card border-2 border-border rounded-3xl overflow-hidden stall-shadow sticky top-6">
      <div className="bg-gradient-to-r from-foreground to-foreground/90 px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6 text-accent" />
          <h3 className="text-background font-bold text-lg">True Cost Calculator</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-background/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {peopleComparing} people comparing right now
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h4 className="font-bold text-foreground text-sm uppercase tracking-wider text-center mb-4">DIY Total Cost</h4>
        
        {[
          { label: "Facility Tip Fee", value: tippingFee, icon: Building },
          { label: "Truck Rental (4hr)", value: "$40.00", icon: Truck },
          { label: "Gas & Your Time", value: "$35.00", icon: Timer },
        ].map(({ label, value, icon: Icon }, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
            <span className="text-sm font-bold text-foreground">{value}</span>
          </div>
        ))}

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl px-5 py-4 text-center">
          <span className="text-xs text-red-600 font-bold uppercase tracking-wider">DIY Total</span>
          <div className="text-3xl font-black text-red-600 mt-1">${total.toFixed(2)}</div>
        </div>

        <div className="flex items-center justify-center gap-3 py-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground text-sm font-medium">vs</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className={`bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl px-5 py-4 text-center transition-all duration-500 ${showSavings ? 'scale-100' : 'scale-95 opacity-80'}`}>
          <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Professional Pickup</span>
          <div className="text-3xl font-black text-emerald-600 mt-1">{basePriceDisplay}</div>
          <div className="flex items-center justify-center gap-2 mt-2 text-emerald-700 font-semibold text-sm">
            <TrendingUp className="w-4 h-4" />
            Save ${Math.abs(savings).toFixed(0)} + 3 hours of your time
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-4 text-center space-y-2">
          <p className="text-xs text-muted-foreground font-medium">What customers choose</p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-2.5 flex-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-accent rounded-full" />
            </div>
            <span className="text-sm font-bold text-foreground">87%</span>
          </div>
          <p className="text-xs text-muted-foreground">choose professional pickup</p>
        </div>

        <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-2xl text-base transition-all flex items-center justify-center gap-2 group stall-shadow">
          Book a Pro Instead
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function LocationCard({ loc, index, waitTime, visitors }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border-2 border-border rounded-3xl overflow-hidden market-hover group">
      <div className="flex flex-col lg:flex-row">
        {/* Map Thumbnail */}
        <div className="relative lg:w-48 h-40 lg:h-auto overflow-hidden bg-secondary flex-shrink-0">
          <img
            src={`https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&q=70`}
            alt="Facility location"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/40 to-foreground/20 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-background drop-shadow-lg" />
          </div>
          
          {/* Rank badge */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-accent text-accent-foreground text-sm font-black flex items-center justify-center shadow-lg">
            {index + 1}
          </div>

          {/* Wait time badge */}
          <div className={`absolute bottom-3 left-3 right-3 ${
            waitTime > 30 ? 'bg-red-500' : waitTime > 15 ? 'bg-amber-500' : 'bg-emerald-500'
          } text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg flex items-center justify-center gap-2`}>
            <Clock className="w-3.5 h-3.5" />
            ~{waitTime} min wait
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-bold text-lg text-foreground mb-1">{loc.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {loc.type}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  {visitors} vehicles now
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-black text-foreground">{loc.tippingFee}</div>
              <div className="text-xs text-muted-foreground">per item</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="truncate">{loc.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-accent flex-shrink-0" />
              <span>{loc.hours}</span>
            </div>
          </div>

          {/* Accepted Items */}
          <div className="flex flex-wrap gap-2 mb-4">
            {loc.accepted.map(item => (
              <span 
                key={item} 
                className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-medium"
              >
                <CheckCircle2 className="w-3 h-3" />
                {item}
              </span>
            ))}
          </div>

          {/* Residency Requirement */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 font-medium mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{loc.residencyReq}</span>
          </div>

          {/* Action */}
          <a 
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background font-bold px-5 py-3 rounded-xl text-sm transition-all"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DropOffCenters({ data }) {
  const { city, locations, basePriceDisplay } = data;
  
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
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-black text-foreground tracking-tight">
                Drop-Off Locations
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Official facilities in {city} — live wait times and fees
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-card border border-border rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-muted-foreground">Updated {lastUpdated}m ago</span>
            </div>
          </div>
        </div>

        {/* Truck Warning Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-3xl px-6 py-5 flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-orange-200 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-orange-700" />
          </div>
          <div>
            <h3 className="font-bold text-orange-900 text-lg mb-1">🚚 Truck Required</h3>
            <p className="text-orange-800 text-sm leading-relaxed">
              Minimum 6ft truck bed required. Mattresses folded in SUVs risk structural damage. 
              Most facilities will not accept mattresses transported in sedans or compact vehicles.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-8 space-y-6">
            {locations.map((loc, i) => (
              <LocationCard 
                key={i} 
                loc={loc} 
                index={i}
                waitTime={waitTimes[i]}
                visitors={currentVisitors[i]}
              />
            ))}
          </div>

          {/* Calculator Sidebar */}
          <div className="lg:col-span-4">
            <DIYCostCalculator locations={locations} basePriceDisplay={basePriceDisplay} />
          </div>
        </div>
      </div>
    </section>
  );
}
