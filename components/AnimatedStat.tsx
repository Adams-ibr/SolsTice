// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface Props {
    value: string;
    label: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AnimatedStat: React.FC<Props> = ({ value, label }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    // Extract the numerical part and any suffix (like '+')
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');

    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current) + suffix);
    
    React.useEffect(() => {
        if (isInView) {
            spring.set(numericValue);
        }
    }, [isInView, numericValue, spring]);

    return (
        <motion.div ref={ref} variants={itemVariants}>
            <motion.p className="text-4xl font-bold text-brand-gold">{display}</motion.p>
            <p className="text-4xl font-bold text-brand-gold -mt-11" style={{opacity: 0, pointerEvents: 'none'}}>{value}</p> {/* For layout spacing */}
            <p className="mt-2">{label}</p>
        </motion.div>
    );
};

export default AnimatedStat;