import { Job } from '@/app/types/index';

export async function getFrontPageJobs(): Promise<Job[]> {
  const response = await fetch('/api/jobs?frontPage=true');
  if (!response.ok) {
    throw new Error('Failed to fetch front page jobs');
  }
  return response.json();
}

export async function getJobTags(): Promise<string[]> {
  const response = await fetch('/api/jobs?tags=true');
  if (!response.ok) {
    throw new Error('Failed to fetch job tags');
  }
  return response.json();
}

export async function getJobsIndustries(): Promise<string[]> {
  const response = await fetch('/api/jobs?industries=true');
  if (!response.ok) {
    throw new Error('Failed to fetch job industries');
  }
  return response.json();
}
