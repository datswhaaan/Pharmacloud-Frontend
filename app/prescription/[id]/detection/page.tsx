import PrescriptionInfo from "@/components/PrescriptionInfo";
import DrugList from "@/components/prescription/DrugList";
import DetectionResult from "@/components/prescription/DetectionResult";
import prescriptionData from "@/components/prescription/mockData.json";
import drugs from "@/components/prescription/mockPrescription.json";
import detectionResult from "@/components/prescription/mockDetection.json";

export default function DetectionDetail() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
            <PrescriptionInfo prescriptionData={prescriptionData} type='prescription'/>
            <DrugList drugs={drugs}/>
            <DetectionResult detectionData={detectionResult} prescriptionId={prescriptionData.id} pagination/>
        </div>
    )
}