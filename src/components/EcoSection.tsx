import Image from 'next/image';

const stats = [
  { value: '20M', label: 'Mattresses dumped in U.S. landfills yearly' },
  { value: '95%', label: 'Of mattress materials are recyclable' },
  { value: '23 ft\u00B3', label: 'Landfill space saved per mattress recycled' },
];

export default function EcoSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Image side */}
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] max-w-lg mx-auto">
              <Image
                src="/images/eco-recycling.jpg"
                alt="Workers at a mattress recycling facility sorting materials"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2830]/20 to-transparent" />
            </div>
          </div>

          {/* Content side */}
          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              Sustainability
            </span>
            <h2 className="text-[#1a2830] font-bold text-4xl md:text-5xl mb-6 text-balance">
              Every mattress we collect gets a second life
            </h2>
            <p className="text-[#5a6e78] text-lg mb-10 leading-relaxed">
              We partner with certified recycling facilities to ensure steel springs, foam, fabric, and wood are all properly separated and repurposed. No mattress goes to waste.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-3xl font-extrabold text-[#e8734a] mb-1">{stat.value}</p>
                  <p className="text-[#5a6e78] text-sm leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
