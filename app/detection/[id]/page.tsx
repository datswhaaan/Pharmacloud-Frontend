"use client";
import Card from "@/components/Card";
import WebcamDisplay, { WebcamCaptureHandle } from "@/components/WebcamDisplay";
import { Button } from "@/components/base/buttons/button";
import PrescriptionInfo from "@/components/PrescriptionInfo";
import DrugList from "@/components/detection/DrugList";
import WebcamSelector from "@/components/WebcamSelector";
import { useRef, useState, useEffect } from "react";
import { fetchPrescriptionDetail } from "@/lib/api/prescription";
import { updateDetectionResult, inferDetectionResult } from "@/lib/api/detection";
import { useParams, useRouter } from "next/navigation";
import { DetectionInferResult} from "@/types/detection";

export default function Detection() {
  const router = useRouter();
  const { id } = useParams();
  const [deviceId, setDeviceId] = useState<string>();
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const webcamRef = useRef<WebcamCaptureHandle>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionInferResult | null>(null);
  const [checkedDrugs, setCheckedDrugs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    detectionResult?.ordered_drugs?.forEach((drug) => {
      if (drug.match_type === "MATCHED") {
        initial[drug.t_order_drug_id] = true;
      }
    });
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [matchedQtyMap, setMatchedQtyMap] = useState<Record<string, number>>({});
  const [extraQtyMap, setExtraQtyMap] = useState<Record<string, number>>({});
  
  useEffect(() => {
      if (!id) return;

      fetchPrescriptionDetail(String(id))
      .then(setPrescriptionData)
      .catch(console.error);
  }, [id]);

  const handleCapture = async (file: File) => {
    if (!id || typeof id !== "string") return;
    setLoading(true)
    try{
      const res = await inferDetectionResult({
        order_id: id,
        image: file,
      });
      setDetectionResult(res);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!detectionResult) return;

    setCheckedDrugs((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      const initial: Record<string, boolean> = {};

      detectionResult.ordered_drugs.forEach((drug) => {
        if (drug.match_type === "MATCHED") {
          initial[drug.t_order_drug_id] = true;
        }
      });

      return initial;
    });
  }, [detectionResult]);

  const orderToDetectionMap: Record<string, string> = {};

  detectionResult?.drug_list.forEach((drug) => {
    if (drug.t_order_drug_id) {
      orderToDetectionMap[drug.t_order_drug_id] = drug.detection_item_id;
    }
  });

  const buildPayload = () => {
    if (!detectionResult) return [];

    const result: any[] = [];

    //MATCHED (ฝั่งขวา)
    detectionResult.drug_list.forEach((drug) => {
      if (drug.match_type === "MATCHED") {
        result.push({
          detection_item_id: drug.detection_item_id,
          quantity: matchedQtyMap[drug.t_order_drug_id] ?? drug.quantity ?? 0,
          is_checked: !!checkedDrugs[drug.t_order_drug_id],
        });
      }
    });

    //EXTRA
    detectionResult.drug_list.forEach((drug) => {
      if (drug.match_type === "EXTRA") {
        result.push({
          detection_item_id: drug.detection_item_id,
          quantity: extraQtyMap[drug.detection_item_id] ?? drug.quantity ?? 0,
          is_checked: false,
        });
      }
    });

    return result;
  };

  const handleSubmit = async (status: "approved" | "rejected") => {
    if (!detectionResult) return;

    try {
      const payload = buildPayload();

      await updateDetectionResult({
        detection_id: detectionResult.detection_id,
        status,
        verified_by: "EMP001",
        drug_list: payload,
      });

    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-between">

      <PrescriptionInfo prescriptionData={prescriptionData} type="detection"/>

      <div className="flex gap-2 w-full h-full min-h-0">
        
        <div className="flex flex-col gap-2 h-full w-fit">

              <WebcamDisplay
                ref={webcamRef}
                deviceId={deviceId}
                className="aspect-3/4 h-full min-h-0"
                onCapture={(file) => {
                  console.log("Captured file: ", file);
                  handleCapture(file);
                }}
              />

              <WebcamDisplay
                deviceId={deviceId}
                className="aspect-3/4 h-full min-h-0"
              />

        </div>

        <Card title="ผลการตรวจสอบ" className="flex flex-col min-h-0" scrollable>

          {/* container ของ 2 drug lists */}
          <div className="flex gap-2 flex-1 min-h-0 pb-5 border-b">

            {/* ซ้าย */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>รายการยาในใบสั่งยา</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={detectionResult?.ordered_drugs?.filter(
                    (d) => d.match_type === "MATCHED"
                  ) || []}
                  showCheckbox
                  checkedMap={checkedDrugs}
                  onCheckChange={(id, checked) =>
                    setCheckedDrugs((prev) => ({ ...prev, [id]: checked }))
                  }
                  type="ordered"
                />
              </div>
            </div>

            {/* ขวา */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>ยาที่ตรวจพบ</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={detectionResult?.drug_list?.filter(
                    (d) => d.match_type === "MATCHED"
                  ) || []}
                  lockedMap={checkedDrugs}
                  description
                  type="detected"
                  onQtyChange={(id, qty) => {
                    setMatchedQtyMap((prev) => ({
                      ...prev,
                      [id]: qty,
                    }));
                  }}
                />
              </div>
            </div>

          </div>
          
          {/* container ของ 2 drug lists */}
          <div className="flex gap-2 flex-1 min-h-0 pt-5">

            {/* ซ้าย */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>รายการยาที่ไม่ตรวจพบ</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={detectionResult?.ordered_drugs?.filter(
                    (d) => d.match_type === "MISSING"
                  ) || []}
                  showCheckbox
                  checkedMap={checkedDrugs}
                  onCheckChange={(id, checked) =>
                    setCheckedDrugs((prev) => ({ ...prev, [id]: checked }))
                  }
                  type="ordered"
                />
              </div>
            </div>

            {/* ขวา */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>ยาที่ตรวจพบนอกเหนือจากใบสั่งยา</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={detectionResult?.drug_list?.filter(
                    (d) => d.match_type === "EXTRA"
                  ) || []}
                  lockedMap={checkedDrugs}
                  description
                  type="detected"
                  onQtyChange={(id, qty) => {
                    setExtraQtyMap((prev) => ({
                      ...prev,
                      [id]: qty,
                    }));
                  }}
                />
              </div>
            </div>

          </div>
        </Card>

      </div>

      <div className="flex w-full justify-between">
        
        <div className="flex gap-2">
          <WebcamSelector onSelect={setDeviceId} />
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600" 
            onClick={() => {
              webcamRef.current?.reset();
              setTimeout(() => webcamRef.current?.capture(), 200);
            }}
          >
            <div className="flex items-center gap-2">
              <img src="/redo.svg" className=""/>
              <p className="font-medium">ถ่ายใหม่</p>
            </div>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            className="bg-green-500 text-white hover:bg-green-600" 
            onClick={() => {
              handleSubmit("approved");
            }}
          >
            <div className="flex items-center gap-2">
              <img src="/confirm.svg" className=""/>
              <p className="font-medium">ยืนยัน</p>
            </div>
          </Button>
          <Button 
            className="bg-red-500 text-white hover:bg-red-600" 
            onClick={() => {
              handleSubmit("rejected");
              router.push("/detection"); 
            }}
          >
            <div className="flex items-center gap-2">
              <img src="/cancel.svg" className=""/>
              <p className="font-medium">ปฎิเสธ</p>
            </div>
          </Button>
          <Button
            className="bg-primary-gray border border-red-500 text-red-500 hover:bg-red-100" 
            onClick={() => {
              router.push("/detection"); 
            }}
          >
            <div className="flex items-center gap-2">
              <p className="font-medium">ยกเลิก</p>
            </div>
          </Button>
        </div>
      </div>

    </div> 
  );
}