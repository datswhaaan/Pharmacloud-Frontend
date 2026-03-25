"use client";

import { useRouter } from "next/navigation";
import DropdownButton from "./dropdown/DropdownButton";
import {
  SYSTEM_OPTIONS,
  type System,
} from "@/components/dropdown/dropdown.options";

type Props = {
  currentSystem: System;
}

export default function SystemSelector( { currentSystem} : Props ) {
  const router = useRouter();

  const handleChange = (value: System) => {
    if (value === currentSystem) return;

    const systemPaths: Record<System, string> = {
      pharmacloud: "/prescription",
      drug: "/drugs",
      system3: "/entry",
    };

    router.push(systemPaths[value]);
  };

  return (
    <DropdownButton
      expand
      value={currentSystem}
      options={SYSTEM_OPTIONS}
      onChange={handleChange}
      className="mb-4"
    />
  );
}