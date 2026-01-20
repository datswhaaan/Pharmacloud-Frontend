import { clsx, type ClassValue } from "clsx";
import { cx } from "./cx";

/**
 * cn = classNames helper for JSX
 * - รองรับ string | boolean | array | object
 * - merge class Tailwind ที่ชนกัน
 *
 * ใช้ใน component JSX เป็นหลัก
 */
export function cn(...inputs: ClassValue[]) {
  return cx(clsx(inputs));
}
