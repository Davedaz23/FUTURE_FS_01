'use client';

import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/defargobeze', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/defargobeze', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FiTwitter, href: 'https://twitter.com/defargobeze', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FiMail, href: 'mailto:davegbhonesty@gmail.com', label: 'Email', color: 'hover:text-red-400' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0F172A] via-[#1D3557] to-[#0F172A] text-white">
      {/* Subtle Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-[#E63946] bg-clip-text text-transparent mb-2">
                Defar Gobeze
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                Senior Software Engineer specializing in scalable fintech solutions, 
                cloud architecture, and team leadership.
              </p>
            </motion.div>
            
            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['React', 'Node.js', '.NET', 'AWS', 'Kubernetes'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <span className="text-cyan-400">Email:</span>{' '}
                <a 
                  href="mailto:davegbhonesty@gmail.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  davegbhonesty@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="text-cyan-400">Phone:</span>{' '}
                <a 
                  href="tel:+251925401353"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +251 925 401 353
                </a>
              </li>
              <li className="text-gray-400">
                <span className="text-cyan-400">Location:</span> Addis Ababa, Ethiopia
              </li>
              <li className="text-gray-400">
                <span className="text-cyan-400">Response:</span> Within 24 hours
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            &copy; {currentYear} Defar Gobeze Wondafrash. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 transition-all duration-300 ${social.color}`}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Made with love */}
          <div className="text-gray-500 text-xs flex items-center gap-1">
            Made with <FiHeart className="text-red-400 w-3 h-3 animate-pulse" /> in Ethiopia
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} className="text-white" />
        </motion.button>
      )}
    </footer>
  );
}