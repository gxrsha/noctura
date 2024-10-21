'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <body className={`font-roboto bg-background text-primary flex flex-col ${isDashboard ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {isDashboard ? <DashboardNavbar /> : <Navbar />}
      <main className={`flex-grow ${isDashboard ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </body>
  );
}
