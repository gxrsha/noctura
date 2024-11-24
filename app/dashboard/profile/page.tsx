'use client';

import React from 'react';
import { useUser } from '@/app/contexts/UserContext';

export default function Profile() {
  const { userData, loading } = useUser();

  if (loading) {
    return <div className="text-white">Loading user data...</div>;
  }

  if (!userData) {
    return <div className="text-white">No user data available.</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>AI Agent Enabled:</strong> {userData.ai_agent_enabled ? 'Yes' : 'No'}</p>
        {userData.profile_picture_url && (
          <img 
            src={userData.profile_picture_url} 
            alt="Profile Picture" 
            className="mt-4 rounded-full w-24 h-24"
          />
        )}
      </div>
    </div>
  );
}
