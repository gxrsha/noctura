import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JobListingsSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-primary text-background px-4 py-3 shadow-lg rounded-lg">
        <div className="flex items-center mb-2">
          <div className="mr-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
            <Skeleton circle width={40} height={40} baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          </div>
          <div className="flex-grow">
            <Skeleton height={20} width="80%" baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
            <Skeleton height={16} width="60%" baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          </div>
          <div className="text-right">
            <Skeleton height={14} width={40} baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-between sm:items-center mt-2">
          <Skeleton height={16} width="40%" baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          <Skeleton height={16} width="20%" baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton height={24} width={60} baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          <Skeleton height={24} width={60} baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
          <Skeleton height={24} width={60} baseColor="rgba(255, 255, 255, 0.1)" highlightColor="rgba(255, 255, 255, 0.2)" />
        </div>
      </div>
    ))}
  </div>
);

export default JobListingsSkeleton;
