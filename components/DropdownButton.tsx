"use client"

import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DropdownButton({ value, onChange }: Props) {
  
    return (
        <Dropdown.Root>
            <Button className="group w-62 justify-between" color="secondary" iconTrailing={ChevronDown}>
                {value}
            </Button>
 
        <Dropdown.Popover>
            <Dropdown.Menu>
                <Dropdown.Section>
                    <Dropdown.Item onClick={() => onChange("สแกนคิวอาร์โค้ด")}>
                        สแกนคิวอาร์โค้ด
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => onChange("เลือกด้วยตัวเอง")}>
                        เลือกด้วยตัวเอง
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
)}