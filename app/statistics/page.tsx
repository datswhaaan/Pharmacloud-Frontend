"use client"

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import BaseChart from '@/components/statistics/BaseChart';
import PrescriptionTable from '@/components/PrescriptionTable';
import { fetchPrescriptions } from "@/lib/api/prescription";
import PrescriptionFilter from "@/components/filters/PrescriptionFilter";
import { useNotification } from "@/providers/notification-provider";
import { createWebSocket } from "@/lib/api/websocket";

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
    const [search, setSearch] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [order, setOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [prescriptions, setPrescriptions] = useState([]);

    const limit = 6;
    const skip = (currentPage - 1) * limit;
    const status = "all"

    const stateRef = useRef({ currentPage, search, status, startTime, endTime, order });
    
        const { showNotification, removeAllNotifications } = useNotification();

        useEffect(() => {
        handleSearch();
        }, [currentPage, search, status, startTime, endTime, order]);

        useEffect(() => {
        stateRef.current = { currentPage, search, status, startTime, endTime, order };
        }, [currentPage, search, status, startTime, endTime, order]);

        useEffect(() => {
        if (currentPage === 1) {
            removeAllNotifications();
        }
        }, [currentPage, status]);
    
    useEffect(() => {
        const ws = createWebSocket({
            onMessage: async (data) => {
            const { currentPage, status } = stateRef.current;
        
            if (data.event === "NEW_PRESCRIPTION") {
                if (currentPage === 1 && status === "all") {
                await handleSearch();
                } else {
                showNotification("มีใบสั่งยาใหม่", "info");
                }
            }
            },
        });
    
        return () => ws.close();
    }, []);
      
      const handleSearch = async () => {
            try {
            const data = await fetchPrescriptions({
                search,
                startTime,
                endTime,
                skip,
                limit,
                order,
                status
            });
            setPrescriptions(data.prescriptions);
            setTotalPages(Math.ceil(data.total / limit));
            } catch (err) {
            console.error(err);
            }
      }

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 items-end justify-start overflow-y-auto">
            <PrescriptionFilter
                startTime={startTime}
                endTime={endTime}
                order={order}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                setOrder={setOrder}
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
            <PrescriptionTable 
                prescription={prescriptions} 
                type="statistics"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowNumber={limit}
            />
        </div>
    )
}