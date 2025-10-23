// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center mt-6">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;