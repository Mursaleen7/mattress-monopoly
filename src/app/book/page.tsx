'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Hero */}
      <section className="bg-[#1a2830] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-white font-extrabold text-3xl md:text-4xl mb-3">
            Schedule Your Pickup
          </h1>
          <p className="text-[#8a9ca5]">
            Fast, professional, and eco-friendly removal service
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10 pb-16">
        {/* Progress Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8ed] p-4 mb-6">
          <div className="flex justify-between items-center max-w-sm mx-auto">
            {[
              { num: 1, label: 'Details' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Contact' },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center">
                {i > 0 && <div className="w-12 sm:w-16 h-px bg-[#e2e8ed] mx-2" />}
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step.num === 1
                      ? 'bg-[#e8734a] text-white'
                      : 'bg-[#f0f3f5] text-[#8a9ca5]'
                  }`}>
                    {step.num}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${
                    step.num === 1 ? 'text-[#e8734a]' : 'text-[#8a9ca5]'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8ed] p-6 md:p-8">
          {/* Location */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1a2830] mb-5">Pickup Location</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="78701"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1a2830] mb-5">Preferred Date</h2>
            <div className="border border-[#e2e8ed] rounded-xl p-4">
              <div className="text-center mb-3">
                <h3 className="font-semibold text-[#1a2830] text-sm">February 2026</h3>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="font-semibold text-[#8a9ca5] py-1.5">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`py-2 rounded-lg text-sm transition-all ${
                      selectedDate === day
                        ? 'bg-[#e8734a] text-white font-bold'
                        : day === 15
                          ? 'bg-[#e8734a]/10 text-[#e8734a] font-semibold'
                          : 'text-[#3a4d54] hover:bg-[#f0f3f5]'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1a2830] mb-5">What do you need removed?</h2>
            <textarea
              placeholder="Describe the items and their location (e.g., queen mattress in upstairs bedroom, old couch in garage)..."
              rows={4}
              className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm resize-none"
            />
          </div>

          {/* Contact Info */}
          <div className="mb-8 pt-6 border-t border-[#e2e8ed]">
            <h2 className="text-lg font-bold text-[#1a2830] mb-5">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(512) 555-0123"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830] text-sm"
              />
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-[#e8734a] hover:bg-[#d4623b] text-white py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
            Request Pickup Quote
            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="text-center text-[#8a9ca5] text-xs mt-4">
            No payment required now. We will send you a quote within 1 hour.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
