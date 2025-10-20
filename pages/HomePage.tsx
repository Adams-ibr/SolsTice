import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS, SERVICES, STATS, TESTIMONIALS } from '../constants';
import ProductCard from '../components/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedStat from '../components/AnimatedStat';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import SectionTitle from '../components/SectionTitle';
import CallToAction from '../components/CallToAction';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};


const HomePage: React.FC = () => {
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setProductsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            Premium Nigerian Agro-Commodities
          </motion.h1>
          <motion.p 
            className="text-lg md:text-2xl max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Delivering quality, reliability, and value from the heart of Africa to the global market.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/products" className="inline-block bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md text-lg transition-colors duration-300 ease-in-out">
                Explore Products
                </Link>
            </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-green font-bold py-3 px-8 rounded-md text-lg transition-colors">
                Get a Quote
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Snippet */}
      <AnimatedSection className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-green mb-4">Your Trusted Partner in Agro-Commodity Trading</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-8">
            SolsTice Agro Exports is a leading exporter of high-quality agricultural products from Nigeria. We are committed to fostering sustainable partnerships between local farmers and international buyers, ensuring fair trade practices and delivering exceptional value at every step of the supply chain.
          </p>
          <Link to="/about" className="text-brand-gold font-semibold hover:underline">
            Learn More About Us &rarr;
          </Link>
        </div>
      </AnimatedSection>

      {/* Video Introduction Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Connecting Continents, Cultivating Trust</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <video
              className="w-full rounded-lg shadow-2xl"
              controls
              poster="https://picsum.photos/seed/video-poster/1280/720"
              preload="metadata"
            >
              <source src="https://static.videezy.com/system/resources/previews/000/045/222/original/4K_20.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Products Section */}
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <SectionTitle>Our Featured Products</SectionTitle>
          {productsLoading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {PRODUCTS.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link to="/products" className="bg-brand-green text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md transition-colors">
                View All Products
                </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section / Why Choose Us */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>Why Choose SolsTice?</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SERVICES.map(service => (
              <motion.div 
                key={service.id} 
                className="bg-white rounded-lg p-6"
                variants={itemVariants}
                whileHover={{ 
                    y: -5, 
                    scale: 1.02, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-brand-gold/10 p-4 rounded-full inline-flex">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <section className="bg-brand-green text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {STATS.map((stat, index) => (
              <AnimatedStat key={index} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TESTIMONIALS.map(testimonial => (
              <motion.div 
                key={testimonial.id} 
                className="bg-white p-8 rounded-lg"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-bold text-brand-green">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <CallToAction />
    </AnimatedPage>
  );
};

export default HomePage;