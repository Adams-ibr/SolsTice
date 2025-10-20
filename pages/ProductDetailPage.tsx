import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import InquiryPopup from '../components/InquiryPopup';
import CallToAction from '../components/CallToAction';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.gallery[0] || product.imageUrl);
    }
  }, [product]);

  useEffect(() => {
    const originalTitle = document.title;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescriptionTag ? metaDescriptionTag.getAttribute('content') : '';

    if (product) {
      document.title = `${product.name} | SolsTice Agro Exports`;
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', product.description);
      }
    }

    return () => {
      document.title = originalTitle;
      if (metaDescriptionTag && originalDescription) {
        metaDescriptionTag.setAttribute('content', originalDescription);
      }
    };
  }, [product]);

  if (!product) {
    return (
      <AnimatedPage>
        <div className="py-20 text-center container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brand-green">Product not found!</h1>
          <p className="text-gray-600 mt-4">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/products" className="mt-8 inline-block bg-brand-gold text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            &larr; Back to Products
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="py-12 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-gold">Home</Link> &gt; 
            <Link to="/products" className="hover:text-brand-gold"> Products</Link> &gt; 
            <span className="font-medium text-gray-700"> {product.name}</span>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            <div className="flex space-x-2">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-brand-gold' : 'border-transparent hover:border-brand-gold/50'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h1 className="text-4xl font-bold text-brand-green mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-semibold text-gray-500">Origin</p>
                    <p className="text-brand-green font-bold">{product.origin}</p>
                </div>
                 <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-semibold text-gray-500">Harvest Season</p>
                    <p className="text-brand-green font-bold">{product.harvestSeason}</p>
                </div>
            </div>
            
            <div className="mb-8">
                <p className="text-3xl font-bold text-brand-green">{product.pricePerTon} <span className="text-base font-normal text-gray-500">/ Metric Ton</span></p>
                <p className="text-xs text-gray-500">*Indicative price, FOB Lagos. Contact us for a precise quote.</p>
            </div>

            <motion.button 
              onClick={() => setIsPopupOpen(true)}
              className="w-full bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md text-lg transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-brand-green text-center mb-10">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-xl font-semibold text-brand-green mb-4 border-b-2 border-brand-gold pb-2">Technical Specifications</h3>
                    <ul className="space-y-3">
                        {product.specifications.map(spec => (
                            <li key={spec.key} className="flex justify-between border-b border-gray-200 py-2">
                                <span className="font-medium text-gray-600">{spec.key}:</span>
                                <span className="text-gray-800 text-right">{spec.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-brand-green mb-4 border-b-2 border-brand-gold pb-2">Packaging & Shipping</h3>
                     <div className="space-y-4 text-gray-700">
                        <div>
                            <p className="font-semibold">Packaging Options:</p>
                            <ul className="list-disc list-inside pl-2">
                                {product.packaging.map((opt, i) => <li key={i}>{opt}</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">Shipping Terms:</p>
                            <p>{product.shippingTerms}</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </AnimatedSection>
      
      <CallToAction />
      
      <InquiryPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        products={PRODUCTS}
      />
    </AnimatedPage>
  );
};

export default ProductDetailPage;