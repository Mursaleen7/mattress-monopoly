import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-white font-bold text-xl">DisposalGrid</span>
          </Link>

          {/* Navigation */}
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-white text-sm hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/#cities" className="text-white text-sm hover:text-gray-300 transition">
              Cities
            </Link>
            <Link href="/#pricing" className="text-white text-sm hover:text-gray-300 transition">
              Pricing
            </Link>
            <Link href="/#contact" className="text-white text-sm hover:text-gray-300 transition">
              Contact
            </Link>
            <Link href="/#login" className="text-white text-sm hover:text-gray-300 transition">
              Log In
            </Link>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
