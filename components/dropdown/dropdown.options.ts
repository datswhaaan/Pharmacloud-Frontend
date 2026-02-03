import type { DropdownOption } from "./dropdown.types";

/* ---------- Select method ---------- */
export type SelectMethod = "qr" | "manual";

export const SELECT_METHOD_OPTIONS: DropdownOption<SelectMethod>[] = [
  { value: "qr", label: "สแกนคิวอาร์โค้ด" },
  { value: "manual", label: "เลือกด้วยตัวเอง" },
];

/* ---------- Time range ---------- */
export type TimeRange = "year" | "month" | "day";

export const TIME_RANGE_OPTIONS: DropdownOption<TimeRange>[] = [
  { value: "year", label: "รายปี" },
  { value: "month", label: "รายเดือน" },
  { value: "day", label: "รายวัน" },
];
