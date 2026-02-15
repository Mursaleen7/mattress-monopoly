import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Austin, TX',
    quote: 'I was dreading getting rid of our old king-size mattress. Booked a pickup on Monday, they came Tuesday morning. The crew was professional, friendly, and had it out in under 10 minutes. Worth every penny.',
    image: '/images/testimonial-1.jpg',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    location: 'Denver, CO',
    quote: 'Used the self-haul guide to find my nearest drop-off. The city regulations were clearly laid out and I saved myself a $250 illegal dumping fine. This site is a lifesaver for anyone moving.',
    image: '/images/testimonial-2.jpg',
    rating: 5,
  },
  {
    name: 'Linda Chen',
    location: 'Portland, OR',
    quote: 'As a senior living alone, I could not move a mattress myself. The pickup team was gentle, respectful, and took care of everything. They even swept where the old mattress had been sitting. Five stars.',
    image: '/images/testimonial-3.jpg',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#e8734a]/10 text-[#e8734a] rounded-full text-sm font-semibold mb-4">
            Customer Stories
          </span>
          <h2 className="text-[#1a2830] font-bold text-4xl md:text-5xl mb-4 text-balance">
            Trusted by thousands of homeowners
          </h2>
          <p className="text-[#5a6e78] text-lg max-w-2xl mx-auto leading-relaxed">
            Real experiences from people who made disposal simple
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#e2e8ed] hover:shadow-lg transition-shadow duration-300"
            >
              <StarRating count={testimonial.rating} />
              <blockquote className="text-[#3a4d54] leading-relaxed mt-4 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-[#e2e8ed]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} - customer testimonial`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[#1a2830] font-bold text-sm">{testimonial.name}</p>
                  <p className="text-[#8a9ca5] text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
