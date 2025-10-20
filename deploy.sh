#!/bin/bash

# Solstice Agro Exports - Deployment Script
# This script handles building and deploying the React application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="solstice-agro-exports"
BUILD_DIR="dist"
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -e, --env ENV        Set environment (dev, staging, prod) [default: prod]"
    echo "  -t, --target TARGET  Deployment target (netlify, vercel, static, docker) [default: static]"
    echo "  -c, --clean         Clean build directory before building"
    echo "  -s, --skip-build    Skip build step (use existing build)"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                           # Build for production and create static files"
    echo "  $0 -e staging -t netlify     # Build for staging and deploy to Netlify"
    echo "  $0 -t docker                 # Build and create Docker image"
    echo "  $0 --clean                   # Clean build and rebuild"
}

# Default values
ENVIRONMENT="prod"
TARGET="static"
CLEAN_BUILD=false
SKIP_BUILD=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--target)
            TARGET="$2"
            shift 2
            ;;
        -c|--clean)
            CLEAN_BUILD=true
            shift
            ;;
        -s|--skip-build)
            SKIP_BUILD=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|staging|prod)$ ]]; then
    log_error "Invalid environment: $ENVIRONMENT. Must be dev, staging, or prod."
    exit 1
fi

# Validate target
if [[ ! "$TARGET" =~ ^(netlify|vercel|static|docker)$ ]]; then
    log_error "Invalid target: $TARGET. Must be netlify, vercel, static, or docker."
    exit 1
fi

log_info "Starting deployment for $APP_NAME"
log_info "Environment: $ENVIRONMENT"
log_info "Target: $TARGET"

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    log_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="20.19.0"
if ! node -e "process.exit(process.version.slice(1).split('.').map(Number).reduce((a,b,i)=>(a*1000+b),0) >= '$REQUIRED_VERSION'.split('.').map(Number).reduce((a,b,i)=>(a*1000+b),0) ? 0 : 1)"; then
    log_warning "Node.js version $NODE_VERSION detected. Recommended version is $REQUIRED_VERSION or higher."
fi

# Install dependencies
log_info "Installing dependencies..."
if ! npm install; then
    log_error "Failed to install dependencies"
    exit 1
fi
log_success "Dependencies installed successfully"

# Clean build directory if requested
if [ "$CLEAN_BUILD" = true ]; then
    log_info "Cleaning build directory..."
    rm -rf $BUILD_DIR
    log_success "Build directory cleaned"
fi

# Build the application
if [ "$SKIP_BUILD" = false ]; then
    log_info "Building application for $ENVIRONMENT environment..."
    
    # Set environment variables based on environment
    case $ENVIRONMENT in
        dev)
            export NODE_ENV=development
            ;;
        staging)
            export NODE_ENV=production
            # Add staging-specific env vars here
            ;;
        prod)
            export NODE_ENV=production
            # Add production-specific env vars here
            ;;
    esac
    
    if ! npm run build; then
        log_error "Build failed"
        exit 1
    fi
    log_success "Build completed successfully"
else
    log_info "Skipping build step"
fi

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build directory '$BUILD_DIR' not found. Run build first."
    exit 1
fi

# Deploy based on target
case $TARGET in
    static)
        log_info "Preparing static files for deployment..."
        
        # Create deployment package
        DEPLOY_PACKAGE="${APP_NAME}-${ENVIRONMENT}-$(date +%Y%m%d_%H%M%S).tar.gz"
        tar -czf "$DEPLOY_PACKAGE" -C "$BUILD_DIR" .
        
        log_success "Static deployment package created: $DEPLOY_PACKAGE"
        log_info "Upload the contents of '$BUILD_DIR' to your web server"
        ;;
        
    netlify)
        log_info "Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            log_warning "Netlify CLI not found. Installing..."
            npm install -g netlify-cli
        fi
        
        # Deploy to Netlify
        if [ "$ENVIRONMENT" = "prod" ]; then
            netlify deploy --prod --dir="$BUILD_DIR"
        else
            netlify deploy --dir="$BUILD_DIR"
        fi
        
        log_success "Deployed to Netlify"
        ;;
        
    vercel)
        log_info "Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            log_warning "Vercel CLI not found. Installing..."
            npm install -g vercel
        fi
        
        # Deploy to Vercel
        if [ "$ENVIRONMENT" = "prod" ]; then
            vercel --prod
        else
            vercel
        fi
        
        log_success "Deployed to Vercel"
        ;;
        
    docker)
        log_info "Building Docker image..."
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            log_error "Docker is not installed. Please install Docker first."
            exit 1
        fi
        
        # Create Dockerfile if it doesn't exist
        if [ ! -f "Dockerfile" ]; then
            log_info "Creating Dockerfile..."
            cat > Dockerfile << EOF
FROM nginx:alpine

# Copy built application
COPY $BUILD_DIR /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
        fi
        
        # Create nginx.conf if it doesn't exist
        if [ ! -f "nginx.conf" ]; then
            log_info "Creating nginx configuration..."
            cat > nginx.conf << EOF
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
        fi
        
        # Build Docker image
        IMAGE_TAG="${APP_NAME}:${ENVIRONMENT}-$(date +%Y%m%d_%H%M%S)"
        docker build -t "$IMAGE_TAG" .
        docker tag "$IMAGE_TAG" "${APP_NAME}:latest"
        
        log_success "Docker image built: $IMAGE_TAG"
        log_info "Run with: docker run -p 80:80 $IMAGE_TAG"
        ;;
esac

log_success "Deployment completed successfully!"

# Show deployment summary
echo ""
echo "=== Deployment Summary ==="
echo "App: $APP_NAME"
echo "Environment: $ENVIRONMENT"
echo "Target: $TARGET"
echo "Build Directory: $BUILD_DIR"
echo "Timestamp: $(date)"
echo "=========================="