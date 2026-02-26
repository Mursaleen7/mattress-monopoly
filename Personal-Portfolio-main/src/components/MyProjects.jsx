import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const MyProjects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { scrollYProgress } = useScroll()

  const projects = [
    {
      name: 'Splunk Multi-Cloud Threat Intelligence Platform',
      year: '2024',
      category: 'Enterprise SOC & Threat Intelligence',
      techStack: 'AWS, Kubernetes, Docker, Terraform, Ansible, Splunk ES, MITRE ATT&CK',
      description: 'Enterprise-grade cybersecurity monitoring platform with advanced threat simulation',
      githubUrl: 'https://github.com/Mursaleen7/Splunk-Multi-Cloud-Threat-Analysis'
    },
    {
      name: 'Email Spam Scanner Engine',
      year: '2024', 
      category: 'Machine Learning Security',
      techStack: 'Python, Scikit-learn, TF-IDF, RandomForest, IMAP',
      description: 'ML-powered email security tool with hybrid detection algorithms',
      githubUrl: 'https://github.com/Mursaleen7/Email-Spam-Detection'
    },
    {
      name: 'Smart Insulin Delivery Simulator',
      year: '2024',
      category: 'Medical Device Security',
      techStack: 'Qt/C++, Unit Testing, GUI Testing, Medical Device Protocols',
      description: 'Medical device simulation with security-focused testing frameworks',
      githubUrl: 'https://github.com/sohamgherwada/Smart-Insulin-Delivery-Simulator'
    },
    {
      name: 'Plant Disease Detection System',
      year: '2023',
      category: 'AI Security & Computer Vision',
      techStack: 'Flask, TensorFlow, Keras, Computer Vision, Web Security',
      description: 'AI-powered agricultural security system with web-based interface',
      githubUrl: 'https://github.com/Mursaleen7/Plant-Disease-Detection-Website'
    },
    {
      name: 'GlobalAidConnect Crisis App',
      year: '2023',
      category: 'Predictive Analytics & API Security',
      techStack: 'Swift, Gemini API, Real-time Data, MapKit, Security APIs',
      description: 'Crisis management platform with secure API integrations',
      githubUrl: 'https://github.com/Mursaleen7/GlobalAidConnect'
    },
    {
      name: 'Resilient Mesh Emergency Communication',
      year: '2023',
      category: 'Network Security & Embedded Systems',
      techStack: 'C, Raspberry Pi, RF Communication, Mesh Networks, Encryption',
      description: 'Decentralized emergency communication with custom security protocols',
      githubUrl: 'https://github.com/Mursaleen7/Mesh-Emergency-Communication-System'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  return (
    <section id="projects" className="py-20 relative" ref={ref} style={{ backgroundColor: '#0e100f' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 
            className="font-headline font-medium text-4xl md:text-5xl mb-4"
            style={{ color: '#a374ff' }}
          >
            My Projects
          </h2>
          <div 
            className="w-full h-px"
            style={{ backgroundColor: '#323228' }}
          ></div>
        </motion.div>

        {/* Project List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-0"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="group"
            >
              {/* Project Row */}
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-8 hover:bg-gray-900/20 transition-colors duration-200 cursor-pointer block"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Left Column */}
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 
                      className="text-2xl md:text-3xl font-ui font-semibold"
                      style={{ color: '#fffce4' }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <p 
                    className="text-sm font-ui font-light mb-2"
                    style={{ color: '#F3F3F3' }}
                  >
                    {project.year} • {project.category}
                  </p>
                  <p 
                    className="text-sm font-ui leading-relaxed"
                    style={{ color: '#9CA3AF' }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Right Column */}
                <div className="flex-1 text-right">
                  <p 
                    className="text-sm font-ui font-medium mb-2"
                    style={{ color: '#a374ff' }}
                  >
                    Tech Stack
                  </p>
                  <p 
                    className="text-sm font-ui font-light leading-relaxed"
                    style={{ color: '#F3F3F3' }}
                  >
                    {project.techStack}
                  </p>
                </div>
              </motion.a>

              {/* Divider Line */}
              {index < projects.length - 1 && (
                <div 
                  className="w-full h-px"
                  style={{ backgroundColor: '#323228' }}
                ></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MyProjects 
