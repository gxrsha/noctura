export const auth0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '',
};
