import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
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

const ServiceCard: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => (
    <motion.div 
      className="bg-white p-8 rounded-lg text-center"
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className="flex justify-center mb-6">
            <div className="bg-brand-gold/10 p-4 rounded-full inline-flex">
                {service.icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold text-brand-green mb-4">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
    </motion.div>
);

const ServicesPage: React.FC = () => {
  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our Services</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Providing comprehensive, end-to-end solutions for the global agro-commodity trade.</p>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-brand-green mb-4">A Partner You Can Trust</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From the farm gate to the destination port, our team manages every detail with precision and care. We handle complex logistics, ensure stringent quality standards, and provide all necessary documentation to facilitate a smooth and efficient transaction for our clients. Your success is our priority.
            </p>
        </div>
      </AnimatedSection>

      <CallToAction />
    </AnimatedPage>
  );
};

export default ServicesPage;