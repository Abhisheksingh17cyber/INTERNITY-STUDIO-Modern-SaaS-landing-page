'use client';

import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

const DARK_MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#1A1A1A' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#D4AF37' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#050505' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2A2A2A' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#111111' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#050505' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1A1A1A' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

export default function GoogleMap({
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 14,
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey || !mapRef.current) {
      setError(true);
      return;
    }

    // Load Google Maps script
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: DARK_MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
      });

      new window.google.maps.Marker({
        position: center,
        map,
        title: 'INTERNITY WATCHES',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#D4AF37',
          fillOpacity: 1,
          strokeColor: '#D4AF37',
          strokeWeight: 2,
          scale: 8,
        },
      });
    }
  }, [center, zoom]);

  if (error) {
    return (
      <div className={`bg-charcoal flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-charcoal-light flex items-center justify-center">
            <svg className="w-10 h-10 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-silver/60 text-sm">Map unavailable</p>
          <p className="text-silver/30 text-xs mt-1">Add GOOGLE_MAPS_API_KEY to .env.local</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
}
