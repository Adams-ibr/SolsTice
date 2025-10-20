
import React from 'react';
import { SERVICES } from '../constants';

const ServiceCard: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex justify-center mb-6">
            {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-brand-green mb-4">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
    </div>
);

const ServicesPage: React.FC = () => {
  return (
    <div>
      <section className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-xl mt-4 max-w-3xl mx-auto">Providing comprehensive, end-to-end solutions for the global agro-commodity trade.</p>
        </div>
      </section>
      
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-brand-green mb-4">A Partner You Can Trust</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From the farm gate to the destination port, our team manages every detail with precision and care. We handle complex logistics, ensure stringent quality standards, and provide all necessary documentation to facilitate a smooth and efficient transaction for our clients. Your success is our priority.
            </p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
