'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  FiClock, FiVideo, FiMessageCircle, FiX, FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar
} from 'react-icons/fi';

export default function ConsultFormModal({ isOpen, onClose, selectedService }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');
  const [mounted, setMounted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      inquiryType: selectedService?.inquiryType || 'consult-architecture',
      name: '',
      email: '',
      phone: '',
      company: '',
      projectDescription: '',
      preferredContactMethod: 'email',
      bestTimeToContact: 'morning',
      timeline: 'flexible',
      hasExistingCodebase: 'false'
    }
  });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen && selectedService) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Reset form when modal opens
      reset({
        inquiryType: selectedService.inquiryType,
        name: '',
        email: '',
        phone: '',
        company: '',
        projectDescription: '',
        preferredContactMethod: 'email',
        bestTimeToContact: 'morning',
        timeline: 'flexible',
        hasExistingCodebase: 'false'
      });
      setPreferredDate('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedService, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        preferredDate,
        source: 'website',
        projectDescription: `${selectedService?.title} Consultation: ${data.projectDescription}`,
        budget: 'negotiable',
        timeline: data.timeline || 'flexible',
        projectType: 'consulting'
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/hire-consult/submit`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        toast.success('Consultation request sent! I will contact you within 24 hours.');
        reset();
        setPreferredDate('');
        // Close modal after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Consult form error:', error);
      const errorMessage = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || 'Failed to submit. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not mounted, not open, or no selected service
  if (!mounted || !isOpen || !selectedService) return null;

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
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white rounded-t-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
              >
                <FiX size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiMessageCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Consultation Request</h2>
                  <p className="text-purple-100">{selectedService?.title || 'Technical Consultation'}</p>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold flex items-center gap-1"><FiClock size={14} /> {selectedService?.duration || '1 hour'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Investment</span>
                  <p className="font-semibold text-purple-600 dark:text-purple-400">{selectedService?.price || 'Custom pricing'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Format</span>
                  <p className="font-semibold flex items-center gap-1"><FiVideo size={14} /> Virtual Call</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/30">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-purple-600 dark:text-purple-400">What to expect:</strong> After booking, I'll review your requirements and send a calendar invite within 24 hours with available time slots.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiUser className="inline mr-1" size={14} /> Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiMail className="inline mr-1" size={14} /> Email *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiPhone className="inline mr-1" size={14} /> Phone *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+251 925 401 353"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FiBriefcase className="inline mr-1" size={14} /> Company
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <FiCalendar className="inline mr-1" size={14} /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                  <select {...register('bestTimeToContact')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500">
                    <option value="morning">🌅 Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">☀️ Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">🌙 Evening (5 PM - 8 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What specific challenges are you facing? *</label>
                  <textarea
                    {...register('projectDescription', { 
                      required: 'Please describe your needs', 
                      minLength: { value: 20, message: 'Please provide at least 20 characters' }
                    })}
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Describe your project goals, current challenges, and what you'd like to achieve from this consultation..."
                  />
                  {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Do you have existing documentation or code?</label>
                  <select {...register('hasExistingCodebase')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500">
                    <option value="false">❌ No, starting fresh</option>
                    <option value="true">✅ Yes, I have existing code/docs</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Contact Method</label>
                    <select {...register('preferredContactMethod')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500">
                      <option value="email">📧 Email</option>
                      <option value="phone">📞 Phone</option>
                      <option value="video-call">🎥 Video Call (Zoom/Google Meet)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urgency Level</label>
                    <select {...register('timeline')} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500">
                      <option value="flexible">🕐 Flexible</option>
                      <option value="short-1month">📅 Within 1 month</option>
                      <option value="urgent-1week">🔥 Urgent (Within 1 week)</option>
                    </select>
                  </div>
                </div>

                <input type="hidden" {...register('inquiryType')} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Book Consultation'
                  )}
                </button>

                <p className="text-center text-xs text-gray-500">
                  Free 15-minute discovery call included. No obligation.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}