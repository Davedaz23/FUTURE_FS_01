'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiBriefcase, FiTarget, 
  FiCalendar, FiDollarSign, FiCpu, FiUsers, FiMessageCircle,
  FiSend, FiCheckCircle, FiArrowRight, FiInfo, FiStar
} from 'react-icons/fi';

export default function HireConsultForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedExistingTech, setSelectedExistingTech] = useState([]);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const inquiryType = watch('inquiryType');

  const commonTechnologies = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript',
    'Python', 'Java', '.NET Core', 'Go', 'Ruby on Rails',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Terraform', 'Jenkins', 'GraphQL', 'REST API', 'gRPC'
  ];

  const addTechnology = (tech, type) => {
    if (type === 'required') {
      if (!selectedTechnologies.includes(tech)) {
        setSelectedTechnologies([...selectedTechnologies, tech]);
      }
    } else {
      if (!selectedExistingTech.includes(tech)) {
        setSelectedExistingTech([...selectedExistingTech, tech]);
      }
    }
  };

  const removeTechnology = (tech, type) => {
    if (type === 'required') {
      setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
    } else {
      setSelectedExistingTech(selectedExistingTech.filter(t => t !== tech));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        technologies: selectedTechnologies,
        existingTechStack: selectedExistingTech,
        source: 'website'
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/hire-consult/submit`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        setSelectedTechnologies([]);
        setSelectedExistingTech([]);
        
        // Scroll to top of form
        document.getElementById('hire-consult-form')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'hire-fulltime', label: '💼 Full-time Employment', description: 'Join your team as a senior engineer' },
    { value: 'hire-contract', label: '📝 Contract Position', description: 'Fixed-term contract engagement' },
    { value: 'hire-freelance', label: '🚀 Freelance Project', description: 'Project-based collaboration' },
    { value: 'consult-architecture', label: '🏗️ Architecture Review', description: 'System design & scalability audit' },
    { value: 'consult-code-audit', label: '🔍 Code Audit & Optimization', description: 'Code quality & performance review' },
    { value: 'consult-training', label: '📚 Team Training & Mentoring', description: 'Upskill your engineering team' },
    { value: 'consult-mvp', label: '⚡ MVP Development Sprint', description: 'Rapid product development' },
    { value: 'consult-tech-advisory', label: '🎯 Technical Advisory', description: 'Ongoing technical guidance' },
    { value: 'other', label: '💬 Other', description: 'General inquiry' },
  ];

  const timelines = [
    { value: 'urgent-1week', label: '🔥 Urgent (Within 1 week)', color: 'text-red-500' },
    { value: 'short-1month', label: '📅 Short-term (1 month)', color: 'text-orange-500' },
    { value: 'medium-3months', label: '📆 Medium-term (3 months)', color: 'text-blue-500' },
    { value: 'long-6months', label: '🗓️ Long-term (6+ months)', color: 'text-green-500' },
    { value: 'flexible', label: '🔄 Flexible', color: 'text-gray-500' },
  ];

  const budgets = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-plus', label: '$100,000+' },
    { value: 'negotiable', label: '💰 Negotiable' },
  ];

  const projectTypes = [
    { value: 'new-development', label: 'New Development', icon: '🆕' },
    { value: 'existing-maintenance', label: 'Existing Maintenance', icon: '🔧' },
    { value: 'migration', label: 'Migration/Upgrade', icon: '🔄' },
    { value: 'optimization', label: 'Performance Optimization', icon: '⚡' },
    { value: 'consulting', label: 'Consulting Only', icon: '💡' },
    { value: 'other', label: 'Other', icon: '📌' },
  ];

  return (
    <div id="hire-consult-form" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-4">
          <FiStar className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Start Your Journey
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Fill out the form below and I'll get back to you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiUser className="inline mr-2" size={14} />
              Full Name *
            </label>
            <input
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiMail className="inline mr-2" size={14} />
              Email Address *
            </label>
            <input
              {...register('email', { 
                required: 'Email is required', 
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="john@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiPhone className="inline mr-2" size={14} />
              Phone Number (Optional)
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="+251 925 401 353"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiBriefcase className="inline mr-2" size={14} />
              Company (Optional)
            </label>
            <input
              {...register('company')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="Your Company"
            />
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FiTarget className="inline mr-2" size={14} />
            I'm interested in *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                  inquiryType === type.value
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-cyan-300'
                }`}
              >
                <input
                  type="radio"
                  value={type.value}
                  {...register('inquiryType', { required: 'Please select an inquiry type' })}
                  className="mt-1 mr-3 text-cyan-500 focus:ring-cyan-500"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{type.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.inquiryType && <p className="mt-1 text-sm text-red-500">{errors.inquiryType.message}</p>}
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Type *
            </label>
            <select
              {...register('projectType', { required: 'Please select project type' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select project type</option>
              {projectTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
            {errors.projectType && <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiCalendar className="inline mr-2" size={14} />
              Expected Timeline *
            </label>
            <select
              {...register('timeline', { required: 'Please select timeline' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select timeline</option>
              {timelines.map(timeline => (
                <option key={timeline.value} value={timeline.value}>
                  {timeline.label}
                </option>
              ))}
            </select>
            {errors.timeline && <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiDollarSign className="inline mr-2" size={14} />
              Budget Range *
            </label>
            <select
              {...register('budget', { required: 'Please select budget range' })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Select budget range</option>
              {budgets.map(budget => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
            {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiUsers className="inline mr-2" size={14} />
              Team Size (Optional)
            </label>
            <input
              {...register('teamSize')}
              type="number"
              min="1"
              max="50"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
              placeholder="Number of team members"
            />
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FiMessageCircle className="inline mr-2" size={14} />
            Project Description *
          </label>
          <textarea
            {...register('projectDescription', { 
              required: 'Please describe your project',
              minLength: { value: 20, message: 'Please provide more details (minimum 20 characters)' }
            })}
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="Tell me about your project goals, requirements, and any specific challenges..."
          />
          {errors.projectDescription && <p className="mt-1 text-sm text-red-500">{errors.projectDescription.message}</p>}
          <p className="mt-1 text-xs text-gray-500">Minimum 20 characters</p>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FiCpu className="inline mr-2" size={14} />
            Technologies You Want to Use *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedTechnologies.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech, 'required')}
                  className="hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <select
            onChange={(e) => {
              if (e.target.value) {
                addTechnology(e.target.value, 'required');
                e.target.value = '';
              }
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
          >
            <option value="">Add technology...</option>
            {commonTechnologies.filter(tech => !selectedTechnologies.includes(tech)).map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Existing Codebase */}
        <div>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register('hasExistingCodebase')}
              className="w-4 h-4 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-gray-700 dark:text-gray-300">I have an existing codebase</span>
          </label>
        </div>

        {watch('hasExistingCodebase') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Existing Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedExistingTech.map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech, 'existing')}
                    className="hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addTechnology(e.target.value, 'existing');
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="">Add existing technology...</option>
              {commonTechnologies.filter(tech => !selectedExistingTech.includes(tech)).map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        )}

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Information (Optional)
          </label>
          <textarea
            {...register('additionalInfo')}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="Any other details you'd like to share..."
          />
        </div>

        {/* Contact Preferences */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Contact Method
            </label>
            <select
              {...register('preferredContactMethod')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="email">📧 Email</option>
              <option value="phone">📞 Phone</option>
              <option value="video-call">🎥 Video Call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Best Time to Contact
            </label>
            <select
              {...register('bestTimeToContact')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            >
              <option value="morning">🌅 Morning (9 AM - 12 PM)</option>
              <option value="afternoon">☀️ Afternoon (12 PM - 5 PM)</option>
              <option value="evening">🌙 Evening (5 PM - 8 PM)</option>
              <option value="anytime">🕐 Anytime</option>
            </select>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiCheckCircle className="text-green-500" />
            <span>24hr response time</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiInfo className="text-cyan-500" />
            <span>NDA available</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FiStar className="text-yellow-500" />
            <span>9+ years experience</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <FiSend size={18} />
              <span>Submit Inquiry</span>
              <FiArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          By submitting, you agree to my privacy policy. Your information will never be shared.
        </p>
      </form>
    </div>
  );
}