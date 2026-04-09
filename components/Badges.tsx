type BadgesProps = {
    varient: "severity" | "status" | "riskLevel" | "prescription";
    level?: string;
    status?: string;
};

export default function Badges({
    varient,
    level,
    status,
} : BadgesProps  
) {
    const base = "text-sm text-center font-medium w-full h-full rounded-full pt-0.5"

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
            case "completed":
                return "bg-green-100 text-green-800";
            case "waiting":
                return "bg-blue-100 text-blue-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
        }
    }

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case "completed":
                return "ตรวจสอบสำเร็จ";
            case "waiting":
                return "รอตรวจสอบ";
            case "cancelled":
                return "ยกเลิก";
        }
    }

    const riskLevelColor = "bg-red-100 text-red-800"

    const prescriptionColor = "bg-blue-100 text-blue-800 border-1 border-blue-800"
    
    return (
        <div className=" flex w-32 h-6 justify-center items-center">
            {varient === "severity" && (
                <div className={`${getSeverityColor(level)} ${base}`}>
                    {level}
                </div>
            )}
            {varient === "status" && (
                <div className={`${getStatusColor(status)} ${base}`}>
                    {getStatusLabel(status)}
                </div>
            )}
            {varient === "riskLevel" && level === "high" &&(
                <div className={`${riskLevelColor} ${base}`}>
                    เสี่ยงสูง
                </div>
            )}
            {(varient === "prescription" && (
                <div className={`${prescriptionColor} ${base}`}>
                    ขาด
                </div>
            ))}
        </div>
    )
}