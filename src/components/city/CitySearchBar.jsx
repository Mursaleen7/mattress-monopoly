import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { AVAILABLE_CITIES, searchCities } from "@/data/cities";

// Common Massachusetts zipcodes (can be expanded)
const ZIPCODE_PATTERNS = /^\d{5}$/;

export default function CitySearchBar({ currentCity }) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length >= 1) {
      // Filter cities that match the search
      const filtered = searchCities(value).filter(city => city.slug !== currentCity);

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!location.trim()) return;

    // Check if it's a zipcode
    if (ZIPCODE_PATTERNS.test(location.trim())) {
      // Navigate to zipcode page (when implemented)
      window.location.href = `/${location.trim()}`;
      return;
    }

    // Check if it matches a city
    const matchedCity = AVAILABLE_CITIES.find(city => 
      city.name.toLowerCase() === location.toLowerCase() ||
      city.slug.toLowerCase() === location.toLowerCase()
    );

    if (matchedCity) {
      window.location.href = `/${matchedCity.slug}`;
    } else {
      // If no match, go to home page with search query
      window.location.href = `/?location=${encodeURIComponent(location)}`;
    }
  };

  const handleSuggestionClick = (citySlug) => {
    setShowSuggestions(false);
    window.location.href = `/${citySlug}`;
  };

  const handleFocus = () => {
    if (location.length >= 1 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 p-1 flex gap-1.5">
        <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-all duration-200">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search other cities or enter zipcode..."
            className="bg-transparent w-full text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!location.trim()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-200 whitespace-nowrap active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-72 overflow-y-auto">
          {suggestions.map((city) => (
            <button
              key={city.slug}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur
                handleSuggestionClick(city.slug);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{city.name}</div>
                <div className="text-xs text-gray-500">{city.state}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
