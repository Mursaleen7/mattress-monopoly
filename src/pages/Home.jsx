import { useState } from "react";
import HeroSection from "@/components/marketplace/HeroSection.jsx";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import ProFeed from "@/components/marketplace/ProFeed";
import UGCCarousel from "@/components/marketplace/UGCCarousel";
import MarketplaceFooter from "@/components/marketplace/MarketplaceFooter";

export default function Home() {
  const [filters, setFilters] = useState({
    ecoFriendly: false,
    sameDay: false,
    licensed: false,
    upfrontPricing: false,
    maxPrice: 300,
  });

  const [searchQuery, setSearchQuery] = useState({ service: "Mattress", location: "" });

  const city = "Los Angeles";
  const zip = "90012";

  return (
    <div className="min-h-screen bg-background font-sans">
      <HeroSection city={city} onSearch={setSearchQuery} searchQuery={searchQuery} />

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
