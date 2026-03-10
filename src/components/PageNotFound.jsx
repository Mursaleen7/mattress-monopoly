import React, { useState } from "react";
import { List, MapPin, ArrowRight, ShieldCheck, Star, Zap, Leaf } from "lucide-react";
import { createPageUrl } from "@/utils";

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
];

export default function PageNotFound() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = createPageUrl("Home");
  };

  return (
    <div className="min-h-screen font-sans relative flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&q=80"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12 text-center">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-6">
          <span className="text-red-600 text-xs font-bold tracking-widest uppercase">
            404 — Page Not Found
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-4">
          Looks like we took
          <br />
          a wrong turn.
        </h1>

        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The page you're looking for was hauled away. But we still have <strong className="text-foreground">highly-rated mattress removal pros</strong> available in your area today.
        </p>

        {/* Search Bar - Matching HeroSection style */}
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

        {/* Trust Strip - Matching HeroSection style */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400" fill="#FBBF24" />)}
              <span className="text-foreground text-xs font-semibold ml-1">Top-rated local providers</span>
            </div>
          </div>
          <div className="w-px h-3.5 bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Background-verified
          </div>
          <div className="w-px h-3.5 bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            Eco-compliant
          </div>
          <div className="w-px h-3.5 bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Same-day available
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={createPageUrl("Home")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium border border-border rounded-full px-4 py-2 hover:border-primary transition-colors">
            🏠 Back to Home
          </a>
          <a href={createPageUrl("About")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium border border-border rounded-full px-4 py-2 hover:border-primary transition-colors">
            ℹ️ About DisposalGrid
          </a>
          <a href={createPageUrl("Contact")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium border border-border rounded-full px-4 py-2 hover:border-primary transition-colors">
            📬 Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
