// Fix: Created the InquiryPopup component for bulk order inquiries.
import React from 'react';
import type { Product } from '../types';

interface InquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const InquiryPopup: React.FC<InquiryPopupProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you with a quote shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="popup-name" className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input type="text" id="popup-name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
            </div>
            <div>
              <label htmlFor="popup-email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" id="popup-email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
            </div>
            <div>
              <label htmlFor="popup-company" className="block text-gray-700 font-medium mb-2">Company Name</label>
              <input type="text" id="popup-company" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            </div>
            <div>
              <label htmlFor="popup-phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input type="tel" id="popup-phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="popup-product" className="block text-gray-700 font-medium mb-2">Product of Interest</label>
            <select id="popup-product" name="product" defaultValue="" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" required>
              <option value="" disabled>Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
               <option value="Multiple">Multiple Products</option>
            </select>
          </div>
          <div className="mb-6">
             <label htmlFor="popup-quantity" className="block text-gray-700 font-medium mb-2">Estimated Quantity (in Metric Tons)</label>
             <input type="number" id="popup-quantity" name="quantity" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold" placeholder="e.g., 100" />
          </div>
          <div className="mb-6">
            <label htmlFor="popup-message" className="block text-gray-700 font-medium mb-2">Additional Details or Questions</label>
            <textarea id="popup-message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-6 rounded-md transition-colors">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryPopup;
