"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import DetectionIcon from "./icons/Detection";
import PrescriptionIcon from "./icons/Prescription";
import DrugListIcon from "./icons/Drugs";
import StatisticsIcon from "./icons/Statistics";
import SettingsIcon from "./icons/Settings";


const iconMap: Record<string, React.ReactNode> = {
  "/detection": <DetectionIcon />,
  "/prescription": <PrescriptionIcon />,
  "/drugs": <DrugListIcon />,
  "/statistics": <StatisticsIcon />,
  "/settings": <SettingsIcon />,
};

export default function SideBarItem({
  route,
  path,
}: {
  route: string;
  path: string;
}) {
  const Icon = iconMap[path];
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div
        className={`w-full flex items-center gap-3 px-5 py-3 mx-3 text-sm text-black rounded-lg
                   hover:bg-gray-200 cursor-pointer
                   ${isActive ? 'bg-blue-100' : ''}`}
      >
        {Icon && <span className={isActive ? "text-blue-700" : "text-black"}>{Icon}</span>}
        <span className={isActive ? "text-blue-700" : "text-black"}>{route}</span>
      </div>
    </Link>
  );
}
