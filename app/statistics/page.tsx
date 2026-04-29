"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import BaseChart from '@/components/statistics/BaseChart';
import PrescriptionTable from '@/components/PrescriptionTable';
import PrescriptionFilter from "@/components/filters/PrescriptionFilter";
import { useNotification } from "@/providers/notification-provider";
import { createWebSocket } from "@/lib/api/websocket";
import { fetchDetectionLogs, fetchStatistics } from '@/lib/api/statistics';
import { StatisticsData, DetectionLogItem } from '@/types/statistics';
import { PrescriptionType } from '@/types/prescription';

export default function Statistics() {
    const [search, setSearch] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [order, setOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [detections, setDetections] = useState<DetectionLogItem[]>([]);
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);
    const [tableLoading, setTableLoading] = useState(false);

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

    useEffect(() => {
        loadStatistics();
    }, [startTime, endTime]);
    
    const loadStatistics = async () => {
        try {
            const res = await fetchStatistics({
                startTime,
                endTime
            });

            setStatistics(res);
        } catch (err) {
            console.error(err);
        }
    };
      
    const handleSearch = async () => {
        setTableLoading(true)
        try {
            const data = await fetchDetectionLogs({
                search,
                startTime,
                endTime,
                skip,
                limit,
                order,
                status
            });
            setDetections(data.detections);
            setTotalPages(Math.ceil(data.total / limit));
        } finally {
            setTableLoading(false);
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
                <Card title='ผลการตรวจสอบ' className="flex min-w-0" width='fit'>
                    {statistics?.status_summary
                        ? <BaseChart data={statistics.status_summary} type='doughnut'/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>

                <Card title='ความผิดพลาดที่พบ'  className="flex-1 min-w-0">
                    {statistics?.error_summary
                        ? <BaseChart data={statistics.error_summary} type='bar'/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>

                <Card title='ความผิดพลาดที่พบ' className="flex-1 min-w-0 ">
                    {statistics?.annual_error_summary
                        ? <BaseChart data={statistics.annual_error_summary} type='line'/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>
            </div>
            <SearchBar 
                search={search}
                setSearch={setSearch}
            />
            <PrescriptionTable<DetectionLogItem>
                data={detections}
                type="statistics"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowNumber={limit}
                getRowId={(i) => i.detection_id}
                getRowHref={(i) => `/prescription/${i.order_id}`}
            />
        </div>
    )
}