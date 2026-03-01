import { useState, useEffect } from "react";
import { MapPin, List, ShieldCheck, Leaf, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    url: "/img/hero1.png",
    label: "Junk Removal · Los Angeles",
  },
  {
    url: "/img/hero2.png",
    label: "Mattress Pickup · Same Day",
  },
  {
    url: "/img/hero3.png",
    label: "Estate Cleanout · Eco-Certified",
  },
  {
    url: "/img/hero4.png",
    label: "Furniture Removal · Licensed Pros",
  },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
];

export default function HeroSection({ city, onSearch, searchQuery }) {
  const [service, setService] = useState(searchQuery.service || "");
  const [location, setLocation] = useState(searchQuery.location || "");
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length);
        setFading(false);
      }, 400);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ service, location });
  };

  return (
    <section className="relative min-h-[520px] flex flex-col items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current && !fading ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75 transition-opacity duration-700" />
      </div>

      {/* Slide Label */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 ${
              i === current ? "w-5 h-1.5 bg-white shadow-lg" : "w-1.5 h-1.5 bg-white/60 hover:bg-white/90 hover:shadow-md"
            }`}
          />
        ))}
      </div>

      {/* Slide nav arrows */}
      <button onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 active:scale-95 shadow-lg hover:shadow-xl">
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button onClick={() => goTo((current + 1) % SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 active:scale-95 shadow-lg hover:shadow-xl">
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
          Find Trusted Removal Pros Near {city}
        </h1>
        <p className="text-gray-100 text-sm sm:text-base mb-7 max-w-xl mx-auto">
          Compare quotes from verified local haulers. Book online in minutes.
        </p>

        {/* Search Bar — Yelp-style white pill */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-1 flex flex-col sm:flex-row gap-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 rounded-md hover:bg-secondary/50 transition-all duration-200 border-r border-transparent sm:border-r sm:border-border">
            <List className="w-4 h-4 text-primary flex-shrink-0" />
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Mattresses, furniture, junk..."
              className="bg-transparent w-full text-foreground placeholder-gray-500 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            />
          </div>
          <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 rounded-md hover:bg-secondary/50 transition-all duration-200">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, neighborhood, or zip"
              className="bg-transparent w-full text-foreground placeholder-gray-500 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={!service && !location}
            className="bg-accent hover:opacity-90 text-accent-foreground font-semibold px-6 py-2.5 rounded-md text-sm transition-all duration-200 whitespace-nowrap focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Trust Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400" fill="#FBBF24" />)}
              <span className="text-white text-xs font-semibold ml-1">Only 5-star rated pros listed</span>
            </div>
          </div>
          <div className="w-px h-3.5 bg-white/40 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-100 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            Background-verified
          </div>
          <div className="w-px h-3.5 bg-white/40 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-100 text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-white" />
            Eco-compliant
          </div>
          <div className="w-px h-3.5 bg-white/40 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-100 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-white" />
            Same-day available
          </div>
        </div>
      </div>
    </section>
  );
}
