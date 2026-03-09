import React, { useState, useEffect } from "react";
import { Star, BadgeCheck, Clock, Play, ShieldCheck, Leaf, ChevronRight, MapPin, MessageSquare, TrendingUp, Users, Zap } from "lucide-react";

export default function ProCard({ pro }) {
  const [viewingNow, setViewingNow] = useState(Math.floor(Math.random() * 8) + 3);
  const [bookedRecently, setBookedRecently] = useState(Math.floor(Math.random() * 5) + 1);
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const viewInterval = setInterval(() => {
      setViewingNow(prev => Math.max(1, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000 + Math.random() * 5000);

    const bookInterval = setInterval(() => {
      setBookedRecently(prev => Math.min(prev + 1, 20));
    }, 30000 + Math.random() * 30000);

    const onlineInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 20000);

    return () => {
      clearInterval(viewInterval);
      clearInterval(bookInterval);
      clearInterval(onlineInterval);
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 group shadow-sm">
      <div className="flex flex-col sm:flex-row">
        {/* Left: Media */}
        <div className="sm:w-56 flex-shrink-0 relative overflow-hidden bg-gray-100 h-44 sm:h-auto">
          <img
            src={pro.mainImage}
            alt={pro.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Online/Availability Status */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <div className={`flex items-center gap-1.5 ${isOnline ? 'bg-green-500' : 'bg-gray-500'} text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg`}>
              <span className="relative flex h-1.5 w-1.5">
                {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              {isOnline ? 'Online Now' : 'Away'}
            </div>
            {pro.features?.sameDay && (
              <div className="bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Same-Day
              </div>
            )}
          </div>

          {/* Live viewers */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Users className="w-3 h-3" />
              {viewingNow} viewing
            </div>
            <div className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              {bookedRecently} booked today
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            {/* Name + Price */}
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-card-foreground text-base leading-tight truncate">{pro.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" fill="hsl(var(--secondary))" />
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {pro.location}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-green-600 font-black text-lg leading-none">{pro.price}</div>
                <div className="text-gray-500 text-[11px]">avg. quote</div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400" fill={i <= Math.floor(pro.rating) ? "#FBBF24" : "none"} />
                ))}
                <span className="text-gray-800 font-bold text-sm ml-1">{pro.rating}</span>
              </div>
              <span className="text-gray-600 text-xs flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> {pro.reviewCount} reviews
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-600 text-xs">{pro.hires} hires</span>
              <span className="text-gray-400">·</span>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <Clock className="w-3 h-3" /> Responds in {pro.responseTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pro.tags.map((tag, i) => (
                <span key={i} className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-sm transition-all duration-200 hover:shadow-md ${tag.style}`}>
                  {tag.icon && <tag.icon className="w-3 h-3" />}
                  {tag.label}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pro.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-border">
            <button className="bg-accent hover:opacity-90 active:scale-95 text-accent-foreground font-bold py-2.5 px-5 rounded-xl text-sm transition-all duration-200 shadow-sm focus:ring-2 focus:ring-accent focus:ring-offset-2">
              Get a Quote
            </button>
            <button className="flex-1 border border-border hover:border-primary/50 text-card-foreground font-medium py-2.5 px-4 rounded-xl text-sm transition-all duration-200 hover:bg-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 shadow-sm">
              View Profile
            </button>
            <button className="flex items-center gap-1 text-primary hover:opacity-80 text-sm font-semibold transition-all duration-200 whitespace-nowrap ml-auto focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
              Reviews <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
