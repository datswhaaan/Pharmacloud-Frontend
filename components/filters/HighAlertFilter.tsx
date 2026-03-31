import { useState, useRef, useEffect } from "react";
import { FilterLines } from "@untitledui/icons";

interface HighAlertFilterProps {
  highAlert: boolean;
  setHighAlert: (value: boolean) => void;
}

export default function HighAlertFilter({
  highAlert,
  setHighAlert,
}: HighAlertFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ปิดเมื่อคลิกนอก
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
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-sm ring-1 ring-black/5 p-3 z-10">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={highAlert}
              onChange={(e) => setHighAlert(e.target.checked)}
            />
            ยาเสี่ยงสูง
          </label>
        </div>
      )}
    </div>
  );
}