"use client";
import Card from "@/components/Card";
import Badges from "@/components/Badges";
import ImageDisplay from "@/components/ImageDisplay";
import DrugList from "./DrugList";
import { PaginationPageMinimalCenter } from "../application/pagination/pagination";
import { useState } from "react";
// import { Link } from "react-aria-components";
import Link from "next/link";

export default function DetectionResult({ detectionData, pagination = false, prescriptionId }: { detectionData: any[], pagination?: boolean, prescriptionId?: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    let currentItem;
    pagination ? currentItem = detectionData[currentPage - 1] : currentItem = detectionData[0];
    return (
        <Card>
            <div className="flex items-end flex-col gap-2">
                <div className="flex w-full justify-between">
                    <div className="flex gap-4">
                        <h2>ผลการตรวจสอบ</h2>
                        <Badges varient="status" status={currentItem?.status} />
                    </div>
                    <div className="flex flex-col items-end justify-center">
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-gray-500">ยืนยันโดย</p>
                            <p className="text-sm text-gray-500 font-semibold">{currentItem?.reviewedBy}</p>
                        </div>
                        <p className="text-sm text-gray-500">{currentItem?.reviewDate}</p>
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-sm">
                        <ImageDisplay capturedImage="/drugsImage.jpg"/>
                    </div>
                    <div className="flex-1">
                        <DrugList drugs={currentItem?.drugs} title={false} withCard={false}/>
                    </div>
                </div>
                {pagination ? (
                    <PaginationPageMinimalCenter 
                        rounded={true} 
                        page={currentPage} 
                        total={detectionData.length} 
                        onPageChange={handlePageChange}
                        className="border-0" />
                ) : (
                    <Link href={`/prescription/${prescriptionId}/detection`}
                        className="text-blue-500 cursor-pointer underline">
                        ดูเพิ่มเติม
                    </Link>
                )}
                
                </div>
        </Card>
    )
}