// import { Job } from '../types';

// const API_URL = 'https://remote-dork-ccefeca406ae.herokuapp.com';
// const API_KEY = process.env.REMOTE_DORKS_API_KEY;

// export async function getJobs(): Promise<Job[]> {
//   console.log('Fetching jobs from API');
//   console.log(API_URL);
//   try {
//     const response = await fetch(`${API_URL}/jobs`, {
//       headers: {
//         'X-API-Key': `${API_KEY}`
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch jobs');
//     }
  
//     return await response.json();
    
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     return []; 
//   }
// }

// export async function getFrontPageJobs(): Promise<Job[]> {
//     try {
//         const response = await fetch(`${API_URL}/front-page-listings`, {
//             headers: {
//                 'X-API-Key': `${API_KEY}`
//             },
//         })

//         if (!response.ok) {
//             throw new Error('Failed to fetch front page jobs');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching front page jobs:', error);
//         return [];
//     }
// }

// export async function getJobById(id: string): Promise<Job | null> {
//   try {
//     const response = await fetch(`${API_URL}/jobs/${id}`, {
//       headers: {
//         'X-API-Key': `${API_KEY}`
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch job');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching job:', error);
//     return null;
//   }
// }

// export async function getJobTags(): Promise<string[]> {
//   try {
//     const response = await fetch(`${API_URL}/tags`, {
//       headers: {
//         'X-API-Key': `${API_KEY}`
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch job tags');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching job tags:', error);
//     return [];
//   }
// }

// export async function getJobsIndustries(): Promise<string[]> {
//   try {
//     const response = await fetch(`${API_URL}/industries`, {
//       headers: {
//         'X-API-Key': `${API_KEY}`
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch job industries');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching job industries:', error);
//     return [];
//   }
// }
