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
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img src={mainImage} alt={product.name} className="w-full rounded-lg shadow-lg mb-4 h-96 object-cover" />
              <div className="flex space-x-2">
                {[product.imageUrl, ...product.gallery].map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${product.name} gallery ${idx + 1}`} 
                    className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-brand-gold scale-105' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-brand-green mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-brand-green">{product.pricePerTon}</span>
                <span className="text-gray-500"> / Metric Ton</span>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-brand-green mb-3">Key Information</h3>
                <ul className="space-y-2 text-gray-700">
                  {product.specifications.map(spec => (
                    <li key={spec.key}><strong>{spec.key}:</strong> {spec.value}</li>
                  ))}
                   <li><strong>Origin:</strong> {product.origin}</li>
                   <li><strong>Harvest Season:</strong> {product.harvestSeason}</li>
                </ul>
              </div>
               <div className="border-t pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-brand-green mb-3">Packaging & Shipping</h3>
                  <ul className="space-y-2 text-gray-700">
                      <li>
                          <strong>Packaging:</strong>
                          <ul className="list-disc list-inside ml-4">
                              {product.packaging.map((pack, idx) => <li key={idx}>{pack}</li>)}
                          </ul>
                      </li>
                      <li><strong>Shipping Terms:</strong> {product.shippingTerms}</li>
                  </ul>
              </div>
              <Button onClick={() => setShowInquiry(true)} className="mt-8 w-full text-lg">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {showInquiry && <InquiryPopup productName={product.name} onClose={() => setShowInquiry(false)} />}
    </AnimatedPage>
  );
};

export default ProductDetailPage;