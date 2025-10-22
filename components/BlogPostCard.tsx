import React from 'react';
import type { BlogPost } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogPostCardProps {
  post: BlogPost;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden group dark:bg-gray-800 dark:border dark:border-gray-700"
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img className="w-full h-56 object-cover object-center" src={post.imageUrl} alt={post.title} loading="lazy" />
      <div className="p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.publishDate}</p>
        <h3 className="text-xl font-bold text-brand-green dark:text-gray-100 mb-2 h-14 overflow-hidden">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-3">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="text-brand-gold font-semibold hover:underline">
          Read More &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;