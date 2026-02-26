import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import SocialBar from './components/SocialBar'

import Specialization from './components/Specialization'
import MyProjects from './components/MyProjects'
import Resume from './components/Resume'
import TechStack from './components/TechStack'
import Footer from './components/Footer'

const greetings = [
  { text: '・Hello', language: 'English' },      // English first
  { text: '・やあ', language: 'Japanese' },      // Japanese
  { text: '・नमस्ते', language: 'Hindi' },       // Hindi
  { text: '・Hola', language: 'Spanish' },       // Spanish
  { text: '・مرحبا', language: 'Arabic' },       // Arabic
  { text: '・Bonjour', language: 'French' }      // French
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [showMainContent, setShowMainContent] = useState(false)
  const [slideAnimation, setSlideAnimation] = useState(false)
  const [allGreetingsShown, setAllGreetingsShown] = useState(false)

  // Initialize smooth scrolling
  useSmoothScroll()

  useEffect(() => {
    // First greeting appears a bit slower (450ms instead of 550ms)
    setTimeout(() => {
      let greetingIndex = 1; // Start with the second greeting (index 1)
      
      // Show each greeting with appropriate timing
      const showNextGreeting = () => {
        if (greetingIndex < greetings.length) {
          setCurrentGreeting(greetingIndex);
          greetingIndex++;
          setTimeout(showNextGreeting, 300); // 300ms per greeting (slightly slower)
        } else {
          // All greetings have been shown
          setAllGreetingsShown(true);
          
          // Wait a moment before starting the slide animation
          setTimeout(() => {
            setSlideAnimation(true);
            
            // Wait for slide animation to complete before showing main content
            setTimeout(() => {
              setIsLoading(false);
              setTimeout(() => setShowMainContent(true), 100);
            }, 800);
          }, 400); // Pause after all greetings before sliding
        }
      };
      
      // Start showing greetings
      setTimeout(showNextGreeting, 450);
    }, 450); // First greeting shows for 450ms (reduced from 550ms)

    return () => {}
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0e100f' }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <>
            {/* Sliding window overlay */}
            <motion.div
              key="loading-overlay"
              className="fixed inset-0 z-50 bg-black"
              initial={{ y: 0 }}
              animate={{ y: slideAnimation ? "-100%" : 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Exponential ease out for a snappy feel
            />
            
            {/* Content centered in the screen */}
            <motion.div
              key="loading-content"
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: slideAnimation ? 0 : 1,
                // Ensure greeting disappears before slide animation
                transitionEnd: { display: slideAnimation ? 'none' : 'flex' } 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentGreeting}
                    className="text-3xl md:text-5xl font-headline font-light"
                    style={{ 
                      color: '#fffce4',
                      fontFamily: getGreetingFontFamily(currentGreeting)
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }} // Slightly faster transition
                  >
                    {greetings[currentGreeting]?.text}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMainContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            
            <main>
              <Hero />
              <SocialBar />
              <Specialization />
              <MyProjects />
              <Resume />
              <TechStack />
            </main>
            
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to get the appropriate font family for each greeting
function getGreetingFontFamily(index) {
  switch(index) {
    case 0: return "'Inter', sans-serif";                // English
    case 1: return "'Noto Sans JP', sans-serif";         // Japanese
    case 2: return "'Noto Sans Devanagari', sans-serif"; // Hindi
    case 3: return "'Inter', sans-serif";                // Spanish
    case 4: return "'Noto Sans Arabic', sans-serif";     // Arabic
    case 5: return "'Inter', sans-serif";                // French
    default: return "'Inter', sans-serif";
  }
}

export default App 