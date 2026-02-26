import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Resume = () => {
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
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <section id="resume" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          ref={ref}
          className="text-center mb-16 lg:mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-headline font-medium mb-6 tracking-tight"
            style={{ color: '#F3F3F3' }}
            variants={itemVariants}
          >
            Resume
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl font-ui leading-relaxed max-w-3xl mx-auto"
            style={{ color: '#fffce4' }}
            variants={itemVariants}
          >
            My professional experience, education, and achievements
          </motion.p>
        </motion.div>

        {/* Resume Content */}
        <motion.div 
          className="grid gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Experience Section */}
          <motion.div variants={itemVariants} className="resume-section">
            <h3 className="text-2xl md:text-3xl font-headline font-medium mb-6" style={{ color: '#ffd074' }}>
              Experience
            </h3>
            
            <div className="space-y-8">
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-headline font-medium" style={{ color: '#F3F3F3' }}>
                    Security Operations (Internship)
                  </h4>
                  <span className="text-sm font-ui px-3 py-1 rounded-full" style={{ backgroundColor: '#a374ff30', color: '#a374ff' }}>
                    May 2025 - Present
                  </span>
                </div>
                <h5 className="text-lg font-ui mb-3" style={{ color: '#16f0d1' }}>iMatter Global Solutions</h5>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Helped in connecting AWS CloudTrail to Splunk, shadowed a senior analyst to fine tune login anomaly correlation rules, and wrote a Python script that emails the SOC whenever IAM lockouts spike.</li>
                  <li>Scheduled and analyzed weekly Nessus scans, drove high-severity CVE tickets from open to closure, and handled daily phishing triage (header checks, sandbox tests, sender blocks).</li>
                  <li>Added an OWASP ZAP baseline scan to the CI pipeline for an internal test portal, filtered false positives with a senior analyst, and filed confirmed issues for developers.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-headline font-medium" style={{ color: '#F3F3F3' }}>
                    App Developer (Co-op)
                  </h4>
                  <span className="text-sm font-ui px-3 py-1 rounded-full" style={{ backgroundColor: '#a374ff30', color: '#a374ff' }}>
                    May 2025-Present
                  </span>
                </div>
                <h5 className="text-lg font-ui mb-3" style={{ color: '#16f0d1' }}>MVerse Technology Solutions</h5>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Designed and developed a Flutter/Firebase mobile application with a security-first approach, implementing OAuth2 authentication, encrypted local data storage, and onboarding 100+ active users.</li>
                  <li>Architected and integrated REST and gRPC APIs using FastAPI and Node.js, backed by PostgreSQL and Redis, enabling sub-200ms real-time data synchronization across services.</li>
                  <li>Automated end-to-end CI/CD pipelines using GitHub Actions and Jenkins, adding unit tests with pytest, UI tests with XCTest, and integration tests in Appium.</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-headline font-medium" style={{ color: '#F3F3F3' }}>
                    IT Security Support (Internship)
                  </h4>
                  <span className="text-sm font-ui px-3 py-1 rounded-full" style={{ backgroundColor: '#a374ff30', color: '#a374ff' }}>
                    May 2024 - Sep 2024
                  </span>
                </div>
                <h5 className="text-lg font-ui mb-3" style={{ color: '#16f0d1' }}>iMatter Global Solutions</h5>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Captured lab traffic with Wireshark, pinpointed a misconfigured DNS server, recommended cache resets, and confirmed faster load times after the fix.</li>
                  <li>Ran weekly Nmap sweeps of lab hosts, documented exposed ports, helped shut down two legacy services, and re-scanned to verify closure.</li>
                  <li>Maintained the team's asset inventory (hostnames, patch status, AV dates) and wrote a short phishing-response cheat sheet now used in intern onboarding.</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-headline font-medium" style={{ color: '#F3F3F3' }}>
                    Software Tester & Coordinator (Co-op)
                  </h4>
                  <span className="text-sm font-ui px-3 py-1 rounded-full" style={{ backgroundColor: '#a374ff30', color: '#a374ff' }}>
                    May 2024 – August 2024
                  </span>
                </div>
                <h5 className="text-lg font-ui mb-3" style={{ color: '#16f0d1' }}>MVerse Technology Solutions</h5>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Collaborated with U.S.-based company Om Research as their software partner, diagnosing and resolving issues in AI/ML learning models and data pipelines to streamline workflows and reduce downtime.</li>
                  <li>Conducted regression testing, functional and non-functional testing to validate model stability, accuracy, bias, fairness, and robustness across updates.</li>
                  <li>Documented test results and maintained detailed performance records while participating in requirement reviews, providing actionable feedback on testability and model improvements.</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Education Section */}
          <motion.div variants={itemVariants} className="resume-section">
            <h3 className="text-2xl md:text-3xl font-headline font-medium mb-6" style={{ color: '#ffd074' }}>
              Education
            </h3>
            
            <div className="space-y-8">
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-headline font-medium" style={{ color: '#F3F3F3' }}>
                    B.Sc. Computer Science, Cybersecurity Specialization; Minor in Statistics
                  </h4>
                  <span className="text-sm font-ui px-3 py-1 rounded-full" style={{ backgroundColor: '#a374ff30', color: '#a374ff' }}>
                    2022 - 2026
                  </span>
                </div>
                <h5 className="text-lg font-ui mb-3" style={{ color: '#16f0d1' }}>Carleton University</h5>
              </div>
            </div>
          </motion.div>
          
          {/* Skills Section */}
          <motion.div variants={itemVariants} className="resume-section">
            <h3 className="text-2xl md:text-3xl font-headline font-medium mb-6" style={{ color: '#ffd074' }}>
              Technical Skills
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <h4 className="text-xl font-headline font-medium mb-4" style={{ color: '#16f0d1' }}>
                  Security
                </h4>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Penetration Testing</li>
                  <li>Vulnerability Assessment</li>
                  <li>SIEM Implementation (Splunk)</li>
                  <li>Incident Response</li>
                  <li>Network Security</li>
                  <li>Security Auditing</li>
                  <li>Network Traffic Analysis</li>
                  <li>Port Scanning (Nmap)</li>
                  <li>Phishing Analysis</li>
                  <li>OWASP ZAP Testing</li>
                  <li>AWS CloudTrail Integration</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <h4 className="text-xl font-headline font-medium mb-4" style={{ color: '#16f0d1' }}>
                  Soft Skills
                </h4>
                <ul className="list-disc pl-5 space-y-2 font-ui" style={{ color: '#fffce4' }}>
                  <li>Technical Documentation</li>
                  <li>Team Leadership</li>
                  <li>Project Management</li>
                  <li>Client Communication</li>
                  <li>Security Training</li>
                  <li>Problem Solving</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Download Resume Button */}
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.a
            href="/CybersecurityResume.pdf"
            download
            className="px-8 py-3 rounded-full font-ui font-medium text-lg inline-block"
            style={{ 
              background: 'linear-gradient(45deg, #a374ff, #16f0d1)',
              color: '#0e100f'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume 
