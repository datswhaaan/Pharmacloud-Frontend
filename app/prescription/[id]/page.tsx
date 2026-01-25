import Detection from "@/app/detection/page";
import Card from "@/components/Card";
import InfoCard from "@/components/InfoCard";
import DetectionResult from "@/components/prescription/DetectionResult";
import DrugList from "@/components/prescription/DrugList";
import drugs from "@/components/prescription/mockDrugs.json";
import prescriptionData from "@/components/prescription/mockData.json";
import detectionData from "@/components/prescription/mockDetection.json";


export default function PrescriptionDetail() {
    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">  
            <InfoCard prescriptionData={prescriptionData} type='prescription'/>
            <InfoCard prescriptionData={prescriptionData} type='additional'/>
            <DrugList drugs={drugs}/>
            <DetectionResult detectionData={detectionData} prescriptionId={prescriptionData.id}/>
        </div>
    )
}