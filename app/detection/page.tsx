"use client";
import Card from "@/components/Card";
import WebcamDisplay, { WebcamCaptureHandle } from "@/components/WebcamDisplay";
import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import DrugList from "@/components/prescription/DrugList";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import WebcamSelector from "@/components/WebcamSelector";
import { useRef, useState } from "react";

const drugData = [
  {
    id: "d2",
    name: "Amoxicillin",
    quantity: 21,
    unit: "แคปซูล",
    confidential: 100,
  },
  {
    id: "d3",
    name: "Loratadine",
    quantity: 10,
    unit: "เม็ด",
    confidential: 65,
  },
  {
    id: "d4",
    name: "Metformin",
    quantity: 60,
    unit: "เม็ด",
    confidential: 65,
  },
  {
    id: "d5",
    name: "Amlodipine",
    quantity: 30,
    unit: "เม็ด",
    confidential: 1,
  },
];

export default function Detection() {
  const [deviceId, setDeviceId] = useState<string>();
  const webcamRef = useRef<WebcamCaptureHandle>(null);
  const [checkedDrugs, setCheckedDrugs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    drugData.forEach((drug) => {
      if (drug.confidential >= 70) {
        initial[drug.id] = true;
      }
    });
    return initial;
  });
  
  return (
    <div className="flex flex-col bg-primary-gray gap-4 pt-16 px-16 py-6 h-screen items-center justify-between">
      <Card>
        <InfoCard />
      </Card>
      <ScrollSync>
        <div className="flex flex-col gap-2 justify-between w-full  min-h-0">
          <div className="flex gap-2 w-full flex-1 min-h-0">
            <div className="aspect-4/3">
              <WebcamDisplay ref={webcamRef} deviceId={deviceId} onCapture={(img) => console.log("Captured:", img)}/>
            </div>
              <Card title="ใบสั่งยา" className="flex-1  min-h-0" >
                <ScrollSyncPane
                  group={[
                    'default'
                  ]}
                >
                  <DrugList 
                    drugs={drugData} 
                    showCheckbox={true}
                    checkedMap={checkedDrugs}
                    onCheckChange={(id, checked) =>
                      setCheckedDrugs((prev) => ({ ...prev, [id]: checked }))
                    } />
                </ScrollSyncPane>
              </Card>
          </div>

          <div className="flex gap-2 w-full flex-1 min-h-0">
            <div className="aspect-4/3">
              <WebcamDisplay deviceId={deviceId}/>
            </div>
              <Card title="ตรวจพบ" className="flex-1  min-h-0" >
                <ScrollSyncPane
                  group={[
                    'default'
                  ]}
                >
                  <DrugList
                    drugs={drugData}
                    lockedMap={checkedDrugs} 
                  />
                </ScrollSyncPane>
              </Card>
          </div>
        </div>
      </ScrollSync>

      <div className="flex w-full justify-between">
        
        <div className="flex gap-2">
          <WebcamSelector onSelect={setDeviceId} />
          <Button logo="redo.svg" text="ถ่ายใหม่" 
            className="bg-blue-500 text-white hover:bg-blue-600" 
            onClick={() => {
              webcamRef.current?.reset();
              setTimeout(() => webcamRef.current?.capture(), 200);
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button logo="confirm.svg" text="ยืนยัน" 
            className="bg-green-500 text-white hover:bg-green-600" 
          />
          <Button logo="cancel.svg" text="ยกเลิก" 
            className="border border-red-500 text-red-500 hover:bg-red-100" 
          />
        </div>
      </div>
    </div> 
  );
}

