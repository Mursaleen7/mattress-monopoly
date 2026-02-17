'use client';

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-[#FFD700] hover:bg-[#F4C430] text-[#1A1A1A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-40"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
