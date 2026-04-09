'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  FiBookOpen, FiHeart, FiTarget, FiAward, 
  FiCode, FiUsers, FiDownload, FiCalendar,
  FiUser, FiBriefcase, FiStar, FiTrendingUp,
  FiShield, FiZap, FiHeadphones
} from 'react-icons/fi';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-100px" 
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newParticles = [...Array(20)].map((_, i) => ({
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
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-900 scroll-mt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      {/* Animated Particles */}
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
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={hasAnimated ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-500/10 backdrop-blur-sm border border-cyan-300 dark:border-cyan-500/30 rounded-full px-4 py-2 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Who Am I?</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-red-600 dark:from-cyan-400 dark:via-blue-400 dark:to-red-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio & Background */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Main Bio */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiCode className="text-cyan-500" />
                My Journey
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                I'm <span className="font-semibold text-cyan-600 dark:text-cyan-400">Defar Gobeze Wondafrash</span>, a passionate 
                Senior Software Engineer with over 9 years of experience in building 
                high-performance, scalable applications. My journey in tech started with 
                a curiosity for how things work, which evolved into a career dedicated to 
                solving complex problems through elegant code.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Currently, I focus on <span className="font-medium">Fintech & Banking solutions</span>, 
                architecting microservices, and leading development teams. I believe in 
                writing clean, maintainable code and mentoring the next generation of developers.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiBookOpen className="text-blue-500" />
                Education
              </h3>
              <div className="space-y-4">
               
                <div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FiCalendar className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">2013 - 2016</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mt-1">
                    BSc in Information Technology
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">Haramaya University</p>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiHeart className="text-red-500" />
                Beyond Code
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "📚", name: "Reading Tech Books" },
                  { icon: "🎯", name: "Open Source" },
                  { icon: "🎧", name: "Podcasts" },
                  { icon: "🏃", name: "Running" },
                  { icon: "🎮", name: "Gaming" },
                  { icon: "✍️", name: "Technical Writing" },
                  { icon: "🎤", name: "Public Speaking" },
                  { icon: "🧘", name: "Meditation" },
                ].map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
                  >
                    <span className="mr-1">{interest.icon}</span>
                    {interest.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Goals & Values */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Career Goals */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiTarget className="text-cyan-500" />
                Career Goals
              </h3>
              <ul className="space-y-3">
                {[
                  "Lead large-scale digital transformation initiatives",
                  "Architect systems that serve millions of users",
                  "Contribute to open-source projects that matter",
                  "Mentor junior developers into senior roles",
                  "Build and lead high-performing engineering teams",
                  "Stay at the forefront of AI/ML integration in Fintech"
                ].map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-cyan-500 mt-1">▹</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Achievements & Certifications */}
            {/* <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiAward className="text-yellow-500" />
                Achievements
              </h3>
              <div className="grid gap-3">
                {[
                //   { title: "AWS Certified Solutions Architect", year: "2023" },
                //   { title: "Microsoft Certified: Azure Developer", year: "2022" },
                  { title: "Kubernetes Administrator (CKA)", year: "2023" },
                  { title: "Published 15+ Technical Articles", year: "2024" },
                  { title: "Speaker at DevCon Ethiopia 2023", year: "2023" },
                ].map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <span className="text-gray-700 dark:text-gray-300">{cert.title}</span>
                    <span className="text-xs text-cyan-500 bg-cyan-100 dark:bg-cyan-500/20 px-2 py-1 rounded-full">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div> */}

            {/* Values */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiUsers className="text-purple-500" />
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "Integrity", icon: "🤝" },
                  { value: "Excellence", icon: "⭐" },
                  { value: "Innovation", icon: "💡" },
                  { value: "Collaboration", icon: "👥" },
                  { value: "Continuous Learning", icon: "📖" },
                  { value: "User-Centric", icon: "🎯" },
                ].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="text-xl">{val.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{val.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Resume Button */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Full Resume (PDF)</span>
              </motion.a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Last updated: March 2026
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}