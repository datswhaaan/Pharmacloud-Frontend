const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(formData: any) {
    console.log(API_URL)
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }

  return data;
}