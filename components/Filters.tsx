"use client";

import { useState } from "react";

const severityState = [
  { label: "ทั้งหมด", value: "all" },
  { label: "สูงสุด", value: "high" },
  { label: "สูง", value: "medium" },
  { label: "ปานกลาง", value: "low" },
  { label: "ต่ำ", value: "very-low" },
];

const statusState = [
  { label: "ทั้งหมด", value: "all" },
  { label: "ตรวจสอบสำเร็จ", value: "success" },
  { label: "รอตรวจสอบ", value: "waited" },
  { label: "ยกเลิก", value: "rejected" },
];

export default function Filters() {
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  const baseClass =
    "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2 ring-1 shadow-sm transition";

  const selectedClass =
    "bg-blue-100 text-primary-blue ring-blue-100";

  const unselectedClass =
    "bg-white text-gray-500 ring-secondary hover:bg-gray-50 hover:cursor-pointer";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2">
        <p>ระดับความรุนแรง</p>
        <div>
          {severityState.map((button) => (
            <button
              key={button.value}
              onClick={() => setSeverity(button.value)}
              className={`${baseClass} ${
                severity === button.value
                  ? selectedClass
                  : unselectedClass
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <p>สถานะ</p>
        <div>
          {statusState.map((button) => (
            <button
              key={button.value}
              onClick={() => setStatus(button.value)}
              className={`${baseClass} ${
                status === button.value
                  ? selectedClass
                  : unselectedClass
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
