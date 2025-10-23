// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItemProps {
  question: string;
  answer: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div 
        className="border-b border-gray-200 dark:border-gray-700 py-4 overflow-hidden"
        variants={itemVariants}
    >
      <motion.button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-brand-green dark:text-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.svg
          className="w-6 h-6"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </motion.svg>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mt-4 text-gray-600 dark:text-gray-400"
          >
            <p className="pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqItem;