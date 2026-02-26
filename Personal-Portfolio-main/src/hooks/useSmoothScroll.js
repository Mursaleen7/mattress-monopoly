import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with premium smooth scrolling configuration
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function for smooth acceleration/deceleration
      direction: 'vertical', // Vertical scrolling
      gestureDirection: 'vertical', // Gesture direction
      smooth: true, // Enable smooth scrolling
      mouseMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disable smooth scrolling for touch devices (can be jarring on mobile)
      touchMultiplier: 2, // Touch sensitivity
      infinite: false, // Disable infinite scrolling
    })

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
    }
  }, [])
} 