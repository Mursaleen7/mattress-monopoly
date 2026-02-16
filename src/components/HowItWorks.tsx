import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Search Your City',
    description: 'Enter your city to find local disposal regulations, drop-off locations, and available services.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose Your Option',
    description: 'Self-haul to a free drop-off site, or book a professional pickup from your doorstep.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Done',
    description: 'Our vetted professionals handle the rest. Eco-friendly disposal guaranteed.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Image side */}
          <div className="flex-1 relative max-w-lg mx-auto lg:mx-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src="/images/booking-process.jpg"
                alt="Booking a pickup service on a smartphone"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Steps side */}
          <div className="flex-1">
            <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-[#1A1A1A] font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              Three simple steps
            </h2>
            <p className="text-[#808080] text-xl mb-14 leading-relaxed">
              Our streamlined process gets your items out of the way fast, whether you do it yourself or let us handle it.
            </p>

            <div className="flex flex-col gap-10">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 text-[#1A1A1A] flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-[#1A1A1A] transition-all duration-300 shadow-md">
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 mt-4" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-[#808080] text-xs font-bold tracking-wider uppercase mb-2">Step {step.number}</p>
                    <h3 className="text-[#1A1A1A] font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-[#808080] leading-relaxed">{step.description}</p>
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
