import type { DropdownOption } from "./dropdown.types";

/* ---------- Select view type ---------- */
export type SelectViewType = "front" | "side" | "top";

export const VIEW_TYPE_OPTIONS: DropdownOption<SelectViewType>[] = [
  { label: "ด้านหน้า", value: "front" },
  { label: "ด้านข้าง", value: "side" },
  { label: "ด้านบน", value: "top" },
] as const;

/* ---------- Select lighting ---------- */
export type SelectLighting = "bright" | "dim" ;

export const LIGHTING_OPTIONS: DropdownOption<SelectLighting>[] = [
  { label: "ไฟสว่าง", value: "bright" },
  { label: "ไฟสลัว", value: "dim" },
] as const;

/* ---------- Select position ---------- */
export type SelectPosition = "1" | "2" | "3" | "4";

export const POSITION_OPTIONS: DropdownOption<SelectPosition>[] = [
  { value: "1", label: "ยาเปลือย" },
//   { value: "2", label: "ยาเปลือย" },
  { value: "3", label: "อยู่ในซองยา" },
//   { value: "4", label: "อยู่ในซองยา" },
];