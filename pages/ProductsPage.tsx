import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import InquiryPopup from '../components/InquiryPopup';

const ProductsPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <section className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto">Explore our range of premium, ethically sourced agricultural commodities.</p>
        </div>
      </section>
      
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-8">
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="bg-brand-green text-white hover:bg-opacity-90 font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                Inquire for Bulk Order
              </button>
              <a 
                href="#" 
                onClick={(e) => {e.preventDefault(); alert('Catalogue download coming soon!');}}
                className="bg-brand-gold text-white text-center hover:bg-opacity-90 font-bold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                Download Catalogue (PDF)
              </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <InquiryPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        products={PRODUCTS}
      />
    </div>
  );
};

export default ProductsPage;