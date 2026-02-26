import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Github, Mail, Instagram } from 'lucide-react'

const SocialBar = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.section
      ref={ref}
      className="py-16 border-t"
      style={{ borderTopColor: '#323228' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid layout with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Text */}
          <div className="text-gray-400 text-sm font-mono flex items-center justify-center md:justify-start">
            // Design, Code, Engage
          </div>

          {/* Center Social Icons - Centered in the middle column */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/in/mursaleen-sakoskar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{ backgroundColor: '#fffce4' }}
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Linkedin size={20} style={{ color: '#000000' }} />
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/Mursaleen7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{ backgroundColor: '#fffce4' }}
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Github size={20} style={{ color: '#000000' }} />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/mursaleensakoskar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{ backgroundColor: '#fffce4' }}
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Instagram size={20} style={{ color: '#000000' }} />
              </motion.a>
            </div>
          </div>

          {/* Right Contact */}
          <motion.div
            className="flex items-center justify-center md:justify-end space-x-3 text-gray-400"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Mail size={20} />
            <a
              href="mailto:mursaleensakoskar@gmail.com"
              className="hover:text-accent-purple transition-colors duration-200"
            >
              mursaleensakoskar@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default SocialBar 