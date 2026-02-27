import React, { useState } from "react";
import { MapPin, MessageSquare, Users, Newspaper, ChevronDown, Send } from "lucide-react";

const DEPARTMENTS = [
  {
    icon: MessageSquare,
    title: "Customer Dispute Resolution",
    desc: "Issues with a completed job, pricing dispute, or hauler conduct.",
    sla: "Response within 4 business hours",
    color: "blue"
  },
  {
    icon: Users,
    title: "Pro Network Onboarding",
    desc: "Apply to join the DisposalGrid hauler network or manage your existing pro listing.",
    sla: "Response within 1 business day",
    color: "green"
  },
  {
    icon: Newspaper,
    title: "Press & Media Relations",
    desc: "Data requests, partnership opportunities, and press kit access.",
    sla: "Response within 2 business days",
    color: "purple"
  },
];

const USER_TYPES = ["Customer", "Local Hauler / Pro", "Press / Media", "Investor"];

const HELP_TOPICS = {
  Customer: ["Job Dispute", "Billing Issue", "Find a Pro", "Cancel a Booking", "Leave a Review"],
  "Local Hauler / Pro": ["Join the Network", "Update My Listing", "Pricing Dispute", "Account Suspension"],
  "Press / Media": ["Data & Statistics Request", "Interview Request", "Press Kit", "Partnership Inquiry"],
  Investor: ["Investment Inquiry", "Company Financials", "Deck Request"],
};

export default function Contact() {
  const [userType, setUserType] = useState("");
  const [helpTopic, setHelpTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const topics = userType ? HELP_TOPICS[userType] || [] : [];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <section className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">National Support & Local Dispatch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Contact DisposalGrid</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our smart routing system connects your inquiry directly to the right department — no hold music, no generic inboxes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Map + Departments */}
          <div>
            {/* Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden h-56 mb-8 bg-gray-100 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80"
                alt="Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> 320+ Active Service Zones
                </span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-wrap justify-center gap-2">
                  {["Los Angeles", "Chicago", "Houston", "Phoenix", "Dallas"].map(city => (
                    <span key={city} className="bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      📍 {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Departments */}
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Route to a Department</h2>
            <div className="flex flex-col gap-4">
              {DEPARTMENTS.map(({ icon: Icon, title, desc, sla, color }, i) => (
                <div key={i} className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className={`w-11 h-11 rounded-xl bg-${color}-50 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      ⏱ {sla}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Smart Triage Form */}
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-5">
                <h2 className="font-extrabold text-gray-900 text-lg">Smart Routing Form</h2>
                <p className="text-gray-500 text-sm mt-1">Answer two quick questions to route your request instantly.</p>
              </div>

              {submitted ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-xl mb-2">Request Routed Successfully</h3>
                  <p className="text-gray-500">Your inquiry has been dispatched to the correct department. Expect a response within our stated SLA window.</p>
                </div>
              ) : (
                <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  {/* Routing Dropdowns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">I am a...</label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-blue-400"
                          value={userType}
                          onChange={(e) => { setUserType(e.target.value); setHelpTopic(""); }}
                          required
                        >
                          <option value="">Select...</option>
                          {USER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">I need help with...</label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-blue-400 disabled:opacity-50"
                          value={helpTopic}
                          onChange={(e) => setHelpTopic(e.target.value)}
                          disabled={!userType}
                          required
                        >
                          <option value="">Select...</option>
                          {topics.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                      <input required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-400 placeholder-gray-400" placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Zip Code</label>
                      <input required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-400 placeholder-gray-400" placeholder="90012" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-400 placeholder-gray-400" placeholder="jane@email.com" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                    <textarea required rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-blue-400 placeholder-gray-400 resize-none" placeholder="Describe your situation in detail..." />
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold py-3.5 rounded-xl text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                    <Send className="w-4 h-4" /> Route to Department
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
