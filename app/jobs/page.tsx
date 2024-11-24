'use client';

import React, { useState, useEffect } from 'react';
import { Job } from '../types/index';
import JobListings from '../components/JobListings';
import JobListingsSkeleton from '../components/JobListingsSkeleton';
import { IoChevronDown, IoClose } from 'react-icons/io5';

const JOBS_PER_PAGE = 10;

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showIndustryModal, setShowIndustryModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, industriesResponse, tagsResponse] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/jobs?industries=true'),
          fetch('/api/jobs?tags=true')
        ]);

        const jobsData: Job[] = await jobsResponse.json();
        const industriesData: string[] = await industriesResponse.json();
        const tagsData: string[] = await tagsResponse.json();

        setJobs(jobsData);
        setIndustries(industriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const industryMatch = selectedIndustries.length === 0 || selectedIndustries.includes(job.industry);
    const tagsMatch = selectedTags.length === 0 || selectedTags.some(tag => job.tags.includes(tag));
    return industryMatch && tagsMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries(prevIndustries => 
      prevIndustries.includes(industry)
        ? prevIndustries.filter(i => i !== industry)
        : [...prevIndustries, industry]
    );
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSelectedCount = (items: string[]) => {
    return items.length ? `(${items.length} selected)` : '';
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Browse Jobs</h1>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <button
            onClick={() => setShowIndustryModal(true)}
            className="w-full px-4 py-2 text-left border rounded-lg flex justify-between items-center bg-white"
          >
            <span>Industries {getSelectedCount(selectedIndustries)}</span>
            <IoChevronDown className="h-5 w-5" />
          </button>
          
          {showIndustryModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Select Industries</h2>
                  <button onClick={() => setShowIndustryModal(false)}>
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                  {industries.map(industry => (
                    <label key={industry} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => handleIndustryChange(industry)}
                        className="h-4 w-4"
                      />
                      <span>{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSkillsModal(true)}
            className="w-full px-4 py-2 text-left border rounded-lg flex justify-between items-center bg-white"
          >
            <span>Skills {getSelectedCount(selectedTags)}</span>
            <IoChevronDown className="h-5 w-5" />
          </button>
          
          {showSkillsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Select Skills</h2>
                  <button onClick={() => setShowSkillsModal(false)}>
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                  {tags.map(tag => (
                    <label key={tag} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="h-4 w-4"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <JobListingsSkeleton />
      ) : (
        <>
          <JobListings jobs={paginatedJobs} />
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsPage;
