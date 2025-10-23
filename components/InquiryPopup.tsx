// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';

interface InquiryPopupProps {
  productName: string;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

const InquiryPopup: React.FC<InquiryPopupProps> = ({ productName, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg p-8 w-full max-w-lg mx-4 dark:bg-gray-800"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <h2 className="text-2xl font-bold text-brand-green dark:text-gray-100 mb-4">Inquiry for {productName}</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="inquiry-name">Full Name</Label>
              <Input id="inquiry-name" type="text" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="inquiry-email">Email</Label>
              <Input id="inquiry-email" type="email" placeholder="Your Email" />
            </div>
            <div>
              <Label htmlFor="inquiry-quantity">Expected Quantity (MT)</Label>
              <Input id="inquiry-quantity" type="number" placeholder="e.g., 100" />
            </div>
            <div>
              <Label htmlFor="inquiry-message">Message</Label>
              <Textarea id="inquiry-message" placeholder="Any specific requirements..." rows={4} />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit Inquiry</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InquiryPopup;