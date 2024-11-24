'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Job } from '../types';

interface SimilarJobsProps {
  jobId: string;
}

const SimilarJobs: React.FC<SimilarJobsProps> = ({ jobId }) => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/similar?id=${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch similar jobs');
        }
        const data = await response.json();
        setSimilarJobs(data.similar_jobs);
      } catch (err) {
        setError('Error fetching similar jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarJobs();
  }, [jobId]);

  if (loading) return <div>Loading similar jobs...</div>;
  if (error) return <div>{error}</div>;
  if (similarJobs.length === 0) return null;

  return (
    <div className="mt-8 bg-black text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Similar Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarJobs.slice(0, 3).map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id} className="block h-full">
            <div className="bg-primary bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all border border-gray-700 hover:border-accent h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Image
                    src={'/assets/images/logowhite.png'}
                    alt={`${job.company} logo`}
                    width={40}
                    height={40}
                    className="rounded-full mr-2 md:hidden"
                  />
                  <div>
                    <h3 className="font-semibold font-roboto">{job.title}</h3>
                    <p className="text-sm text-gray-300">{job.company}</p>
                  </div>
                </div>
                <p className="text-sm mb-2">{job.location}</p>
              </div>
              <p className="text-sm font-semibold mt-auto">{job.salary_range === "Not specified" ? "" : job.salary_range}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;
