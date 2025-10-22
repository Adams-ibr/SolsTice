import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link to="/" className="text-gray-500 hover:text-brand-green">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const name = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <span className="text-gray-400 mx-2">/</span>
                            {isLast ? (
                                <span className="text-brand-green font-semibold">{name}</span>
                            ) : (
                                <Link to={to} className="text-gray-500 hover:text-brand-green">{name}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
