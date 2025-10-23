// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import BlogGridSkeleton from '../components/BlogGridSkeleton';
import SectionTitle from '../components/SectionTitle';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BlogPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState(BLOG_POSTS);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = BLOG_POSTS.filter(post =>
      post.title.toLowerCase().includes(lowercasedFilter) ||
      post.excerpt.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredPosts(filtered);
  }, [searchTerm]);

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">SolsTice Insights</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Your source for agricultural news, market trends, and expert analysis.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>Latest Articles</SectionTitle>
          
          <div className="mb-12 max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                aria-label="Search blog posts"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <BlogGridSkeleton />
          ) : (
            <>
              {filteredPosts.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={searchTerm} // Re-trigger animation on search change
                >
                  {filteredPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Articles Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search, or check back later for new content.</p>
                </div>
              )}
            </>
          )}
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default BlogPage;