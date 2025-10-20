import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center container mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-green">Post not found!</h1>
        <p className="text-gray-600 mt-4">Sorry, we couldn't find the blog post you're looking for.</p>
        <Link to="/blog" className="mt-8 inline-block bg-brand-gold text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-brand-light py-10">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green text-center">{post.title}</h1>
            <p className="text-center text-gray-500 mt-4">{post.publishDate} • by {post.author}</p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
            <div className="prose lg:prose-xl max-w-none mx-auto text-center p-8 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Full Article Coming Soon!</h2>
                <p className="mt-4 text-gray-600">
                    We are busy preparing this insightful article for you. Please check back later for the full content.
                </p>
                <p className="mt-2 text-gray-600">
                    The post will delve deeper into <span className="font-semibold">{post.title}</span>.
                </p>
                <Link to="/blog" className="mt-8 inline-block bg-brand-gold text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                    &larr; Back to All Insights
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
