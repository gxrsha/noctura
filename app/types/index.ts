export interface Job {
  id: string;
  title: string;
  company: string;
  image_url: string;
  link: string;
  location: string;
  job_type: string;
  salary_range: string;
  required_skills: string[];
  description: string;
  detailed_description: string;
  tags: string[];
  date_added: string;
  benefits: string[];
  industry: string;
}

export interface JobListingsProps {
  jobs: Job[];
  limit?: number;
}
