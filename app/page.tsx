import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";

export default function Login() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 h-screen items-center justify-center">
            <div className="flex flex-col w-lg gap-4 items-center justify-center">
                <img src="/logo.svg"/>
                <h1>เข้าสู่ระบบ</h1>
                <p>ยินดีต้อนรับ! กรุณากรอกข้อมูลของคุณ</p>
                <Input 
                    isRequired 
                    label="ชื่อผู้ใช้"  
                    placeholder="ชื่อผู้ใช้" 
                />
                <Input 
                    isRequired 
                    label="รหัสผ่าน" 
                    placeholder="••••••••" 
                />
                <div className="flex w-full justify-between">
                    <Checkbox label="จดจำการเข้าสู่ระบบ 30 วัน" size="sm" />
                    <p className="text-sm text-blue-500 font-semibold hover:cursor-pointer">
                        ลืมรหัสผ่าน
                    </p>
                </div>
                <Button 
                    className="flex items-center justify-center h-10 w-full"
                    href="/prescription"
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
            </div>
        </div>
    )
}