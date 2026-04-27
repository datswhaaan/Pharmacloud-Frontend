"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PrescriptionInfo from "@/components/PrescriptionInfo";
import DetectionResult from "@/components/prescription/DetectionResult";
import DrugList from "@/components/prescription/DrugList";
import { DetectionList, OrderDrug, OrderDrugWithMatch, DrugDetectionItem } from "@/types/prescription";
import { fetchPrescriptionDetail, fetchPrescriptionDetection } from "@/lib/api/prescription";
import { fetchDetectionsByOrderId } from "@/lib/api/detection";

export default function PrescriptionDetail() {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [prescriptionData, setPrescriptionData] = useState<any>(null);
    const [detectionData, setDetectionData] = useState<DetectionList>({order_drugs: [], detections: []});

    useEffect(() => {
        if (!id) return;

        fetchPrescriptionDetail(String(id))
        .then(setPrescriptionData)
        .catch(console.error);

        fetchDetectionsByOrderId(String(id))
        .then(setDetectionData)
        .catch(console.error)
    }, [id]);

    const mergeOrderWithDetection = (
        orderDrugs: OrderDrug[],
        detectionItems: DrugDetectionItem[]
    ): OrderDrugWithMatch[] => {
        const map = new Map(
            detectionItems.map((d) => [d.t_order_drug_id, d])
        );

        return orderDrugs.map((od) => {
            const detected = map.get(od.t_order_drug_id);

            return {
            ...od,
            match_type: detected?.match_type === "matched"
                ? "matched"
                : "missing"
            };
        });
    };

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">  
            <PrescriptionInfo prescriptionData={prescriptionData} type='prescription'/>
            <PrescriptionInfo prescriptionData={prescriptionData} type='additional'/>
            <DrugList 
                drugs={mergeOrderWithDetection(
                    detectionData.order_drugs || [],
                    detectionData.detections[page - 1]?.drug_list || []
                )}
            />
            <DetectionResult 
                detectionData={detectionData.detections}
                page={page}
                onPageChange={setPage}
            />
        </div>
    )
}