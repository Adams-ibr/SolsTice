import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, type, ...props }) => {
  const combinedClasses = `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent ${className}`;
  return <input type={type} className={combinedClasses} {...props} />;
};
