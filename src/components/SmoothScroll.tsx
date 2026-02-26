'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on mobile devices for better native performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use native scroll on mobile
      return;
    }

    // Initialize Lenis with optimized configuration for desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 25,
    } as any);

    // Properly tracked RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Handle anchor links with passive: false for better control
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

    document.addEventListener('click', handleAnchorClick, { passive: false });

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

    // Proper cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
