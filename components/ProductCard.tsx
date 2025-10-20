import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
      <img className="w-full h-56 object-cover object-center" src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-green mb-2">{product.name}</h3>
        <p className="text-gray-600 text-base mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-brand-green">{product.pricePerTon} <span className="text-sm font-normal text-gray-500">/ MT</span></span>
          <Link to="/contact" className="text-brand-gold font-semibold hover:underline">
            Inquire Now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;