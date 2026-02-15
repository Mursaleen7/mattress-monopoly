export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust Badges */}
        <div className="flex justify-center gap-12 mb-8">
          <div className="text-center">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-sm text-gray-300">Vetted Partners</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">♻️</div>
            <p className="text-sm text-gray-300">Eco-Friendly</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm text-gray-300">Secure Booking</p>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-4 gap-8 mt-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-lg">DisposalGrid</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 DisposalGrid. All rights reserved.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Cities</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@disposalgrid.com</li>
              <li>1-800-DISPOSE</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
