import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiAmazonaws, 
  SiFortinet, 
  SiIbm, 
  SiCisco, 
  SiSplunk, 
  SiGoogle,
  SiComptia
} from 'react-icons/si'
import { BsBriefcase } from 'react-icons/bs'

const Specialization = () => {
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

  // Cybersecurity certifications
  const certifications = [
    {
      title: "AWS Cloud Practitioner",
      fullName: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services (AWS)",
      status: "Completed",
      issued: "Jun 2025",
      credentialId: "8D79F3AVR7",
      description: "Foundation certification covering AWS cloud services, security fundamentals, and cloud architecture principles.",
      skills: ["AWS Lambda", "Cloud Security Fundamentals", "AWS CloudFormation"],
      color: "#ff9900",
      icon: SiAmazonaws
    },
    {
      title: "Fortinet FCA",
      fullName: "Fortinet Certified Associate Cybersecurity",
      issuer: "Fortinet",
      status: "Completed",
      issued: "Jun 2025",
      expires: "Jun 2027",
      description: "Associate-level certification covering network security, firewall management, and cybersecurity fundamentals.",
      skills: ["Cybersecurity", "Web Filtering", "Intrusion Detection"],
      color: "#ee3124",
      icon: SiFortinet
    },
    {
      title: "IBM Cybersecurity",
      fullName: "Cybersecurity Fundamentals",
      issuer: "IBM",
      status: "Completed",
      issued: "May 2025",
      credentialId: "3d71006c-239c-4bb5-bff7-07ba976dabaa",
      description: "Comprehensive foundation in cybersecurity practices, threat analysis, and defense strategies.",
      skills: ["Cybersecurity Practices", "Cyber Attack", "Cyber Defense"],
      color: "#1261fe",
      icon: SiIbm
    },
    {
      title: "Cisco Ethical Hacker",
      fullName: "Ethical Hacker",
      issuer: "Cisco",
      status: "Completed",
      issued: "May 2025",
      credentialId: "ac9263c3-0268-4eeb-bef3-6b6b5c3327e2",
      description: "Practical certification in ethical hacking methodologies, penetration testing, and vulnerability assessment.",
      skills: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment", "Vulnerability Scanning", "Exploiting Applications"],
      color: "#1ba0d7",
      icon: SiCisco
    },
    {
      title: "Splunk Intro",
      fullName: "Intro to Splunk",
      issuer: "Splunk",
      status: "Completed",
      issued: "May 2025",
      credentialId: "regdw000000001339845",
      description: "Introduction to Splunk platform for security information and event management (SIEM) and data analysis.",
      skills: ["SIEM", "Log Analysis", "Security Monitoring", "Data Visualization"],
      color: "#000000",
      icon: SiSplunk
    },
    {
      title: "Google Cybersecurity",
      fullName: "Google Cybersecurity Professional Certificate",
      issuer: "Google",
      status: "In Progress",
      description: "Comprehensive professional certificate program covering cybersecurity fundamentals, risk management, incident response, and hands-on security tools.",
      skills: ["Network Security", "Linux", "SQL", "SIEM Tools", "Incident Response", "Risk Assessment"],
      color: "#4285f4",
      icon: SiGoogle
    },
    {
      title: "CompTIA Security+",
      fullName: "CompTIA Security+ Certification",
      issuer: "CompTIA",
      status: "In Progress",
      description: "Industry-standard certification validating baseline skills necessary to perform core security functions and pursue an IT security career.",
      skills: ["Network Security", "Threats & Vulnerabilities", "Cryptography", "Identity Management", "Access Control", "Risk Management"],
      color: "#CD1042",
      icon: SiComptia
    },
    {
      title: "ISO/IEC 27001:2022 Lead Auditor",
      fullName: "ISO/IEC 27001:2022 Lead Auditor",
      issuer: "Mastermind",
      status: "Completed",
      issued: "May 2025",
      expires: "May 2028",
      credentialId: "xx8v5gutxl",
      description: "Mastery of auditing information security management systems (ISMS) against the ISO/IEC 27001:2022 standard.",
      skills: ["Governance, Risk Management, and Compliance (GRC)", "Information Security", "ISO/IEC 17021", "ISO 27001 Lead Auditor", "ISO/IEC 27006"],
      color: "#6366f1",
      icon: BsBriefcase
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#22c55e'
      case 'In Progress': return '#eab308'
      case 'Pursuing': return '#3b82f6'
      case 'Future Goal': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  return (
    <section id="certifications" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
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
            Certificates
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl font-ui leading-relaxed max-w-3xl mx-auto"
            style={{ color: '#fffce4' }}
            variants={itemVariants}
          >
            Building expertise through industry-recognized cybersecurity certifications and continuous learning 
            to stay ahead of evolving threats.
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="group p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span 
                  className="px-3 py-1 text-xs font-ui font-medium rounded-full border"
                  style={{ 
                    color: getStatusColor(cert.status),
                    borderColor: getStatusColor(cert.status) + '40',
                    backgroundColor: getStatusColor(cert.status) + '10'
                  }}
                >
                  {cert.status}
                </span>
              </div>

              {/* Certification Icon/Badge */}
              <div className="mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: cert.color }}
                >
                  {cert.icon && (
                    (cert.icon === SiCisco || cert.icon === SiSplunk || cert.icon === SiComptia) ? 
                    <cert.icon size={44} /> : 
                    <cert.icon size={30} />
                  )}
                </div>
              </div>
              
              {/* Title and Issuer */}
              <div className="mb-4">
                <h3 className="text-xl font-headline font-semibold mb-2 group-hover:text-white transition-colors duration-300" 
                    style={{ color: '#ffd074' }}>
                  {cert.title}
                </h3>
                <h4 className="text-sm font-ui font-medium mb-2" style={{ color: '#F3F3F3' }}>
                  {cert.fullName}
                </h4>
                <p className="text-xs font-ui mb-2" style={{ color: '#a0a0a0' }}>
                  {cert.issuer}
                </p>
                
                {/* Issue Date and Credential Info */}
                <div className="text-xs font-ui space-y-1" style={{ color: '#a0a0a0' }}>
                  {cert.issued && <p>Issued: {cert.issued}</p>}
                  {cert.expires && <p>Expires: {cert.expires}</p>}
                  {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm font-ui leading-relaxed mb-4"
                 style={{ color: '#fffce4' }}>
                {cert.description}
              </p>

              {/* Special handling for Job Simulations */}
              {cert.simulations && (
                <div className="mb-4">
                  <h5 className="text-sm font-ui font-semibold mb-2" style={{ color: '#ffd074' }}>
                    Completed Simulations:
                  </h5>
                  <div className="space-y-2">
                    {cert.simulations.map((sim, simIndex) => (
                      <div key={simIndex} className="text-xs font-ui p-2 rounded-lg bg-white/5 border border-white/10">
                        <p className="font-medium" style={{ color: '#F3F3F3' }}>{sim.name}</p>
                        <p style={{ color: '#a0a0a0' }}>{sim.issuer} • ID: {sim.credentialId}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {cert.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 text-xs font-ui rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    style={{ color: '#F3F3F3' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Progress Indicator - For completed and in progress certifications */}
              {(cert.status === 'Completed' || cert.status === 'In Progress') && (
                <div className="mt-4">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cert.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { 
                        width: cert.status === 'Completed' ? '100%' : '65%'
                      } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 lg:mt-24"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-3 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-ui font-medium" style={{ color: '#fffce4' }}>
              View my certification progress
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default Specialization 