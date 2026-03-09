import React from "react";
import { ChevronRight, MapPin, Zap, ShieldCheck, Star, Clock, Users, TrendingUp } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function CityHero({ data }) {
  const { city, state, stateAbbr, heroHookStatement, fineAmount, lastUpdated, zipCodes, population } = data;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Organic blob shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      {/* Breadcrumb */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
          <a href={createPageUrl("Home")} className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-4 h-4" />
          <span>Cities</span>
          <ChevronRight className="w-4 h-4" />
          <span>{state}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-semibold">{city}</span>
        </nav>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Main content - wider */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-foreground text-sm font-semibold">
                Live in {city}, {stateAbbr}
              </span>
              <span className="text-muted-foreground text-sm">Updated {lastUpdated}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-6 text-balance">
              Your Local<br />
              <span className="text-primary">Mattress Disposal</span><br />
              Marketplace
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl font-medium mb-8 max-w-xl leading-relaxed">
              Connect with verified haulers, compare prices, and book eco-friendly removal in {city}. No trucks, no hassle.
            </p>

            {/* Stats row - marketplace style */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">47+</p>
                  <p className="text-sm text-muted-foreground">Active Haulers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-500/15 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">2.3K</p>
                  <p className="text-sm text-muted-foreground">Jobs Done</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-3 justify-center">
                <Zap className="w-5 h-5" />
                Get Instant Quotes
              </button>
              <button className="border-2 border-border hover:border-primary/50 bg-card text-foreground font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-secondary flex items-center gap-3 justify-center">
                <Clock className="w-5 h-5" />
                Compare Haulers
              </button>
            </div>
          </div>

          {/* Right: Visual bento grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Featured image - large */}
              <div className="col-span-2 relative h-56 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Professional mattress removal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-primary-foreground">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Verified Local Pros</span>
                  </div>
                </div>
              </div>
              
              {/* Warning card */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mb-3">
                  <span className="text-lg">!</span>
                </div>
                <div>
                  <p className="text-red-800 text-xs font-bold uppercase tracking-wider mb-1">Fine Warning</p>
                  <p className="text-red-900 text-xl font-black">{fineAmount}</p>
                  <p className="text-red-700 text-xs">Illegal dumping fine</p>
                </div>
              </div>
              
              {/* Map card */}
              <div className="relative rounded-2xl overflow-hidden bg-primary/5 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&q=80"
                  alt={`${city} area`}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-accent rounded-full shadow-lg z-10 relative" />
                    <div className="absolute inset-0 -m-3 w-10 h-10 rounded-full border-2 border-accent/60 animate-ping" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-foreground text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {city}
                </div>
              </div>
            </div>

            {/* Zip codes */}
            <div className="mt-4 flex flex-wrap gap-2">
              {zipCodes.slice(0, 4).map(z => (
                <span key={z} className="bg-card border border-border text-muted-foreground text-xs font-mono px-3 py-1.5 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                  {z}
                </span>
              ))}
              {zipCodes.length > 4 && (
                <span className="bg-secondary text-primary text-xs font-semibold px-3 py-1.5 rounded-lg">
                  +{zipCodes.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
