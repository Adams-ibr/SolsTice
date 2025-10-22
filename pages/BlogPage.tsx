import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">SolsTice Insights</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Your source for agricultural news, market trends, and expert analysis.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>Latest Articles</SectionTitle>
          {loading ? (
            <BlogGridSkeleton />
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {BLOG_POSTS.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default BlogPage;