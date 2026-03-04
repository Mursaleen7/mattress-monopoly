import { useState, useEffect } from 'react';

/**
 * Custom hook to get user's geolocation using Browser Geolocation API
 * Returns: { location, error, loading, requestLocation }
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode to get city and zip
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          
          const city = data.address.city || data.address.town || data.address.village || 'Unknown';
          const zip = data.address.postcode || '';
          const state = data.address.state || '';
          
          setLocation({
            latitude,
            longitude,
            city,
            zip,
            state,
            fullAddress: data.display_name,
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to get location details');
          setLoading(false);
        }
      },
      (err) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  };

  return { location, error, loading, requestLocation };
}
