import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Search Your City',
    description: 'Enter your city to find local disposal regulations, drop-off locations, and available services.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose Your Option',
    description: 'Self-haul to a free drop-off site, or book a professional pickup from your doorstep.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Sit Back & Relax',
    description: 'Our vetted professionals handle everything. Eco-friendly disposal guaranteed.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image side */}
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
              <Image
                src="/images/booking-process.jpg"
                alt="Woman booking mattress pickup service on her smartphone"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2830]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-0 bg-white rounded-2xl shadow-xl p-5 border border-[#e2e8ed]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#1a2830] font-bold text-lg">2 min</p>
                  <p className="text-[#5a6e78] text-xs">Average booking time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps side */}
          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-[#e8734a]/10 text-[#e8734a] rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-[#1a2830] font-bold text-4xl md:text-5xl mb-6 text-balance">
              Three simple steps to a clutter-free home
            </h2>
            <p className="text-[#5a6e78] text-lg mb-12 leading-relaxed">
              Our streamlined process gets your old mattress out of the way fast, whether you do it yourself or let us handle it.
            </p>

            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#e8734a]/10 text-[#e8734a] flex items-center justify-center group-hover:bg-[#e8734a] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px h-full bg-[#e2e8ed] mt-3" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-[#e8734a] text-xs font-bold tracking-wider uppercase mb-1">Step {step.number}</p>
                    <h3 className="text-[#1a2830] font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-[#5a6e78] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
