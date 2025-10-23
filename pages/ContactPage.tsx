// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
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
        <section className="bg-brand-green text-white pt-32 pb-20">
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
              <p><strong>Address:</strong> 174 Emir’s Palace Road, Kano Municipal, Nigeria</p>
              <p><strong>Phone:</strong> <a href="tel:+2348052444482" className="text-brand-green hover:underline dark:text-brand-gold">
+234 805 244 4482
</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@solsticeagro.com" className="text-brand-green hover:underline dark:text-brand-gold">
info@solsticeagro.com
</a></p>
            </div>
             <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.798150772744!2d8.51520131479177!3d11.995038991500366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae81b37651082d%3A0x82b8f6a6c2f9d37c!2sEmir's%20Palace%20Rd%2C%20Kano!5e0!3m2!1sen!2sng!4v1698000000000!5m2!1sen!2sng"
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