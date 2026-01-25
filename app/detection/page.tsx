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

const prescriptionData = {
    hn: '1234567',
    vn: '87654321',
    name: 'นายบัตร ออกหน่วย',
    age: '28 ปี 2 เดือน 28 วัน',
    gender: 'ชาย',
    diagnosis: 'ขออุปกรณ์ทำแผล (Z760)',
    rights: 'ฟรี',
    allergies: 'ไม่มี',
    doctor: 'ไม่มี',
    dateTime: '15/01/2568 เวลา 14:30 น.',
    severity: 'ขาว',
    status: 'รอตรวจสอบ'
  };

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
    <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-between">
      
      <Card>
        <InfoCard prescriptionData={prescriptionData} type="detection"/>
      </Card>

      <div className="flex gap-2 w-full h-full min-h-0">
        
        <div className="flex flex-col gap-2 h-full w-fit">

              <WebcamDisplay
                ref={webcamRef}
                deviceId={deviceId}
                className="flex-1 h-full min-h-0"
              />

              <WebcamDisplay
                deviceId={deviceId}
                className="flex-1 h-full min-h-0"
              />

        </div>

        <Card title="ผลการตรวจสอบ" className="flex flex-col min-h-0" scrollable>

          {/* container ของ 2 drug lists */}
          <div className="flex gap-2 flex-1 min-h-0 pb-5 border-b">

            {/* ซ้าย */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>รายการยาที่เลือก</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={drugData}
                  showCheckbox
                  checkedMap={checkedDrugs}
                  onCheckChange={(id, checked) =>
                    setCheckedDrugs((prev) => ({ ...prev, [id]: checked }))
                  }
                />
              </div>
            </div>

            {/* ขวา */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>ยาที่ตรวจพบ</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={drugData}
                  lockedMap={checkedDrugs}
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
                  drugs={drugData}
                  showCheckbox
                  checkedMap={checkedDrugs}
                  onCheckChange={(id, checked) =>
                    setCheckedDrugs((prev) => ({ ...prev, [id]: checked }))
                  }
                  risk={true}
                />
              </div>
            </div>

            {/* ขวา */}
            <div className="flex flex-col flex-1 min-h-0 ">
              <p>ยาที่ตรวจพบนอกเหนือจากใบสั่งยา</p>
              <div className="flex-1 overflow-auto">
                <DrugList
                  drugs={drugData}
                  lockedMap={checkedDrugs}
                  risk={true}
                />
              </div>
            </div>

          </div>
        </Card>

      </div>

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

