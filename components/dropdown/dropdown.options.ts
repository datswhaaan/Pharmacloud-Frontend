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

/* ---------- System ---------- */
export type System = "pharmasee" | "pharmacast" | "system3";

export const SYSTEM_OPTIONS: DropdownOption<System>[] = [
  { value: "pharmasee", label: "PharmaSee" },
  { value: "pharmacast", label: "PharmaCast" },
  { value: "system3", label: "System3" },
];


/* ---------- Drug error ---------- */
export type DrugError = "WRONG_DRUG_NAME" | "WRONG_STRENGTH" | "WRONG_QUANTITY" | "WRONG_FORM";

export const DRUG_ERROR_OPTIONS: DropdownOption<DrugError>[] = [
  { value: "WRONG_DRUG_NAME", label: "ผิดชื่อยา" },
  { value: "WRONG_STRENGTH", label: "ผิดขนาดยา" },
  { value: "WRONG_QUANTITY", label: "ผิดจำนวน" },
  { value: "WRONG_FORM", label: "ผิดรูปแบบ" }
];