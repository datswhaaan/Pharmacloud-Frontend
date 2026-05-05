"use client"

import { useState, useEffect } from "react"
import DrugInfo from "@/components/DrugInfo"
import ImageSection from "@/components/application/drugs/ImageSection"
import UploadImageModal from "@/components/application/drugs/UploadImageModal"

import { fetchDrugDetail } from "@/lib/api/drug";
import { DrugResponse } from "@/types/drug";
import { useParams } from "next/navigation";

export default function DrugDetail() {
    const { id } = useParams();
    const [drugData, setDrugData] = useState<DrugResponse | null>(null);;

    useEffect(() => {
        if (!id) return;

        fetchDrugDetail(String(id))
        .then(setDrugData)
        .catch(console.error);
    }, [id]);

    if (!drugData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col bg-primary-gray gap-4 pt-18 px-16 py-6 h-screen items-center justify-start">
            {drugData && (
                <>
                    <DrugInfo drugData={drugData} type="detection" />
                    <DrugInfo drugData={drugData} type="additional" />
                    <ImageSection 
                        images={drugData.images}
                        renderUploadModal={({ onUploaded, onClose }) => (
                            <UploadImageModal 
                                trade={drugData.names.trade}
                                onUploaded={onUploaded}
                                onClose={onClose}
                            />
                        )}
                    />
                </>
            )}
        </div>
    )
}