'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counters, setCounters] = useState({
    repos: 0,
    years: 0,
    technologies: 0,
    projects: 0
  });

  // Animated counter effect
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const step = 16; // 60fps
      const steps = duration / step;
      
      let currentStep = 0;
      const targetValues = { repos: 61, years: 9, technologies: 15, projects: 50 };
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          repos: Math.min(Math.floor(targetValues.repos * progress), targetValues.repos),
          years: Math.min(Math.floor(targetValues.years * progress), targetValues.years),
          technologies: Math.min(Math.floor(targetValues.technologies * progress), targetValues.technologies),
          projects: Math.min(Math.floor(targetValues.projects * progress), targetValues.projects)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, step);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const stats = [
    { 
      key: "repos",
      value: counters.repos, 
      label: "GitHub Repos", 
      icon: "📦", 
      suffix: "+",
      delay: 0.1,
      description: "Open source contributions",
      gradient: "from-cyan-400 to-blue-500"
    },
    { 
      key: "years",
      value: counters.years, 
      label: "Years Experience", 
      icon: "⏱️", 
      suffix: "+",
      delay: 0.2,
      description: "Industry expertise",
      gradient: "from-blue-400 to-cyan-500"
    },
    { 
      key: "technologies",
      value: counters.technologies, 
      label: "Technologies", 
      icon: "⚙️", 
      suffix: "+",
      delay: 0.3,
      description: "Tech stack mastery",
      gradient: "from-cyan-400 to-[#E63946]"
    },
    { 
      key: "projects",
      value: counters.projects, 
      label: "Projects", 
      icon: "🚀", 
      suffix: "+",
      delay: 0.4,
      description: "Successfully delivered",
      gradient: "from-[#E63946] to-cyan-400"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with parallax effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A]"></div> */}
      
      {/* Animated background particles */}
    <div className="absolute inset-0 opacity-30">
  {[...Array(20)].map((_, i) => {
    // Use state to store random positions that only generate on client
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
      // Only set positions on client side
      setPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 600
      });
    }, []);
    
    return (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
        initial={{ x: position.x, y: position.y }}
        animate={{
          y: [null, -50, 50, -50],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
        style={{ left: `${Math.random() * 100}%` }}
      />
    );
  })}
</div>

      {/* Top decorative curve */}
      {/* <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0F172A] to-transparent"></div> */}
      
      {/* Bottom decorative curve */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0F172A] to-transparent"></div> */}

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header with transition text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Impact Metrics</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gray-800 dark:text-gray-200">
              Professional Impact
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Numbers that reflect my commitment to excellence and technical expertise
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: stat.delay, duration: 0.5, type: "spring" }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 overflow-hidden">
                
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${stat.gradient.includes('cyan') ? '#06B6D4' : '#E63946'}, #3B82F6)` }}
                />
                
                {/* Icon with pulse animation */}
                <div className="relative">
                  <motion.div
                    animate={isInView ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ delay: stat.delay + 0.3, duration: 0.5 }}
                    className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block"
                  >
                    {stat.icon}
                  </motion.div>
                </div>

                {/* Animated Counter */}
                <div className="relative">
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  
                  {/* Decorative underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "40%" } : {}}
                    transition={{ delay: stat.delay + 0.4, duration: 0.6 }}
                    className={`h-0.5 bg-gradient-to-r ${stat.gradient} rounded-full mb-3`}
                  />
                </div>

                {/* Label and Description */}
                <div className="relative">
                  <div className="text-gray-200 font-semibold text-lg mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {stat.description}
                  </div>
                </div>

                {/* Hover Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-cyan-500/50 animate-pulse"></div>
                </div>
              </div>

              {/* Connector Line (for desktop) */}
              {idx < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
              <span>Real-time metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span>Verified achievements</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full"></span>
              <span>Continuous growth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}