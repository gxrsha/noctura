import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardSkeletonLoader: React.FC = () => {
  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <Skeleton height={40} baseColor="#4B5563" highlightColor="#6B7280" />
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col space-y-8">
        {/* Charts placeholder */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <Skeleton height={200} baseColor="#4B5563" highlightColor="#6B7280" />
          </div>
          <div className="w-1/2">
            <Skeleton height={200} baseColor="#4B5563" highlightColor="#6B7280" />
          </div>
        </div>
        
        {/* Table placeholder */}
        <div>
          <Skeleton count={5} height={40} className="mb-2" baseColor="#4B5563" highlightColor="#6B7280" />
        </div>

        {/* Additional content placeholder */}
        <div className="flex space-x-4">
          <div className="w-2/3">
            <Skeleton height={100} baseColor="#4B5563" highlightColor="#6B7280" />
          </div>
          <div className="w-1/3">
            <Skeleton height={100} baseColor="#4B5563" highlightColor="#6B7280" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeletonLoader;
