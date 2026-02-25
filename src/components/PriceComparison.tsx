interface CompetitorComparison {
  competitor_name: string;
  competitor_price: string;
  value_prop: string;
}

interface AffiliateConfig {
  partner_name: string;
  base_price_display: string;
  competitor_comparison?: CompetitorComparison;
}

interface PriceComparisonProps {
  affiliateConfig: AffiliateConfig;
  cityName: string;
}

export default function PriceComparison({ affiliateConfig, cityName }: PriceComparisonProps) {
  const hasComparison = !!affiliateConfig.competitor_comparison;
  
  if (!hasComparison || !affiliateConfig.competitor_comparison) {
    return null; // Fallback to existing simple CTA
  }
  
  const { competitor_name, competitor_price, value_prop } = affiliateConfig.competitor_comparison;
  
  return (
    <div className="my-12">
      <h2 className="text-[#1a2830] font-bold text-2xl md:text-3xl mb-6 text-center">
        Compare Your Options in {cityName}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Option 1: DIY */}
        <div className="border-2 border-[#e2e8ed] rounded-xl p-6 bg-white">
          <h3 className="text-lg font-bold text-[#1a2830] mb-3">
            DIY Drop-off
          </h3>
          <p className="text-3xl font-bold text-[#5a6e78] mb-4">
            $20<span className="text-lg font-normal text-[#8a9ca5]">+</span>
          </p>
          <ul className="space-y-2 text-sm text-[#5a6e78] mb-6">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">+</span>
              <span>Truck rental ($40)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">+</span>
              <span>Gas ($15)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">+</span>
              <span>3 hours of your time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">+</span>
              <span>Risk of rejection</span>
            </li>
          </ul>
          <p className="text-xs text-[#8a9ca5] italic">
            Total: ~$75 + hassle
          </p>
        </div>
        
        {/* Option 2: National Competitor */}
        <div className="border-2 border-[#e2e8ed] rounded-xl p-6 bg-gray-50 opacity-75">
          <h3 className="text-lg font-bold text-[#5a6e78] mb-3">
            {competitor_name}
          </h3>
          <p className="text-3xl font-bold text-[#8a9ca5] line-through mb-4">
            {competitor_price}
          </p>
          <ul className="space-y-2 text-sm text-[#8a9ca5] mb-6">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>High franchise fees</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Corporate overhead</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Aggressive upselling</span>
            </li>
          </ul>
        </div>
        
        {/* Option 3: Your Affiliate (THE WINNER) */}
        <div className="border-2 border-[#e8734a] rounded-xl p-6 bg-gradient-to-br from-[#e8734a]/5 to-[#e8734a]/10 relative shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-[#e8734a] text-white px-4 py-1 text-xs font-bold rounded-full uppercase shadow-md">
              Best Value
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-[#1a2830] mb-3 mt-2">
            {affiliateConfig.partner_name}
          </h3>
          <p className="text-4xl font-black text-[#e8734a] mb-4">
            {affiliateConfig.base_price_display}
          </p>
          <ul className="space-y-2 text-sm text-[#1a2830] mb-6">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{value_prop}</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Same-day or next-day pickup</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Pick up from inside your home</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No hidden fees</span>
            </li>
          </ul>
          
          <a 
            href="/book"
            className="block w-full px-6 py-3 bg-[#e8734a] hover:bg-[#d4623b] text-white text-center font-bold rounded-lg transition-all shadow-md"
          >
            Book Now →
          </a>
          
          <p className="text-xs text-center text-[#5a6e78] mt-3">
            Save ~${parseInt(competitor_price.replace(/\D/g, '')) - parseInt(affiliateConfig.base_price_display.replace(/\D/g, ''))} vs {competitor_name.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
