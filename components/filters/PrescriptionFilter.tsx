import { useState, useRef, useEffect } from "react";
import { FilterLines } from "@untitledui/icons";

interface PrescriptionFilterProps {
  startTime: string;
  endTime: string;
  order: string;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
  setOrder: (value: string) => void;
}

export default function PrescriptionFilter({
  startTime,
  endTime,
  order,
  setStartTime,
  setEndTime,
  setOrder,
}: PrescriptionFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* ปุ่ม */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-md ring-1 ring-secondary shadow-sm
                   bg-white px-3 py-2 text-sm font-medium
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FilterLines className="h-4 w-4 text-gray-500" />
        <span className="text-gray-500">กรอง</span>
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-sm ring-1 ring-black/5 p-4 z-10 flex flex-col gap-4">
          
          {/* Date Range */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">ช่วงวันที่</span>
            <div className="flex items-center justify-between gap-2 w-full">
                <span className="font-medium text-gray-700">เริ่ม:</span>
                <input
                type="date"
                value={startTime}
                max={endTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                />
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
                <span className="font-medium text-gray-700">ถึง:</span>
                <input
                type="date"
                value={endTime}
                min={startTime} 
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                />
            </div>
          </div>

          {/* Order */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">เรียงลำดับ</span>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="desc">ใหม่ → เก่า</option>
              <option value="asc">เก่า → ใหม่</option>
            </select>
          </div>

          {/* ปุ่มล้างค่า */}
          <button
            onClick={() => {
              setStartTime("");
              setEndTime("");
              setOrder("desc");
            }}
            className="text-sm text-red-500 hover:underline"
          >
            ล้างค่า
          </button>
        </div>
      )}
    </div>
  );
}