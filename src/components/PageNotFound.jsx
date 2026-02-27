import React, { useState } from "react";
import { Trash2, MapPin, ArrowRight, ShieldCheck, Star, Zap } from "lucide-react";
import { createPageUrl } from "@/utils";

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
];

export default function PageNotFound() {
  const [service, setService] = useState("");
  const [zip, setZip] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = createPageUrl("Home");
  };

  return (
    <div className="min-h-screen font-sans relative flex flex-col items-center justify-center overflow-hidden">
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

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
          Looks like we took
          <br />
          a wrong turn.
        </h1>

        <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The page you're looking for was hauled away. But we still have <strong className="text-gray-800">highly-rated mattress removal pros</strong> available in your area today.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-2 flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <Trash2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="What needs to be removed?"
              className="bg-transparent w-full text-gray-800 placeholder-gray-400 font-medium text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter Zip Code"
              className="bg-transparent w-full text-gray-800 placeholder-gray-400 font-medium text-sm focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold px-7 py-3.5 rounded-xl text-sm tracking-wide transition-all duration-150 flex items-center gap-2 justify-center shadow-lg shadow-blue-300/40 hover:shadow-blue-400/50 whitespace-nowrap"
          >
            Find Pros Now <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Trust Strip */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex -space-x-2.5">
            {AVATAR_URLS.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Pro"
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 mb-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400" fill="#FBBF24" />)}
            </div>
            <p className="text-gray-600 text-sm font-semibold">
              <span className="text-blue-600 font-extrabold">150+ pros</span> are online and ready to quote.
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={createPageUrl("Home")} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 font-medium border border-gray-200 rounded-full px-4 py-2 hover:border-blue-300 transition-colors">
            🏠 Back to Home
          </a>
          <a href={createPageUrl("About")} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 font-medium border border-gray-200 rounded-full px-4 py-2 hover:border-blue-300 transition-colors">
            ℹ️ About DisposalGrid
          </a>
          <a href={createPageUrl("Contact")} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 font-medium border border-gray-200 rounded-full px-4 py-2 hover:border-blue-300 transition-colors">
            📬 Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
