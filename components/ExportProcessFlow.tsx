import React from 'react';
import { motion } from 'framer-motion';
import { SourcingIcon, QualityIcon, ProcessingIcon, DocumentationIcon, ShipmentIcon, SupportIcon, ConsultationIcon } from './icons';
import SectionTitle from './SectionTitle';

const processSteps = [
    { name: 'Initial Consultation', description: 'We start by understanding your specific needs, quantity requirements, and quality specifications.', icon: <ConsultationIcon /> },
    { name: 'Sourcing & Procurement', description: 'Leveraging our network, we source the finest commodities directly from trusted farms.', icon: <SourcingIcon /> },
    { name: 'Rigorous Quality Checks', description: 'Every batch undergoes strict quality assurance tests to meet international standards.', icon: <QualityIcon /> },
    { name: 'Processing & Packaging', description: 'Products are carefully processed and packaged according to your custom requirements for safe transit.', icon: <ProcessingIcon /> },
    { name: 'Documentation & Logistics', description: 'We handle all export paperwork and logistics, ensuring a smooth customs clearance process.', icon: <DocumentationIcon /> },
    { name: 'Shipment & Delivery', description: 'Your order is shipped securely, with real-time tracking until it reaches your destination port.', icon: <ShipmentIcon /> },
    { name: 'Post-Delivery Support', description: 'Our commitment doesn\'t end on delivery. We provide support to ensure your complete satisfaction.', icon: <SupportIcon /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const ExportProcessFlow: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <SectionTitle>Our Seamless Export Process</SectionTitle>
            <div className="max-w-3xl mx-auto">
                <motion.div 
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="absolute left-6 top-6 h-full w-0.5 bg-brand-gold/30 dark:bg-brand-gold/50" aria-hidden="true"></div>
                    
                    {processSteps.map((step, index) => (
                        <motion.div key={index} className="relative flex items-start space-x-8 mb-12" variants={itemVariants}>
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="z-10 bg-brand-gold border-4 border-brand-light dark:border-gray-800 rounded-full h-12 w-12 flex items-center justify-center">
                                    {React.cloneElement(step.icon, { className: "h-6 w-6 text-white" })}
                                </div>
                            </div>
                            
                            <div className="pt-1.5">
                                <p className="text-sm font-semibold text-brand-green dark:text-brand-gold tracking-wider">STEP {index + 1}</p>
                                <h3 className="text-xl font-bold text-brand-dark dark:text-gray-100 mb-1">{step.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ExportProcessFlow;