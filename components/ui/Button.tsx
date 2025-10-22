import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    default: 'bg-brand-gold text-white hover:bg-yellow-600 focus:ring-brand-gold',
    outline: 'bg-transparent border border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus:ring-brand-green',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <button className={combinedClasses} {...props} />;
};
