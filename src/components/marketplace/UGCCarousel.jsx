import React, { useRef } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const JOBS = [
  {
    before: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&q=80",
    after: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&q=80",
    rating: 5,
    quote: "Incredibly fast — they cleared our entire garage in under 2 hours. Worth every penny.",
    customer: "Jennifer M.",
    tag: "Removed King Mattress in Silver Lake",
    time: "3 hrs ago"
  },
  {
    before: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=300&q=80",
    after: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    rating: 5,
    quote: "Zero damage to my walls, and they recycled the mattress. Super professional team.",
    customer: "Marcus T.",
    tag: "Full Junk Haul in Echo Park",
    time: "6 hrs ago"
  },
  {
    before: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=300&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",
    rating: 5,
    quote: "Got a quote in 5 minutes, haulers showed up on time. Will definitely use again.",
    customer: "Sarah K.",
    tag: "Sofa & Mattress Removal in Culver City",
    time: "1 day ago"
  },
  {
    before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    rating: 5,
    quote: "They took everything — old bed frame, broken dresser, boxes. Spotless job.",
    customer: "David R.",
    tag: "Estate Cleanout in West Hollywood",
    time: "2 days ago"
  },
  {
    before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",
    after: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    rating: 5,
    quote: "Fast, eco-friendly, and transparent pricing. Highly recommend for any LA homeowner.",
    customer: "Lisa H.",
    tag: "Queen Mattress + Box Spring in Koreatown",
    time: "2 days ago"
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
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">Recent Jobs Completed in {city}</h2>
          <p className="text-gray-600 text-sm mt-0.5">Real before &amp; after results from verified customers</p>
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
        {JOBS.map((job, i) => (
          <div key={i} className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 shadow-sm group">
            {/* Split image */}
            <div className="flex h-36 relative">
              <div className="w-1/2 relative overflow-hidden">
                <img src={job.before} alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md">BEFORE</span>
              </div>
              <div className="w-1/2 relative overflow-hidden">
                <img src={job.after} alt="After" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-1.5 right-1.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md">AFTER</span>
              </div>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/80 shadow-sm" />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400" fill="#FBBF24" />)}
                <span className="text-gray-500 text-xs ml-1">{job.time}</span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed italic mb-3">"{job.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-gray-700 text-xs font-semibold">{job.customer}</span>
                </div>
              </div>
              <div className="mt-2 bg-secondary rounded-lg px-2.5 py-1.5 border border-border/50">
                <span className="text-primary text-[11px] font-semibold">📍 {job.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
