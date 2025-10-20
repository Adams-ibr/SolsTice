import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = BLOG_POSTS.findIndex(p => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  useEffect(() => {
    const originalTitle = document.title;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescriptionTag ? metaDescriptionTag.getAttribute('content') : '';

    if (post) {
      document.title = `${post.title} | SolsTice Agro Exports`;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', post.excerpt);
      }
    }

    return () => {
      document.title = originalTitle;
      if (metaDescriptionTag && originalDescription) {
        metaDescriptionTag.setAttribute('content', originalDescription);
      }
    };
  }, [post]);

  if (!post) {
    return (
      <AnimatedPage>
        <div className="py-20 text-center container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-green">Post not found!</h1>
          <p className="text-gray-600 mt-4">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link to="/blog" className="mt-8 inline-block bg-brand-gold text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-light py-10">
          <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-green text-center">{post.title}</h1>
              <p className="text-center text-gray-500 mt-4">{post.publishDate} • by {post.author}</p>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection>
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
              <div className="prose lg:prose-xl max-w-none mx-auto text-gray-700">
                  <p className="text-lg italic text-gray-600 border-l-4 border-brand-gold pl-4 mb-8">{post.excerpt}</p>
                  {post.content}
              </div>
              <div className="mt-16 border-t pt-8">
                <div className="flex justify-between items-center">
                    {prevPost ? (
                        <Link to={`/blog/${prevPost.slug}`} className="text-brand-green hover:text-brand-gold transition-colors">
                            <span className="text-sm">&larr; Previous Post</span>
                            <p className="font-semibold">{prevPost.title}</p>
                        </Link>
                    ) : <div></div>}
                     {nextPost ? (
                        <Link to={`/blog/${nextPost.slug}`} className="text-right text-brand-green hover:text-brand-gold transition-colors">
                            <span className="text-sm">Next Post &rarr;</span>
                            <p className="font-semibold">{nextPost.title}</p>
                        </Link>
                    ) : <div></div>}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/blog" className="inline-block bg-brand-gold text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors no-underline">
                        Back to All Insights
                    </Link>
                </div>
              </div>
          </div>
        </article>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default BlogPostPage;