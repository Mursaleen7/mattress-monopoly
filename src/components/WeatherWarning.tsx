interface WeatherProfile {
  is_rain_heavy: boolean;
  rejection_risk_copy: string | null;
}

interface WeatherWarningProps {
  weatherProfile: WeatherProfile;
}

export default function WeatherWarning({ weatherProfile }: WeatherWarningProps) {
  if (!weatherProfile.is_rain_heavy || !weatherProfile.rejection_risk_copy) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6 rounded-r-xl">
      <div className="flex items-start gap-4">
        <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-yellow-900 mb-2">
            ⚠️ Weather Risk Alert
          </h3>
          <p className="text-sm text-yellow-800 mb-4">
            {weatherProfile.rejection_risk_copy}
          </p>
          <a 
            href="/book" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold rounded-lg transition-all"
          >
            Book Indoor Pickup
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
