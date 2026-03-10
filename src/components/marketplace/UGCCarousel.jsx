import { useRef } from "react";
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const SITUATIONS = [
  {
    before: "/chal1.png",
    after: "/sol1.jpg",
    situation: "Moving Out This Weekend",
    challenge: "Need it gone in 48 hours",
    solution: "Professional same-day pickup ($89-$180)",
    whyItWorks: "No scheduling delays, done in 30 min",
    tag: "Time-sensitive"
  },
  {
    before: "/chal2.png",
    after: "/sol2.png",
    situation: "3rd Floor Apartment, No Elevator",
    challenge: "Can't carry mattress down alone",
    solution: "2-person pro team with equipment",
    whyItWorks: "They handle all heavy lifting safely",
    tag: "Physical limitation"
  },
  {
    before: "/chal3.png",
    after: "/sol3.png",
    situation: "No Car or Truck",
    challenge: "Can't transport to dump",
    solution: "City pickup (14-day wait) or pro service",
    whyItWorks: "Truck rental costs $40-60 anyway",
    tag: "No vehicle"
  },
  {
    before: "/chal4.png",
    after: "/sol4.png",
    situation: "Bed Bug Infested Mattress",
    challenge: "Charities won't accept, must wrap properly",
    solution: "Professional disposal with proper handling",
    whyItWorks: "They know contamination protocols",
    tag: "Health hazard"
  },
  {
    before: "/chal5.jpg",
    after: "/sol5.png",
    situation: "Budget-Conscious Homeowner",
    challenge: "Want cheapest legal option",
    solution: "DIY drop-off ($28.50) or wait for city pickup",
    whyItWorks: "Save money if you have time & truck",
    tag: "Cost-focused"
  }
];

export default function UGCCarousel({ city }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">Which Disposal Method Fits Your Situation?</h2>
          <p className="text-gray-600 text-base">Find the best option for your specific needs in {city}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 shadow-sm">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 shadow-sm">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SITUATIONS.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 shadow-sm group">
            {/* Split image */}
            <div className="flex h-36 relative">
              <div className="w-1/2 relative overflow-hidden">
                <img src={item.before} alt="Challenge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md">CHALLENGE</span>
              </div>
              <div className="w-1/2 relative overflow-hidden">
                <img src={item.after} alt="Solution" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-1.5 right-1.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md">SOLUTION</span>
              </div>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/80 shadow-sm" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-gray-900 text-sm font-bold mb-3 leading-tight">{item.situation}</h3>
              
              <div className="space-y-2.5 mb-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-0.5">Challenge</p>
                    <p className="text-xs text-gray-600 leading-snug font-medium">{item.challenge}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Solution</p>
                    <p className="text-xs text-gray-900 font-semibold leading-snug">{item.solution}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-lg px-3 py-2 mb-2.5">
                <p className="text-slate-700 text-[11px] leading-snug">
                  <span className="font-bold text-slate-900">Why it works:</span> {item.whyItWorks}
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-2.5 py-1.5 border border-gray-200">
                <span className="text-gray-700 text-[11px] font-semibold">🏷️ {item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
