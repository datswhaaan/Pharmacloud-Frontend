import { forwardRef } from "react";
import Drug from "./Drug";

type DrugItem = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  confidential: number;
};

type Props = {
  drugs: DrugItem[];
  showCheckbox?: boolean;
  checkedMap?: Record<string, boolean>;
  lockedMap?: Record<string, boolean>;
  onCheckChange?: (id: string, checked: boolean) => void;
  risk?: boolean;
};

const getRiskLevel = (score: number) => {
  if (score >= 70) return "green";
  if (score >= 50) return "yellow";
  return "red";
};

const DrugList = forwardRef<HTMLDivElement, Props>(
  ({ drugs, showCheckbox, checkedMap, lockedMap, onCheckChange, risk }, ref) => {
    const displayedDrugs = drugs.filter(drug => {
      const level = getRiskLevel(drug.confidential);
      
      if (risk) {
        // ถ้า risk=true: เอาเฉพาะสีแดง (red)
        return level === "red";
      } else {
        // ถ้า risk=false: เอาทุกอันที่ไม่ใช่สีแดง (green, yellow)
        return level !== "red";
      }
    });

    // แสดงผล "ไม่พบรายการ" ตามผลลัพธ์ที่กรองแล้ว
    if (displayedDrugs.length === 0) {
      return (
        <div className="text-sm text-gray-400 p-4 text-center">
          {risk ? "ไม่พบรายการยาที่ผิดพลาด" : "ไม่มีรายการยาที่ตรวจสอบแล้ว"}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="h-full overflow-y-auto pr-2"
      >
        {displayedDrugs.map((drug, index) => (
          <Drug 
            key={drug.id || index} 
            {...drug} 
            showCheckbox={showCheckbox} 
            checked={checkedMap?.[drug.id]} 
            locked={lockedMap?.[drug.id]} 
            onCheckChange={onCheckChange} 
            />
        ))}
      </div>
    );
  }
);

export default DrugList;
