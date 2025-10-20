import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import BlogPost from '../models/BlogPost.js';

// Load environment variables
dotenv.config();

// Sample data
const sampleProducts = [
  {
    name: 'Raw Cashew Nuts',
    description: 'High-quality raw cashew nuts sourced directly from Nigerian farms.',
    pricePerTon: '$1,250',
    imageUrl: 'https://picsum.photos/seed/cashew/400/300',
    category: 'nuts',
    featured: true,
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'February - May',
      shelfLife: '12 months',
      packaging: '50kg jute bags',
      minimumOrder: '5 metric tons'
    },
    nutritionalInfo: {
      protein: '18.2g per 100g',
      fat: '43.9g per 100g',
      carbohydrates: '30.2g per 100g',
      fiber: '3.3g per 100g',
      moisture: '5.2%'
    },
    certifications: ['organic', 'haccp'],
    tags: ['cashew', 'nuts', 'raw', 'premium', 'nigerian'],
    sortOrder: 1
  },
  {
    name: 'Dried Split Ginger',
    description: 'Aromatic and spicy dried ginger, perfect for culinary and medicinal uses.',
    pricePerTon: '$1,800',
    imageUrl: 'https://picsum.photos/seed/ginger/400/300',
    category: 'spices',
    featured: true,
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'October - December',
      shelfLife: '24 months',
      packaging: '25kg polypropylene bags',
      minimumOrder: '2 metric tons'
    },
    nutritionalInfo: {
      moisture: '10% max',
      protein: '9.1g per 100g',
      fat: '5.9g per 100g',
      carbohydrates: '70.8g per 100g',
      fiber: '5.9g per 100g'
    },
    certifications: ['organic', 'haccp', 'iso'],
    tags: ['ginger', 'spices', 'dried', 'split', 'medicinal'],
    sortOrder: 2
  },
  {
    name: 'Sesame Seeds',
    description: 'Nutrient-rich sesame seeds, ideal for oil extraction and baking.',
    pricePerTon: '$1,500',
    imageUrl: 'https://picsum.photos/seed/sesame/400/300',
    category: 'seeds',
    featured: true,
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'November - January',
      shelfLife: '18 months',
      packaging: '50kg jute bags',
      minimumOrder: '10 metric tons'
    },
    nutritionalInfo: {
      protein: '17.7g per 100g',
      fat: '49.7g per 100g',
      carbohydrates: '23.4g per 100g',
      fiber: '11.8g per 100g',
      moisture: '4.7%'
    },
    certifications: ['haccp', 'iso'],
    tags: ['sesame', 'seeds', 'oil', 'baking', 'nutritious'],
    sortOrder: 3
  },
  {
    name: 'Soybeans',
    description: 'Non-GMO soybeans with high protein content for various food products.',
    pricePerTon: '$650',
    imageUrl: 'https://picsum.photos/seed/soybean/400/300',
    category: 'grains',
    featured: true,
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'September - November',
      shelfLife: '12 months',
      packaging: '50kg polypropylene bags',
      minimumOrder: '20 metric tons'
    },
    nutritionalInfo: {
      protein: '36.5g per 100g',
      fat: '19.9g per 100g',
      carbohydrates: '30.2g per 100g',
      fiber: '9.3g per 100g',
      moisture: '8.5%'
    },
    certifications: ['non-gmo', 'haccp'],
    tags: ['soybeans', 'protein', 'non-gmo', 'grains'],
    sortOrder: 4
  },
  {
    name: 'Peanuts (Groundnuts)',
    description: 'Fresh and crunchy peanuts, available in both shelled and unshelled forms.',
    pricePerTon: '$900',
    imageUrl: 'https://picsum.photos/seed/peanuts/400/300',
    category: 'nuts',
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'September - December',
      shelfLife: '12 months',
      packaging: '50kg jute bags',
      minimumOrder: '15 metric tons'
    },
    nutritionalInfo: {
      protein: '25.8g per 100g',
      fat: '49.2g per 100g',
      carbohydrates: '16.1g per 100g',
      fiber: '8.5g per 100g',
      moisture: '6.5%'
    },
    certifications: ['haccp'],
    tags: ['peanuts', 'groundnuts', 'nuts', 'shelled', 'unshelled'],
    sortOrder: 5
  },
  {
    name: 'Gum Arabic',
    description: 'Premium grade Gum Arabic for use in food, pharmaceutical, and industrial applications.',
    pricePerTon: '$3,200',
    imageUrl: 'https://picsum.photos/seed/gum-arabic/400/300',
    category: 'other',
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'December - March',
      shelfLife: '36 months',
      packaging: '25kg kraft paper bags',
      minimumOrder: '1 metric ton'
    },
    nutritionalInfo: {
      moisture: '15% max',
      ash: '4% max',
      protein: '2.1g per 100g',
      fiber: '85.4g per 100g'
    },
    certifications: ['food-grade', 'haccp', 'iso'],
    tags: ['gum-arabic', 'acacia', 'food-grade', 'pharmaceutical'],
    sortOrder: 6
  },
  {
    name: 'Hibiscus Flower',
    description: 'Vibrant dried hibiscus flowers for teas, drinks, and natural colorants.',
    pricePerTon: '$2,100',
    imageUrl: 'https://picsum.photos/seed/hibiscus/400/300',
    category: 'herbs',
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'October - December',
      shelfLife: '24 months',
      packaging: '20kg cartons',
      minimumOrder: '5 metric tons'
    },
    nutritionalInfo: {
      moisture: '12% max',
      protein: '1.1g per 100g',
      fat: '0.6g per 100g',
      carbohydrates: '7.4g per 100g',
      fiber: '0.3g per 100g'
    },
    certifications: ['organic', 'haccp'],
    tags: ['hibiscus', 'flowers', 'tea', 'natural', 'colorant'],
    sortOrder: 7
  },
  {
    name: 'Moringa Seeds',
    description: 'High-potency Moringa seeds, known for their health benefits and oil production.',
    pricePerTon: '$4,000',
    imageUrl: 'https://picsum.photos/seed/moringa/400/300',
    category: 'seeds',
    inStock: true,
    specifications: {
      origin: 'Nigeria',
      harvestSeason: 'Year-round',
      shelfLife: '18 months',
      packaging: '25kg polypropylene bags',
      minimumOrder: '1 metric ton'
    },
    nutritionalInfo: {
      protein: '35.7g per 100g',
      fat: '41.2g per 100g',
      carbohydrates: '8.5g per 100g',
      fiber: '6.7g per 100g',
      moisture: '7.5%'
    },
    certifications: ['organic', 'haccp', 'iso'],
    tags: ['moringa', 'seeds', 'superfood', 'oil', 'health'],
    sortOrder: 8
  }
];

const sampleBlogPosts = [
  {
    title: 'Global Agro-Commodity Market Trends for Q3 2024',
    excerpt: 'An in-depth analysis of the key factors driving the agricultural commodity markets in the third quarter of 2024.',
    content: `
      <p>The third quarter of 2024 is shaping up to be a pivotal period for the global agro-commodity market. A confluence of factors, ranging from unpredictable weather patterns to shifting geopolitical landscapes, is creating a dynamic and challenging environment for traders and consumers alike. At SolsTice, we are closely monitoring these trends to navigate the complexities and identify opportunities for our partners.</p>

      <h3>Key Drivers to Watch</h3>
      
      <h4>Weather and Climate Impact</h4>
      <p>The El Niño-Southern Oscillation (ENSO) cycle continues to be a major influencer. Parts of Southeast Asia are experiencing droughts, affecting rice and palm oil production, while regions in the Americas are facing unseasonal rains, impacting soybean and corn harvests. These weather disruptions directly affect supply volumes and are a primary driver of price volatility.</p>

      <h4>Geopolitical Tensions</h4>
      <p>Ongoing trade disputes and logistical bottlenecks in key shipping lanes, such as the Red Sea, are adding layers of complexity and cost to the global supply chain. Export restrictions from major producing nations and fluctuating tariff policies require constant vigilance and agile supply chain management to mitigate risks.</p>

      <h4>Shifting Consumer Demand</h4>
      <p>In post-pandemic markets, there is a growing consumer preference for sustainably and ethically sourced products. This trend is creating premium opportunities for commodities with clear traceability and sustainability certifications. Furthermore, demand from emerging economies, particularly in Asia, continues to grow, putting upward pressure on prices for staples like wheat, soybeans, and edible oils.</p>

      <h4>Currency Fluctuations</h4>
      <p>The strength of the US dollar against other currencies plays a significant role in commodity pricing. A stronger dollar can make dollar-denominated commodities more expensive for buyers using other currencies, potentially dampening demand.</p>

      <p>As we move through Q3, we anticipate continued volatility. However, by focusing on robust risk management, diversified sourcing strategies, and strong partnerships, SolsTice is well-positioned to ensure a steady and reliable supply of high-quality agricultural commodities to our clients worldwide.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/blog1/800/400',
    author: 'Dr. Amina Bello',
    publishDate: new Date('2024-08-15'),
    published: true,
    featured: true,
    category: 'market-trends',
    tags: ['market-analysis', 'commodity-trading', 'global-markets', 'price-trends'],
    readTime: 6
  },
  {
    title: 'The Rise of Sustainable Farming Practices in Nigeria',
    excerpt: 'Exploring how Nigerian farmers are adopting sustainable methods to improve yield and protect the environment.',
    content: `
      <p>Nigeria's agricultural landscape is undergoing a quiet revolution. Faced with the dual challenges of climate change and soil degradation, a growing number of farmers are turning to sustainable practices. This shift is not just an environmental imperative but a strategic move to build a more resilient and profitable agricultural sector for the future.</p>

      <h3>What's Driving the Change?</h3>
      <p>Sustainable agriculture focuses on farming in a way that meets the needs of the present without compromising the ability of future generations to meet their own. In Nigeria, this translates into a variety of innovative techniques:</p>

      <h4>Agroforestry and Intercropping</h4>
      <p>Farmers are increasingly integrating trees with crops and livestock. This practice helps to improve soil fertility, prevent erosion, and provide additional sources of income. Intercropping, or planting different crops in close proximity, helps to naturally control pests and improve biodiversity.</p>

      <h4>Water Conservation</h4>
      <p>Techniques like drip irrigation and rainwater harvesting are being adopted to manage water resources more efficiently, which is crucial in a country with distinct wet and dry seasons. This ensures crop viability even during periods of lower rainfall.</p>

      <h4>Organic Farming</h4>
      <p>The move away from chemical fertilizers and pesticides towards organic alternatives like compost and manure is gaining momentum. This not only reduces environmental pollution but also improves soil health over the long term, leading to healthier and more nutritious crops.</p>

      <h4>Community-Led Initiatives</h4>
      <p>Farmer cooperatives are playing a vital role in this transition. By sharing knowledge, resources, and best practices, these groups are accelerating the adoption of sustainable methods across entire communities.</p>

      <h3>The Benefits</h3>
      <p>The rewards of this transition are manifold. Farmers benefit from improved crop yields, healthier soil that requires fewer expensive inputs, and access to premium international markets that demand sustainably grown products. For the nation, it means enhanced food security, a healthier environment, and a more robust agricultural economy. SolsTice is proud to support these farmers by providing them with a reliable route to market and championing their commitment to a sustainable future.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/blog2/800/400',
    author: 'David Okonjo',
    publishDate: new Date('2024-07-28'),
    published: true,
    featured: true,
    category: 'sustainability',
    tags: ['sustainable-farming', 'nigeria', 'agriculture', 'environment', 'organic'],
    readTime: 5
  },
  {
    title: 'Navigating the Complexities of Agro-Export Logistics',
    excerpt: 'A guide to understanding the challenges and solutions in shipping agricultural products from Africa to the world.',
    content: `
      <p>Exporting agricultural commodities from Africa is a rewarding but intricate process. The journey from a farm in Nigeria to a port in Europe or Asia is fraught with logistical challenges that require expertise, precision, and a proactive approach. Understanding these complexities is the first step toward ensuring a smooth and successful transaction.</p>

      <h3>Common Hurdles in Agro-Export</h3>

      <h4>Infrastructure Gaps</h4>
      <p>While improving, transportation infrastructure can still be a significant challenge. Delays in road or rail transport can impact the freshness and quality of perishable goods.</p>

      <h4>Complex Documentation</h4>
      <p>International trade involves a mountain of paperwork. From certificates of origin and phytosanitary certificates to bills of lading and customs declarations, every document must be accurate and processed in a timely manner to avoid costly delays at ports.</p>

      <h4>Quality Control in Transit</h4>
      <p>Maintaining product quality throughout the shipping process is paramount. Fluctuations in temperature and humidity, as well as improper handling, can lead to spoilage and significant financial loss.</p>

      <h4>Navigating Customs and Regulations</h4>
      <p>Each destination country has its own set of import regulations, tariffs, and food safety standards. Staying abreast of these ever-changing rules is crucial for compliance and avoiding shipment rejection.</p>

      <h3>The SolsTice Solution</h3>
      <p>At SolsTice, we have built our business on mastering these challenges. Our end-to-end logistics solutions are designed to provide a seamless experience for our clients:</p>

      <h4>Expert Logistics Team</h4>
      <p>Our team has deep experience in managing the entire supply chain, from inland transportation to international shipping. We partner with reliable carriers to ensure timely and safe delivery.</p>

      <h4>Streamlined Documentation</h4>
      <p>We handle all necessary documentation with meticulous attention to detail, ensuring compliance with both local and international regulations.</p>

      <h4>Quality Assurance</h4>
      <p>We implement rigorous quality control measures at every stage, including proper packaging and storage solutions, to preserve the integrity of our products until they reach their final destination.</p>

      <h4>Global Partnerships</h4>
      <p>Our extensive network of partners and agents worldwide helps us navigate customs processes efficiently and resolve any issues that may arise swiftly.</p>

      <p>By entrusting your logistics to SolsTice, you can focus on your core business, confident that your agro-commodities are in capable hands.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/blog3/800/400',
    author: 'Fatima Aliyu',
    publishDate: new Date('2024-07-10'),
    published: true,
    category: 'logistics',
    tags: ['logistics', 'export', 'shipping', 'supply-chain', 'africa'],
    readTime: 7
  }
];

// Connect to database
const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_PROD 
      : process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Product.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    // Insert blog posts
    const blogPosts = await BlogPost.insertMany(sampleBlogPosts);
    console.log(`✅ Inserted ${blogPosts.length} blog posts`);

    console.log('🎉 Database seeding completed successfully!');
    
    // Display summary
    console.log('\n📊 Summary:');
    console.log(`Products: ${products.length}`);
    console.log(`Blog Posts: ${blogPosts.length}`);
    console.log(`Featured Products: ${products.filter(p => p.featured).length}`);
    console.log(`Published Blog Posts: ${blogPosts.filter(p => p.published).length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

// Check if script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}

export { seedDatabase };