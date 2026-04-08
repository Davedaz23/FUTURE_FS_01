'use client';
import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiExternalLink, FiStar, FiCode, FiGrid, FiSmartphone, FiServer, FiCloud } from 'react-icons/fi';

// Static project data - no API needed
const staticProjects = [
  {
    _id: '1',
    title: 'Enterprise Mobile Banking App',
    description: 'A secure, feature-rich mobile banking application serving 500k+ users with real-time transaction processing and biometric authentication.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    githubUrl: 'https://github.com/defargobeze/mobile-banking',
    liveUrl: '#',
    category: 'mobile',
    featured: true,
    metrics: '500K+ Users',
    year: '2024'
  },
  {
    _id: '2',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics platform for e-commerce businesses with customizable dashboards and predictive insights.',
    technologies: ['Next.js', 'Express', 'PostgreSQL', 'Socket.io', 'D3.js'],
    githubUrl: 'https://github.com/defargobeze/analytics-dashboard',
    liveUrl: '#',
    category: 'fullstack',
    featured: true,
    metrics: '1M+ Events/Day',
    year: '2023'
  },
  {
    _id: '3',
    title: 'Cloud Native Microservices',
    description: 'Enterprise-grade microservices architecture with Kubernetes orchestration and gRPC communication.',
    technologies: ['Go', 'Kubernetes', 'gRPC', 'Kafka', 'Jaeger'],
    githubUrl: 'https://github.com/defargobeze/microservices',
    liveUrl: '#',
    category: 'backend',
    featured: false,
    metrics: '99.99% Uptime',
    year: '2024'
  },
  {
    _id: '4',
    title: 'AI-Powered Chat Platform',
    description: 'Real-time chat application with AI-powered responses and sentiment analysis.',
    technologies: ['Next.js', 'Python', 'TensorFlow', 'WebSocket', 'Redis'],
    githubUrl: 'https://github.com/defargobeze/ai-chat',
    liveUrl: '#',
    category: 'fullstack',
    featured: true,
    metrics: '10K+ Concurrent Users',
    year: '2024'
  },
  {
    _id: '5',
    title: 'E-Commerce Microservices',
    description: 'Scalable e-commerce platform using microservices architecture with event-driven design.',
    technologies: ['Node.js', 'RabbitMQ', 'MongoDB', 'Docker', 'Redis'],
    githubUrl: 'https://github.com/defargobeze/ecommerce-microservices',
    liveUrl: '#',
    category: 'backend',
    featured: false,
    metrics: '100K+ Orders/Month',
    year: '2023'
  },
  {
    _id: '6',
    title: 'DevOps Monitoring Dashboard',
    description: 'Comprehensive monitoring solution for microservices with real-time alerts and visualization.',
    technologies: ['React', 'Grafana', 'Prometheus', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/defargobeze/devops-dashboard',
    liveUrl: '#',
    category: 'devops',
    featured: false,
    metrics: '24/7 Monitoring',
    year: '2024'
  },
  {
    _id: '7',
    title: 'Portfolio Website',
    description: 'Modern portfolio website built with Next.js, TailwindCSS, and Framer Motion.',
    technologies: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/defargobeze/portfolio',
    liveUrl: 'https://defargobeze.com',
    category: 'frontend',
    featured: true,
    metrics: 'Live',
    year: '2024'
  },
  {
    _id: '8',
    title: 'Task Management System',
    description: 'Full-stack task management application with real-time updates and team collaboration features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'TailwindCSS'],
    githubUrl: 'https://github.com/defargobeze/task-manager',
    liveUrl: '#',
    category: 'fullstack',
    featured: false,
    metrics: '5K+ Active Users',
    year: '2023'
  },
  {
    _id: '9',
    title: 'Weather Dashboard',
    description: 'Real-time weather monitoring dashboard with interactive maps and forecasts.',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Chart.js'],
    githubUrl: 'https://github.com/defargobeze/weather-dashboard',
    liveUrl: '#',
    category: 'frontend',
    featured: false,
    metrics: 'Real-time Data',
    year: '2023'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Use static data directly - no API call needed
    setProjects(staticProjects);
    setLoading(false);
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', icon: FiGrid },
    { id: 'fullstack', label: 'Full Stack', icon: FiCode },
    { id: 'frontend', label: 'Frontend', icon: FiCode },
    { id: 'backend', label: 'Backend', icon: FiServer },
    { id: 'mobile', label: 'Mobile', icon: FiSmartphone },
    { id: 'devops', label: 'DevOps', icon: FiCloud },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

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

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900">
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-500/10 backdrop-blur-sm border border-cyan-300 dark:border-cyan-500/30 rounded-full px-4 py-2 mb-4"
          >
            <FiCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Portfolio Showcase</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-red-600 dark:from-cyan-400 dark:via-blue-400 dark:to-red-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Here are some of my recent projects that demonstrate my expertise
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full capitalize transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Project Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* Image Container */}
                <div className="relative overflow-hidden h-52 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5">
                  <div className="flex items-center justify-center h-full">
                    <FiCode className="w-16 h-16 text-cyan-400 dark:text-cyan-500" />
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      <FiStar size={12} />
                      <span>Featured</span>
                    </div>
                  )}
                  
                  {/* Year Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
                    {project.year || '2024'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Metrics Badge */}
                  {project.metrics && (
                    <div className="inline-flex items-center gap-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-1 rounded-md text-xs mb-3">
                      <FiStar size={10} />
                      <span>{project.metrics}</span>
                    </div>
                  )}
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <FiGithub size={18} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <FiExternalLink size={18} />
                        <span className="text-sm">Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/30"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/defargobeze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl transition-all duration-300"
            >
              <FiGithub size={18} />
              <span>View More on GitHub</span>
            </motion.a>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500">
              <FiCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects found in this category.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                View all projects
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}