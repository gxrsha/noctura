import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const API_URL = 'https://remote-dork-ccefeca406ae.herokuapp.com';
const API_KEY = process.env.REMOTE_DORKS_API_KEY;
const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.decode(token, { complete: true });
    // console.log('Decoded token:', decodedToken);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const response = await fetch(`${API_URL}/user`, {
      headers: {
        'X-API-Key': `${API_KEY}`,
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'An error occurred while fetching user data');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
