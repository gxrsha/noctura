import { NextResponse } from 'next/server';

const API_URL = 'https://remote-dork-ccefeca406ae.herokuapp.com';
const API_KEY = process.env.REMOTE_DORKS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/similar-jobs/${id}`, {
      headers: {
        'X-API-Key': `${API_KEY}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch similar jobs');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching similar jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch similar jobs' }, { status: 500 });
  }
}
