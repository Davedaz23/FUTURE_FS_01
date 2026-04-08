'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  FiBriefcase, FiClock, FiUsers, FiCheckCircle, 
  FiCalendar, FiVideo, FiMessageCircle, FiArrowRight, FiStar,
  FiAward, FiTrendingUp, FiShield, FiZap, FiHeadphones, FiGift,
  FiLoader, FiCheck, FiAlertCircle
} from 'react-icons/fi';
import HireFormModal from './HireFormModal';
import ConsultFormModal from './ConsultFormModal';

export default function HireConsult() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-100px",
    threshold: 0.1 
  });
  
  const [activeTab, setActiveTab] = useState('hire');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isFreeConsultModalOpen, setIsFreeConsultModalOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Form state for free consultation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'architecture-review',
    customTopic: '',
    description: '',
    preferredDate: '',
    preferredTimeSlot: 'flexible',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    projectUrl: '',
    budget: 'free-consultation',
    heardFrom: 'other'
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    successMessage: null
  });

  // Trigger animation when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const hirePackages = [
    {
      id: 'fulltime',
      title: "Full-Time Employment",
      duration: "Full-time",
      icon: FiBriefcase,
      inquiryType: "hire-fulltime",
      features: [
        "Dedicated senior engineering resource",
        "Full development lifecycle ownership",
        "Team leadership & mentoring",
        "Code reviews & quality assurance",
        "Architecture design & documentation",
        "24/7 critical issue support"
      ],
      recommended: true,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: 'contract',
      title: "Contract / Freelance",
      duration: "Flexible",
      icon: FiClock,
      inquiryType: "hire-contract",
      features: [
        "Fixed-price or hourly engagement",
        "Specific feature/module development",
        "Technical consulting & code review",
        "Performance optimization",
        "Migration & upgrade services",
        "Quick turnaround time"
      ],
      recommended: false,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: 'freelance',
      title: "Retainer",
      duration: "Ongoing",
      icon: FiCalendar,
      inquiryType: "hire-freelance",
      features: [
        "Guaranteed monthly availability",
        "Priority support & response",
        "Regular maintenance & updates",
        "Security patches & monitoring",
        "Technical advisory board",
        "Quarterly architecture review"
      ],
      recommended: false,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const consultingServices = [
    {
      id: 'architecture',
      title: "Technical Architecture Review",
      icon: FiTrendingUp,
      duration: "2-4 hours",
      inquiryType: "consult-architecture",
      description: "Comprehensive review of your system architecture, identifying bottlenecks, security issues, and scalability improvements."
    },
    {
      id: 'code-audit',
      title: "Code Audit & Optimization",
      icon: FiZap,
      duration: "1-3 days",
      inquiryType: "consult-code-audit",
      description: "Deep dive into your codebase for quality assessment, performance optimization, and best practices implementation."
    },
    {
      id: 'training',
      title: "Team Training & Mentoring",
      icon: FiUsers,
      duration: "Weekly sessions",
      inquiryType: "consult-training",
      description: "Upskill your engineering team through hands-on training, code reviews, and architectural guidance."
    },
    {
      id: 'mvp',
      title: "MVP Development Sprint",
      icon: FiVideo,
      duration: "2-4 weeks",
      inquiryType: "consult-mvp",
      description: "Rapid development of your minimum viable product with full technical stack implementation."
    }
  ];

  const freeConsultingTopics = [
    { value: "architecture-review", icon: "🏗️", title: "Architecture Review", description: "Get expert feedback on your system design and scalability" },
    { value: "debugging-help", icon: "🐛", title: "Debugging Help", description: "Stuck on a technical issue? Let's troubleshoot together" },
    { value: "tech-stack-advice", icon: "📊", title: "Tech Stack Advice", description: "Choosing the right technologies for your project" },
    { value: "performance-optimization", icon: "🚀", title: "Performance Optimization", description: "Identify bottlenecks and optimization opportunities" },
    { value: "security-assessment", icon: "🔒", title: "Security Assessment", description: "Quick security review and best practices" },
    { value: "career-guidance", icon: "📈", title: "Career Guidance", description: "For junior devs: career path, skills, and growth advice" },
  ];

  const expertiseAreas = [
    { name: "Fintech & Banking", icon: "🏦", years: "9+" },
    { name: "Microservices", icon: "🔧", years: "7+" },
    { name: "Cloud Architecture", icon: "☁️", years: "8+" },
    { name: "Team Leadership", icon: "👥", years: "6+" },
    { name: "System Design", icon: "🏗️", years: "9+" },
    { name: "Performance Optimization", icon: "⚡", years: "7+" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, FinTech Startup",
      content: "Defar's architecture review saved us months of rework. His insights on scaling our microservices were invaluable.",
      rating: 5,
      image: "💼"
    },
    {
      name: "Michael Chen",
      role: "Product Director",
      content: "The MVP development sprint delivered beyond expectations. Defar's technical leadership is exceptional.",
      rating: 5,
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Junior Developer",
      content: "The free consultation helped me navigate my career path. Defar's mentorship was incredibly valuable!",
      rating: 5,
      image: "👩‍💻"
    }
  ];

  const handleHireClick = (pkg) => {
    setSelectedPackage(pkg);
    setIsHireModalOpen(true);
  };

  const handleConsultClick = (service) => {
    setSelectedService(service);
    setIsConsultModalOpen(true);
  };

  const handleFreeConsultClick = () => {
    setFormStatus({ submitting: false, submitted: false, error: null, successMessage: null });
    setFormData({
      name: '',
      email: '',
      phone: '',
      consultationType: 'architecture-review',
      customTopic: '',
      description: '',
      preferredDate: '',
      preferredTimeSlot: 'flexible',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      projectUrl: '',
      budget: 'free-consultation',
      heardFrom: 'other'
    });
    setIsFreeConsultModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus.error) {
      setFormStatus(prev => ({ ...prev, error: null }));
    }
  };

  const handleFreeConsultSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({ submitting: true, submitted: false, error: null, successMessage: null });
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/consultation/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors.map(err => err.msg).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Submission failed');
      }
      
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null,
        successMessage: '✓ Consultation request submitted successfully! I will contact you within 24 hours to confirm the schedule.'
      });
      
      setTimeout(() => {
        setIsFreeConsultModalOpen(false);
        setFormStatus({ submitting: false, submitted: false, error: null, successMessage: null });
      }, 3000);
      
    } catch (error) {
      console.error('Consultation submission error:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'Failed to submit. Please try again later.',
        successMessage: null
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="hire-consult" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900 scroll-mt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header - Animated */}
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
            <FiAward className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Work With Me</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-red-600 dark:from-cyan-400 dark:via-blue-400 dark:to-red-500 bg-clip-text text-transparent">
              Hire Me or Book a Consultation
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Leverage 9+ years of senior engineering experience for your next project
          </p>
        </motion.div>

        {/* FREE CONSULTATION BANNER - Animated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5, type: "spring" }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A] rounded-2xl overflow-hidden shadow-2xl shadow-green-500/25">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative p-6 md:p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <FiGift className="w-5 h-5 text-white animate-bounce" />
                <span className="text-sm font-bold text-white">LIMITED TIME OFFER</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                🎓 Free 30-Min Consultation
              </h3>
              <p className="text-white/90 text-lg mb-4 max-w-2xl mx-auto">
                Got a software development challenge? Let's discuss it for free. No strings attached.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                {freeConsultingTopics.slice(0, 3).map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{topic.icon}</span>
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFreeConsultClick}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0F172A] rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiHeadphones className="w-5 h-5" />
                Claim Your Free Consultation
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
              
              <p className="text-white/70 text-xs mt-4">
                ✅ No obligation • ✅ Expert advice • ✅ 30 minutes • ✅ Confidential
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Tabs - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1.5 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <button
              onClick={() => setActiveTab('hire')}
              className={`group relative px-8 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden ${
                activeTab === 'hire'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl scale-105'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="relative flex items-center gap-2">
                <FiBriefcase size={18} className={activeTab === 'hire' ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span>🚀 Hire Me Now</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('consult')}
              className={`group relative px-8 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden ${
                activeTab === 'consult'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl scale-105'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="relative flex items-center gap-2">
                <FiMessageCircle size={18} className={activeTab === 'consult' ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span>💎 Book Consultation</span>
                <span className="text-xs font-semibold bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full ml-1">
                  Limited Slots
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Free Consultation Topics Grid - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
            What you can discuss for free:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {freeConsultingTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + (idx * 0.05), duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleFreeConsultClick}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {topic.title}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hire Me Section */}
        {activeTab === 'hire' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
          >
            {/* Expertise Areas Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
              {expertiseAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm"
                >
                  <span className="text-xl">{area.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area.name}</span>
                  <span className="text-xs bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
                    {area.years} yrs
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Hiring Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {hirePackages.map((pkg, idx) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border ${
                      pkg.recommended 
                        ? 'border-cyan-500 shadow-xl shadow-cyan-500/10' 
                        : 'border-gray-200 dark:border-gray-700 shadow-lg'
                    } transition-all duration-300`}
                  >
                    {pkg.recommended && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                        Recommended
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {pkg.title}
                      </h3>
                      
                      <div className="mb-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{pkg.duration}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FiCheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleHireClick(pkg)}
                        className={`block w-full text-center py-3 px-4 bg-gradient-to-r ${pkg.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg`}
                      >
                        Inquire Now
                        <FiArrowRight className="inline ml-2" size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Consulting Section */}
        {activeTab === 'consult' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
          >
            {/* Consulting Services Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {consultingServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {service.description}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleConsultClick(service)}
                      className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all"
                    >
                      Get Quote
                      <FiArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Testimonials - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + (idx * 0.1), duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner - Animated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Ready to Build Something Great?
          </h3>
          <p className="text-cyan-100 mb-6">
            Let's discuss how I can help bring your vision to life
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab('hire');
                sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Hire Me Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFreeConsultClick}
              className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-all"
            >
              🎓 Free Consultation
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Indicators - Animated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FiShield className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">NDA Protected</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Fast Response</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FiAward className="w-4 h-4 text-red-500" />
            <span className="text-sm">9+ Years Exp</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FiHeadphones className="w-4 h-4 text-green-500" />
            <span className="text-sm">Free Consult Available</span>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <HireFormModal 
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        selectedPackage={selectedPackage}
      />
      
      <ConsultFormModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        selectedService={selectedService}
      />

      {/* Free Consultation Modal */}
      {isFreeConsultModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl border border-green-500/30 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal content remains the same */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A] p-6 rounded-t-2xl text-center sticky top-0 z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                <FiHeadphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Free Consultation</h3>
              <p className="text-white/90 text-sm">30 minutes • No obligation • Expert advice</p>
            </div>
            
            <div className="p-6">
              {formStatus.successMessage && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-500 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <FiCheck className="w-5 h-5" />
                    <span>{formStatus.successMessage}</span>
                  </div>
                </div>
              )}
              
              {formStatus.error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-500 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <FiAlertCircle className="w-5 h-5" />
                    <span>{formStatus.error}</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleFreeConsultSubmit} className="space-y-4">
                {/* Form fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your Name *"
                    required
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Your Email *"
                    required
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone Number (optional)"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleFormChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  >
                    {freeConsultingTopics.map(topic => (
                      <option key={topic.value} value={topic.value}>
                        {topic.icon} {topic.title}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    name="preferredTimeSlot"
                    value={formData.preferredTimeSlot}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  >
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 9 PM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                {formData.consultationType === 'other' && (
                  <input
                    type="text"
                    name="customTopic"
                    value={formData.customTopic}
                    onChange={handleFormChange}
                    placeholder="Please specify your topic"
                    required
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  />
                )}
                
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe your challenge or question in detail... *"
                  rows="4"
                  required
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white resize-none"
                ></textarea>
                
                <input
                  type="url"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleFormChange}
                  placeholder="Project URL (optional)"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                />
                
                <input type="hidden" name="timezone" value={formData.timezone} />
                <input type="hidden" name="budget" value="free-consultation" />
                <input type="hidden" name="heardFrom" value="website" />
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="flex-1 bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus.submitting ? (
                      <>
                        <FiLoader className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Schedule Free Call'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFreeConsultModalOpen(false)}
                    disabled={formStatus.submitting}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                By scheduling, you agree to the terms. Your info is confidential.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}