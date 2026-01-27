type BadgesProps = {
    varient: "severity" | "status" | "riskLevel";
    level?: string;
    status?: string;
};

export default function Badges({
    varient,
    level,
    status,
} : BadgesProps  
) {
    const getSeverityColor = (level?: string) => {
        switch (level) {
            case "แดง":
                return "bg-red-100 text-red-800";
            case "ชมพู":
                return "bg-pink-100 text-pink-800";
            case "เหลือง":
                return "bg-yellow-100 text-yellow-800";
            case "เขียว":
                return "bg-green-100 text-green-800";
            case "ขาว":
                return "bg-gray-200 text-gray-700";
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "ตรวจสอบสำเร็จ":
                return "bg-green-100 text-green-800";
            case "รอตรวจสอบ":
                return "bg-blue-100 text-blue-800";
            case "ตรวจสอบใหม่":
                return "bg-blue-100 text-blue-800";
            case "ยกเลิก":
                return "bg-red-100 text-red-800";
        }
    }

    const riskLevelColor = "bg-red-100 text-red-800"
    
    return (
        <div className="w-32">
            {varient === "severity" && (
                <div className={`${getSeverityColor(level)} text-sm text-center font-medium w-full h-fit rounded-full pt-1 pb-0.5`}>
                    {level}
                </div>
            )}
            {varient === "status" && (
                <div className={`${getStatusColor(status)} text-sm text-center font-medium w-full h-fit rounded-full pt-1 pb-0.5`}>
                    {status}
                </div>
            )}
            {varient === "riskLevel" && level === "high" &&(
                <div className={`${riskLevelColor} text-sm text-center font-medium w-full h-fit rounded-full pt-1 pb-0.5`}>
                    เสี่ยงสูง
                </div>
            )}
        </div>
    )
}