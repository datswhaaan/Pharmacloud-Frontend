"use client"

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import BaseChart from '@/components/statistics/BaseChart';
import PrescriptionTable from '@/components/PrescriptionTable';
import PrescriptionFilter from "@/components/filters/PrescriptionFilter";
import { useNotification } from "@/providers/notification-provider";
import { createWebSocket } from "@/lib/api/websocket";
import { fetchDetectionLogs, fetchStatistics } from '@/lib/api/statistics';
import { StatisticsData, DetectionLogItem } from '@/types/statistics';

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
    const [status, setStatus] = useState<string | null>(null);
    const [errorType, setErrorType] = useState<string | null>(null);
    const [monthKey, setMonthKey] = useState<string | null>(null);

    const limit = 6;
    const skip = (currentPage - 1) * limit;

    const stateRef = useRef({ currentPage, search, startTime, endTime, order, status, errorType, monthKey });
    
    const { showNotification, removeAllNotifications } = useNotification();

    useEffect(() => {
        handleSearch();
    }, [currentPage, search, startTime, endTime, order, status, errorType, monthKey]);

    useEffect(() => {
        stateRef.current = { currentPage, search, startTime, endTime, order, status, errorType, monthKey };
    }, [currentPage, search, startTime, endTime, order, status, errorType, monthKey]);

    useEffect(() => {
        if (currentPage === 1) {
            removeAllNotifications();
    }
    }, [currentPage]);
    
    useEffect(() => {
        const ws = createWebSocket({
            onMessage: async (data) => {
            const { currentPage } = stateRef.current;
        
            if (data.event === "NEW_PRESCRIPTION") {
                if (currentPage === 1 && status === "ALL") {
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
    }, [startTime, endTime, status]);
    
    const loadStatistics = async () => {
        try {
            const res = await fetchStatistics({
                startTime,
                endTime,
                ...(status ? { status } : {})
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
                ...(status ? { status } : {}),
                ...(errorType ? { errorType } : {}),
                ...(monthKey ? { monthKey } : {})
            });
            setDetections(data.detections);
            setTotalPages(Math.ceil(data.total / limit));
        } finally {
            setTableLoading(false);
        }
    }

    const toChartData = (summary: any) => {
        const data = {
            labels: summary.data.map((item: any) => item.label),
            datasets: summary.data.map((item: any) => item.value),
                
            meta: summary.data,
        };

        return data
    };

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 pb-6 overflow-y-auto">
            
            <div className='flex w-full gap-4'>
                <Card title='สถานะใบสั่งยา' className="flex min-w-0" width='fit'>
                    {statistics?.status_summary
                        ? <BaseChart data={toChartData(statistics.status_summary)} type='doughnut'
                            selectedKey={status}
                            onSelect={(selected) => {
                                setStatus(prev => prev === selected.key ? null : selected.key);
                            }}/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>

                <Card title='ความผิดพลาดที่พบ'  className="flex-1 min-w-0">
                    {statistics?.error_summary
                        ? <BaseChart data={toChartData(statistics.error_summary)} type='bar'
                            selectedKey={errorType}
                            onSelect={(selected) => {
                                setErrorType(prev => prev === selected.key ? null : selected.key);
                            }}/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>

                <Card title='ความผิดพลาดที่พบ' className="flex-1 min-w-0 ">
                    {statistics?.annual_error_summary
                        ? <BaseChart data={toChartData(statistics.annual_error_summary)} type='line'
                            selectedKey={monthKey}
                            onSelect={(selected) => {
                                setMonthKey(prev => prev === selected.key ? null : selected.key);
                            }}/>
                        : <div className="h-40 flex items-center justify-center">Loading...</div>
                    }
                </Card>
            </div>
            <div className='flex flex-col gap-4 w-full border-t border-gray-300 pt-2'>
                <h1>รายการผลการตรวจสอบ</h1>
                <SearchBar 
                    search={search}
                    setSearch={setSearch}
                >
                    <PrescriptionFilter
                        startTime={startTime}
                        endTime={endTime}
                        order={order}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                        setOrder={setOrder}
                    />
                </SearchBar>
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
        </div>
    )
}