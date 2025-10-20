// Fix: Added constants data and icon components to resolve module import errors.
import React from 'react';
import type { Product, BlogPost, NavLink, Stat, Service, Testimonial } from './types';

const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SourcingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogisticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM13 16l2 2h3.5a1 1 0 001-1V6a1 1 0 00-1-1H13v10z" />
    </svg>
);

const TradeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Raw Cashew Nuts', description: 'High-quality raw cashew nuts sourced directly from Nigerian farms.', pricePerTon: '$1,250', imageUrl: 'https://picsum.photos/seed/cashew/400/300' },
  { id: 2, name: 'Dried Split Ginger', description: 'Aromatic and spicy dried ginger, perfect for culinary and medicinal uses.', pricePerTon: '$1,800', imageUrl: 'https://picsum.photos/seed/ginger/400/300' },
  { id: 3, name: 'Sesame Seeds', description: 'Nutrient-rich sesame seeds, ideal for oil extraction and baking.', pricePerTon: '$1,500', imageUrl: 'https://picsum.photos/seed/sesame/400/300' },
  { id: 4, name: 'Soybeans', description: 'Non-GMO soybeans with high protein content for various food products.', pricePerTon: '$650', imageUrl: 'https://picsum.photos/seed/soybean/400/300' },
  { id: 5, name: 'Peanuts (Groundnuts)', description: 'Fresh and crunchy peanuts, available in both shelled and unshelled forms.', pricePerTon: '$900', imageUrl: 'https://picsum.photos/seed/peanuts/400/300' },
  { id: 6, name: 'Gum Arabic', description: 'Premium grade Gum Arabic for use in food, pharmaceutical, and industrial applications.', pricePerTon: '$3,200', imageUrl: 'https://picsum.photos/seed/gum-arabic/400/300' },
  { id: 7, name: 'Hibiscus Flower', description: 'Vibrant dried hibiscus flowers for teas, drinks, and natural colorants.', pricePerTon: '$2,100', imageUrl: 'https://picsum.photos/seed/hibiscus/400/300' },
  { id: 8, name: 'Moringa Seeds', description: 'High-potency Moringa seeds, known for their health benefits and oil production.', pricePerTon: '$4,000', imageUrl: 'https://picsum.photos/seed/moringa/400/300' },
];

export const STATS: Stat[] = [
  { value: '10+', label: 'Years in Business' },
  { value: '5,000+', label: 'Metric Tons Exported' },
  { value: '15+', label: 'Countries Served' },
  { value: '100%', label: 'Customer Satisfaction' },
];

export const SERVICES: Service[] = [
  { id: 1, name: 'Quality Assurance', description: 'We ensure all our products meet rigorous international quality standards through comprehensive testing and inspection.', icon: <QualityIcon /> },
  { id: 2, name: 'Sustainable Sourcing', description: 'Partnering directly with local farmers, we promote fair trade practices and sustainable agriculture.', icon: <SourcingIcon /> },
  { id: 3, name: 'Global Logistics', description: 'Our expert team handles all shipping and logistics to ensure timely and safe delivery to any port worldwide.', icon: <LogisticsIcon /> },
  { id: 4, name: 'Documentation & Trade', description: 'We manage all necessary export documentation, customs clearance, and trade finance for a seamless transaction.', icon: <TradeIcon /> },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, quote: 'SolsTice has been a reliable partner for our cashew imports. Their product quality and professionalism are second to none.', author: 'John Doe', company: 'Global Foods Inc.' },
  { id: 2, quote: 'The transparency and efficiency of their logistics process saved us a lot of hassle. We highly recommend their services.', author: 'Jane Smith', company: 'Euro Spices Ltd.' },
  { id: 3, quote: 'Consistently high-quality sesame seeds and excellent customer service. SolsTice is our go-to supplier from Africa.', author: 'Chen Wei', company: 'Asia Trading Co.' },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, slug: 'market-trends-q3-2024', title: 'Global Agro-Commodity Market Trends for Q3 2024', excerpt: 'An in-depth analysis of the key factors driving the agricultural commodity markets in the third quarter of 2024.', imageUrl: 'https://picsum.photos/seed/blog1/400/300', author: 'Dr. Amina Bello', publishDate: 'August 15, 2024' },
  { id: 2, slug: 'sustainable-farming-in-nigeria', title: 'The Rise of Sustainable Farming Practices in Nigeria', excerpt: 'Exploring how Nigerian farmers are adopting sustainable methods to improve yield and protect the environment.', imageUrl: 'https://picsum.photos/seed/blog2/400/300', author: 'David Okonjo', publishDate: 'July 28, 2024' },
  { id: 3, slug: 'navigating-export-logistics', title: 'Navigating the Complexities of Agro-Export Logistics', excerpt: 'A guide to understanding the challenges and solutions in shipping agricultural products from Africa to the world.', imageUrl: 'https://picsum.photos/seed/blog3/400/300', author: 'Fatima Aliyu', publishDate: 'July 10, 2024' },
];
