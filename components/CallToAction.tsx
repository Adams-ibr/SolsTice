// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const CallToAction: React.FC = () => {
  return (
    <AnimatedSection className="bg-brand-dark">
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Source Premium Agro-Commodities?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Let us be your trusted partner in connecting you with the best of African agriculture. Contact us today for a quote or to discuss your specific needs.
        </p>
        <Link 
          to="/contact" 
          className="bg-brand-gold text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
        >
          Contact Us Now
        </Link>
      </div>
    </AnimatedSection>
  );
};

export default CallToAction;