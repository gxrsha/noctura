'use client';

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import FAQ from "./components/FAQ";
import { Job } from './types';
import { useEffect, useState } from 'react';
import JobListingsSkeleton from './components/JobListingsSkeleton';

const JobListings = dynamic(() => import('./components/JobListings'), { ssr: false });

async function getFrontPageJobs(): Promise<Job[]> {
  const response = await fetch('/api/jobs?frontPage=true');
  if (!response.ok) {
    throw new Error('Failed to fetch front page jobs');
  }
  return response.json();
}

async function getJobTags(): Promise<string[]> {
  const response = await fetch('/api/jobs?tags=true');
  if (!response.ok) {
    throw new Error('Failed to fetch job tags');
  }
  return response.json();
}

async function getJobsIndustries(): Promise<string[]> {
  const response = await fetch('/api/jobs?industries=true');
  if (!response.ok) {
    throw new Error('Failed to fetch job industries');
  }
  return response.json();
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTags, setJobTags] = useState<string[]>([]);
  const [jobIndustries, setJobIndustries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsData, tagsData, industriesData] = await Promise.all([
          getFrontPageJobs(),
          getJobTags(),
          getJobsIndustries()
        ]);
        setJobs(jobsData);
        setJobTags(tagsData);
        setJobIndustries(industriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(jobTags);
  console.log(jobIndustries);

  return (
    <div className="flex flex-col bg-background">
      {/* Hero section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <Image 
          src="https://i.imgur.com/puokwGc.png" 
          alt="Abstract green background" 
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
          <div className="text-white text-center md:text-left">
            <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 font-bold">Simplify Your Remote Job Search</h1>
            <p className="text-sm sm:text-base mb-2 sm:mb-3 max-w-2xl">
              At Noctura, we make it easy to find remote jobs that match your skills and ambitions. Effortlessly browse the newest opportunities and let our AI agent handle applications for you. Your next career move is just a click away.
            </p>
            <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl">Simplify your hiring process with Noctura. Reach thousands of qualified remote professionals eager to join innovative teams like yours. Posting a job is quick and easy—find your next team member today.</p>
            <Link href="/jobs" className="bg-accent text-background px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base hover:bg-opacity-90 transition-colors inline-block">
              Find Jobs
            </Link>
          </div>
        </div>
      </section>
      
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        {/* Job listings section */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-orbitron text-center font-bold md:text-left text-2xl sm:text-3xl mb-4 sm:mb-6 text-primary">Latest Listings</h2>
          <div style={{ minHeight: '600px' }}> {/* Adjust the minHeight as needed */}
            {loading ? <JobListingsSkeleton /> : <JobListings jobs={jobs} />}
          </div>
        </section>
      </div>

      {/* Explore section */}
      <section className="w-full bg-black py-12 sm:py-16">
        <div className="mx-auto max-w-[min(100%_-_clamp(30px,_5vw,_80px),_1294px)] px-4">
          <h2 className="font-orbitron font-bold text-3xl mb-4 text-white text-center md:mb-8 md:text-left">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              { title: "Discover your ideal remote job today", link: "/jobs", image: "/assets/images/noctura1.png", linkText: "Start Browsing Now" },
              { title: "Hire Top Remote Talent", link: "/post-job", image: "/assets/images/noctura2.png", linkText: "Connect with Top Talent" },
              { title: "Let our AI Apply to Jobs for you", link: "/resources", image: "/assets/images/noctura3.png", linkText: "Try Noctura AI" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image 
                  src={item.image} 
                  alt={`Feature ${index + 1}`} 
                  width={300} 
                  height={300}
                  className="w-full max-w-[250px] h-auto mb-4 sm:mb-5"
                />
                <p className="text-background text-center mb-4 text-sm sm:text-base">{item.title}</p>
                <Link href={item.link} className="bg-white text-primary px-4 sm:px-6 py-2 rounded-full text-sm hover:bg-opacity-90 transition-colors">
                  {item.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
