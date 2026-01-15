"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import * as FaIcons from "react-icons/fa";
import { usePathname } from "next/navigation";

type Props = {
  onOpenLeft: () => void;
};

const pageTitleMap: Record<string, string> = {
  "/": "หน้าหลัก",
  "/dashboard": "แดชบอร์ด",
  "/dashboard/settings": "ตั้งค่า",
  "/camera": "ถ่ายภาพ",
};

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full ">

      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <div className="w-64">
              <SideBar isOpen={isOpen} />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-primary-gray min-w-0 transition-all duration-300">
          <nav className="fixed h-16 w-full bg-primary-gray flex items-center px-6 z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 hover:bg-zinc-100 rounded-lg"
            >
              <FaIcons.FaBars size={20} className="text-blue-500" />
            </button>
            <span className="ml-4 text-xl font-bold text-blue-500">ตรวจสอบรายการยา</span>
          </nav>
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}