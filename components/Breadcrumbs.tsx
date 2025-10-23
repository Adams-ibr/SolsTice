// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link to="/" className="text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-gold">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const name = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                            {isLast ? (
                                <span className="text-brand-green font-semibold dark:text-gray-200">{name}</span>
                            ) : (
                                <Link to={to} className="text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-gold">{name}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;