'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react'; // Add useEffect to imports
import { 
  SiReact, SiNodedotjs, SiNextdotjs, SiTypescript, 
  SiJavascript, SiMongodb, SiPostgresql, SiDotnet,
  SiTailwindcss, SiGraphql, SiDocker, SiKubernetes,
  SiGit, SiFigma, SiFirebase, SiVuedotjs, SiAmazonaws,
  SiRedis, SiJenkins, SiTerraform
} from 'react-icons/si';

const skills = [
  // Frontend
  { name: 'React.js', icon: SiReact, color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Frontend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'Backend' },
  { name: '.NET Core', icon: SiDotnet, color: '#512BD4', category: 'Backend' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'Backend' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'Backend' },
  
  // Database
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'Database' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D', category: 'Database' },
  
  // DevOps & Cloud
  { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'DevOps' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', category: 'DevOps' },
  { name: 'AWS', icon: SiAmazonaws, color: '#FF9900', category: 'DevOps' },
  { name: 'Jenkins', icon: SiJenkins, color: '#D33833', category: 'DevOps' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC', category: 'DevOps' },
  
  // Tools
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'Tools' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'Tools' },
];

const categories = [...new Set(skills.map(skill => skill.category))];

const categoryIcons = {
  Frontend: '🎨',
  Backend: '⚙️',
  Database: '🗄️',
  DevOps: '☁️',
  Tools: '🔧'
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Generate particles on client side only
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {  // Now this works because useEffect is imported
    if (typeof window !== 'undefined') {
      const newParticles = [...Array(30)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
            initial={{
              x: `${particle.left}%`,
              y: `${particle.top}%`,
            }}
            animate={{
              y: [null, -30, 30, -30],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-500/10 backdrop-blur-sm border border-cyan-300 dark:border-cyan-500/30 rounded-full px-4 py-2 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Technical Arsenal</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-red-600 dark:from-cyan-400 dark:via-blue-400 dark:to-red-500 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Leveraging cutting-edge technologies to build scalable, high-performance solutions
          </p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {categories.map((category, categoryIdx) => (
            <motion.div key={category} variants={itemVariants}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{categoryIcons[category]}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      custom={index}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="group relative"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      
                      {/* Skill Card */}
                      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 overflow-hidden shadow-sm hover:shadow-xl">
                        
                        {/* Icon Container */}
                        <div className="relative flex flex-col items-center text-center">
                          <motion.div
                            animate={hoveredSkill === skill.name ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            } : {}}
                            transition={{ duration: 0.3 }}
                            className="mb-4"
                          >
                            <skill.icon
                              className="text-5xl transition-all duration-300 group-hover:scale-110"
                              style={{ color: skill.color }}
                            />
                          </motion.div>
                          
                          {/* Skill Name */}
                          <h4 className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                            {skill.name}
                          </h4>
                        </div>

                        {/* Hover Border Animation */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/50"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Beyond Technical Skills
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Core competencies that drive successful project delivery
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "System Architecture", icon: "🏗️", color: "cyan" },
              { name: "Team Leadership", icon: "👥", color: "blue" },
              { name: "Agile Methodologies", icon: "🔄", color: "red" },
              { name: "Code Review", icon: "📝", color: "cyan" },
              { name: "Technical Writing", icon: "📚", color: "blue" },
              { name: "Mentoring", icon: "🎓", color: "red" },
              { name: "Performance Optimization", icon: "⚡", color: "cyan" },
              { name: "Security Best Practices", icon: "🔒", color: "blue" },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-cyan-500/50 transition-all duration-300 group shadow-sm hover:shadow-lg"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">9+ years of continuous learning & adaptation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
