'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiBriefcase, FiTarget, 
  FiCalendar, FiDollarSign, FiCpu, FiUsers, FiMessageCircle,
  FiSend, FiCheckCircle, FiArrowRight, FiX, FiClock, FiAward
} from 'react-icons/fi';

export default function HireFormModal({ isOpen, onClose, selectedPackage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form when modal closes
      reset();
      setSelectedTechnologies([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      inquiryType: selectedPackage?.inquiryType || 'hire-fulltime',
      position: selectedPackage?.title || '',
      timeline: 'flexible',
      budget: 'negotiable',
      projectType: 'consulting'
    }
  });

  const commonTechnologies = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript',
    'Python', 'Java', '.NET Core', 'Go', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Kubernetes', 'GraphQL'
  ];

  const addTechnology = (tech) => {
    if (!selectedTechnologies.includes(tech)) {
      setSelectedTechnologies([...selectedTechnologies, tech]);
    }
  };

  const removeTechnology = (tech) => {
    setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        technologies: selectedTechnologies,
        source: 'website',
        inquiryType: data.inquiryType,
        timeline: data.timeline || 'flexible',
        budget: data.budget || 'negotiable',
        projectType: data.projectType || 'consulting',
        hasExistingCodebase: false,
        existingTechStack: [],
        teamSize: parseInt(data.teamSize) || 1
      };

      console.log('Submitting payload:', payload);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/hire-consult/submit`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        setSelectedTechnologies([]);
        // Close modal after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Hire form submission error:', error);
      const errorMessage = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Failed to submit. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white rounded-t-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
              >
                <FiX size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiBriefcase size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Hire Me</h2>
                  <p className="text-cyan-100">{selectedPackage?.title || 'Employment Opportunity'}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="mb-6 p-4 bg-cyan-50 dark:bg-cyan-500/10 rounded-lg border border-cyan-200 dark:border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="text-cyan-600" />
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">Hiring Benefits</span>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>✓ 9+ years of senior engineering experience</li>
                  <li>✓ Full development lifecycle ownership</li>
                  <li>✓ Available for full-time, contract, or freelance</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                      {...register('phone')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="+251 925 401 353"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Company</label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position/Role *</label>
                  <input
                    {...register('position', { required: 'Position is required' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., CTO, Engineering Manager, Tech Lead"
                  />
                  {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description *</label>
                  <textarea
                    {...register('projectDescription', { 
                      required: 'Project description is required',
                      minLength: { value: 20, message: 'Please provide at least 20 characters' }
                    })}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                    placeholder="Describe the role, company culture, challenges, and what makes this opportunity exciting..."
                  />
                  {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Timeline *</label>
                  <select
                    {...register('timeline', { required: 'Timeline is required' })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="flexible">Flexible</option>
                    <option value="short-1month">Within 1 month</option>
                    <option value="medium-3months">Within 3 months</option>
                    <option value="long-6months">Within 6+ months</option>
                    <option value="urgent-1week">Urgent (Within 1 week)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTechnologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/20 rounded-full text-sm flex items-center gap-1">
                        {tech}
                        <button type="button" onClick={() => removeTechnology(tech)} className="hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                  <select
                    onChange={(e) => { if(e.target.value) { addTechnology(e.target.value); e.target.value = ''; } }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500"
                    value=""
                  >
                    <option value="">Add technology...</option>
                    {commonTechnologies.filter(t => !selectedTechnologies.includes(t)).map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Size (Optional)</label>
                  <input
                    {...register('teamSize')}
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500"
                    placeholder="Number of team members"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Contact Method</label>
                    <select {...register('preferredContactMethod')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                      <option value="email">📧 Email</option>
                      <option value="phone">📞 Phone</option>
                      <option value="video-call">🎥 Video Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Best Time to Contact</label>
                    <select {...register('bestTimeToContact')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                </div>

                {/* Hidden required fields */}
                <input type="hidden" {...register('inquiryType')} />
                <input type="hidden" {...register('budget')} value="negotiable" />
                <input type="hidden" {...register('projectType')} value="consulting" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}