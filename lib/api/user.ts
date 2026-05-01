const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...options.headers,
        },
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.detail || data.message || "ไม่สามารถอัปเดตผลตรวจได้")
    }

    return data
};

export const getMe = async () => {
  return fetchWithAuth("/users/me");
};