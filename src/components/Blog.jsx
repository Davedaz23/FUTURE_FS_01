'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  FiCalendar, FiClock, FiTag, FiUser, FiArrowRight, 
  FiBookOpen, FiHeart, FiShare2, FiMessageCircle,
  FiTrendingUp, FiAward
} from 'react-icons/fi';
import Link from 'next/link';

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Microservices Architecture: Lessons from 5 Years in Fintech",
    excerpt: "Deep dive into building scalable microservices for financial systems, including transaction consistency, security patterns, and monitoring strategies.",
    date: "March 15, 2026",
    readTime: "8 min read",
    category: "Architecture",
    tags: ["Microservices", "Fintech", "System Design"],
    image: "🏗️",
    likes: 127,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    title: "Optimizing React Performance: A Senior Engineer's Guide",
    excerpt: "Advanced techniques for React optimization including memoization, code splitting, virtual scrolling, and bundle analysis.",
    date: "March 5, 2026",
    readTime: "6 min read",
    category: "Frontend",
    tags: ["React", "Performance", "JavaScript"],
    image: "⚛️",
    likes: 89,
    comments: 14,
    featured: false
  },
  {
    id: 3,
    title: "From Junior to Senior: The Skills That Actually Matter",
    excerpt: "Beyond coding: leadership, communication, system thinking, and how to make the leap to senior engineer.",
    date: "February 20, 2026",
    readTime: "10 min read",
    category: "Career",
    tags: ["Career Growth", "Leadership", "Mentoring"],
    image: "📈",
    likes: 234,
    comments: 45,
    featured: true
  },
  {
    id: 4,
    title: "Building Resilient Systems with Kubernetes",
    excerpt: "Production lessons on auto-scaling, self-healing, and disaster recovery with Kubernetes in cloud environments.",
    date: "February 10, 2026",
    readTime: "7 min read",
    category: "DevOps",
    tags: ["Kubernetes", "Cloud", "DevOps"],
    image: "☸️",
    likes: 67,
    comments: 9,
    featured: false
  },
  {
    id: 5,
    title: "The Art of Code Review: Giving and Receiving Feedback",
    excerpt: "How to conduct effective code reviews that improve code quality and team culture without burning out developers.",
    date: "January 28, 2026",
    readTime: "5 min read",
    category: "Best Practices",
    tags: ["Code Review", "Team Culture", "Best Practices"],
    image: "📝",
    likes: 156,
    comments: 28,
    featured: false
  },
  {
    id: 6,
    title: "MongoDB vs PostgreSQL: Making the Right Choice",
    excerpt: "Real-world comparison based on 9+ years of experience. When to use each database for optimal performance.",
    date: "January 15, 2026",
    readTime: "9 min read",
    category: "Database",
    tags: ["MongoDB", "PostgreSQL", "Database"],
    image: "🗄️",
    likes: 98,
    comments: 31,
    featured: true
  }
];

const categories = ["All", "Architecture", "Frontend", "Backend", "DevOps", "Career", "Best Practices", "Database"];

export default function Blog() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const loadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  return (
    <section 
      id="blog" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-900 scroll-mt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
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
            <FiBookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Technical Blog</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-red-600 dark:from-cyan-400 dark:via-blue-400 dark:to-red-500 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Sharing insights, experiences, and best practices from 9+ years in software engineering
          </p>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FiAward className="text-yellow-500" />
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="text-5xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiHeart className="w-3 h-3 text-red-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMessageCircle className="w-3 h-3" />
                          {post.comments}
                        </span>
                      </div>
                      <button className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm hover:gap-2 transition-all inline-flex items-center gap-1">
                        Read More <FiArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {regularPosts.slice(0, visiblePosts).map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + (idx * 0.05) }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="p-5">
                <div className="text-4xl mb-3">{post.image}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiHeart className="w-3 h-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                  <button className="text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:gap-2 transition-all inline-flex items-center gap-1">
                    Read <FiArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < regularPosts.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Load More Articles
              <FiArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            📧 Never Miss an Article
          </h3>
          <p className="text-cyan-100 mb-6">
            Get the latest tech insights delivered straight to your inbox
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 w-64 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-cyan-100 text-xs mt-4">
            No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}