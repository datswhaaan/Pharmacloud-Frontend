"use client"

import { useState } from 'react';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import BaseChart from '@/components/statistics/BaseChart';
import DropdownButton from '@/components/dropdown/DropdownButton';
import {
  TIME_RANGE_OPTIONS,
  type TimeRange,
} from "@/components/dropdown/dropdown.options";
import PrescriptionTable from '@/components/PrescriptionTable';
import prescription from '@/components/application/table/team-members.json'

const mockData = {
  ...prescription,
  items: prescription.items.slice(0, -1),
  total: prescription.total - 1,
};

const data = {
  label: ["ตรวจสอบสำเร็จ", "รอตรวจสอบ", "ยกเลิก"],
  value: [40, 25, 20],
  unit: "รายการ",
};

const barData = {
  labels: ["ผิดชื่อยา", "ผิดขนาดยา", "ผิดจำนวน", "ผิดรูปแบบ"],
  datasets: [120, 80, 45, 30],
  unit: "รายการ",
};

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [30, 45, 40, 60, 55, 70],
  unit: "รายการ",
};

export default function Statistics() {
    const [range, setRange] = useState<TimeRange>("year");
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 items-end justify-start overflow-y-auto">
            <DropdownButton 
                value={range}
                options={TIME_RANGE_OPTIONS}
                onChange={setRange}
            />
            <div className='flex w-full gap-4'>
                <Card title='ผลการตรวจสอบ' className="flex min-w-0 " width='fit'>
                    <BaseChart data={data} type='doughnut'/>
                </Card>
                <Card title='ความผิดพลาดที่พบ' className="flex-1 min-w-0 ">
                    <BaseChart data={barData} type='bar'/>
                </Card>
                <Card title='ความผิดพลาดที่พบ' className="flex-1 min-w-0 ">
                    <BaseChart data={lineData} type='line'/>
                </Card>
            </div>
            <SearchBar 
                search={search}
                setSearch={setSearch}
            />
            <PrescriptionTable prescription={mockData} type='statistics'/>
        </div>
    )
}