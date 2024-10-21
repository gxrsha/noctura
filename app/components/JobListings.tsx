'use client';  // Add this line at the top of the file

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateAdded } from '../utils/helpers';
import { Job, JobListingsProps } from '../types';

const JobListings: React.FC<JobListingsProps> = ({ jobs, limit }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-primary">No Jobs Found</p>
        <p className="mt-2 text-primary">Check back later for new opportunities!</p>
      </div>
    );
  }

  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;
  console.log(displayedJobs);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement tag click functionality here
    console.log(`Tag clicked: ${tag}`);
  };

  return (
    <div className="space-y-4">
      {displayedJobs.map((job) => (
        <Link href={`/jobs/${job.id}`} key={job.id} className="block">
          <div className="bg-primary text-background px-4 py-3 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-2">
              <div className="mr-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                <Image
                  src={'/assets/images/logowhite.png'}
                  alt={`Noctura logo`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-roboto text-base sm:text-lg font-semibold">{job.title}</h3>
                <p className="text-sm">{job.company}</p>
              </div>
              <div className="text-right text-xs">
                {formatDateAdded(job.date_added)}
              </div>
            </div>
            <div className="sm:flex sm:justify-between sm:items-center mt-2">
              <p className="hidden md:block text-sm">{job.location} {job.job_type === "Not specified" ? "" : "•"} {job.job_type === "Not specified" ? "" : job.job_type}</p>
              <span className={`text-sm ${job.salary_range === "Not specified" ? "italic font-normal" : "font-semibold"}`}>
                {job.salary_range === "Not specified" ? "" : job.salary_range}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.tags.slice(0, 3).map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="bg-background text-primary text-xs px-2 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
              {job.tags.length > 3 && (
                <span className="bg-background text-primary text-xs px-2 py-1 rounded-full">
                  +{job.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobListings;
