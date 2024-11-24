'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../contexts/UserContext';

const DashboardNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth0();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userData } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <Image 
                src="/assets/images/logowhite.png" 
                alt="Noctura Logo" 
                width={40} 
                height={40} 
                className="w-[40px] h-[40px]"
              />
              <span className="font-orbitron text-white text-xl font-bold ml-2">Noctura</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/dashboard/settings">
              <div className="p-1 rounded-full transition-colors duration-200 hover:bg-gray-700">
                <IoSettingsOutline className="text-white text-2xl" />
              </div>
            </Link>
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {userData?.profile_picture_url && (
                  <Image
                    src={userData?.profile_picture_url}
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
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
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
