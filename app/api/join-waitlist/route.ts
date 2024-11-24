import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://remote-dork-ccefeca406ae.herokuapp.com';
const API_KEY = process.env.REMOTE_DORKS_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const tags = formData.getAll('tags');

    if (!email || !tags || tags.length === 0) {
      return NextResponse.json(
        { message: 'Email and at least one tag are required' },
        { status: 400 }
      );
    }

    // Create a new FormData object for the API request
    const apiFormData = new FormData();
    apiFormData.append('email', email.toString());
    tags.forEach(tag => {
      apiFormData.append('tags', tag.toString());
    });

    const response = await fetch(`${API_URL}/join-waitlist`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY || '',
      },
      // Send the FormData directly
      body: apiFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Failed to join waitlist';
      
      if (typeof data.detail === 'object' && data.detail.msg) {
        errorMessage = data.detail.msg;
      } else if (typeof data.detail === 'string') {
        errorMessage = data.detail;
      }

      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 