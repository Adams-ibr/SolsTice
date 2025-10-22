import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
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

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our Agricultural Commodities</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Discover our range of premium, ethically sourced products from Nigeria.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>All Products</SectionTitle>
          {loading ? (
            <ProductGridSkeleton count={PRODUCTS.length} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default ProductsPage;