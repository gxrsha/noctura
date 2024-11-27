import { Job } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SimilarJobs from '@/app/components/SimilarJobs';
import type { Metadata } from 'next';

async function getJobById(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`https://remote-dork-ccefeca406ae.herokuapp.com/jobs/${id}`, {
      headers: {
        'X-API-Key': `${process.env.REMOTE_DORKS_API_KEY}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getJobById(params.id);
  
  if (!job) {
    return {
      title: "Job Not Found | Noctura",
      description: "The job posting you were looking for could not be found."
    };
  }

  return {
    title: `${job.title} at ${job.company} | Noctura`,
    description: job.detailed_description.substring(0, 155) + '...',
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.detailed_description.substring(0, 155) + '...',
      type: 'article',
      url: `https://noctura.io/jobs/${params.id}`,
      images: [
        {
          url: 'https://i.imgur.com/FKI9hQj.png',
          width: 1200,
          height: 630,
          alt: `${job.title} at ${job.company}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} at ${job.company}`,
      description: job.detailed_description.substring(0, 155) + '...',
    }
  };
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job: Job | null = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/jobs" className="text-accent hover:underline mb-4 inline-block">Back to listings</Link>
      <div className="bg-primary text-background p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
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
        <div className="mb-4 text-sm">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Job Type:</strong> {job.job_type}</p>
          <p><strong>Salary Range:</strong> {job.salary_range}</p>
          <p><strong>Industry:</strong> {job.industry}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-roboto font-semibold mb-2">Job Description</h2>
          <p className="text-sm">{job.detailed_description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-roboto font-semibold mb-2">Required Skills</h2>
          <ul className="list-disc text-sm list-inside">
            {job.required_skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold font-semibold mb-2">Benefits</h2>
          <ul className="list-disc list-inside">
            {job.benefits.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
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
