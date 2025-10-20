// Fix: Created the HomePage component to resolve module not found and syntax errors.
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, SERVICES, STATS, TESTIMONIALS } from '../constants';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Premium Nigerian Agro-Commodities
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-8">
            Delivering quality, reliability, and value from the heart of Africa to the global market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md text-lg transition-transform duration-300 ease-in-out hover:scale-105">
              Explore Products
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-green font-bold py-3 px-8 rounded-md text-lg transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-green mb-4">Your Trusted Partner in Agro-Commodity Trading</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-8">
            SolsTice Agro Exports is a leading exporter of high-quality agricultural products from Nigeria. We are committed to fostering sustainable partnerships between local farmers and international buyers, ensuring fair trade practices and delivering exceptional value at every step of the supply chain.
          </p>
          <Link to="/about" className="text-brand-gold font-semibold hover:underline">
            Learn More About Us &rarr;
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-12">Our Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="bg-brand-green text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section / Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-12">Why Choose SolsTice?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {SERVICES.map(service => (
              <div key={service.id} className="p-6">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-green mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-brand-gold">{stat.value}</p>
                <p className="mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-bold text-brand-green">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-gold text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Source Your Agro-Commodities?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact our team today for a competitive quote and discover the SolsTice difference.
          </p>
          <Link to="/contact" className="bg-white text-brand-gold hover:bg-gray-200 font-bold py-3 px-8 rounded-md text-lg transition-colors">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
