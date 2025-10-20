import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
    return (
        <section className="bg-brand-gold text-white">
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Ready to Source Your Agro-Commodities?</h2>
                    <p className="text-lg max-w-2xl mx-auto mb-8">
                        Contact our team today for a competitive quote and discover the SolsTice difference.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/contact" className="inline-block bg-white text-brand-gold hover:bg-gray-200 font-bold py-3 px-8 rounded-md text-lg transition-colors">
                            Contact Us Today
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;