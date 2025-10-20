# SolsTice Agro Exports - Backend API

A comprehensive Node.js/Express backend API for the SolsTice Agro Exports website, providing content management, lead generation, and business analytics functionality.

## Features

### 🌾 Product Management
- Complete CRUD operations for agricultural products
- Product categorization and filtering
- Featured products management
- Search functionality with text indexing
- Inventory tracking and availability status

### 📝 Content Management System
- Blog post creation and management
- Rich content support with HTML
- SEO optimization (meta tags, slugs)
- Category and tag management
- View tracking and analytics

### 📞 Lead Generation
- Contact form submissions with email notifications
- Bulk order inquiry system
- Customer relationship management
- Priority-based inquiry handling
- Automated email responses

### 📊 Analytics & Reporting
- Dashboard statistics and metrics
- Activity tracking and monitoring
- Performance analytics
- Export and reporting capabilities

### 🔧 Additional Features
- File upload and management
- Email notification system
- Rate limiting and security
- Input validation and sanitization
- Error handling and logging

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (ready for implementation)
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get product categories
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Blog
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/featured` - Get featured posts
- `GET /api/blog/:slug` - Get single post by slug
- `POST /api/blog` - Create new post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

### Contact & Inquiries
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `POST /api/inquiries` - Submit bulk order inquiry
- `GET /api/inquiries` - Get all inquiries (admin)
- `PUT /api/inquiries/:id/status` - Update inquiry status

### Admin & Analytics
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics` - Get detailed analytics
- `GET /api/admin/recent-activity` - Get recent activity feed

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `DELETE /api/upload/:filename` - Delete uploaded file

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- SMTP email service (Gmail, SendGrid, etc.)

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/solstice-agro

# Server
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@solstice-agro.com

# Admin Configuration
ADMIN_EMAIL=admin@solstice-agro.com

# CORS
FRONTEND_URL=http://localhost:3000
```

### Installation Steps

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000/api`

## Database Models

### Product Schema
```javascript
{
  name: String,
  description: String,
  pricePerTon: String,
  imageUrl: String,
  category: String,
  inStock: Boolean,
  featured: Boolean,
  specifications: Object,
  nutritionalInfo: Object,
  certifications: [String],
  tags: [String]
}
```

### BlogPost Schema
```javascript
{
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  imageUrl: String,
  author: String,
  publishDate: Date,
  published: Boolean,
  category: String,
  tags: [String],
  views: Number
}
```

### Contact Schema
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  phone: String,
  company: String,
  status: String,
  priority: String
}
```

### Inquiry Schema
```javascript
{
  name: String,
  email: String,
  company: String,
  product: String,
  quantity: Number,
  message: String,
  status: String,
  priority: String,
  estimatedValue: Number
}
```

## Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Sanitizes and validates all inputs
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers and protection
- **File Upload Security**: Type and size restrictions
- **Error Handling**: Secure error responses

## Email Notifications

The system automatically sends email notifications for:
- New contact form submissions
- Bulk order inquiries
- Status updates (configurable)

Email templates are responsive and branded for professional communication.

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Code Structure
```
backend/
├── models/          # Database models
├── routes/          # API route handlers
├── utils/           # Utility functions
├── scripts/         # Database scripts
├── uploads/         # File upload directory
└── server.js        # Main application file
```

### Adding New Features
1. Create model in `models/`
2. Add routes in `routes/`
3. Update validation rules
4. Add tests (recommended)
5. Update documentation

## Production Deployment

### Environment Setup
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production email service
- Set secure JWT secret
- Enable HTTPS

### Recommended Hosting
- **API**: Heroku, DigitalOcean, AWS EC2
- **Database**: MongoDB Atlas, AWS DocumentDB
- **File Storage**: AWS S3, Cloudinary
- **Email**: SendGrid, AWS SES

### Performance Optimization
- Enable MongoDB indexing
- Implement caching (Redis)
- Use CDN for file uploads
- Monitor with logging service
- Set up health checks

## API Documentation

For detailed API documentation with request/response examples, visit the API documentation (when available) or use tools like Postman with the provided collection.

## Support

For technical support or questions about the backend API, please contact the development team or create an issue in the project repository.