// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm dark:bg-gray-900/80' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center py-2">
                <Link to="/" className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-brand-green' : 'text-white'}`}>
                    Sols<span className="text-brand-gold">T</span>ice
                </Link>
                <div className="hidden md:flex items-center">
                    <nav className="flex items-center space-x-8">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                className={({ isActive }) => 
                                    `font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-brand-green dark:text-gray-300 dark:hover:text-brand-gold' : 'text-white hover:text-brand-gold'} ${isActive ? (isScrolled ? 'text-brand-green dark:text-brand-gold' : 'text-brand-gold') : ''}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="ml-4">
                        <ThemeToggle />
                    </div>
                    <Link
                        to="/contact"
                        className="ml-4 bg-brand-gold text-white font-bold py-2 px-5 rounded-full text-sm hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-md"
                    >
                        Get Started
                    </Link>
                </div>
                <div className="md:hidden flex items-center space-x-2">
                     <ThemeToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${isScrolled ? 'text-brand-green dark:text-gray-200' : 'text-white'}`}>
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
                        className="md:hidden bg-white dark:bg-gray-900"
                    >
                        <nav className="flex flex-col items-center py-4 space-y-4">
                            {NAV_LINKS.map(link => (
                                <NavLink 
                                    key={link.name} 
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `font-medium text-gray-700 hover:text-brand-green dark:text-gray-300 dark:hover:text-brand-gold ${isActive ? 'text-brand-green dark:text-brand-gold' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <Link 
                                to="/contact" 
                                className="mt-4 bg-brand-gold text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;