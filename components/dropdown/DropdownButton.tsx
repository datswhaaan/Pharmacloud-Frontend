"use client";

import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { DropdownOption } from "./dropdown.types";

type Props<T extends string> = {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export default function DropdownButton<T extends string>({
  value,
  options,
  onChange,
  className = "",
}: Props<T>) {
  const current = options.find(o => o.value === value);

  return (
    <Dropdown.Root>
      <Button
        className={`group w-62 justify-between ${className}`}
        color="secondary"
        iconTrailing={ChevronDown}
      >
        {current?.label ?? value}
      </Button>

      <Dropdown.Popover>
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