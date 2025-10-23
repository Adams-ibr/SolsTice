// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { STATS, TEAM_MEMBERS } from '../constants';
import FaqItem from '../components/FaqItem';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { LinkedInIcon, TwitterIcon } from '../components/icons';


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
        <section className="bg-brand-green text-white pt-32 pb-20">
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
              <h2 className="text-3xl font-bold text-brand-green dark:text-gray-100 mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                SolsTice Agro Exports was founded with a clear mission: to create a transparent and efficient bridge between Nigerian farmers and the international market. We saw the immense potential of Africa's agricultural sector and were driven to unlock it by building a company grounded in fair trade, quality assurance, and exceptional customer service.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Over the years, we have grown into a trusted name in the agro-commodity trading industry, known for our unwavering commitment to our clients and our partner farmers. We are passionate about showcasing the best of African agriculture on the world stage.
              </p>
            </div>
            <div>
              <img src="https://picsum.photos/seed/farmers/600/400" alt="Farmers in a field" className="rounded-lg shadow-xl" loading="lazy" />
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      <section className="bg-brand-light dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {STATS.map((stat, index) => (
              <div key={index}>
                  <p className="text-4xl font-bold text-brand-gold">{stat.value}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Meet Our Leadership</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TEAM_MEMBERS.map(member => (
              <motion.div 
                key={member.name} 
                variants={itemVariants}
                className="bg-white rounded-lg p-6 group relative dark:bg-gray-800 dark:border dark:border-gray-700"
                whileHover={{ 
                  y: -5, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative">
                    <img className="w-40 h-40 rounded-full mx-auto object-cover mb-4 transition-all duration-300 group-hover:blur-sm" src={member.imageUrl} alt={member.name} />
                    <div className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/80 p-3 rounded-full text-brand-green hover:text-brand-gold transition-colors dark:bg-gray-700/80">
                            <LinkedInIcon className="w-6 h-6" />
                        </a>
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/80 p-3 rounded-full text-brand-green hover:text-brand-gold transition-colors dark:bg-gray-700/80">
                            <TwitterIcon className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-brand-green dark:text-gray-100">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
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