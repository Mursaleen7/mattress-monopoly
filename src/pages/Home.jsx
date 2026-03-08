import { useState, useEffect } from "react";
import HeroSection from "@/components/marketplace/HeroSection.jsx";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import ProFeed from "@/components/marketplace/ProFeed";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MarketplaceFooter from "@/components/marketplace/MarketplaceFooter";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function Home() {
  const [filters, setFilters] = useState({
    ecoFriendly: false,
    sameDay: false,
    licensed: false,
    upfrontPricing: false,
    maxPrice: 300,
  });

  const [searchQuery, setSearchQuery] = useState({ service: "Mattress", location: "" });
  const { location, error, loading } = useGeolocation();

  // Default location (fallback)
  const [city, setCity] = useState("Los Angeles");
  const [zip, setZip] = useState("90012");

  // Update city and zip when location is detected
  useEffect(() => {
    if (location) {
      setCity(location.city);
      setZip(location.zip);
      // Auto-populate search location
      setSearchQuery(prev => ({ ...prev, location: `${location.city}, ${location.state}` }));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <HeroSection city={city} onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Spacer to maintain layout - responsive */}
      <div className="h-6 sm:h-8 md:h-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-4">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <ProFeed city={city} zip={zip} filters={filters} />
            <UGCCarousel city={city} />
          </main>
        </div>
      </div>

      <MarketplaceFooter city={city} />
    </div>
  );
}
