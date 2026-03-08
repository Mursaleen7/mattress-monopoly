import { useState, useEffect } from 'react';

/**
 * Custom hook to get user's geolocation using IP-based geolocation
 * This approach doesn't require browser permission (like Yelp, Google, etc.)
 * Returns: { location, error, loading }
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have cached location (within last 24 hours)
    const cachedLocation = localStorage.getItem('userLocation');
    const cacheTimestamp = localStorage.getItem('userLocationTimestamp');
    
    if (cachedLocation && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      const ONE_DAY = 24 * 60 * 60 * 1000;
      
      if (age < ONE_DAY) {
        // Use cached location
        setLocation(JSON.parse(cachedLocation));
        setLoading(false);
        return;
      }
    }

    // Fetch location from IP-based service
    fetchLocationFromIP();
  }, []);

  const fetchLocationFromIP = async () => {
    try {
      // Using ipapi.com - free tier allows 50,000 requests/month
      // Most reliable and accurate for US locations
      // Fallback chain: ipapi.com -> ip-api.com -> default
      
      let locationData = null;
      
      // Try primary service: ipapi.com
      try {
        const response = await fetch('https://ipapi.com/ip_api.php?ip=check', {
          method: 'GET',
        });
        
        if (response.ok) {
          const data = await response.json();
          locationData = {
            city: data.city || 'Los Angeles',
            state: data.region || 'California',
            stateCode: data.region_code || 'CA',
            zip: data.zip || '',
            country: data.country_name || 'United States',
            latitude: data.latitude,
            longitude: data.longitude,
          };
        }
      } catch (err) {
        console.log('Primary IP service failed, trying fallback...');
      }
      
      // Fallback to ip-api.com if primary fails
      if (!locationData) {
        const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,region,regionName,city,zip,lat,lon');
        
        if (!response.ok) {
          throw new Error('All IP services failed');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          locationData = {
            city: data.city || 'Los Angeles',
            state: data.regionName || 'California',
            stateCode: data.region || 'CA',
            zip: data.zip || '',
            country: data.country || 'United States',
            latitude: data.lat,
            longitude: data.lon,
          };
        }
      }
      
      if (locationData) {
        setLocation(locationData);
        
        // Cache the location
        localStorage.setItem('userLocation', JSON.stringify(locationData));
        localStorage.setItem('userLocationTimestamp', Date.now().toString());
        
        setLoading(false);
      } else {
        throw new Error('Could not determine location');
      }
    } catch (err) {
      console.error('IP geolocation error:', err);
      
      // Fallback to default location
      const fallbackLocation = {
        city: 'Los Angeles',
        state: 'California',
        stateCode: 'CA',
        zip: '90012',
        country: 'United States',
      };
      
      setLocation(fallbackLocation);
      setError('Using default location');
      setLoading(false);
    }
  };

  // Optional: Allow manual refresh of location
  const refreshLocation = () => {
    localStorage.removeItem('userLocation');
    localStorage.removeItem('userLocationTimestamp');
    setLoading(true);
    fetchLocationFromIP();
  };

  return { location, error, loading, refreshLocation };
}

