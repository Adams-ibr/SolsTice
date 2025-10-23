// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<Props> = ({ children, className, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;