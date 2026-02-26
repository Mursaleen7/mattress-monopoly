import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative" ref={ref} style={{ backgroundColor: '#0e100f', paddingTop: '40px' }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative flex flex-col items-center"
        >
          {/* Profile Avatar - Horizontally centered, above headline */}
          <motion.div variants={itemVariants} className="relative mb-2">
            <div className="w-24 h-24 rounded-full overflow-hidden" style={{ border: '2px solid #323228' }}>
              {/* Memoji placeholder */}
              <div className="w-full h-full flex items-center justify-center text-4xl" style={{ backgroundColor: '#ffffe3' }}>
                👨🏻‍💻
              </div>
            </div>

            {/* Hello Pill - Top-right of avatar, bottom edge aligned with avatar midline */}
            <motion.div 
              variants={itemVariants} 
              className="absolute top-5 left-full ml-2"
            >
              <div className="rounded-full px-6 py-1.5" style={{ border: '1px solid #323228' }}>
                <span className="text-base md:text-lg font-headline font-medium whitespace-nowrap" style={{ color: '#fffce4' }}>Hello, I'm Mursaleen</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Headline Block - Centered below avatar with specific line alignments */}
          <motion.div variants={itemVariants} className="relative -ml-8">
            <div className="font-headline font-medium text-4xl md:text-6xl lg:text-8xl leading-none tracking-tight uppercase">
              
              {/* Line 1: CYBER - Center aligned */}
              <div className="flex justify-center relative mb-0">
                <span style={{ color: '#a374ff' }}>CYBER</span>
                {/* Annotation: Based in Pakistan - Right of CYBER, baseline aligned */}
                <span className="absolute left-full ml-4 top-0 text-sm md:text-base font-headline font-normal whitespace-nowrap hidden lg:block" style={{ color: '#fffce4' }}>
                  // Final-year CS student
                </span>
              </div>

              {/* Line 2: SECURITY - Indented, starts under 'B' of CYBER */}
              <div className="flex justify-center relative mb-0">
                <div className="relative">
                  <span className="invisible">CYB</span>
                  <span className="absolute -left-20 top-0" style={{ color: '#ffd074' }}>SECURITY</span>
                </div>
              </div>

              {/* Line 3: STUDENT - Left-aligned with CYBER */}
              <div className="flex justify-center relative mb-0">
                <span style={{ color: '#F3F3F3' }}>STUDENT</span>
                {/* Let's Connect Button - Right of STUDENT, vertically centered */}
                <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 hidden lg:flex">
                  <div className="flex items-center space-x-2 rounded-full px-4 py-2" style={{ border: '1px solid #323228' }}>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                    <span className="text-sm md:text-base font-headline font-medium" style={{ color: '#fffce4' }}>Let's Connect</span>
                  </div>
                </div>
              </div>

              {/* Line 4: & RESEARCHER - Side by side */}
              <div className="flex justify-center relative">
                <div className="relative">
                  <span className="invisible">STUDE</span>
                  <div className="absolute left-0 top-0 flex items-baseline">
                    <span className="font-headline font-medium" style={{ color: '#F3F3F3' }}>& </span>
                    <span style={{ color: '#16f0d1' }}>RESEARCHER.</span>
                  </div>
                </div>
                {/* Role Annotation - Left of "& RESEARCHER", vertically centered */}
                <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 text-xs md:text-sm font-headline font-normal text-right hidden lg:block" style={{ color: '#fffce4' }}>
                  <div>// Ethical Hacker</div>
                  <div>Penetration Tester</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Let's Connect Button */}
          <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3 mt-8 lg:hidden">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            <button className="text-xl md:text-2xl font-headline font-medium hover:text-green-500 transition-colors duration-200" style={{ color: '#fffce4' }}>
              Let's Connect
            </button>
          </motion.div>

          {/* Tagline - Bottom of hero, separated with space, centered */}
          <motion.div variants={itemVariants} className="mt-6 text-center max-w-5xl">
            <p className="text-lg md:text-xl lg:text-2xl font-headline font-normal leading-relaxed" style={{ color: '#F3F3F3' }}>
              I secure digital infrastructures and hunt threats through{' '}
              <span className="font-semibold" style={{ color: '#ffd074' }}>penetration testing</span>,{' '}
              <span className="font-semibold" style={{ color: '#a374ff' }}>vulnerability research</span> and{' '}
              <span className="font-semibold" style={{ color: '#16f0d1' }}>incident response</span>.
            </p>
          </motion.div>

          {/* Interactive Cursors - Layered on top with precise positioning */}
          <motion.div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* Security Cursor - Tip over center of Hello pill */}
            <motion.div 
              className="absolute cursor-pointer"
              style={{ top: '72px', left: '50%', transform: 'translateX(120px)' }}
              animate={{ 
                x: [0, 12, -6, 8, -2, 0], 
                y: [0, -8, 6, -4, 3, 0],
                rotate: [0, 3, -2, 4, -1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: [1, 1.4, 1.2, 1.5, 1.3],
                x: [0, 200, -150, 220, 160],
                y: [0, -180, 120, -200, -100],
                rotate: [0, 25, -15, 35, 18],
                transition: { 
                  duration: 2.5,
                  ease: "easeOut",
                  times: [0, 0.25, 0.5, 0.75, 1]
                }
              }}
            >
              <div className="relative">
                {/* Arrow pointer */}
                <svg width="24" height="24" viewBox="0 0 16 16" className="absolute -top-2 -left-2">
                  <path d="M0 0L16 6L6 16L0 0Z" fill="#F541D4" stroke="white" strokeWidth="0.5" />
                </svg>
                {/* Tag */}
                <div 
                  className="px-4 py-2 rounded-full text-sm font-headline font-bold ml-6 mt-3"
                  style={{ backgroundColor: '#F541D4', color: '#fffce4' }}
                >
                  Security
                </div>
              </div>
            </motion.div>

            {/* Pentesting Cursor - Tip over "Ethical Hacker Penetration Tester" text */}
            <motion.div 
              className="absolute hidden lg:block cursor-pointer"
              style={{ 
                top: 'calc(50% + 40px)', 
                left: 'calc(50% - 380px)',
                transform: 'translate(0, 0)'
              }}
              animate={{ 
                x: [0, -10, 6, -4, 2, 0], 
                y: [0, 8, -5, 9, -2, 0],
                rotate: [0, -3, 2, -4, 1, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: [1, 1.3, 1.1, 1.6, 1.25],
                x: [0, -240, 170, -270, -120],
                y: [0, 150, -190, 170, 85],
                rotate: [0, -30, 20, -40, -12],
                transition: { 
                  duration: 2.8,
                  ease: "easeOut",
                  times: [0, 0.3, 0.5, 0.8, 1]
                }
              }}
            >
              <div className="relative">
                {/* Arrow pointer */}
                <svg width="24" height="24" viewBox="0 0 16 16" className="absolute -top-2 -left-2">
                  <path d="M0 0L16 6L6 16L0 0Z" fill="#4AC7F2" stroke="white" strokeWidth="0.5" />
                </svg>
                {/* Tag */}
                <div 
                  className="px-4 py-2 rounded-full text-sm font-headline font-bold ml-6 mt-3"
                  style={{ backgroundColor: '#4AC7F2', color: '#fffce4' }}
                >
                  Pentesting
                </div>
              </div>
            </motion.div>

            {/* mursaleen Cursor - Tip under "Let's Connect" text */}
            <motion.div 
              className="absolute hidden lg:block cursor-pointer"
              style={{ 
                top: 'calc(50% - 20px)', 
                left: 'calc(50% + 340px)',
                transform: 'translate(0, 0)'
              }}
              animate={{ 
                x: [0, 9, -5, 6, -1, 0], 
                y: [0, -6, 8, -5, 4, 0],
                rotate: [0, 2, -3, 3, -1, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: [1, 1.5, 1.2, 1.7, 1.4],
                x: [0, 300, -210, 320, 180],
                y: [0, -240, 160, -260, -140],
                rotate: [0, 40, -25, 45, 20],
                transition: { 
                  duration: 3.2,
                  ease: "easeOut",
                  times: [0, 0.2, 0.4, 0.7, 1]
                }
              }}
            >
              <div className="relative">
                {/* Arrow pointer */}
                <svg width="24" height="24" viewBox="0 0 16 16" className="absolute -top-2 -left-2">
                  <path d="M0 0L16 6L6 16L0 0Z" fill="#9967F0" stroke="white" strokeWidth="0.5" />
                </svg>
                {/* Tag */}
                <div 
                  className="px-4 py-2 rounded-full text-sm font-headline font-normal ml-6 mt-3"
                  style={{ backgroundColor: '#C4A9F7', color: '#4A05D4' }}
                >
                  mursaleen
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 
