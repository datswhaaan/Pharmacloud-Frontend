"use client";

const statusState = [
  { label: "ทั้งหมด", value: "all" },
  { label: "ตรวจสอบสำเร็จ", value: "completed" },
  { label: "รอตรวจสอบ", value: "waiting" },
  { label: "ยกเลิก", value: "cancelled" },
];

interface FiltersProps {
  status: string;
  setStatus: (status: string) => void;
}

export default function Filters({
  status,
  setStatus
} : FiltersProps) {

  const baseClass =
    "inline-flex items-center justify-center rounded-full px-3 pt-2 pb-1 text-sm font-medium ring-1 shadow-sm transition";

  const selectedClass =
    "bg-blue-100 text-primary-blue ring-blue-100";

  const unselectedClass =
    "bg-white text-gray-500 ring-secondary hover:bg-gray-50 hover:cursor-pointer";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <p>สถานะ</p>
        <div className="flex items-center gap-2">
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
