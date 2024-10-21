import { NextResponse } from 'next/server';
import { Job } from '../../types';

const API_URL = 'https://remote-dork-ccefeca406ae.herokuapp.com';
const API_KEY = process.env.REMOTE_DORKS_API_KEY;

async function fetchFromAPI(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'X-API-Key': `${API_KEY}`
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const frontPage = searchParams.get('frontPage');
  const tags = searchParams.get('tags');
  const industries = searchParams.get('industries');

  try {
    let data;
    if (id) {
      data = await fetchFromAPI(`/jobs/${id}`);
    } else if (frontPage) {
      data = await fetchFromAPI('/front-page-listings');
    } else if (tags) {
      data = await fetchFromAPI('/tags');
    } else if (industries) {
      data = await fetchFromAPI('/industries');
    } else {
      data = await fetchFromAPI('/jobs');
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
