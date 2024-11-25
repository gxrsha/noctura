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


  return (
    <nav className={`bg-black shadow-md sticky top-0 z-50 transition-all duration-300 ${isSticky ? 'bg-opacity-90' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center">
            {/* Commented out authentication buttons */}
            {/* {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                // ... existing dropdown code
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
            )} */}
            
            {/* Post Job button - always visible */}
            <Link 
              href="/post-job" 
              className="bg-accent text-sm text-background px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Post Job
            </Link>
          </div>
          
          {/* Mobile menu button */}
          {/* <div className="flex items-center md:hidden">
            // ... existing mobile menu button code
          </div> */}
        </div>
      </div>
      
      {/* Mobile menu */}
      {/* {isMenuOpen && (
        // ... existing mobile menu code
      )} */}
    </nav>
  );
};

export default Navbar;
