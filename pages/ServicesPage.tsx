// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import CallToAction from '../components/CallToAction';
import ExportProcessFlow from '../components/ExportProcessFlow';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ServicesPage: React.FC = () => {
  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our End-to-End Export Solutions</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">We provide comprehensive services to ensure a seamless experience from farm to port.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>What We Do</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                className="flex items-start space-x-6"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-green dark:text-gray-100 mb-2">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <ExportProcessFlow />
      </AnimatedSection>

      <CallToAction />
    </AnimatedPage>
  );
};

export default ServicesPage;