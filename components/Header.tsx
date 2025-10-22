import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <Link to="/" className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-brand-green' : 'text-white'}`}>
                    Sols<span className="text-brand-gold">T</span>ice
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    {NAV_LINKS.map(link => (
                        <NavLink 
                            key={link.name} 
                            to={link.path}
                            className={({ isActive }) => 
                                `font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-brand-green' : 'text-white hover:text-brand-gold'} ${isActive ? (isScrolled ? 'text-brand-green' : 'text-brand-gold') : ''}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${isScrolled ? 'text-brand-green' : 'text-white'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white"
                    >
                        <nav className="flex flex-col items-center py-4 space-y-4">
                            {NAV_LINKS.map(link => (
                                <NavLink 
                                    key={link.name} 
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `font-medium text-gray-700 hover:text-brand-green ${isActive ? 'text-brand-green' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;