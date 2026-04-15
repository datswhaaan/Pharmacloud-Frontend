"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PrescriptionInfo from "@/components/PrescriptionInfo";
import DetectionResult from "@/components/prescription/DetectionResult";
import DrugList from "@/components/prescription/DrugList";
import drugs from "@/components/prescription/mockPrescription.json";
import detectionData from "@/components/prescription/mockDetection.json";
import { fetchPrescriptionDetail } from "@/lib/api/prescription";

export default function PrescriptionDetail() {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [prescriptionData, setPrescriptionData] = useState();

    useEffect(() => {
        if (!id) return;

        fetchPrescriptionDetail(String(id))
        .then(setPrescriptionData)
        .catch(console.error);
    }, [id]);

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">  
            <PrescriptionInfo prescriptionData={prescriptionData} type='prescription'/>
            <PrescriptionInfo prescriptionData={prescriptionData} type='additional'/>
            <DrugList 
                drugs={drugs[page-1].drugs}
            />
            <DetectionResult 
                detectionData={detectionData}
                page={page}
                onPageChange={setPage}/>
        </div>
    )
}