import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import type { Testimonial } from '../types';

const sliderVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const TestimonialSlider: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const testimonialIndex = page % TESTIMONIALS.length;
  const testimonial = TESTIMONIALS[testimonialIndex < 0 ? TESTIMONIALS.length + testimonialIndex : testimonialIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-72 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute w-full h-full flex flex-col justify-center items-center p-8 bg-brand-light rounded-lg"
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
            <p className="text-gray-600 italic text-center text-lg mb-6">"{testimonial.quote}"</p>
            <div className="font-bold text-brand-green text-center">{testimonial.author}</div>
            <div className="text-sm text-gray-500 text-center">{testimonial.company}</div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > testimonialIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-colors ${i === (testimonialIndex < 0 ? TESTIMONIALS.length + testimonialIndex : testimonialIndex) ? 'bg-brand-gold' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
