import { ImageInput } from "@/types/drug";

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
    console.log(drugId)
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

export async function uploadDrugImages(drugId: string, images: ImageInput[], customTradeName: string) {
  const formData = new FormData();

  images.forEach(img => {
    formData.append("images", img.file);
  });

  const metadatas = images.map(img => ({
    view_type: img.view_type,
    position: img.position,
    lighting: img.lighting
  }));

  formData.append("metadatas", JSON.stringify(metadatas));

  const response = await fetch(`${API_URL}/drugs/${drugId}/images?trade_name=${customTradeName}`, {
    method: "POST",
    body: formData,
  });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถดึงข้อมูลยาได้")
    }
    return data.images
}

export async function deleteDrugImages(image_ids: string[]) {
    const response = await fetch(`${API_URL}/drugs/images`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_ids }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || data.message || "ไม่สามารถลบรูปภาพได้");
    }
}