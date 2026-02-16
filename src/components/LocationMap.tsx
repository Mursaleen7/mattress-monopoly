'use client';

import { useEffect, useRef } from 'react';

interface Location {
  name: string;
  address: string;
  type: string;
  hours: string;
  notes: string;
}

interface LocationMapProps {
  locations: Location[];
  cityName: string;
}

export default function LocationMap({ locations, cityName }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (typeof window !== 'undefined' && !(window as any).google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = async () => {
      if (!mapRef.current || !(window as any).google) return;

      const google = (window as any).google;
      const geocoder = new google.maps.Geocoder();
      const bounds = new google.maps.LatLngBounds();

      // Initialize map centered on first location
      const map = new google.maps.Map(mapRef.current, {
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Geocode and add markers for each location
      for (const location of locations) {
        try {
          const result = await geocoder.geocode({ address: location.address });
          
          if (result.results[0]) {
            const position = result.results[0].geometry.location;
            bounds.extend(position);

            // Create custom marker
            const marker = new google.maps.Marker({
              position,
              map,
              title: location.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#0055FF',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              },
            });

            // Create info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 12px; max-width: 300px;">
                  <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1f2937;">
                    ${location.name}
                  </h3>
                  <div style="font-size: 14px; color: #4b5563; line-height: 1.5;">
                    <p style="margin-bottom: 6px;">
                      <strong>Type:</strong> ${location.type}
                    </p>
                    <p style="margin-bottom: 6px;">
                      <strong>Address:</strong><br>${location.address}
                    </p>
                    <p style="margin-bottom: 6px;">
                      <strong>Hours:</strong><br>${location.hours}
                    </p>
                    ${location.notes ? `
                      <p style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-style: italic;">
                        ${location.notes}
                      </p>
                    ` : ''}
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}" 
                      target="_blank"
                      rel="noopener noreferrer"
                      style="display: inline-block; margin-top: 12px; padding: 8px 16px; background-color: #FFD700; color: #1A1A1A; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              `,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          }
        } catch (error) {
          console.error(`Error geocoding ${location.name}:`, error);
        }
      }

      // Fit map to show all markers
      if (locations.length > 1) {
        map.fitBounds(bounds);
      } else if (locations.length === 1) {
        map.setZoom(12);
      }
    };

    loadGoogleMaps();
  }, [locations, cityName]);

  if (locations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-80 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-600 font-semibold">No Drop-off Locations</p>
          <p className="text-gray-500 text-sm">This city uses curbside pickup only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">
      <div ref={mapRef} className="w-full h-full" />
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center p-6">
            <svg className="w-16 h-16 text-[#0055FF] mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-600 font-semibold mb-2">Interactive Map</p>
            <p className="text-gray-500 text-sm">
              {locations.length} location{locations.length > 1 ? 's' : ''} in {cityName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
