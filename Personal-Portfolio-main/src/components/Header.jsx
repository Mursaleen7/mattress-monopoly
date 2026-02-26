import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, FileText, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Custom slow scroll animation specifically for navigation links
      const startPosition = window.pageYOffset
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 2000 // Very long duration for extra slow scroll
      let start = null
      
      // Simple linear easing for consistent speed
      const linearEasing = (t) => t
      
      const animation = (currentTime) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = linearEasing(progress)
        
        window.scrollTo(0, startPosition + distance * easedProgress)
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }
      
      requestAnimationFrame(animation)
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled ? 'glass-effect py-2' : 'py-3'
              }`}
        style={{ backgroundColor: '#0e100f', borderBottomColor: '#323228' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
        {/* Logo/Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center"
        >
          <span className="font-ui font-medium text-lg" style={{ color: '#fffce4' }}>mursaleen</span>
        </motion.div>

        {/* Navigation Menu */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          <a onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link text-base cursor-pointer">Home</a>
          <a onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="nav-link text-base cursor-pointer">Projects</a>
          <a onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }} className="nav-link text-base cursor-pointer">Certifications</a>
          <a onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }} className="nav-link text-base cursor-pointer">Resume</a>
          <a onClick={(e) => { e.preventDefault(); scrollToSection('tech-stack'); }} className="nav-link text-base cursor-pointer">Tech Stack</a>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#fffce4' }}
            className="p-2"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-black/90 border-b border-white/10 p-6 flex flex-col space-y-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('home');
                }}
                className="text-xl font-headline font-medium py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Home
              </a>
              <a 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('projects');
                }}
                className="text-xl font-headline font-medium py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Projects
              </a>
              <a 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('certifications');
                }}
                className="text-xl font-headline font-medium py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Certifications
              </a>
              <a 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('resume');
                }}
                className="text-xl font-headline font-medium py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Resume
              </a>
              <a 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('tech-stack');
                }}
                className="text-xl font-headline font-medium py-2 px-4 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Tech Stack
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header 
