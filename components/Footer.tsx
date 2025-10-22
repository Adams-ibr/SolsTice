import React from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from './SocialIcons';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Sols<span className="text-brand-gold">T</span>ice Agro Exports</h3>
                        <p className="text-gray-400">Connecting Africa's agricultural bounty with the global market.</p>
                        <SocialIcons />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {NAV_LINKS.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-brand-gold transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="mailto:info@solsticeagro.com" className="hover:text-brand-gold">info@solsticeagro.com</a></li>
                            <li><a href="tel:+2348012345678" className="hover:text-brand-gold">+234 801 234 5678</a></li>
                            <li>Lagos, Nigeria</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none" />
                            <button className="bg-brand-gold text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SolsTice Agro Exports. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
