"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

type RiskLevel = "green" | "yellow" | "red";

const getRiskLevel = (score: number) => {
  if (score >= 70) return "green";
  if (score >= 50) return "yellow";
  return "red";
};

type DrugProps = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  confidential: number;
  showCheckbox?: boolean;
  checked?: boolean;
  locked?: boolean;
  onCheckChange?: (id: string, checked: boolean) => void;
  risk?: boolean;
  description?: boolean;
};

export default function Drug({
  id,
  name,
  unit,
  quantity,
  confidential,
  showCheckbox = false,
  checked = false,
  locked = false,
  onCheckChange,
  risk,
  description,
}: DrugProps) {
  const [qty, setQty] = useState(quantity);
  const [edited, setEdited] = useState(false);

  const level = getRiskLevel(confidential);
  const isSafe = level === "green";

  const colorMap: Record<RiskLevel, string> = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    
    <div
      className={`flex items-center justify-between min-h-15 gap-4 px-3 rounded-lg ${colorMap[level]}`}
    >
        {showCheckbox && (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) =>
              onCheckChange?.(id, e.target.checked)
            }
            className="w-4 h-4 accent-white"
          />
        )}
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        {!isSafe && getRiskLevel(confidential) === "yellow" && description &&(
          <p className="text-xs text-yellow-600">ความมั่นใจต่ำ</p>
        )}
        {!isSafe && getRiskLevel(confidential) === "red" && description &&(
          <p className="text-xs text-red-600 ">ยาผิด</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        {showCheckbox ? (
          <div className="flex items-center gap-2 w-16">
            <span className="text-right tabular-nums font-medium">
              {qty}
            </span>
            <span className="text-sm">{unit}</span>
          </div>
          
        ) : (
          
          <div className="flex items-center gap-2 w-28">
            <input
              type="number"
              value={edited ? qty : quantity}
              min={0}
              onFocus={(e) => {
                e.target.select();
                setEdited(true);
              }}
              onChange={(e) => {
                setQty(Number(e.target.value));
                setEdited(true);
              }}
              disabled={locked}
              className={cn(
                "w-12 py-1 px-2 text-right border rounded-md transition-colors",
                edited
                  ? "text-gray-700 bg-white border-gray-300"
                  : "text-gray-300 bg-white border-gray-300",
                locked && "cursor-not-allowed bg-gray-100 text-gray-400"
              )}
            />

            <span className="text-sm">{unit}</span>
          </div>
          
        )}
      </div>
    </div>
  );
}
