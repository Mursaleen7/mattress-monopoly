'use client';

interface ScheduleLogic {
  type: string;
  dates_2026: string[];
  frequency_display: string;
  missed_msg?: string;
}

interface FOMOCountdownProps {
  scheduleLogic?: ScheduleLogic | string | null;
  cityName: string;
}

export default function FOMOCountdown({ scheduleLogic, cityName }: FOMOCountdownProps) {
  // Handle null, undefined, or string scheduleLogic
  if (!scheduleLogic || typeof scheduleLogic === 'string') return null;
  
  // Handle missing dates_2026 array
  if (!scheduleLogic.dates_2026 || !Array.isArray(scheduleLogic.dates_2026)) return null;

  const today = new Date();
  const dates = scheduleLogic.dates_2026.map(d => new Date(d));
  
  // Find next pickup date
  const nextPickup = dates.find(d => d >= today);
  
  if (!nextPickup) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800 mb-1">
              All {scheduleLogic.frequency_display.toLowerCase()} pickups have passed for 2026
            </p>
            <p className="text-sm text-red-700">
              Book a private hauler to get your mattress removed today.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const daysUntil = Math.ceil((nextPickup.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const monthsUntil = Math.floor(daysUntil / 30);
  
  // Scenario A: Pickup is soon (1-7 days) - Build trust
  if (daysUntil >= 1 && daysUntil <= 7) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-800 mb-1">
              Good news! Next free pickup is in {daysUntil} day{daysUntil > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-green-700">
              Wait for it and save money. Schedule: {scheduleLogic.frequency_display}.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Scenario B: Pickup is far away (3+ months) - Create urgency
  if (monthsUntil >= 3) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-800 mb-1">
              Next free pickup is {monthsUntil} month{monthsUntil > 1 ? 's' : ''} away
            </p>
            <p className="text-sm text-yellow-700 mb-3">
              {scheduleLogic.missed_msg || `Can't wait that long? Book a private hauler for same-day or next-day pickup.`}
            </p>
            <a 
              href="/book" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold rounded-lg transition-all"
            >
              Book Hauler Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // Scenario C: Pickup is 1-3 months away - Neutral info
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-xl">
      <div className="flex items-start gap-4">
        <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            Next free pickup is in {monthsUntil} month{monthsUntil > 1 ? 's' : ''}
          </p>
          <p className="text-sm text-blue-700">
            Schedule: {scheduleLogic.frequency_display}. Or book a private hauler for faster service.
          </p>
        </div>
      </div>
    </div>
  );
}
