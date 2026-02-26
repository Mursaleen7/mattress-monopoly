'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Add lenis class to html element
    document.documentElement.classList.add('lenis');

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
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  return null;
}
