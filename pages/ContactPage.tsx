import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setIsError(false);

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/error
    if (Math.random() > 0.1) { // 90% success rate
      setSubmitMessage('Thank you for your message! We will get back to you shortly.');
      (e.target as HTMLFormElement).reset();
    } else {
      setSubmitMessage('Failed to send message. Please try again later.');
      setIsError(true);
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 6000);
  };

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">We're here to help. Reach out to us for inquiries, quotes, or any questions you may have.</p>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-brand-green mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <fieldset disabled={isSubmitting} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50" required></textarea>
                  </div>
                  <div>
                    <motion.button 
                        type="submit" 
                        className="w-full bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-6 rounded-md transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </fieldset>
                <AnimatePresence>
                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className={`mt-6 p-4 rounded-md text-center font-medium ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                      aria-live="polite"
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-brand-green mb-2">Office Address</h3>
                <p className="text-gray-600">No. 19 Fandriana Close, Wuse 2, Abuja, Nigeria</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-green mb-2">Email Us</h3>
                <a href="mailto:info@solstice.com" className="text-gray-600 hover:text-brand-gold">info@solstice.com</a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-green mb-2">Call Us</h3>
                <a href="tel:+2348012345678" className="text-gray-600 hover:text-brand-gold">+234 801 234 5678</a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-green mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday & Sunday: Closed</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default ContactPage;