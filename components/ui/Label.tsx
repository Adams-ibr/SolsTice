// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  const combinedClasses = `block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`;
  return <label className={combinedClasses} {...props} />;
};