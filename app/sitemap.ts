import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all job IDs
  const response = await fetch('https://remote-dork-ccefeca406ae.herokuapp.com/jobs', {
    headers: {
      'X-API-Key': `${process.env.REMOTE_DORKS_API_KEY}`
    }
  });
  const jobs = await response.json();

  const jobsUrls = jobs.map((job: any) => ({
    url: `https://noctura.io/jobs/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://noctura.io',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://noctura.io/jobs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://noctura.io/post-job',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...jobsUrls,
  ]
} 