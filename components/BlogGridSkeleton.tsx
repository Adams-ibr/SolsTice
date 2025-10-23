// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import SkeletonCard from './SkeletonCard';

const BlogGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default BlogGridSkeleton;