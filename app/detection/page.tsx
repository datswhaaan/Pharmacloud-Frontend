"use client";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import { PrescriptionTable } from "@/components/PrescriptionTable";
import  DropdownButton from "@/components/DropdownButton";
import { useState } from "react";
import WebcamDisplay from "@/components/WebcamDisplay";
import Alert from "@/components/tailgrids/core/alert";

export default function DetectionPage() {
  const [dropdownValue, setDropdownValue] = useState("เลือกด้วยตัวเอง");

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
              <div className="flex items-center justify-end w-full">
                <DropdownButton value={dropdownValue} onChange={setDropdownValue}/>
              </div>
              {dropdownValue === "สแกนคิวอาร์โค้ด" ? (
                <div className="flex flex-col items gap-2 h-full w-fit">
                  <WebcamDisplay
                    className="aspect-4/3 w-full h-full min-h-0"
                  />
                  <Alert
                    variant="info"
                    title="แสดงใบสั่งยาเพื่อทำการตรวจสอบ"
                    message="กรุณานำใบสั่งยามาแสดงต่อหน้ากล้องให้เห็นอย่างชัดเจน โปรดจัดตำแหน่งเอกสารให้อยู่ภายในกรอบ ภาพคมชัด ไม่เบลอ และมีแสงสว่างเพียงพอ"
                    withIcon
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full h-full">
                  <SearchBar />

                  <PrescriptionTable type="detection"/>
                </div>
              )}
        </div>
    )}