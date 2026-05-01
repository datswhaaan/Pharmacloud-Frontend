type BadgesProps = {
    varient: "severity" | "status" | "riskLevel" | "prescription" | "detection";
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
            case "COMPLETED":
                return "bg-green-100 text-green-800";
            case "WAITING":
                return "bg-blue-100 text-blue-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
        }
    }

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return "ตรวจสอบสำเร็จ";
            case "WAITING":
                return "รอตรวจสอบ";
            case "CANCELLED":
                return "ยกเลิก";
        }
    }
    
    const getDetectionColor = (status?: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-800";
            case "MODIFIED":
                return "bg-yellow-100 text-yellow-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
        }
    }

    const getDetectionLabel = (status?: string) => {
        switch (status) {
            case "APPROVED":
                return "ตรวจสอบสำเร็จ";
            case "MODIFIED":
                return "ถูกแก้ไข";
            case "REJECTED":
                return "ปฎิเสธ";
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
            {(varient === "detection" && (
                <div className={`${getDetectionColor(status)} ${base}`}>
                    {getDetectionLabel(status)}
                </div>
            ))}
        </div>
    )
}