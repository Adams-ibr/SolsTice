import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Commodity {
    name: string;
    price: number;
    change: number;
}

const initialCommodities: Commodity[] = [
    { name: 'Raw Cashew Nuts', price: 1200, change: 5.5 },
    { name: 'Dried Split Ginger', price: 2500, change: -12.0 },
    { name: 'Sesame Seeds', price: 1800, change: 2.3 },
    { name: 'Soybeans', price: 650, change: -0.75 },
    { name: 'Hibiscus Flower', price: 1500, change: 8.2 },
    { name: 'Dried Chili Pepper', price: 2200, change: -3.1 },
    { name: 'Gum Arabic', price: 3000, change: 1.5 },
    { name: 'Peanuts', price: 950, change: 4.2 },
];

const TrendArrow: React.FC<{ change: number }> = ({ change }) => {
    const isUp = change >= 0;
    return (
        <span className={`inline-block ml-2 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '▲' : '▼'}
        </span>
    );
};

const CommodityTicker: React.FC = () => {
    const [commodities, setCommodities] = useState(initialCommodities);

    useEffect(() => {
        const interval = setInterval(() => {
            setCommodities(prev => prev.map(c => {
                const change = (Math.random() - 0.5) * (c.price * 0.01);
                return { ...c, price: Math.max(0, c.price + change), change };
            }));
        }, 3000); // Update prices every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const tickerItems = [...commodities, ...commodities]; // Duplicate for seamless loop

    return (
        <div className="bg-brand-dark text-white py-3 overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: '-100%' }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 40,
                        ease: 'linear',
                    },
                }}
            >
                {tickerItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-6">
                        <span className="font-semibold text-brand-gold">{item.name}:</span>
                        <span className="ml-2">${item.price.toFixed(2)}</span>
                        <span className={`ml-2 text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.change.toFixed(2)}
                        </span>
                        <TrendArrow change={item.change} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default CommodityTicker;
