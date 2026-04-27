import { forwardRef } from "react";
import Drug from "./Drug";
import { DetectedDrugInfer, OrderedDrugInfer } from "@/types/detection";

type BaseProps = {
  showCheckbox?: boolean;
  checkedMap?: Record<string, boolean>;
  lockedMap?: Record<string, boolean>;
  onCheckChange?: (id: string, checked: boolean) => void;
  risk?: boolean;
  description?: boolean;
  onQtyChange?: (id: string, qty: number) => void;
};

type Props =
  | (BaseProps & {
      type: "ordered";
      drugs: OrderedDrugInfer[];
    })
  | (BaseProps & {
      type: "detected";
      drugs: DetectedDrugInfer[];
    });

const DrugList = forwardRef<HTMLDivElement, Props>(({ 
    drugs, 
    showCheckbox, 
    checkedMap, 
    lockedMap, 
    onCheckChange,
    description = false,
    type,
    onQtyChange,
}, ref) => {

    if (drugs.length === 0) {
      return (
        <div className="text-sm text-gray-400 p-4 text-center">
          ไม่พบรายการยา
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="h-full overflow-y-auto pr-2"
      >
        {drugs.map((drug, index) => {
          let key: string;

          if (drug.t_order_drug_id) {
            key = drug.t_order_drug_id;
          } else if ("detection_item_id" in drug) {
            key = drug.detection_item_id;
          } else {
            key = `fallback-${index}`;
          }

          return (
            <Drug 
              key={key}
              id={key}
              {...drug}
              showCheckbox={showCheckbox}
              checked={checkedMap?.[key]}
              locked={lockedMap?.[key]}
              onCheckChange={(id, checked) =>
                onCheckChange?.(key, checked)
              }
              description={description}
              match_type={drug.match_type}
              onQtyChange={(id, qty) => onQtyChange?.(key, qty)}            />
          );
        })}
      </div>
    );
  }
);

export default DrugList;
