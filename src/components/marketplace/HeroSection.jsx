import { useState, useEffect } from "react";
import { MapPin, List, ShieldCheck, Leaf, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
    label: "Junk Removal · Los Angeles",
  },
  {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
    label: "Mattress Pickup · Same Day",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
    label: "Estate Cleanout · Eco-Certified",
  },
  {
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=85",
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Slide Label */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Slide nav arrows */}
      <button onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all">
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button onClick={() => goTo((current + 1) % SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all">
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
          Find Trusted Removal Pros Near {city}
        </h1>
        <p className="text-gray-200 text-sm sm:text-base mb-7 max-w-xl mx-auto">
          Compare quotes from verified local haulers. Book online in minutes.
        </p>

        {/* Search Bar — Yelp-style white pill */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-1 flex flex-col sm:flex-row gap-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors border-r border-transparent sm:border-r sm:border-gray-200">
            <List className="w-4 h-4 text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Mattresses, furniture, junk..."
              className="bg-transparent w-full text-gray-900 placeholder-gray-500 text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, neighborhood, or zip"
              className="bg-transparent w-full text-gray-900 placeholder-gray-500 text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-md text-sm transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Trust Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {/* Avatars + rating */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {AVATARS.map((u, i) => (
                <img key={i} src={u} alt="reviewer" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400" fill="#FBBF24" />)}
              <span className="text-white text-xs font-medium ml-1">4.8 · 12,000+ reviews</span>
            </div>
          </div>
          <div className="w-px h-3.5 bg-white/30 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-200 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            Background-verified
          </div>
          <div className="w-px h-3.5 bg-white/30 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-200 text-xs">
            <Leaf className="w-3.5 h-3.5" />
            Eco-compliant
          </div>
          <div className="w-px h-3.5 bg-white/30 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-200 text-xs">
            <Zap className="w-3.5 h-3.5" />
            Same-day available
          </div>
        </div>
      </div>
    </section>
  );
}
