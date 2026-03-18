"use client";
import React from "react";
import * as AiIcons from "react-icons/ai";
import Link from "next/link";
import SideBarItem from "./SideBarItem";
import Profile from "./Profile";

import { File05, Edit05, BookOpen01, BarChart12, Settings01, HelpCircle, LogOut03 } from "@untitledui/icons";

type SideBarProps = {
  isOpen: boolean;
};


export default function SideBar({ isOpen }: SideBarProps) {
  return (
    <nav 
      className={`bg-white h-screen flex flex-col transition-all duration-350 ease-in-out shadow-lg items-center pt-0 p-5 justify-between 
        ${isOpen ? "w-64" : "w-0 overflow-hidden border-none"}
      `}
    >
      <div className="w-full">
        <img src="/logoName.svg" alt="PharmaCloud Logo" className="w-full h-16 object-contain mx-auto my-4" />

        <Profile name="วิวรรณ วรคุณอนันต์" position="เภสัชกร" />
        <div className="flex flex-col border-t border-gray-200 py-2 my-2 justify-center w-ful gap-2">
          <SideBarItem route="รายการใบสั่งยา" path="/prescription" Icon={File05}/>
          <SideBarItem route="ตรวจสอบรายการยา" path="/detection" Icon={Edit05}/>
          <SideBarItem route="บัญชียา" path="/drugs" Icon={BookOpen01}/>
          <SideBarItem route="สถิติการตรวจสอบ" path="/statistics" Icon={BarChart12}/>
        </div>

        {/* <div className="justify-center w-full">
          <SideBarItem route="ตั้งค่า" path="/settings" Icon={Settings01}/>
        </div> */}
      </div>

      <div className="justify-center w-full">
        <SideBarItem 
          activeStyle="fixed"
          route="ช่วยเหลือ" 
          path="/help"
          Icon={HelpCircle}
          variant="muted"
        />
        <SideBarItem 
          activeStyle="fixed"
          route="ออกจากระบบ" 
          path="/" 
          Icon={LogOut03}
          variant="destructive"
        />
      </div>
    </nav>
  );
}