'use client';

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, router]);

  return <div>Redirecting to login...</div>;
}
