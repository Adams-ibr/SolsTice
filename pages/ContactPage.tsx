import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';

const ContactPage: React.FC = () => {
  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-green text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">We're here to answer your questions and help you with your sourcing needs.</p>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionTitle>Send Us a Message</SectionTitle>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Inquiry about Cashew Nuts" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="space-y-8">
            <SectionTitle>Contact Information</SectionTitle>
            <div className="space-y-4 text-lg">
              <p><strong>Address:</strong> 123 Commerce Way, Lagos, Nigeria</p>
              <p><strong>Phone:</strong> <a href="tel:+2348012345678" className="text-brand-green hover:underline dark:text-brand-gold">
+234 801 234 5678
</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@solsticeagro.com" className="text-brand-green hover:underline dark:text-brand-gold">
info@solsticeagro.com
</a></p>
            </div>
             <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.4633355323!2d3.119143394531241!3d6.548035599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1689252627043!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="dark:grayscale dark:invert"
                ></iframe>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default ContactPage;