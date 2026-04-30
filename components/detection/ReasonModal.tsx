import Card from "../Card";
import { Button } from "../base/buttons/button";
import DropdownButton from "../dropdown/DropdownButton";
import { DRUG_ERROR_OPTIONS, type DrugError } from "../dropdown/dropdown.options";

type ReasonModalProps = {
    open: boolean;
    drugs: any[];
    reasonMap: Record<string, DrugError>;
    onChange: (id: string, value: DrugError) => void;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ReasonModal({
    open,
    drugs,
    reasonMap,
    onChange,
    onClose,
    onConfirm
}: ReasonModalProps) {
    if (!open) return null;

    const isValid = drugs.every(
        (drug) => reasonMap[drug.detection_item_id]
    );

    return (
        <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center">
            <Card className="mx-30">
                <h2 className="text-lg font-semibold mb-4">กรุณาระบุเหตุผล</h2>

                {drugs.map((drug) => (
                    <div key={drug.detection_item_id} className="mb-3">
                        <p className="text-sm">{drug.item_common_name}</p>

                        <DropdownButton
                            expand
                            placeholder="เลือกรูปแบบความผิดพลาด"
                            value={reasonMap[drug.detection_item_id] as DrugError}
                            options={DRUG_ERROR_OPTIONS}
                            onChange={(value) =>
                                onChange(drug.detection_item_id, value)
                            }
                            className="mb-4"
                        />
                    </div>
                ))}

                <div className="flex justify-end gap-2 mt-4">
                    {/* <button onClick={onClose}>ยกเลิก</button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 disabled:opacity-50"
                        disabled={!isValid}
                        onClick={onConfirm}
                    >
                        ยืนยัน
                    </button>
                     */}
                    <Button 
                        className="bg-green-500 text-white hover:bg-green-600"
                        disabled={!isValid}
                        onClick={onConfirm}
                    >
                        <div className="flex items-center gap-2">
                            <p className="font-medium">ยืนยัน</p>
                        </div>
                    </Button>
                    <Button
                        className="bg-primary-gray border border-gray-500 text-gray-500 hover:bg-gray-100" 
                        onClick={onClose}
                    >
                        <div className="flex items-center gap-2">
                        <p className="font-medium">ยกเลิก</p>
                        </div>
                    </Button>
                </div>
            </Card>
        </div>
    );
}