'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Home, User, Briefcase, FolderGit2, Mail, Award, Calendar } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'skills', 'experience', 'projects', 'hire-consult', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home, id: 'home' },
    { name: 'Skills', href: '#skills', icon: Code, id: 'skills' },
    { name: 'Experience', href: '#experience', icon: Briefcase, id: 'experience' },
    { name: 'Projects', href: '#projects', icon: FolderGit2, id: 'projects' },
    { name: 'Hire/Consult', href: '#hire-consult', icon: Calendar, id: 'hire-consult' },
    { name: 'Contact', href: '#contact', icon: Mail, id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group relative flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-2 shadow-lg shadow-cyan-500/25">
                  <Code className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-[#E63946] bg-clip-text text-transparent">
                  Defar Gobeze
                </span>
                <span className="hidden md:inline-block text-xs text-gray-400 ml-2">Senior Software Engineer</span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Active Indicator - Cyan */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg -z-10 border border-cyan-500/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Effect */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              
              {/* Resume Button - Red Accent */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="ml-4 px-5 py-2 bg-gradient-to-r from-[#E63946] to-[#C1121F] rounded-lg text-white font-semibold flex items-center gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(230, 57, 70, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-cyan-500/30 shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
            />
            
            {/* Menu Panel - Dark Theme */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-gradient-to-br from-[#0F172A] to-[#1D3557] shadow-2xl z-50 md:hidden border-l border-cyan-500/20"
            >
              {/* Header */}
              <div className="p-6 border-b border-cyan-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-2 shadow-lg shadow-cyan-500/25">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Defar Gobeze</div>
                      <div className="text-xs text-cyan-400">Senior Software Engineer</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/10 border border-cyan-500/30"
                  >
                    <X className="w-5 h-5 text-cyan-400" />
                  </button>
                </div>
                
                {/* Senior Stats - Dark Cards */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { value: "9+", label: "Years" },
                    { value: "61+", label: "Repos" },
                    { value: "20+", label: "Mentored" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                      <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/50'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileNav"
                          className="ml-auto w-1 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        />
                      )}
                    </motion.a>
                  );
                })}
                
                {/* Mobile Resume Button - Red Accent */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center justify-center gap-2 mt-6 px-4 py-3 bg-gradient-to-r from-[#E63946] to-[#C1121F] rounded-lg text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
                  whileTap={{ scale: 0.98 }}
                >
                  <Award className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>
              </div>
              
              {/* Social Links - Dark Theme */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-500/20 bg-black/30 backdrop-blur-sm">
                <div className="flex justify-center gap-4">
                  {[
                    { icon: "💼", name: "LinkedIn", href: "https://linkedin.com/in/defargobeze" },
                    { icon: "🐙", name: "GitHub", href: "https://github.com/defargobeze" },
                    { icon: "🐦", name: "Twitter", href: "https://twitter.com/defargobeze" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-cyan-500/20 transition-all duration-300 border border-white/10 hover:border-cyan-500/50 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300 inline-block">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}