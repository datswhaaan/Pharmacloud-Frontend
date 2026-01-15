"use client";
import React from "react";
import * as AiIcons from "react-icons/ai";
import Link from "next/link";
import SideBarItem from "./SideBarItem";
import Profile from "./Profile";

type SideBarProps = {
  isOpen: boolean;
};


export default function SideBar({ isOpen }: SideBarProps) {
  return (
    <nav 
      className={`bg-white h-screen flex flex-col transition-all duration-350 ease-in-out shadow-lg
        ${isOpen ? "w-[16rem]" : "w-0 overflow-hidden border-none"}
      `}
    >
      <img src="logo.svg" alt="PharmaCloud Logo" className="w-40 h-16 object-contain mx-auto my-4" />
      <Profile name="วิวรรณ วรคุณอนันต์" position="เภสัชกร" />
        <div className="border-y border-gray-200 px-0 py-2 my-2 mx-4 justify-start w-fit">
          <SideBarItem route="รายการใบสั่งยา" path="/prescription" />
          <SideBarItem route="ตรวจสอบรายการยา" path="/detection" />
          <SideBarItem route="บัญชียา" path="/drugs" />
          <SideBarItem route="สถิติการตรวจสอบ" path="/statistics" />
        </div>
        <div className=" mx-4 justify-start w-fit">
          <SideBarItem route="ตั้งค่า" path="/settings" />
        </div>

    </nav>
  );
}