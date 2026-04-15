"use client";
import Card from "@/components/Card";
import Badges from "@/components/Badges";
import ImageDisplay from "@/components/ImageDisplay";
import DrugList from "./DrugList";
import { PaginationPageMinimalCenter } from "../application/pagination/pagination";
import { DetectionItem } from "@/types/prescription";

type Props = {
    detectionData: DetectionItem[], 
    page: number, 
    onPageChange: (page: number) => void;
}

export default function DetectionResult({ 
    detectionData, 
    page, 
    onPageChange 
}: Props) {
    let currentItem = detectionData[page - 1]
    console.log(currentItem?.status)
    return (
        <Card>
            <div className="flex items-end flex-col gap-2">
                <div className="flex w-full justify-between">
                    <div className="flex gap-4">
                        <h2>ผลการตรวจสอบ</h2>
                        <Badges varient="detection" status={currentItem?.status} />
                    </div>
                    <div className="flex flex-col items-end justify-center">
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-gray-500">ยืนยันโดย</p>
                            <p className="text-sm text-gray-500 font-semibold">{currentItem?.verified_by}</p>
                        </div>
                        <p className="text-sm text-gray-500">{currentItem?.verified_at}</p>
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-sm">
                        <ImageDisplay capturedImage="/drugsImage.jpg"/>
                    </div>
                    <div className="flex-1">
                        <DrugList detection drugs={currentItem?.drug_list} title={false} withCard={false}/>
                    </div>
                </div>
                    <PaginationPageMinimalCenter 
                        rounded={true} 
                        page={page} 
                        total={detectionData.length} 
                        onPageChange={onPageChange}
                        className="border-0" />
                </div>
        </Card>
    )
}