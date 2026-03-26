"use client"
import { useRouter} from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Eye, EyeOff } from "@untitledui/icons";

import { loginUser } from "@/lib/api/auth";
import { useAuth } from "@/providers/auth-provider";

interface LoginFormState {
    username: string;
    password: string;
    remember_me: boolean;
}

export default function Login() {
    const router = useRouter();
    
    const [formData, setFormData] = useState<LoginFormState>({
        username: "",
        password: "",
        remember_me: false
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const data = await loginUser(formData);
            
            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                
                if (formData.remember_me) {
                    localStorage.setItem("remembered_username", formData.username);
                } else {
                    localStorage.removeItem("remembered_username");
                }

                router.push("/entry");
            }

            if (data.user) {
                setUser(data.user);
            }

        } catch (err) {
            setErrorMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-primary-gray gap-4 h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-lg gap-4 items-center justify-center">
                <img src="/logo/logo.svg"/>
                <h1>เข้าสู่ระบบ</h1>
                <p>ยินดีต้อนรับ! กรุณากรอกข้อมูลของคุณ</p>
                {errorMessage && (
                    <div className="w-full p-3 text-sm text-white bg-red-500 rounded-lg animate-in fade-in zoom-in duration-200">
                        ⚠️ {errorMessage}
                    </div>
                )}
                <Input 
                    isRequired 
                    label="ชื่อผู้ใช้"  
                    placeholder="ชื่อผู้ใช้" 
                    value={formData.username}
                    onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
                />
                <div className="relative w-full">
                    <Input 
                        isRequired 
                        type={showPassword ? "text" : "password"}
                        label="รหัสผ่าน" 
                        placeholder={showPassword ? "รหัสผ่าน" : "••••••••"} 
                        value={formData.password}
                        onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9.5 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
                    >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                </div>
                <div className="flex w-full justify-between">
                    <Checkbox 
                        label="จดจำการเข้าสู่ระบบ 30 วัน" 
                        size="sm" 
                        isSelected={formData.remember_me}
                        onChange={(checked) => setFormData(prev => ({ ...prev, remember_me: checked }))}
                    />
                    <p className="text-sm text-blue-500 font-semibold hover:cursor-pointer">
                        ลืมรหัสผ่าน
                    </p>
                </div>
                <Button 
                    type="submit"
                    className="flex items-center justify-center h-10 w-full"
                    isDisabled={isLoading}
                >
                    <p className="text-white">เข้าสู่ระบบ</p>
                </Button>
                <div className="flex w-full justify-center gap-2">
                    <p className="text-sm text-gray-500">
                        มีปัญหาในการเข้าสู่ระบบ?
                    </p>
                    <p className="text-sm text-blue-500 font-semibold hover:cursor-pointer">
                        โปรดติดต่อเจ้าหน้าที่
                    </p>
                </div>
            </form>
        </div>
    )
}