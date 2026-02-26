'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis with premium smooth scrolling configuration - matching Personal Portfolio exactly
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash) {
        const hash = anchor.hash;
        const targetElement = document.querySelector(hash) as HTMLElement;
        
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Scroll to hash on page load
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash) as HTMLElement;
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.2,
          });
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
