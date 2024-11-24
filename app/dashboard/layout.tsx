'use client';

import React, { Suspense } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardSkeletonLoader from '../components/DashboardSkeletonLoader';
import { UserProvider } from '../contexts/UserContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="flex min-h-screen bg-gray-900">
        <aside className="w-64 flex-shrink-0 bg-gray-800">
          <DashboardSidebar />
        </aside>
        <div className="flex flex-col flex-grow">
          <main className="flex-grow overflow-x-hidden overflow-y-auto bg-gray-800">
            <div className="container mx-auto px-6 py-8">
              <Suspense fallback={<DashboardSkeletonLoader />}>
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
