import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Mattress Disposal Guide',
  description: 'Get in touch with our team for questions about mattress disposal, recycling, or our services. We\'re here to help.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFD700] focus:text-[#1A1A1A] focus:rounded-lg focus:font-bold">
        Skip to main content
      </a>
      
      <Header />
      
      <div id="main-content">
        {/* Hero Section */}
        <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-main.jpg"
              alt="Contact our mattress disposal team"
              fill
              className="object-cover object-center"
              priority
              quality={95}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/75 to-black/75" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-[#FFD700]/20 text-[#FFD700] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                Get In Touch
              </span>
              <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight">
                We're Here to Help
              </h1>
              <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed font-light max-w-2xl">
                Questions about disposal regulations or our services? Our team responds within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Card */}
              <a href="tel:+18005551234" className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-[#FFD700] transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-7 h-7 text-[#FFD700] group-hover:text-[#1A1A1A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Call Us</h3>
                <p className="text-[#0055FF] font-bold text-lg mb-1 group-hover:text-[#0044CC] transition-colors">1-800-555-1234</p>
                <p className="text-[#808080] text-sm">Mon-Fri, 8am-6pm EST</p>
              </a>

              {/* Email Card */}
              <a href="mailto:support@mattressdisposal.guide" className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-[#0055FF] transition-all duration-500 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-[#0055FF]/10 flex items-center justify-center mb-5 group-hover:bg-[#0055FF] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-7 h-7 text-[#0055FF] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Email Us</h3>
                <p className="text-[#0055FF] font-bold text-sm mb-1 group-hover:text-[#0044CC] transition-colors break-all">support@mattressdisposal.guide</p>
                <p className="text-[#808080] text-sm">24-hour response time</p>
              </a>

              {/* Live Chat Card */}
              <button className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-[#FFD700] transition-all duration-500 transform hover:-translate-y-1 text-left">
                <div className="w-14 h-14 rounded-xl bg-[#0055FF]/10 flex items-center justify-center mb-5 group-hover:bg-[#0055FF] transition-all duration-500 group-hover:scale-110">
                  <svg className="w-7 h-7 text-[#0055FF] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Live Chat</h3>
                <p className="text-[#0055FF] font-bold text-lg mb-1 group-hover:text-[#0044CC] transition-colors">Start Chat</p>
                <p className="text-[#808080] text-sm">Available 9am-5pm EST</p>
              </button>
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20 sm:py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight">
                  Send us a message
                </h2>
                <p className="text-[#808080] text-lg mb-10 leading-relaxed">
                  Fill out the form and we'll respond within 24 hours on business days.
                </p>
                <ContactForm />
              </div>

              {/* Info Sidebar - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
                  <Image
                    src="/images/clean-room.jpg"
                    alt="Professional customer service team ready to help"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info Cards */}
                <div className="space-y-4">
                  {/* Response Time */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-1">Fast Response</h4>
                        <p className="text-[#808080] text-sm leading-relaxed">We typically respond within 24 hours on business days</p>
                      </div>
                    </div>
                  </div>

                  {/* Support Hours */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-1">Business Hours</h4>
                        <p className="text-[#808080] text-sm leading-relaxed">Monday - Friday<br />8:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-1">Service Area</h4>
                        <p className="text-[#808080] text-sm leading-relaxed">Nationwide coverage across major US cities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-4 py-2 bg-gray-100 text-[#1A1A1A] rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                Quick Answers
              </span>
              <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-[#808080] text-lg leading-relaxed">
                Find answers to common questions about our service
              </p>
            </div>

            <div className="space-y-4">
              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    How do I find disposal options for my city?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    Use the search bar on our home page to find your city. Each city guide includes local regulations, drop-off locations, facility hours, and professional pickup options with pricing.
                  </p>
                </div>
              </details>

              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    Do you offer same-day pickup services?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    Yes! Our partner services offer same-day and next-day pickup in most major cities. Availability depends on your location and current demand. Book online to see available time slots.
                  </p>
                </div>
              </details>

              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    How much does professional pickup cost?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    Pricing varies by location and typically ranges from $80-$150 per mattress. Each city guide shows local pricing from our vetted partners. You'll see the exact cost before booking.
                  </p>
                </div>
              </details>

              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    Is the information on your site up to date?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    We regularly update our city guides with the latest regulations and disposal options. Each guide displays a "Last Updated" date so you know the information is current.
                  </p>
                </div>
              </details>

              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    Can I suggest a city to add?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    Absolutely! Use the contact form above and select "Suggest a City" as your subject. We're constantly expanding our coverage based on user requests.
                  </p>
                </div>
              </details>

              <details className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-[#0055FF]">
                <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                  <h3 className="font-bold text-lg text-[#1A1A1A] pr-4">
                    Are your disposal partners eco-friendly?
                  </h3>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-all duration-300">
                    <svg className="w-5 h-5 text-[#808080] group-hover:text-[#1A1A1A] group-open:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[#808080] leading-relaxed">
                    Yes. All our partner services work with certified recycling facilities that properly separate and repurpose materials. We prioritize sustainability in every partnership.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-[#1A1A1A] font-black text-3xl md:text-4xl mb-4 tracking-tight">
                Why choose us?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#0055FF]/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#0055FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Licensed & Insured</h3>
                <p className="text-[#808080] leading-relaxed">All partner services are fully vetted and insured for your peace of mind</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Flexible Scheduling</h3>
                <p className="text-[#808080] leading-relaxed">Same-day and next-day appointments available in most areas</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#0055FF]/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#0055FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">Eco-Friendly</h3>
                <p className="text-[#808080] leading-relaxed">Materials recycled through certified facilities to minimize landfill waste</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
