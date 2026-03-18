"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DropdownButton from "./dropdown/DropdownButton";
import {
  SYSTEM_OPTIONS,
  type System,
} from "@/components/dropdown/dropdown.options";

export default function SystemSelector() {
  const router = useRouter();
  const [system, setSystem] = useState<System>("pharmacloud");

  const handleChange = (value: System) => {

    if (value === system) return;

    setSystem(value);

    const systemPaths: Record<System, string> = {
      pharmacloud: "/prescription",
      system2: "/entry",
      system3: "/entry",
    };

    router.push(systemPaths[value]);
  };

  return (
    <DropdownButton
      expand
      value={system}
      options={SYSTEM_OPTIONS}
      onChange={handleChange}
      className="mb-4"
    />
  );
}