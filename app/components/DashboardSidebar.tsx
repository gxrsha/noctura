import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard, MdOutlinePerson } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { IoIosSearch, IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";






const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-48 bg-black text-[#ACACBE] flex flex-col min-h-full">
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xs font-semibold">Dashboard</h2>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className={`flex items-center p-2 rounded ${isActive('/dashboard') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <MdOutlineDashboard className="text-lg mr-2" />
              <span className="text-xs">Overview</span>
            </Link>
            <Link href="/dashboard/profile" className={`flex items-center p-2 rounded ${isActive('/dashboard/profile') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <MdOutlinePerson className="text-lg mr-2" />
              <span className="text-xs">Your profile</span>
            </Link>
            <Link href="/dashboard/ai" className={`flex items-center p-2 rounded ${isActive('/dashboard/ai') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <RiRobot2Line className="text-lg mr-2" />
              <span className="text-xs">Noctura AI</span>
            </Link>
            <Link href="/dashboard/applied-jobs" className={`flex items-center p-2 rounded ${isActive('/dashboard/applied-jobs') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <TiBusinessCard className="text-lg mr-2" />
              <span className="text-xs">Applied jobs</span>
            </Link>
            <Link href="/dashboard/billing" className={`flex items-center p-2 rounded ${isActive('/dashboard/billing') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <FaRegCreditCard className="text-lg mr-2" />
              <span className="text-xs">Billing</span>
            </Link>
            <Link href="/dashboard/search" className={`flex items-center p-2 rounded ${isActive('/dashboard/search') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <IoIosSearch className="text-lg mr-2" />
              <span className="text-xs">Search Jobs</span>
            </Link>
            <Link href="/dashboard/settings" className={`flex items-center p-2 rounded ${isActive('/dashboard/settings') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <IoSettingsOutline className="text-lg mr-2" />
              <span className="text-xs">Settings</span>
            </Link>
            <Link href="/dashboard/help" className={`flex items-center p-2 rounded ${isActive('/dashboard/help') ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <IoMdHelpCircleOutline className="text-lg mr-2" />
              <span className="text-xs">Help</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
