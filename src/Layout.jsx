import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-0 group">
            <span className="font-black text-foreground text-xl tracking-tight italic">
              <span className="text-primary">Disposal</span>
              <span className="text-accent">Grid</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, page }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentPageName === page 
                    ? "bg-accent/10 text-accent-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">1-800-HAUL-NOW</span>
            </div>
            <Link 
              to={createPageUrl("Home")} 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1">
            {NAV.map(({ label, page }) => (
              <Link
                key={page}
                to={createPageUrl(page)}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPageName === page 
                    ? "bg-accent/10 text-accent-foreground" 
                    : "text-card-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link 
              to={createPageUrl("Home")} 
              className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-bold px-4 py-2.5 rounded-xl text-center"
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
