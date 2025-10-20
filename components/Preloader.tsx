import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Defined a specific interface for the Lottie player element to include the `load` method.
interface LottiePlayerElement extends HTMLElement {
  load(animationData: object): void;
}

// Define the props for the lottie-player custom element, extending standard HTML attributes.
interface LottiePlayerProps extends React.HTMLProps<LottiePlayerElement> {
    src?: string;
    background?: string;
    speed?: string;
    loop?: boolean;
    autoplay?: boolean;
}

// Fix: Correctly typed the `lottie-player` custom element for JSX by using `React.HTMLProps`
// to include standard HTML attributes (including `ref`) and simplifying the IntrinsicElements declaration.
// Since we can't use a bundler, we'll declare the lottie-player custom element
// by augmenting the global JSX namespace to make it available in JSX.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': LottiePlayerProps;
    }
  }
}

const Preloader: React.FC = () => {
    const playerRef = useRef<LottiePlayerElement>(null);

    useEffect(() => {
        // Find the animation data from the script tag in index.html
        const animationDataScript = document.getElementById('lottie-animation');
        if (animationDataScript) {
            const animationData = JSON.parse(animationDataScript.innerHTML);
            if (playerRef.current) {
                // The Lottie player might not be fully initialized, a small timeout can help
                setTimeout(() => {
                    playerRef.current.load(animationData);
                }, 0)
            }
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-brand-green"
        >
            <div className="w-48 h-48">
                 <lottie-player
                    ref={playerRef}
                    autoplay
                    loop
                    speed="1"
                    background="transparent"
                 >
                </lottie-player>
            </div>
            <div className="text-3xl font-bold text-white mt-4">
                Sols<span className="text-brand-gold">T</span>ice
            </div>
            <p className="text-white opacity-80 mt-2">Cultivating Quality, Delivering Trust...</p>
        </motion.div>
    );
};

export default Preloader;