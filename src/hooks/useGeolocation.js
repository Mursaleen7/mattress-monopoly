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
      let locationData = null;
      
      // Try primary service: ipgeolocation.com (30k/month free, very reliable)
      try {
        const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=at_your_service');
        
        if (response.ok) {
          const data = await response.json();
          if (data.city) {
            locationData = {
              city: data.city,
              state: data.state_prov || data.state_code || 'California',
              stateCode: data.state_code || 'CA',
              zip: data.zipcode || '',
              country: data.country_name || 'United States',
              latitude: data.latitude,
              longitude: data.longitude,
            };
          }
        }
      } catch (err) {
        console.log('Primary IP service failed, trying fallback...', err);
      }
      
      // Fallback 1: ipapi.co (HTTPS, 1k/day free)
      if (!locationData) {
        try {
          const response = await fetch('https://ipapi.co/json/');
          
          if (response.ok) {
            const data = await response.json();
            if (data.city && !data.error) {
              locationData = {
                city: data.city,
                state: data.region || 'California',
                stateCode: data.region_code || 'CA',
                zip: data.postal || '',
                country: data.country_name || 'United States',
                latitude: data.latitude,
                longitude: data.longitude,
              };
            }
          }
        } catch (err) {
          console.log('Fallback 1 failed, trying fallback 2...', err);
        }
      }
      
      // Fallback 2: geojs.io (HTTPS, unlimited free)
      if (!locationData) {
        try {
          const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
          
          if (response.ok) {
            const data = await response.json();
            if (data.city) {
              locationData = {
                city: data.city,
                state: data.region || 'California',
                stateCode: data.region || 'CA',
                zip: '',
                country: data.country || 'United States',
                latitude: data.latitude,
                longitude: data.longitude,
              };
            }
          }
        } catch (err) {
          console.log('Fallback 2 failed, using default location', err);
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

