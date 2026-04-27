"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

type DrugProps = {
  id: string;
  item_common_name: string;
  unit: string;
  quantity: number;
  confidence_level?: string;
  showCheckbox?: boolean;
  checked?: boolean;
  locked?: boolean;
  onCheckChange?: (id: string, checked: boolean) => void;
  risk?: boolean;
  description?: boolean;
  match_type?: string;
  onQtyChange?: (id: string, qty: number) => void;
};

export default function Drug({
  id,
  item_common_name,
  unit,
  quantity,
  confidence_level,
  showCheckbox = false,
  checked = false,
  locked = false,
  onCheckChange,
  description,
  match_type,
  onQtyChange,
}: DrugProps) {
  const [qty, setQty] = useState<number | "">(quantity ?? "");
  const [edited, setEdited] = useState(false);

  const colorMap: Record<string, string> = {
    High: "bg-green-50 text-green-700",
    Medium: "bg-yellow-50 text-yellow-700",
    Low: "bg-red-50 text-red-700",
  };

  const match_type_color: Record<string, string> = {
    // MATCHED: "bg-green-50 text-green-700",
    // MISSING: "bg-red-50 text-red-700",
    EXTRA: "bg-red-50 text-red-700",
  };

  return (
    
    <div
      className={`flex items-center justify-between min-h-15 gap-4 px-3 rounded-lg 
        ${match_type ? match_type_color[match_type] : ""}
        ${confidence_level ? colorMap[confidence_level] : ""}
      `}
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
        <div className="font-medium">{item_common_name}</div>
        {confidence_level === "medium" && description &&(
          <p className="text-xs text-yellow-600">ความมั่นใจต่ำ</p>
        )}
        {confidence_level === "low" && description &&(
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
              value={edited ? qty : quantity ?? ""}
              min={0}
              onFocus={(e) => {
                e.target.select();
                setEdited(true);
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setQty(value);
                setEdited(true);
                onQtyChange?.(id, value);
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
