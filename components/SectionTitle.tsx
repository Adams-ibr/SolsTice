import React from 'react';

interface Props {
  children: React.ReactNode;
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-3xl font-bold text-brand-green text-center mb-12">
      {children}
    </h2>
  );
};

export default SectionTitle;