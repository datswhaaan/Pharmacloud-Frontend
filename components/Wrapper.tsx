"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import * as FaIcons from "react-icons/fa";
import { usePathname } from "next/navigation";

type Props = {
  onOpenLeft: () => void;
};

function getPageTitle(pathname: string) {
  if (pageTitleMap[pathname]) return pageTitleMap[pathname];

  // match แบบ prefix
  const match = Object.keys(pageTitleMap)
    .sort((a, b) => b.length - a.length) // เอาที่ยาวสุดก่อน
    .find((path) => pathname.startsWith(path));

  return match ? pageTitleMap[match] : "หน้าหลัก";
}

const pageTitleMap: Record<string, string> = {
  "/prescription": "รายการใบสั่งยา",
  "/detection": "ตรวจสอบรายการยา",
  "/drugs": "บัญชียา",
  "/statistics": "สถิติการตรวจสอบ",
  "/settings": "ตั้งค่า",
};

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  const pageTitle = getPageTitle(pathname);
  
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full ">

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`
            fixed top-0 left-0 h-screen w-64 bg-white z-40
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <SideBar isOpen={isOpen} />
        </aside>
        <main 
          className={`
            flex-1 overflow-y-auto bg-primary-gray min-w-0
            transition-all duration-300
            ${isOpen ? "ml-64" : "ml-0"}
          `}
        >
          <nav className="fixed h-16 w-full bg-primary-gray flex items-center px-6 z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 hover:bg-zinc-100 rounded-lg"
            >
              <FaIcons.FaBars size={20} className="text-blue-500" />
            </button>
            <h1 className="ml-1 text-blue-500">{pageTitle}</h1>
          </nav>
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}