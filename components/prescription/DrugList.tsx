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
  onScroll?: () => void;
  showCheckbox?: boolean;
  checkedMap?: Record<string, boolean>;
  lockedMap?: Record<string, boolean>;
  onCheckChange?: (id: string, checked: boolean) => void;
};

const DrugList = forwardRef<HTMLDivElement, Props>(
  ({ drugs, onScroll, showCheckbox, checkedMap, lockedMap, onCheckChange }, ref) => {
    if (drugs.length === 0) {
      return <div className="text-sm text-gray-400">ไม่พบรายการยา</div>;
    }

    return (
      <div
        ref={ref}
        onScroll={onScroll}
        className="h-full overflow-y-auto pr-2"
      >
        {drugs.map((drug, index) => (
          <Drug 
            key={index} 
            {...drug} 
            showCheckbox={showCheckbox} 
            checked={checkedMap?.[drug.id]} 
            locked={lockedMap?.[drug.id]} 
            onCheckChange={onCheckChange} />
        ))}
      </div>
    );
  }
);

export default DrugList;
