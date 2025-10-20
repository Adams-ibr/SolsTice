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
  { 
    id: 1, 
    slug: 'raw-cashew-nuts',
    name: 'Raw Cashew Nuts', 
    description: 'High-quality raw cashew nuts sourced directly from Nigerian farms, known for their excellent kernel outturn ratio.', 
    pricePerTon: '$1,250', 
    imageUrl: 'https://picsum.photos/seed/cashew/400/300',
    gallery: ['https://picsum.photos/seed/cashew-gallery1/800/600', 'https://picsum.photos/seed/cashew-gallery2/800/600', 'https://picsum.photos/seed/cashew-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'February - May',
    specifications: [
        { key: 'Nut Count', value: '170-190 nuts/kg' },
        { key: 'Kernel Outturn Ratio (KOR)', value: '48-52 lbs' },
        { key: 'Moisture Content', value: 'Less than 8%' },
        { key: 'Defective Nuts', value: 'Less than 10%' },
    ],
    packaging: ['80kg jute bags', 'As per buyer\'s request'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 2, 
    slug: 'dried-split-ginger',
    name: 'Dried Split Ginger', 
    description: 'Aromatic and spicy dried ginger, carefully split and sun-dried to preserve its potent flavor and medicinal properties.', 
    pricePerTon: '$1,800', 
    imageUrl: 'https://picsum.photos/seed/ginger/400/300',
    gallery: ['https://picsum.photos/seed/ginger-gallery1/800/600', 'https://picsum.photos/seed/ginger-gallery2/800/600', 'https://picsum.photos/seed/ginger-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'October - March',
    specifications: [
        { key: 'Type', value: 'Dried, Split' },
        { key: 'Oil Content', value: '1-2%' },
        { key: 'Moisture Content', value: 'Less than 10%' },
        { key: 'Impurities', value: 'Less than 2%' },
    ],
    packaging: ['40kg polypropylene bags', 'Custom packaging available'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 3, 
    slug: 'sesame-seeds',
    name: 'Sesame Seeds', 
    description: 'Nutrient-rich sesame seeds with high oil content, ideal for oil extraction, tahini production, and baking.', 
    pricePerTon: '$1,500', 
    imageUrl: 'https://picsum.photos/seed/sesame/400/300',
    gallery: ['https://picsum.photos/seed/sesame-gallery1/800/600', 'https://picsum.photos/seed/sesame-gallery2/800/600', 'https://picsum.photos/seed/sesame-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'October - January',
    specifications: [
        { key: 'Purity', value: '98-99.5%' },
        { key: 'Oil Content', value: 'Minimum 48%' },
        { key: 'Moisture Content', value: 'Less than 6%' },
        { key: 'Admixture', value: 'Less than 2%' },
    ],
    packaging: ['50kg polypropylene bags'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 4, 
    slug: 'soybeans',
    name: 'Soybeans', 
    description: 'Non-GMO soybeans with high protein content, suitable for producing soy milk, tofu, and other food products.', 
    pricePerTon: '$650', 
    imageUrl: 'https://picsum.photos/seed/soybean/400/300',
    gallery: ['https://picsum.photos/seed/soybean-gallery1/800/600', 'https://picsum.photos/seed/soybean-gallery2/800/600', 'https://picsum.photos/seed/soybean-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'October - December',
    specifications: [
        { key: 'Protein Content', value: 'Minimum 35%' },
        { key: 'Oil Content', value: '18-22%' },
        { key: 'Moisture Content', value: 'Less than 12%' },
        { key: 'Foreign Matter', value: 'Less than 2%' },
    ],
    packaging: ['50kg or 100kg jute bags'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 5, 
    slug: 'peanuts-groundnuts',
    name: 'Peanuts (Groundnuts)', 
    description: 'Fresh and crunchy peanuts, available in both shelled and unshelled forms, perfect for snacking and oil production.', 
    pricePerTon: '$900', 
    imageUrl: 'https://picsum.photos/seed/peanuts/400/300',
    gallery: ['https://picsum.photos/seed/peanuts-gallery1/800/600', 'https://picsum.photos/seed/peanuts-gallery2/800/600', 'https://picsum.photos/seed/peanuts-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'August - October',
    specifications: [
        { key: 'Type', value: 'Bold / Java' },
        { key: 'Oil Content', value: '42-48%' },
        { key: 'Moisture Content', value: 'Less than 7%' },
        { key: 'Aflatoxin Level', value: 'Less than 5 PPB' },
    ],
    packaging: ['50kg jute bags'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 6, 
    slug: 'gum-arabic',
    name: 'Gum Arabic', 
    description: 'Premium grade Gum Arabic (Acacia Senegal) for use in food, pharmaceutical, and industrial applications.', 
    pricePerTon: '$3,200', 
    imageUrl: 'https://picsum.photos/seed/gum-arabic/400/300',
    gallery: ['https://picsum.photos/seed/gum-arabic-gallery1/800/600', 'https://picsum.photos/seed/gum-arabic-gallery2/800/600', 'https://picsum.photos/seed/gum-arabic-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'November - April',
    specifications: [
        { key: 'Grade', value: 'Grade 1' },
        { key: 'Purity', value: 'Minimum 99%' },
        { key: 'Moisture Content', value: 'Less than 15%' },
        { key: 'Ash Content', value: 'Less than 4%' },
    ],
    packaging: ['50kg polypropylene bags'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 7, 
    slug: 'hibiscus-flower',
    name: 'Hibiscus Flower', 
    description: 'Vibrant dried hibiscus flowers, perfect for producing teas, refreshing drinks, and natural food colorants.', 
    pricePerTon: '$2,100', 
    imageUrl: 'https://picsum.photos/seed/hibiscus/400/300',
    gallery: ['https://picsum.photos/seed/hibiscus-gallery1/800/600', 'https://picsum.photos/seed/hibiscus-gallery2/800/600', 'https://picsum.photos/seed/hibiscus-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'November - January',
    specifications: [
        { key: 'Color', value: 'Dark Red' },
        { key: 'Purity', value: '98-99%' },
        { key: 'Moisture Content', value: 'Less than 12%' },
        { key: 'Flower Size', value: 'Whole flowers' },
    ],
    packaging: ['25kg polypropylene bags'],
    shippingTerms: 'FOB Lagos'
  },
  { 
    id: 8, 
    slug: 'moringa-seeds',
    name: 'Moringa Seeds', 
    description: 'High-potency Moringa Oleifera seeds, renowned for their exceptional health benefits and high-quality oil production.', 
    pricePerTon: '$4,000', 
    imageUrl: 'https://picsum.photos/seed/moringa/400/300',
    gallery: ['https://picsum.photos/seed/moringa-gallery1/800/600', 'https://picsum.photos/seed/moringa-gallery2/800/600', 'https://picsum.photos/seed/moringa-gallery3/800/600'],
    origin: 'Nigeria',
    harvestSeason: 'All Year Round',
    specifications: [
        { key: 'Variety', value: 'Moringa Oleifera' },
        { key: 'Purity', value: '99%' },
        { key: 'Moisture Content', value: 'Less than 8%' },
        { key: 'Oil Content', value: '35-40%' },
    ],
    packaging: ['25kg polypropylene bags', 'Vacuum sealed bags available'],
    shippingTerms: 'FOB Lagos'
  },
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
  { 
    id: 1, 
    slug: 'market-trends-q3-2024', 
    title: 'Global Agro-Commodity Market Trends for Q3 2024', 
    excerpt: 'An in-depth analysis of the key factors driving the agricultural commodity markets in the third quarter of 2024.', 
    imageUrl: 'https://picsum.photos/seed/blog1/400/300', 
    author: 'Dr. Amina Bello', 
    publishDate: 'August 15, 2024',
    content: (
      <>
        <p>
          The third quarter of 2024 is shaping up to be a pivotal period for the global agro-commodity market. A confluence of factors, ranging from unpredictable weather patterns to shifting geopolitical landscapes, is creating a dynamic and challenging environment for traders and consumers alike. At SolsTice, we are closely monitoring these trends to navigate the complexities and identify opportunities for our partners.
        </p>
        <h3 className="font-bold text-2xl my-4 text-brand-green">Key Drivers to Watch</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Weather and Climate Impact:</strong> The El Niño-Southern Oscillation (ENSO) cycle continues to be a major influencer. Parts of Southeast Asia are experiencing droughts, affecting rice and palm oil production, while regions in the Americas are facing unseasonal rains, impacting soybean and corn harvests. These weather disruptions directly affect supply volumes and are a primary driver of price volatility.
          </li>
          <li>
            <strong>Geopolitical Tensions:</strong> Ongoing trade disputes and logistical bottlenecks in key shipping lanes, such as the Red Sea, are adding layers of complexity and cost to the global supply chain. Export restrictions from major producing nations and fluctuating tariff policies require constant vigilance and agile supply chain management to mitigate risks.
          </li>
          <li>
            <strong>Shifting Consumer Demand:</strong> In post-pandemic markets, there is a growing consumer preference for sustainably and ethically sourced products. This trend is creating premium opportunities for commodities with clear traceability and sustainability certifications. Furthermore, demand from emerging economies, particularly in Asia, continues to grow, putting upward pressure on prices for staples like wheat, soybeans, and edible oils.
          </li>
          <li>
            <strong>Currency Fluctuations:</strong> The strength of the US dollar against other currencies plays a significant role in commodity pricing. A stronger dollar can make dollar-denominated commodities more expensive for buyers using other currencies, potentially dampening demand.
          </li>
        </ul>
        <p className="mt-6">
          As we move through Q3, we anticipate continued volatility. However, by focusing on robust risk management, diversified sourcing strategies, and strong partnerships, SolsTice is well-positioned to ensure a steady and reliable supply of high-quality agricultural commodities to our clients worldwide.
        </p>
      </>
    ) 
  },
  { 
    id: 2, 
    slug: 'sustainable-farming-in-nigeria', 
    title: 'The Rise of Sustainable Farming Practices in Nigeria', 
    excerpt: 'Exploring how Nigerian farmers are adopting sustainable methods to improve yield and protect the environment.', 
    imageUrl: 'https://picsum.photos/seed/blog2/400/300', 
    author: 'David Okonjo', 
    publishDate: 'July 28, 2024',
    content: (
      <>
        <p>
          Nigeria's agricultural landscape is undergoing a quiet revolution. Faced with the dual challenges of climate change and soil degradation, a growing number of farmers are turning to sustainable practices. This shift is not just an environmental imperative but a strategic move to build a more resilient and profitable agricultural sector for the future.
        </p>
        <h3 className="font-bold text-2xl my-4 text-brand-green">What's Driving the Change?</h3>
        <p>
          Sustainable agriculture focuses on farming in a way that meets the needs of the present without compromising the ability of future generations to meet their own. In Nigeria, this translates into a variety of innovative techniques:
        </p>
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <strong>Agroforestry and Intercropping:</strong> Farmers are increasingly integrating trees with crops and livestock. This practice helps to improve soil fertility, prevent erosion, and provide additional sources of income. Intercropping, or planting different crops in close proximity, helps to naturally control pests and improve biodiversity.
          </li>
          <li>
            <strong>Water Conservation:</strong> Techniques like drip irrigation and rainwater harvesting are being adopted to manage water resources more efficiently, which is crucial in a country with distinct wet and dry seasons. This ensures crop viability even during periods of lower rainfall.
          </li>
          <li>
            <strong>Organic Farming:</strong> The move away from chemical fertilizers and pesticides towards organic alternatives like compost and manure is gaining momentum. This not only reduces environmental pollution but also improves soil health over the long term, leading to healthier and more nutritious crops.
          </li>
          <li>
            <strong>Community-Led Initiatives:</strong> Farmer cooperatives are playing a vital role in this transition. By sharing knowledge, resources, and best practices, these groups are accelerating the adoption of sustainable methods across entire communities.
          </li>
        </ul>
        <h3 className="font-bold text-2xl my-4 text-brand-green">The Benefits</h3>
        <p>
          The rewards of this transition are manifold. Farmers benefit from improved crop yields, healthier soil that requires fewer expensive inputs, and access to premium international markets that demand sustainably grown products. For the nation, it means enhanced food security, a healthier environment, and a more robust agricultural economy. SolsTice is proud to support these farmers by providing them with a reliable route to market and championing their commitment to a sustainable future.
        </p>
      </>
    )
  },
  { 
    id: 3, 
    slug: 'navigating-export-logistics', 
    title: 'Navigating the Complexities of Agro-Export Logistics', 
    excerpt: 'A guide to understanding the challenges and solutions in shipping agricultural products from Africa to the world.', 
    imageUrl: 'https://picsum.photos/seed/blog3/400/300', 
    author: 'Fatima Aliyu', 
    publishDate: 'July 10, 2024',
    content: (
      <>
        <p>
          Exporting agricultural commodities from Africa is a rewarding but intricate process. The journey from a farm in Nigeria to a port in Europe or Asia is fraught with logistical challenges that require expertise, precision, and a proactive approach. Understanding these complexities is the first step toward ensuring a smooth and successful transaction.
        </p>
        <h3 className="font-bold text-2xl my-4 text-brand-green">Common Hurdles in Agro-Export</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Infrastructure Gaps:</strong> While improving, transportation infrastructure can still be a significant challenge. Delays in road or rail transport can impact the freshness and quality of perishable goods.
          </li>
          <li>
            <strong>Complex Documentation:</strong> International trade involves a mountain of paperwork. From certificates of origin and phytosanitary certificates to bills of lading and customs declarations, every document must be accurate and processed in a timely manner to avoid costly delays at ports.
          </li>
          <li>
            <strong>Quality Control in Transit:</strong> Maintaining product quality throughout the shipping process is paramount. Fluctuations in temperature and humidity, as well as improper handling, can lead to spoilage and significant financial loss.
          </li>
          <li>
            <strong>Navigating Customs and Regulations:</strong> Each destination country has its own set of import regulations, tariffs, and food safety standards. Staying abreast of these ever-changing rules is crucial for compliance and avoiding shipment rejection.
          </li>
        </ul>
        <h3 className="font-bold text-2xl my-4 text-brand-green">The SolsTice Solution</h3>
        <p>
          At SolsTice, we have built our business on mastering these challenges. Our end-to-end logistics solutions are designed to provide a seamless experience for our clients:
        </p>
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <strong>Expert Logistics Team:</strong> Our team has deep experience in managing the entire supply chain, from inland transportation to international shipping. We partner with reliable carriers to ensure timely and safe delivery.
          </li>
          <li>
            <strong>Streamlined Documentation:</strong> We handle all necessary documentation with meticulous attention to detail, ensuring compliance with both local and international regulations.
          </li>
          <li>
            <strong>Quality Assurance:</strong> We implement rigorous quality control measures at every stage, including proper packaging and storage solutions, to preserve the integrity of our products until they reach their final destination.
          </li>
          <li>
            <strong>Global Partnerships:</strong> Our extensive network of partners and agents worldwide helps us navigate customs processes efficiently and resolve any issues that may arise swiftly.
          </li>
        </ul>
        <p className="mt-6">
          By entrusting your logistics to SolsTice, you can focus on your core business, confident that your agro-commodities are in capable hands.
        </p>
      </>
    )
  },
];