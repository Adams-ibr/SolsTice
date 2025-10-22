import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import { Button } from '../components/ui/Button';
import InquiryPopup from '../components/InquiryPopup';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [showInquiry, setShowInquiry] = useState(false);

  if (!product) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Product not found</h1>
          <Link to="/products" className="text-brand-gold mt-4 inline-block">Back to Products</Link>
        </div>
      </AnimatedPage>
    );
  }

  const [mainImage, setMainImage] = useState(product.imageUrl);

  return (
    <AnimatedPage>
        <div className="pt-24 bg-brand-light">
             <div className="container mx-auto px-4">
                 <Breadcrumbs />
            </div>
        </div>
      <AnimatedSection className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          {/* Use lg for two-column breakpoint for better tablet view */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div>
              <div className="w-full rounded-lg shadow-lg mb-4 overflow-hidden">
                <img src={mainImage} alt={product.name} className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              {/* Responsive thumbnail gallery with wrapping */}
              <div className="flex flex-wrap gap-2">
                {[product.imageUrl, ...product.gallery].map((img, idx) => (
                  <div 
                    key={idx}
                    className={`w-20 h-20 rounded-md cursor-pointer border-2 transition-all overflow-hidden ${mainImage === img ? 'border-brand-gold scale-105' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} gallery ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">Origin: {product.origin}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-brand-green">{product.pricePerTon}</span>
                <span className="text-gray-500"> / Metric Ton</span>
              </div>

              {/* Improved visual hierarchy for specifications */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-brand-green mb-4">Product Specifications</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                  {product.specifications.map(spec => (
                    <div key={spec.key} className="flex justify-between border-b pb-2">
                        <dt className="font-medium text-gray-800">{spec.key}</dt>
                        <dd className="text-gray-600 text-right">{spec.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-b pb-2">
                      <dt className="font-medium text-gray-800">Harvest Season</dt>
                      <dd className="text-gray-600 text-right">{product.harvestSeason}</dd>
                  </div>
                </dl>
              </div>

              {/* Improved visual hierarchy for packaging */}
              <div className="border-t pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-brand-green mb-4">Packaging & Shipping</h3>
                  <div className="space-y-3 text-gray-700">
                      <div>
                          <strong className="block mb-2 font-medium text-gray-800">Available Packaging:</strong>
                          <div className="flex flex-wrap gap-2">
                              {product.packaging.map((pack, idx) => (
                                  <span key={idx} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{pack}</span>
                              ))}
                          </div>
                      </div>
                      <div className="flex justify-between">
                          <strong className="font-medium text-gray-800">Shipping Terms:</strong> 
                          <span className="text-gray-600">{product.shippingTerms}</span>
                      </div>
                  </div>
              </div>
              
              <div className="mt-auto pt-8">
                <Button onClick={() => setShowInquiry(true)} className="w-full text-lg">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {showInquiry && <InquiryPopup productName={product.name} onClose={() => setShowInquiry(false)} />}
    </AnimatedPage>
  );
};

export default ProductDetailPage;