import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS, SERVICES, STATS } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import CallToAction from '../components/CallToAction';
import SectionTitle from '../components/SectionTitle';
import CommodityTicker from '../components/CommodityTicker';
import TestimonialSlider from '../components/TestimonialSlider';

const HomePage: React.FC = () => {
  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
            src="https://picsum.photos/seed/farm-hero/1920/1080" 
            alt="Lush agricultural field at sunrise" 
            className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Agro-Commodities
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sourcing and exporting the finest agricultural products from the heart of Africa to the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products" className="bg-brand-gold text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition-transform transform hover:scale-105">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Commodity Ticker */}
      <CommodityTicker />

      {/* Featured Products */}
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <SectionTitle>Our Products</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="text-brand-gold font-semibold hover:underline text-lg">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>Our Services</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {SERVICES.map(service => (
              <div key={service.id} className="p-6">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-brand-green mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <section className="bg-brand-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
               <div key={index}>
                  <p className="text-4xl font-bold text-brand-gold">{stat.value}</p>
                  <p className="mt-2 text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <TestimonialSlider />
        </div>
      </AnimatedSection>
      
      {/* Call to Action */}
      <CallToAction />
    </AnimatedPage>
  );
};

export default HomePage;