// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden group dark:bg-gray-800 dark:border dark:border-gray-700"
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img className="w-full h-56 object-cover object-center" src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-green dark:text-gray-100 mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-base mb-4 line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-brand-green dark:text-gray-200">{product.pricePerTon} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ MT</span></span>
          <Link to={`/products/${product.slug}`} className="text-brand-gold font-semibold hover:underline">
            View Details &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;