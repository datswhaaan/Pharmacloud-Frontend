import { DetectionUpdateParams, DetectionInferParams } from "@/types/detection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = localStorage.getItem("token");

export async function fetchDetectionsByOrderId(order_id: string){
    const response = await fetch(`${API_URL}/detection/${order_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { Authorization: token }),
        }
    })

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลผลตรวจได้")
    }

    return data
}

export async function updateDetectionResult({
    detection_id,
    status,
    drug_list,
    is_edited
}: DetectionUpdateParams) {
    const response = await fetch(`${API_URL}/detection/${detection_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { Authorization: token }),
        },
        body: JSON.stringify({
            detection_id,
            status,
            drug_list,
            is_edited
        }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถอัปเดตผลตรวจได้")
    }

    return data
}

export async function inferDetectionResult({
    order_id,
    image,
}: DetectionInferParams) {
    const formData = new FormData();

    formData.append("image", image);

    const response = await fetch(`${API_URL}/detection/${order_id}/infer`, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",
            ...(token && { Authorization: token }),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || "error");
    }

    return data;
}