'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
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
    });

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
