// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import type { Product, BlogPost, NavLink, Stat, Service, Testimonial, TeamMember } from './types';
import { SourcingIcon, LogisticsIcon, QualityIcon, ExportIcon } from './components/icons';

export const NAV_LINKS: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        slug: 'raw-cashew-nuts',
        name: 'Raw Cashew Nuts',
        description: 'High-quality raw cashew nuts sourced from the finest farms in Nigeria. Perfect for processing and export, known for their excellent kernel outturn ratio.',
        pricePerTon: '$1,200',
        imageUrl: 'https://picsum.photos/seed/cashew/800/600',
        gallery: ['https://picsum.photos/seed/cashew-nuts/800/600', 'https://picsum.photos/seed/cashew-tree/800/600', 'https://picsum.photos/seed/cashew-farm/800/600'],
        origin: 'Ogbomosho, Nigeria',
        specifications: [
            { key: 'Nut Count', value: '180-200 nuts/kg' },
            { key: 'KOR (Kernel Outturn Ratio)', value: '48-52 lbs' },
            { key: 'Moisture Content', value: '< 10%' },
            { key: 'Foreign Matter', value: '< 0.5%' },
        ],
        packaging: ['80kg Jute Bags', 'Customized Packaging Available'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'February - May',
    },
    {
        id: 2,
        slug: 'dried-split-ginger',
        name: 'Dried Split Ginger',
        description: 'Aromatic and spicy Nigerian ginger, carefully dried and split to preserve its potent flavor and essential oils. Ideal for culinary and medicinal uses.',
        pricePerTon: '$2,500',
        imageUrl: 'https://picsum.photos/seed/ginger/800/600',
        gallery: ['https://picsum.photos/seed/ginger-root/800/600', 'https://picsum.photos/seed/spice-market/800/600', 'https://picsum.photos/seed/ginger-plant/800/600'],
        origin: 'Kaduna, Nigeria',
        specifications: [
            { key: 'Type', value: 'Dried, Split' },
            { key: 'Moisture Content', value: '< 9%' },
            { key: 'Oil Content', value: '1-2%' },
            { key: 'Impurities', value: '< 2%' },
        ],
        packaging: ['25kg or 50kg Polypropylene Bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'October - March',
    },
    {
        id: 3,
        slug: 'sesame-seeds',
        name: 'Sesame Seeds',
        description: 'Premium quality sesame seeds from Nigeria, with high oil content and a clean, nutty flavor. Our seeds are meticulously cleaned and sorted for export.',
        pricePerTon: '$1,800',
        imageUrl: 'https://picsum.photos/seed/sesame/800/600',
        gallery: ['https://picsum.photos/seed/sesame-plant/800/600', 'https://picsum.photos/seed/seeds-bowl/800/600', 'https://picsum.photos/seed/sesame-field/800/600'],
        origin: 'Benue, Nigeria',
        specifications: [
            { key: 'Purity', value: '> 99%' },
            { key: 'Oil Content', value: '> 50%' },
            { key: 'Moisture Content', value: '< 6%' },
            { key: 'Color', value: 'White/Light Brown' },
        ],
        packaging: ['50kg PP bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'November - February',
    },
    {
        id: 4,
        slug: 'soybeans',
        name: 'Soybeans',
        description: 'Non-GMO soybeans sourced from the fertile plains of Nigeria. High in protein, they are perfect for food production, animal feed, and oil extraction.',
        pricePerTon: '$650',
        imageUrl: 'https://picsum.photos/seed/soybeans/800/600',
        gallery: ['https://picsum.photos/seed/soybean-field/800/600', 'https://picsum.photos/seed/soybean-harvest/800/600', 'https://picsum.photos/seed/soy-product/800/600'],
        origin: 'Kwara, Nigeria',
        specifications: [
            { key: 'Protein Content', value: '35-40%' },
            { key: 'Oil Content', value: '18-22%' },
            { key: 'Moisture Content', value: '< 12%' },
            { key: 'Foreign Matter', value: '< 1%' },
        ],
        packaging: ['50kg or 100kg PP bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'October - December',
    },
    {
        id: 5,
        slug: 'hibiscus-flower',
        name: 'Hibiscus Flower',
        description: 'Vibrant, deep-red dried hibiscus flowers, also known as zobo or bissap. Perfect for teas, beverages, and natural food coloring, rich in antioxidants.',
        pricePerTon: '$1,500',
        imageUrl: 'https://picsum.photos/seed/hibiscus/800/600',
        gallery: ['https://picsum.photos/seed/hibiscus-tea/800/600', 'https://picsum.photos/seed/red-flower/800/600', 'https://picsum.photos/seed/flower-market/800/600'],
        origin: 'Kano, Nigeria',
        specifications: [
            { key: 'Color', value: 'Dark Red' },
            { key: 'Purity', value: '> 99%' },
            { key: 'Moisture Content', value: '< 12%' },
            { key: 'Foreign Matter', value: '< 2%' },
        ],
        packaging: ['25kg PP bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'November - January',
    },
    {
        id: 6,
        slug: 'dried-chili-pepper',
        name: 'Dried Chili Pepper',
        description: 'Fiery and aromatic dried chili peppers from Nigeria. Sun-dried to perfection to retain their heat and flavor, ideal for spice blends and culinary uses worldwide.',
        pricePerTon: '$2,200',
        imageUrl: 'https://picsum.photos/seed/chili/800/600',
        gallery: ['https://picsum.photos/seed/chili-peppers/800/600', 'https://picsum.photos/seed/hot-spice/800/600', 'https://picsum.photos/seed/red-peppers/800/600'],
        origin: 'Sokoto, Nigeria',
        specifications: [
            { key: 'Heat Level', value: '30,000-50,000 SHU' },
            { key: 'Moisture Content', value: '< 10%' },
            { key: 'Color', value: 'Bright Red' },
            { key: 'Stemless', value: 'Yes/No options available' },
        ],
        packaging: ['25kg PP bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'January - April',
    },
    {
        id: 7,
        slug: 'gum-arabic',
        name: 'Gum Arabic',
        description: 'High-grade Gum Arabic (Acacia Senegal) sourced from Northern Nigeria. A natural emulsifier and stabilizer used in food, beverage, and pharmaceutical industries.',
        pricePerTon: '$3,000',
        imageUrl: 'https://picsum.photos/seed/gum-arabic/800/600',
        gallery: ['https://picsum.photos/seed/acacia-tree/800/600', 'https://picsum.photos/seed/resin/800/600', 'https://picsum.photos/seed/gum/800/600'],
        origin: 'Borno, Nigeria',
        specifications: [
            { key: 'Grade', value: 'Grade 1 (Kordofan)' },
            { key: 'Purity', value: '> 99.5%' },
            { key: 'Moisture', value: '< 15%' },
            { key: 'Ash Content', value: '< 4%' },
        ],
        packaging: ['50kg Jute bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'November - May',
    },
    {
        id: 8,
        slug: 'peanuts-groundnuts',
        name: 'Peanuts (Groundnuts)',
        description: 'Nutritious and flavorful peanuts (groundnuts) from Nigerian farms. Available in-shell or shelled, perfect for oil extraction, snacking, and confectionery.',
        pricePerTon: '$950',
        imageUrl: 'https://picsum.photos/seed/peanuts/800/600',
        gallery: ['https://picsum.photos/seed/groundnuts/800/600', 'https://picsum.photos/seed/peanut-butter/800/600', 'https://picsum.photos/seed/nuts/800/600'],
        origin: 'Kano, Nigeria',
        specifications: [
            { key: 'Type', value: 'Java / Bold' },
            { key: 'Oil Content', value: '45-52%' },
            { key: 'Moisture', value: '< 7%' },
            { key: 'Aflatoxin', value: '< 5 PPB' },
        ],
        packaging: ['50kg or 80kg Jute bags'],
        shippingTerms: 'FOB Lagos, CIF any major port',
        harvestSeason: 'August - October',
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        slug: 'nigerian-cashew-market-outlook-2024',
        title: 'Nigerian Cashew Market Outlook 2024',
        excerpt: 'An in-depth analysis of the trends, challenges, and opportunities shaping the Nigerian cashew industry this year. Discover key price drivers and export forecasts.',
        content: (
            <div>
              <p className="mb-4">The Nigerian cashew sector is poised for significant growth in 2024, but not without its unique set of challenges. As global demand for healthy snacks continues to rise, Nigerian cashews, known for their quality and taste, are increasingly sought after. This article delves into the factors that will influence the market this year.</p>
              <h3 className="text-xl font-bold text-brand-green mb-2">Key Market Drivers</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Increased global demand, particularly from Asia and Europe.</li>
                <li>Government initiatives to support local farmers and processors.</li>
                <li>Improvements in logistics and supply chain infrastructure.</li>
              </ul>
              <p>Despite these positive indicators, exporters must navigate challenges such as price volatility, quality control, and international trade regulations. At SolsTice Agro Exports, we are committed to overcoming these hurdles to deliver premium products to our clients worldwide.</p>
            </div>
          ),
        imageUrl: 'https://picsum.photos/seed/market/800/600',
        author: 'Adewale Adebayo',
        publishDate: 'March 15, 2024',
    },
    {
        id: 2,
        slug: 'the-golden-spice-why-nigerian-ginger-is-a-global-favorite',
        title: 'The Golden Spice: Why Nigerian Ginger is a Global Favorite',
        excerpt: 'Explore the unique qualities that make Nigerian ginger a highly sought-after commodity in the international spice market, from its pungency to its health benefits.',
        content: <p>Detailed content about Nigerian ginger...</p>,
        imageUrl: 'https://picsum.photos/seed/spices/800/600',
        author: 'Ngozi Okoro',
        publishDate: 'February 28, 2024',
    },
    {
        id: 3,
        slug: 'sustainable-farming-practices-in-nigerias-sesame-fields',
        title: "Sustainable Farming in Nigeria's Sesame Fields",
        excerpt: "A look into how sustainable and ethical farming practices are not only improving crop yields but also empowering local communities in Nigeria's sesame-growing regions.",
        content: <p>Detailed content about sustainable farming...</p>,
        imageUrl: 'https://picsum.photos/seed/farm/800/600',
        author: 'Musa Ibrahim',
        publishDate: 'January 10, 2024',
    },
];

export const STATS: Stat[] = [
    { value: '1+', label: 'Years of Experience' },
    { value: '5000+', label: 'Metric Tons Exported' },
    { value: '20+', label: 'Countries Served' },
    { value: '2023', label: 'Established' },
];

export const SERVICES: Service[] = [
    { id: 1, name: 'Sourcing & Procurement', description: 'We establish direct relationships with farming communities to source the highest quality commodities, ensuring fair prices and ethical practices.', icon: <SourcingIcon /> },
    { id: 2, name: 'Logistics & Shipping', description: 'Our end-to-end logistics solutions cover transportation, warehousing, and freight forwarding to ensure timely and secure delivery to any port worldwide.', icon: <LogisticsIcon /> },
    { id: 3, name: 'Quality Assurance', description: 'Rigorous quality checks at every stage, from farm to port, guarantee that our products meet and exceed international standards.', icon: <QualityIcon /> },
    { id: 4, name: 'Export Documentation', description: 'We handle all necessary export documentation and customs clearance, providing a seamless and hassle-free experience for our clients.', icon: <ExportIcon /> },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: 'SolsTice Agro Exports has been our most reliable partner for sourcing cashews from Nigeria. Their commitment to quality and on-time delivery is unparalleled.', author: 'Rajesh Patel', company: 'Director, Spices & Nuts Trading, UAE' },
    { id: 2, quote: 'The quality of the split ginger we received was exceptional. Their team is professional, transparent, and a pleasure to work with. Highly recommended.', author: 'Isabella Rossi', company: 'Procurement Manager, European Food Imports, Italy' },
    { id: 3, quote: "Navigating the complexities of international trade was made easy by SolsTice. Their expertise in logistics and documentation is a huge asset.", author: 'Chen Wei', company: 'CEO, Agri-Commodities Asia, Singapore' },
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: 'Dr. Aliu Yamah', role: 'Chairman', imageUrl: 'https://picsum.photos/seed/chairman/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Muhammad Hamza', role: 'MD/CEO', imageUrl: 'https://picsum.photos/seed/md-ceo/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Abubakar S Abdullahi', role: 'Director', imageUrl: 'https://picsum.photos/seed/director/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Usman Abdullahi', role: 'Secretary', imageUrl: 'https://picsum.photos/seed/secretary/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
];