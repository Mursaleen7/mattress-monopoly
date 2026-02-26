import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TechStack = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const technologies = [
    // Development Technologies - Reliable CDN icons
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
    { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#4FC08D' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#ED8B00' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', color: '#FF9900' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
    { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', color: '#31A8FF' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', color: '#06B6D4' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', color: '#7952B3' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#000000' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#E10098' },
    
    // Security & DevOps - Using reliable icons
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#FCC624' },
    { name: 'Ubuntu', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg', color: '#E95420' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5' },
    { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: '#D33833' },
    { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', color: '#009639' },
    { name: 'Apache', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg', color: '#D22128' },
    { name: 'MySQl', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479A1' },
    
    // Cloud & Modern Tech
    { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png', color: '#000000' },
    { name: 'Netlify', icon: 'https://www.netlify.com/v3/img/components/logomark.png', color: '#00C7B7' },
    { name: 'Heroku', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg', color: '#430098' },
    { name: 'DigitalOcean', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg', color: '#0080FF' },
    
    // Additional Modern Tools
    { name: 'Vite', icon: 'https://vitejs.dev/logo.svg', color: '#646CFF' },
    { name: 'Webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg', color: '#8DD6F9' },
    { name: 'Babel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg', color: '#F9DC3E' },
    { name: 'ESLint', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg', color: '#4B32C3' },
    { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', color: '#CC6699' },
    { name: 'Markdown', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg', color: '#000000' },
    
    // Testing & Quality
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', color: '#C21325' },
    { name: 'Cypress', icon: 'https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg', color: '#17202C' },
    
    // Design Tools
    { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', color: '#FF61F6' },
    { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', color: '#FF9A00' },
    
    // Mobile Development
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: '#02569B' },
    { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', color: '#3DDC84' },
    { name: 'iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', color: '#000000' }
  ]

  // Duplicate array for seamless loop
  const duplicatedTechs = [...technologies, ...technologies]

  return (
    <section id="tech-stack" className="py-20 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-headline font-medium text-4xl md:text-6xl text-accent-purple mb-8 tracking-tight">
            MY TECH STACK
          </h2>
          <motion.p 
            className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            My expertise spans a <span className="font-semibold" style={{ color: '#ffd074' }}>diverse range of technologies</span>, enabling me to deliver <span className="font-semibold" style={{ color: '#a374ff' }}>comprehensive</span> and <span className="font-semibold" style={{ color: '#16f0d1' }}>cutting-edge solutions</span> across various platforms.
          </motion.p>
        </motion.div>

        {/* Marquee Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Marquee */}
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex items-center space-x-8"
              animate={{ x: [-120 * technologies.length, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTechs.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-3 min-w-[120px] p-4 transition-all duration-300 group-hover:scale-110">
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      className="w-16 h-16 object-contain transition-all duration-300 group-hover:scale-110"
                      style={{
                        filter: tech.name === 'GitHub' || tech.name === 'Express.js' || tech.name === 'Next.js' || tech.name === 'Vercel' || tech.name === 'Markdown' || tech.name === 'iOS' 
                          ? 'invert(1) brightness(1.3)' 
                          : 'brightness(1.5) contrast(1.3) saturate(1.6)',
                        imageRendering: 'crisp-edges'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <span 
                      className="font-medium text-sm whitespace-nowrap transition-all duration-300 text-center font-semibold group-hover:scale-105" 
                      style={{ 
                        color: '#ffffff'
                      }}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-gray-400 text-lg">
            ...and many more technologies I'm constantly learning and exploring
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack 