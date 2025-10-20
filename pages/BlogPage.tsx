import React from 'react';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  return (
    <div>
      <section className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">SolsTice Insights</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto">Your source for agricultural news, market trends, and expert analysis.</p>
        </div>
      </section>

      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
