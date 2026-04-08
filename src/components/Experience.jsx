'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  FiBriefcase, FiCalendar, FiMapPin, FiAward, 
  FiTrendingUp, FiUsers, FiCode, FiCloud 
} from 'react-icons/fi';

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Leading Fintech Company',
    location: 'Remote',
    period: '2022 - Present',
    type: 'Full-time',
    icon: FiTrendingUp,
    color: 'cyan',
    achievements: [
      'Lead development of enterprise-scale fintech applications serving 1M+ monthly active users',
      'Architect and implement microservices using Node.js, .NET Core, and Kubernetes handling 50K+ transactions/day',
      'Mentor a team of 5 junior developers, conduct code reviews, and drive technical excellence',
      'Implement CI/CD pipelines reducing deployment time by 60% and increasing release frequency by 300%'
    ],
    technologies: ['Node.js', '.NET Core', 'Kubernetes', 'Docker', 'MongoDB', 'React'],
    impact: '40% performance improvement',
    impactMetric: '+40%'
  },
  {
    title: 'Development Manager (Part-Time)',
    company: 'Tech Startup',
    location: 'Remote',
    period: '2021 - Present',
    type: 'Part-time',
    icon: FiUsers,
    color: 'blue',
    achievements: [
      'Manage a distributed team of 8 developers across 3 time zones using Agile methodologies',
      'Define technical roadmap and architecture decisions for 3 concurrent product lines',
      'Establish coding standards, best practices, and implement automated code quality checks',
      'Successfully launched 3 products to production, achieving 99.9% uptime'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Terraform'],
    impact: '3 successful launches',
    impactMetric: '3 Products'
  },
  {
    title: 'Full Stack Developer',
    company: 'Software Solutions Inc',
    location: 'Addis Ababa, Ethiopia',
    period: '2017 - 2022',
    type: 'Full-time',
    icon: FiCode,
    color: 'red',
    achievements: [
      'Built responsive web applications using React and Vue.js for enterprise clients',
      'Developed and maintained RESTful APIs and GraphQL services serving 500K+ requests/day',
      'Optimized database queries and implementing caching strategies improving performance by 40%',
      'Collaborated with product team on feature specifications and delivered 50+ major features'
    ],
    technologies: ['React', 'Vue.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    impact: '40% performance boost',
    impactMetric: '+40%'
  }
];

const colorMap = {
  cyan: 'from-cyan-500 to-blue-600',
  blue: 'from-blue-500 to-cyan-600',
  red: 'from-[#E63946] to-[#C1121F]'
};

const bgColorMap = {
  cyan: 'bg-cyan-50 dark:bg-cyan-950/30',
  blue: 'bg-blue-50 dark:bg-blue-950/30',
  red: 'bg-red-50 dark:bg-red-950/30'
};

const borderColorMap = {
  cyan: 'border-cyan-200 dark:border-cyan-800',
  blue: 'border-blue-200 dark:border-blue-800',
  red: 'border-red-200 dark:border-red-800'
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="experience" className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
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
            <FiBriefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Professional Journey</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-[#E63946] dark:from-cyan-400 dark:via-blue-400 dark:to-[#E63946] bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            9+ years of delivering excellence across fintech, enterprise, and startup environments
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-blue-400 to-[#E63946] hidden md:block"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              const isExpanded = expandedId === idx;
              
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-white dark:border-gray-900 z-10 hidden md:block"></div>
                  
                  {/* Timeline Connector Line (Mobile) */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-[#E63946] md:hidden"></div>

                  {/* Content */}
                  <div className={`flex-1 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative bg-white dark:bg-gray-800 border ${borderColorMap[exp.color]} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 overflow-hidden`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 ${bgColorMap[exp.color]} rounded-lg border ${borderColorMap[exp.color]}`}>
                              <Icon className={`w-4 h-4 text-${exp.color}-600 dark:text-${exp.color}-400`} />
                            </div>
                            <span className={`text-xs font-semibold text-${exp.color}-600 dark:text-${exp.color}-400 px-2 py-1 ${bgColorMap[exp.color]} rounded-full border ${borderColorMap[exp.color]}`}>
                              {exp.type}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className={`text-${exp.color}-600 dark:text-${exp.color}-400 font-semibold`}>
                            {exp.company}
                          </p>
                        </div>
                        
                        {/* Impact Badge */}
                        <div className={`hidden sm:flex flex-col items-end bg-gradient-to-r ${colorMap[exp.color]} rounded-lg px-3 py-1 shadow-lg`}>
                          <span className="text-xs text-white/80">Impact</span>
                          <span className="text-sm font-bold text-white">{exp.impactMetric}</span>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiAward size={14} />
                          <span>{exp.impact}</span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        {exp.achievements.slice(0, isExpanded ? undefined : 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                            <span className="text-sm leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expand/Collapse Button */}
                      {exp.achievements.length > 2 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : idx)}
                          className={`text-sm font-semibold text-${exp.color}-600 dark:text-${exp.color}-400 hover:text-${exp.color}-700 dark:hover:text-${exp.color}-300 transition-colors mb-4`}
                        >
                          {isExpanded ? 'Show less ↑' : `Show ${exp.achievements.length - 2} more achievements ↓`}
                        </button>
                      )}

                      {/* Technologies Used */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 ${bgColorMap[exp.color]} border ${borderColorMap[exp.color]} rounded-md text-xs text-${exp.color}-600 dark:text-${exp.color}-400 hover:bg-opacity-20 transition-colors`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile Impact Badge */}
                      <div className={`sm:hidden mt-4 inline-flex items-center gap-2 bg-gradient-to-r ${colorMap[exp.color]} rounded-lg px-3 py-1 shadow-lg`}>
                        <FiAward className="w-3 h-3 text-white" />
                        <span className="text-xs text-white">Impact: {exp.impactMetric}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(230, 57, 70, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E63946] to-[#C1121F] rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiAward className="w-5 h-5" />
            <span>Download Full Resume</span>
            <span className="text-lg">📄</span>
          </motion.a>
          
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
            Detailed work history, certifications, and references available upon request
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: FiUsers, label: "20+ Team Members Led", color: "cyan" },
            { icon: FiCode, label: "100+ Code Reviews/Week", color: "blue" },
            { icon: FiCloud, label: "99.9% Uptime Achieved", color: "red" },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm">
              <stat.icon className={`w-4 h-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}