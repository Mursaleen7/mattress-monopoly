'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['mattress']);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const items = [
    { id: 'mattress', name: 'Mattress (Queen/King)', price: 89 },
    { id: 'boxspring', name: 'Box Spring', price: 35 },
    { id: 'bedframe', name: 'Bed Frame', price: 20 },
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalPrice = items
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Hero Banner with image */}
      <section className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src="/images/paid-pickup.jpg"
          alt="Professional mattress pickup service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a2830]/80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white font-extrabold text-3xl md:text-4xl mb-2">
              Schedule Your Pickup
            </h1>
            <p className="text-[#b0c4ce] text-base">
              Fast, professional, and eco-friendly mattress removal
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        {/* Progress Stepper */}
        <div className="bg-white rounded-2xl shadow-md border border-[#e2e8ed] p-4 mb-6">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-[#e8734a] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="ml-2 font-semibold text-[#e8734a] text-sm">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-[#e2e8ed] mx-3" />
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-[#e2e8ed] text-[#8a9ca5] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="ml-2 font-semibold text-[#8a9ca5] text-sm">Items</span>
            </div>
            <div className="flex-1 h-0.5 bg-[#e2e8ed] mx-3" />
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-[#e2e8ed] text-[#8a9ca5] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="ml-2 font-semibold text-[#8a9ca5] text-sm">Payment</span>
            </div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-md border border-[#e2e8ed] p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column: Location & Date */}
            <div>
              <h2 className="text-lg font-bold text-[#1a2830] mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#e8734a]/10 text-[#e8734a] flex items-center justify-center text-xs font-bold">1</span>
                Your Location & Date
              </h2>

              {/* Zip Code Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="78701"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830]"
                />
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Select Date
                </label>
                <div className="border border-[#e2e8ed] rounded-xl p-4 bg-white">
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-[#1a2830] text-sm">February 2026</h3>
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
                        className={`py-1.5 rounded-lg text-sm transition-all ${
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
            </div>

            {/* Right Column: Item Selection */}
            <div>
              <h2 className="text-lg font-bold text-[#1a2830] mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#e8734a]/10 text-[#e8734a] flex items-center justify-center text-xs font-bold">2</span>
                Select Items
              </h2>

              {/* Item List */}
              <div className="flex flex-col gap-3 mb-5">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 text-left ${
                      selectedItems.includes(item.id)
                        ? 'border-[#e8734a] bg-[#e8734a]/5'
                        : 'border-[#e2e8ed] hover:border-[#8a9ca5]'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedItems.includes(item.id)
                          ? 'border-[#e8734a] bg-[#e8734a]'
                          : 'border-[#c4d0d6]'
                      }`}>
                        {selectedItems.includes(item.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[#1a2830] font-medium text-sm">{item.name}</span>
                    </div>
                    <span className="font-bold text-[#1a2830]">
                      ${item.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Total Bar */}
              <div className="bg-[#f0f3f5] rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#1a2830]">Total Estimate:</span>
                  <span className="font-extrabold text-2xl text-[#e8734a]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 mt-4 text-xs text-[#8a9ca5]">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Satisfaction guaranteed
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Contact & Payment */}
          <div className="border-t border-[#e2e8ed] pt-8">
            <h2 className="text-lg font-bold text-[#1a2830] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#e8734a]/10 text-[#e8734a] flex items-center justify-center text-xs font-bold">3</span>
              Contact & Payment
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-[#e2e8ed] rounded-xl focus:ring-2 focus:ring-[#e8734a]/30 focus:border-[#e8734a] outline-none transition-all text-[#1a2830]"
                />
              </div>
            </div>

            {/* Payment Placeholder */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a4d54] mb-2">
                Payment Method
              </label>
              <div className="flex items-center justify-between p-4 border border-[#e2e8ed] rounded-xl bg-[#f8f9fa]">
                <span className="text-[#3a4d54] text-sm font-medium">Credit Card</span>
                <span className="text-xs text-[#8a9ca5]">Visa / Mastercard / Amex</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#e8734a] hover:bg-[#d4623b] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              Book Now - ${totalPrice.toFixed(2)}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
