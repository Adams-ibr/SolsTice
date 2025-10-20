// Fix: Replaced invalid placeholder content with a functional and responsive Header component.
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);


  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `py-2 text-gray-600 hover:text-brand-gold font-medium transition-colors ${isActive ? 'text-brand-gold border-b-2 border-brand-gold' : 'border-b-2 border-transparent'}`;

  const getMobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-center py-3 text-lg text-gray-700 hover:text-brand-gold font-medium transition-colors ${isActive ? 'text-brand-gold' : ''}`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-brand-green">
            Sols<span className="text-brand-gold">T</span>ice
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={getLinkClassName}
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/contact" className="bg-brand-gold text-white hover:bg-opacity-90 font-bold py-2 px-6 rounded-md transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-green focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white absolute w-full shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center p-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={getMobileLinkClassName}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-brand-gold text-white hover:bg-opacity-90 font-bold py-3 px-8 rounded-md transition-colors w-full text-center mt-4"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;