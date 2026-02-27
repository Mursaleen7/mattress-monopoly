import React, { useEffect, useRef, useState } from "react";
import { Play, ShieldCheck, Leaf, Tag, Award, Truck, Users, MapPin, Recycle, Clock, Star } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { value: 4800, suffix: "+", label: "Vetted Local Pros", icon: Users, color: "blue" },
  { value: 12400, suffix: "", prefix: "", label: "Tons Diverted from Landfills", icon: Recycle, color: "green" },
  { value: 12, suffix: " Min", label: "Average Response Time", icon: Clock, color: "yellow" },
  { value: 320, suffix: "+", label: "Cities Covered", icon: MapPin, color: "purple" },
];

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: "Multi-Layer Background Verification",
    body: "Every hauler on DisposalGrid undergoes a 7-point identity and criminal background check through our certified third-party screening partner. We re-verify annually. No exceptions.",
    color: "blue"
  },
  {
    icon: Leaf,
    title: "Eco-Disposal Certification Required",
    body: "We mandate proof of eco-compliant disposal partnerships for every pro in our network. At least 70% of collected materials must be diverted from landfills via recycling or donation.",
    color: "green"
  },
  {
    icon: Tag,
    title: "Price Transparency Enforcement",
    body: "Pros must provide itemized, upfront quotes before any job begins. Hidden fees result in immediate suspension. Our pricing audit system flags anomalies in real-time.",
    color: "purple"
  },
];

const GRID_IMAGES = [
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", span: "col-span-2 row-span-2", label: "Fleet Operations, LA" },
  { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", span: "col-span-1 row-span-1", label: "Eco Sort Facility" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", span: "col-span-1 row-span-1", label: "Residential Haul" },
  { url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80", span: "col-span-1 row-span-2", label: "Pro Network Onboarding" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", span: "col-span-1 row-span-1", label: "Mattress Recycling" },
  { url: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&q=80", span: "col-span-1 row-span-1", label: "Job Completion" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Our Story & Mission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-[1.08] tracking-tight mb-6">
              Engineering a<br />
              <span className="text-blue-400">Cleaner Local Economy.</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              DisposalGrid was built to solve a $12 billion problem: opaque pricing, unvetted haulers, and landfill-first disposal. We connect local communities with verified, eco-compliant removal professionals — instantly.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              Our technology stack aggregates, vets, and routes disposal jobs at scale — turning a historically informal industry into a transparent, accountable marketplace.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-800 shadow-2xl shadow-black/50 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
              alt="Operations" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">▶ Watch: How DisposalGrid Works</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, suffix, prefix = "", label, icon: Icon, color }, i) => (
              <div key={i} className="text-center group">
                <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div className="text-4xl font-black text-gray-900 tracking-tight">
                  <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
                </div>
                <div className="text-gray-500 text-sm font-medium mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry UGC Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">The Network at Work</h2>
            <p className="text-gray-500 mt-2">Behind every quote is a verified, eco-trained local professional.</p>
          </div>

          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[480px]">
            {GRID_IMAGES.map(({ url, span, label }, i) => (
              <div key={i} className={`${span} relative overflow-hidden rounded-2xl group cursor-pointer`}>
                <img 
                  src={url} 
                  alt={label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Hauler Standards</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Every professional listed on DisposalGrid passes our strict three-pillar vetting process before accepting a single job.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STANDARDS.map(({ icon: Icon, title, body, color }, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
                <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center mb-5`}>
                  <Icon className={`w-7 h-7 text-${color}-600`} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
