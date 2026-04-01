const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchDrugsParams {
  search?: string;
  highAlert?: boolean;
  skip?: number;
  limit?: number;
}

export async function fetchDrugs({
    search="", 
    highAlert=false,
    skip, 
    limit=6
} : FetchDrugsParams) {
    const response = await fetch(`${API_URL}/drugs/?search=${search}&high_alert=${highAlert}&skip=${skip}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลยาได้"
        )
    }

    return data;
}

export async function fetchDrugDetail(drugId: string) {
    const response = await fetch(`${API_URL}/drugs/${drugId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลยาได้")
    }

    return data;
}