// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-3xl font-bold text-brand-green dark:text-gray-100 text-center mb-12">
      {children}
    </h2>
  );
};

export default SectionTitle;