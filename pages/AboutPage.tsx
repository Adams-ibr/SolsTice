// Fix: Created the AboutPage component to resolve the module not found error.
import React from 'react';
import { STATS } from '../constants';
import FaqItem from '../components/FaqItem';

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

const AboutPage: React.FC = () => {
  return (
    <div>
      <section className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">About SolsTice Agro Exports</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto">Connecting Africa's agricultural bounty with the global market through integrity, quality, and reliability.</p>
        </div>
      </section>

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
      
      <section className="bg-brand-light py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-brand-green">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-green mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map(member => (
              <div key={member.name}>
                <img className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg mb-4" src={member.imageUrl} alt={member.name} />
                <h3 className="text-xl font-bold text-brand-green">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-green mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
