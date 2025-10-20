import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';
import FaqItem from '../components/FaqItem';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedStat from '../components/AnimatedStat';
import SectionTitle from '../components/SectionTitle';


const TEAM_MEMBERS = [
    { name: 'Adewale Adebayo', role: 'Founder & CEO', imageUrl: 'https://picsum.photos/seed/ceo/300/300' },
    { name: 'Ngozi Okoro', role: 'Head of Operations', imageUrl: 'https://picsum.photos/seed/ops/300/300' },
    { name: 'Musa Ibrahim', role: 'Lead, Sourcing & Logistics', imageUrl: 'https://picsum.photos/seed/logistics/300/300' },
];

const FAQS = [
    { q: 'What products do you specialize in?', a: 'We specialize in a range of premium Nigerian agricultural commodities, including Raw Cashew Nuts, Dried Split Ginger, Sesame Seeds, and Soybeans, among others.' },
    { q: 'Where do you source your products from?', a: 'We source our products directly from trusted local farmers and cooperatives across Nigeria, ensuring freshness, quality, and fair compensation for the producers.' },
    { q: 'Can you handle large international orders?', a: 'Absolutely. We have the capacity and expertise to handle large-scale international orders, managing everything from sourcing and quality control to logistics and documentation.' },
    { q: 'What quality standards do you follow?', a: 'Our products adhere to strict international quality standards. We conduct rigorous inspections and testing at various stages of the supply chain to ensure our clients receive only the best.' },
];

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
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};

const AboutPage: React.FC = () => {
  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">About SolsTice Agro Exports</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Connecting Africa's agricultural bounty with the global market through integrity, quality, and reliability.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-green mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                SolsTice Agro Exports was founded with a clear mission: to create a transparent and efficient bridge between Nigerian farmers and the international market. We saw the immense potential of Africa's agricultural sector and were driven to unlock it by building a company grounded in fair trade, quality assurance, and exceptional customer service.
              </p>
              <p className="text-gray-600">
                Over the years, we have grown into a trusted name in the agro-commodity trading industry, known for our unwavering commitment to our clients and our partner farmers. We are passionate about showcasing the best of African agriculture on the world stage.
              </p>
            </div>
            <div>
              <img src="https://picsum.photos/seed/team/600/400" alt="Farmers in a field" className="rounded-lg shadow-xl" loading="lazy" />
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      <section className="bg-brand-light py-16">
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

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Meet Our Leadership</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TEAM_MEMBERS.map(member => (
              <motion.div 
                key={member.name} 
                variants={itemVariants}
                className="bg-white rounded-lg p-6"
                whileHover={{ 
                  y: -5, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img className="w-40 h-40 rounded-full mx-auto object-cover mb-4" src={member.imageUrl} alt={member.name} />
                <h3 className="text-xl font-bold text-brand-green">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {FAQS.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default AboutPage;