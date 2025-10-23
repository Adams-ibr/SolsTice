// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import SkeletonCard from './SkeletonCard';

interface Props {
    count: number;
}

const ProductGridSkeleton: React.FC<Props> = ({ count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;