import React from 'react';
import type { BlogPost } from '../types';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col">
      <img className="w-full h-56 object-cover object-center" src={post.imageUrl} alt={post.title} loading="lazy" />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">{post.publishDate} • by {post.author}</p>
        <h3 className="text-xl font-bold text-brand-green mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h3>
        <p className="text-gray-600 text-base mb-4 flex-grow">{post.excerpt}</p>
        <div className="mt-auto">
            <Link to={`/blog/${post.slug}`} className="text-brand-gold font-semibold hover:underline">
                Read More &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
