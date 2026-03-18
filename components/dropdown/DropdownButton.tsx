"use client";

import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { DropdownOption } from "./dropdown.types";
import { useLayoutEffect, useRef, useState } from "react";

type Props<T extends string> = {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  expand?: boolean;
};

export default function DropdownButton<T extends string>({
  value,
  options,
  onChange,
  className = "",
  expand = false,
}: Props<T>) {
  const current = options.find(o => o.value === value);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useLayoutEffect(() => {
      if (triggerRef.current) {
          setTriggerWidth(triggerRef.current.offsetWidth);
      }
  }, []);

  return (
    <Dropdown.Root>
      <Button
        ref={triggerRef} 
        className={`group justify-between ${className} ${expand ? "w-full" : "w-62"}`}
        color="secondary"
        iconTrailing={ChevronDown}
      >
        {current?.label ?? value}
      </Button>

      <Dropdown.Popover 
        style={{ width: triggerWidth }} 
        fullWidth={expand}
      >
        <Dropdown.Menu>
          <Dropdown.Section>
            {options.map((opt) => (
              <Dropdown.Item
                key={opt.value}
                onClick={() => onChange(opt.value)}
              >
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}