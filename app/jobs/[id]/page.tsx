import { Job } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SimilarJobs from '@/app/components/SimilarJobs';

async function getJobById(id: string): Promise<Job | null> {
  const response = await fetch(`http://localhost:3000/api/jobs?id=${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job: Job | null = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-accent hover:underline mb-4 inline-block">Back to listings</Link>
      <div className="bg-primary text-background p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="hidden md:block mr-4">
              <Image
                src={'/assets/images/logowhite.png'}
                alt={`${job.company} logo`}
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-lg">{job.company}</p>
            </div>
          </div>
          <Link 
            href={job.link} 
            target="_blank" 
            className="bg-accent text-background text-center py-2 px-8 rounded-full hover:bg-opacity-90 transition-colors text-sm my-4 md:mt-0"
          >
            Apply
          </Link>
        </div>
        <div className="mb-4">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Job Type:</strong> {job.job_type}</p>
          <p><strong>Salary Range:</strong> {job.salary_range}</p>
          <p><strong>Industry:</strong> {job.industry}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p>{job.detailed_description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
          <ul className="list-disc list-inside">
            {job.required_skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Benefits</h2>
          <ul className="list-disc list-inside">
            {job.benefits.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {job.tags.map((tag: string, index: number) => (
            <span key={index} className="bg-background text-primary text-xs p-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <SimilarJobs jobId={params.id} />
    </div>
  );
}
