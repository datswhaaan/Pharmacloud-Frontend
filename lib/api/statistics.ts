import { DetectionLogResponse } from "@/types/statistics";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

interface FetchDetectionLogsParams {
    search?: string
    startTime?: string
    endTime?: string
    skip?: number
    limit?: number
    order?: string
    status?: string
    errorType?: string
    monthKey?: string
}

interface FetchStatisticsParams {
    startTime?: string
    endTime?: string
    status?: string
}

export async function fetchDetectionLogs({
    search,
    startTime,
    endTime,
    skip,
    limit,
    order,
    status,
    errorType,
    monthKey
} : FetchDetectionLogsParams) : Promise<DetectionLogResponse>{
    const response = await fetch(`${API_URL}/statistics?search=${search}&start_time=${startTime}&end_time=${endTime}&skip=${skip}&limit=${limit}&order=${order}${status ? `&status=${status}` : ``}${errorType ? `&error_type=${errorType}` : ``}${monthKey ? `&month_key=${monthKey}` : ``}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { Authorization: token }),
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลบันทึกการตรวจสอบได้")
    }

    return data;
}

export async function fetchStatistics({
    startTime,
    endTime,
    status
} : FetchStatisticsParams){
    const response = await fetch(`${API_URL}/statistics/dashboard?start_time=${startTime}&end_time=${endTime}&status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { Authorization: token }),
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลสถิติได้")
    }

    return data;
}