import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  const combinedClasses = `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent ${className}`;
  return <textarea className={combinedClasses} {...props} />;
};
