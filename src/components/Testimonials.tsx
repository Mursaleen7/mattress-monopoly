import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Austin, TX',
    quote: 'I was dreading getting rid of our old mattress. Booked a pickup on Monday, they came Tuesday morning. The crew was professional, friendly, and had everything out in under 10 minutes.',
    image: '/images/testimonial-1.jpg',
  },
  {
    name: 'Marcus Johnson',
    location: 'Denver, CO',
    quote: 'Used the self-haul guide to find my nearest drop-off. The city regulations were clearly laid out and I saved myself a $250 illegal dumping fine. This site is a lifesaver for anyone moving.',
    image: '/images/testimonial-2.jpg',
  },
  {
    name: 'Linda Chen',
    location: 'Portland, OR',
    quote: 'As a senior living alone, I could not move my old mattress myself. The pickup team was gentle, respectful, and took care of everything. They even cleaned up afterward.',
    image: '/images/testimonial-3.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Customer Stories
          </span>
          <h2 className="text-[#1A1A1A] font-bold text-4xl md:text-5xl mb-4">
            What our customers say
          </h2>
          <p className="text-[#808080] text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from people who made disposal simple
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-lg hover:border-[#0055FF] transition-all duration-300"
            >
              <svg className="w-8 h-8 text-[#FFD700] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-[#1A1A1A] leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-300">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[#1A1A1A] font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-[#808080] text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
