"use client";

import SearchBar from "@/components/SearchBar";
import PrescriptionTable from "@/components/PrescriptionTable";
import  DropdownButton from "@/components/dropdown/DropdownButton";
import { useState } from "react";
import WebcamDisplay from "@/components/WebcamDisplay";
import Alert from "@/components/tailgrids/core/alert";
import {
  SELECT_METHOD_OPTIONS,
  type SelectMethod,
} from "@/components/dropdown/dropdown.options";
import prescription from '@/components/application/table/team-members.json'

export default function DetectionPage() {
  const [method, setMethod] = useState<SelectMethod>("manual");
  const [search, setSearch] = useState("");

  return (
      <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
            <div className="flex items-center justify-end w-full">
              <DropdownButton 
                value={method}
                options={SELECT_METHOD_OPTIONS}
                onChange={setMethod}
              />
            </div>
            {method === "qr" ? (
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
                <SearchBar 
                  search={search}
                  setSearch={setSearch}
                />

                <PrescriptionTable prescription={prescription} type="detection"/>
              </div>
            )}
      </div>
)}