import React from "react";
import { Star, BadgeCheck, Clock, Play, ShieldCheck, Leaf, ChevronRight, MapPin, MessageSquare } from "lucide-react";

export default function ProCard({ pro }) {
  return (
    <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex flex-col sm:flex-row">
        {/* Left: Media */}
        <div className="sm:w-56 flex-shrink-0 relative overflow-hidden bg-gray-100 h-44 sm:h-auto">
          <img
            src={pro.mainImage}
            alt={pro.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Before/After pill */}
          <div className="absolute bottom-2 left-2 right-2 flex gap-1">
            <div className="relative flex-1 overflow-hidden rounded-lg h-10">
              <img src={pro.beforeImage} alt="Before" className="w-full h-full object-cover opacity-90" />
              <span className="absolute top-0.5 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">B4</span>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-lg h-10">
              <img src={pro.afterImage} alt="After" className="w-full h-full object-cover" />
              <span className="absolute top-0.5 left-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">AFTER</span>
            </div>
          </div>

          {pro.hasVideo && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Play className="w-2.5 h-2.5 text-white fill-white" />
              <span className="text-white text-[10px] font-bold">Video</span>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            {/* Name + Price */}
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{pro.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" fill="#DBEAFE" />
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {pro.location}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-green-600 font-black text-lg leading-none">{pro.price}</div>
                <div className="text-gray-400 text-[11px]">avg. quote</div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-red-500" fill={i <= Math.floor(pro.rating) ? "#EF4444" : "none"} />
                ))}
                <span className="text-gray-800 font-bold text-sm ml-1">{pro.rating}</span>
              </div>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> {pro.reviewCount} reviews
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-xs">{pro.hires} hires</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {pro.responseTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pro.tags.map((tag, i) => (
                <span key={i} className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${tag.style}`}>
                  {tag.icon && <tag.icon className="w-3 h-3" />}
                  {tag.label}
                </span>
              ))}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{pro.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-gray-100">
            <button className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-sm transition-all shadow-sm shadow-red-200">
              Get a Quote
            </button>
            <button className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl text-sm transition-all hover:bg-gray-50">
              View Profile
            </button>
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors whitespace-nowrap ml-auto">
              Reviews <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
