import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LottiePlayerElement } from '../types';

const Preloader: React.FC = () => {
    const playerRef = useRef<LottiePlayerElement>(null);

    useEffect(() => {
        // Find the animation data from the script tag in index.html
        const animationDataScript = document.getElementById('lottie-animation');
        if (animationDataScript) {
            try {
                const animationData = JSON.parse(animationDataScript.innerHTML);
                if (playerRef.current) {
                    // The Lottie player might not be fully initialized, a small timeout can help
                    setTimeout(() => {
                        if(playerRef.current) {
                           playerRef.current.load(animationData);
                        }
                    }, 0)
                }
            } catch (error) {
                console.error("Failed to parse Lottie animation data:", error);
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