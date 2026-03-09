import React, { useRef } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

const JOBS = [
  {
    before: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=300&q=80",
    after: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&q=80",
    rating: 5,
    quote: "Incredibly fast — they cleared our entire garage in under 2 hours. Worth every penny.",
    customer: "Jennifer M.",
    tag: "Silver Lake",
    service: "King Mattress Removal",
    time: "3 hrs ago"
  },
  {
    before: "https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=300&q=80",
    after: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    rating: 5,
    quote: "Zero damage to my walls, and they recycled the mattress. Super professional team.",
    customer: "Marcus T.",
    tag: "Echo Park",
    service: "Full Junk Haul",
    time: "6 hrs ago"
  },
  {
    before: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=300&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",
    rating: 5,
    quote: "Got a quote in 5 minutes, haulers showed up on time. Will definitely use again.",
    customer: "Sarah K.",
    tag: "Culver City",
    service: "Sofa & Mattress",
    time: "1 day ago"
  },
  {
    before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
    after: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    rating: 5,
    quote: "They took everything — old bed frame, broken dresser, boxes. Spotless job.",
    customer: "David R.",
    tag: "West Hollywood",
    service: "Estate Cleanout",
    time: "2 days ago"
  },
  {
    before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",
    after: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    rating: 5,
    quote: "Fast, eco-friendly, and transparent pricing. Highly recommend for any LA homeowner.",
    customer: "Lisa H.",
    tag: "Koreatown",
    service: "Queen + Box Spring",
    time: "2 days ago"
  }
];

export default function UGCCarousel({ city }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-secondary/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wider">Recent Activity</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight">
              Jobs Completed in {city}
            </h2>
            <p className="text-muted-foreground mt-1">Real results from verified customers</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll(-1)} 
              className="w-11 h-11 rounded-xl bg-card border-2 border-border flex items-center justify-center hover:border-primary/50 hover:bg-secondary transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={() => scroll(1)} 
              className="w-11 h-11 rounded-xl bg-card border-2 border-border flex items-center justify-center hover:border-primary/50 hover:bg-secondary transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {JOBS.map((job, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-80 bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group snap-start"
            >
              {/* Before/After split image */}
              <div className="flex h-40 relative">
                <div className="w-1/2 relative overflow-hidden">
                  <img 
                    src={job.before} 
                    alt="Before" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90" 
                  />
                  <span className="absolute bottom-2 left-2 bg-foreground/80 text-background text-[10px] font-bold px-2 py-1 rounded-lg">
                    BEFORE
                  </span>
                </div>
                <div className="w-1/2 relative overflow-hidden">
                  <img 
                    src={job.after} 
                    alt="After" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                    AFTER
                  </span>
                </div>
                {/* Divider */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-card shadow-lg" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating & time */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{job.time}</span>
                </div>
                
                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/10" />
                  <p className="text-foreground text-sm leading-relaxed pl-4 italic">"{job.quote}"</p>
                </div>
                
                {/* Customer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{job.customer}</p>
                      <p className="text-xs text-muted-foreground">Verified Customer</p>
                    </div>
                  </div>
                </div>
                
                {/* Service tag */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {job.service}
                  </span>
                  <span className="bg-secondary text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-lg">
                    {job.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
