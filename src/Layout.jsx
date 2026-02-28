import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Truck, Menu, X, Phone } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV = [
    { label: "Find Pros", page: "Home" },
    { label: "Cities", page: "City" },
    { label: "Municipalities", page: "Municipality" },
    { label: "Zip Codes", page: "ZipCode" },
    { label: "About", page: "About" },
    { label: "Contact", page: "Contact" },
    { label: "Legal", page: "Legal" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-gray-900 text-base tracking-tight">DisposalGrid</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, page }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentPageName === page 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">1-800-HAUL-NOW</span>
            </div>
            <Link 
              to={createPageUrl("Home")} 
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {NAV.map(({ label, page }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPageName === page 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link 
              to={createPageUrl("Home")} 
              className="mt-2 bg-blue-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl text-center"
            >
              Get Free Quote
            </Link>
          </div>
        )}
      </nav>

      {children}
    </div>
  );
}
