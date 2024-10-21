'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userData } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
      appState: {
        returnTo: '/dashboard'
      }
    });
  };

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: {
        returnTo: '/dashboard'
      }
    });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setIsDropdownOpen(false);
  };

  console.log('current user', user);

  return (
    <nav className={`bg-black shadow-md sticky top-0 z-50 transition-all duration-300 ${isSticky ? 'bg-opacity-90' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/assets/images/logowhite.png" 
                alt="Noctura Logo" 
                width={70} 
                height={70} 
                className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
              />
              <span className="font-orbitron text-white text-xl md:text-2xl font-bold">Noctura</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                 {userData?.picture && <Image
                    src={userData?.picture}
                    alt="User Avatar"
                    width={30}
                    height={30}
                      className="rounded-full"
                    />}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="font-medium text-gray-800 text-sm">{userData?.name}</div>
                      <div className="text-xs text-gray-500">{userData?.email}</div>
                    </div>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your dashboard
                    </Link>
                    <a href="https://openai.com/policies" target="_blank" rel="noreferrer noopener" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Terms & policies
                    </a>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-white text-sm hover:text-accent transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="text-sm text-background px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
            {!user && (
              <Link href="/post-job" className="bg-accent text-sm text-background px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                Post Job
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Dashboard</Link>
                <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Home</Link>
                <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">About</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Login</button>
                <button onClick={handleSignUp} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Sign Up</button>
              </>
            )}
            <Link href="/post-job" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-accent hover:bg-gray-700">Post Job</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
