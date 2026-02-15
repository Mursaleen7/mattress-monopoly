'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['mattress']);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <span className="ml-2 font-semibold text-blue-600">Location</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 font-semibold text-gray-600">Items</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 font-semibold text-gray-600">Payment</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Schedule Your Fast Pickup
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column: Location & Date */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Your Location & Date
              </h2>

              {/* Zip Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="78701"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  {/* Simple Calendar Grid */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900">February 2026</h3>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div key={day} className="font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(2026, 1, day))}
                        className={`py-2 rounded-lg hover:bg-blue-100 transition ${
                          day === 15
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-gray-700'
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Select Items
              </h2>

              {/* Item List */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Bar */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Estimate:</span>
                  <span className="font-bold text-2xl text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Contact & Payment */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Contact & Payment
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Payment Placeholder */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
                <span className="text-gray-700">Credit Card</span>
                <div className="flex gap-2">
                  <span className="text-2xl">💳</span>
                  <span className="text-sm text-gray-600">Visa • Mastercard</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-lg font-bold text-lg transition shadow-lg">
              Book Now
            </button>
          </div>
        </div>

        {/* Trust Text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          🔒 Secure payment • Vetted partners • Satisfaction guaranteed
        </p>
      </div>

      <Footer />
    </main>
  );
}
