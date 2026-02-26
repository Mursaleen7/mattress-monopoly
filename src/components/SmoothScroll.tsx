'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis with premium smooth scrolling configuration
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function for smooth acceleration/deceleration
      orientation: 'vertical', // Vertical scrolling
      gestureOrientation: 'vertical', // Gesture direction
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Mouse wheel sensitivity
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Disable infinite scrolling
      autoResize: true, // Auto resize on window resize
    });

    // Animation frame loop for Lenis - optimized to prevent glitches
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    // Start the animation loop
    rafRef.current = requestAnimationFrame(raf);

    // Cleanup function - properly cancel RAF and destroy Lenis
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
