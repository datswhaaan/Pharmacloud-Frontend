const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchPrescriptionParams {
    search?: string,
    startTime?: string,
    endTime?: string,
    limit?: number,
    skip?: number,
    order?: string,
    status?: string
}

export async function fetchPrescriptions({
    search,
    startTime,
    endTime,
    limit,
    skip,
    order,
    status
} : FetchPrescriptionParams){
    const response = await fetch(`${API_URL}/prescriptions/?search=${search}&start_time=${startTime}&end_time=${endTime}&skip=${skip}&limit=${limit}&order=${order}&status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลใบสั่งยาได้"
        )
    }

    return data;
}