// Fix: Created the InquiryPopup component for bulk order inquiries.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';

interface InquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const InquiryPopup: React.FC<InquiryPopupProps> = ({ isOpen, onClose, products }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form state when popup is closed/unmounted
      const timer = setTimeout(() => {
        setIsSubmitting(false);
        setSubmitMessage('');
        setIsError(false);
      }, 300); // Delay to allow exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setIsError(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/error
    if (Math.random() > 0.1) { // 90% success rate
      setSubmitMessage('Inquiry sent! We will get back to you shortly.');
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
      }, 2500); // Close popup after showing success message
    } else {
      setSubmitMessage('Something went wrong. Please try again.');
      setIsError(true);
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000); // Clear error message after 5s
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing on click inside
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close popup"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-brand-green mb-6">Bulk Order Inquiry</h2>
            <form onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="popup-name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input type="text" id="popup-name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="popup-email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input type="email" id="popup-email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="popup-company" className="block text-gray-700 font-medium mb-2">Company Name</label>
                    <input type="text" id="popup-company" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="popup-phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input type="tel" id="popup-phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" />
                  </div>
                </div>
                <div>
                  <label htmlFor="popup-product" className="block text-gray-700 font-medium mb-2">Product of Interest</label>
                  <select id="popup-product" name="product" defaultValue="" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required>
                    <option value="" disabled>Select a product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.name}>{product.name}</option>
                    ))}
                    <option value="Multiple">Multiple Products</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="popup-quantity" className="block text-gray-700 font-medium mb-2">Estimated Quantity (in Metric Tons)</label>
                  <input type="number" id="popup-quantity" name="quantity" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" placeholder="e.g., 100" />
                </div>
                <div>
                  <label htmlFor="popup-message" className="block text-gray-700 font-medium mb-2">Additional Details or Questions</label>
                  <textarea id="popup-message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50"></textarea>
                </div>
                <div>
                   <motion.button 
                    type="submit" 
                    className="w-full bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-6 rounded-md transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </motion.button>
                </div>
              </fieldset>
              <div className="h-10 mt-4">
                <AnimatePresence>
                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`p-2 rounded-md text-center font-medium ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                      aria-live="polite"
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryPopup;