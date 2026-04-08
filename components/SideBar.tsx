"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SideBarItem from "./SideBarItem";
import Profile from "./Profile";
import { File05, Edit05, BookOpen01, BarChart12, HelpCircle, LogOut03 } from "@untitledui/icons";
import SystemSelector from "./SystemSelector";
import { System } from "@/components/dropdown/dropdown.options";
import { useAuth } from "@/providers/auth-provider";
import { logout } from "@/lib/api/auth";

type SideBarProps = {
  isOpen: boolean;
};

const MENU_CONFIG: Record<System, { route: string; path: string; Icon: React.FC<any> }[]> = {
  pharmasee: [
    { route: "รายการใบสั่งยา", path: "/prescription", Icon: File05 },
    { route: "ตรวจสอบรายการยา", path: "/detection", Icon: Edit05 },
    { route: "สถิติการตรวจสอบ", path: "/statistics", Icon: BarChart12 },
  ],
  pharmacast: [
    { route: "บัญชียา", path: "/drugs", Icon: BookOpen01 },
  ],
  system3: [],
};

export default function SideBar({ isOpen }: SideBarProps) {
  const pathname = usePathname();
  const system: System = pathname.startsWith("/drugs") 
    ? "pharmacast" 
    : pathname.startsWith("/entry") 
    ? "system3" 
    : "pharmasee";

  const currentMenu = MENU_CONFIG[system];
  const user = useAuth()

  const { setUser } = useAuth();
  
  const handleLogout = async () => {
    await logout()

    setUser(null);
    localStorage.removeItem("token");
  }
  
  return (
    <nav 
      className={`bg-white h-screen flex flex-col transition-all duration-350 ease-in-out shadow-lg items-center pt-0 p-5 justify-between 
        ${isOpen ? "w-64" : "w-0 overflow-hidden border-none"}
      `}
    >
      <div className="w-full">
        <div className="flex flex-col mb-4">
          <div className="flex w-full mx-auto my-4 gap-4 justify-center items-center">
            <img src={`/logo/logo.svg`} alt="System Logo" className="h-8 object-contain" />
            <img src={`/logo/${system}.svg`} alt="System Logo" className="h-6 object-contain" />
          </div>
          <SystemSelector currentSystem={system}/>
        </div>

        {user.user ? 
        <Profile name={user.user?.firstname + " " + user.user?.lastname} position={user.user.authentication} /> :
        <Profile name="ชื่อ-นามสกุล" position="เภสัชกร" />}
        
        <div className="flex flex-col border-t border-gray-200 py-2 justify-center w-full gap-2">
          {currentMenu.map((item) => (
            <SideBarItem 
              key={item.path} 
              route={item.route} 
              path={item.path} 
              Icon={item.Icon} 
            />
          ))}
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
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
}