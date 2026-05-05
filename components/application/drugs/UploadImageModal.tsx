"use client"

import React, { useCallback, useState } from 'react';
import { useParams } from "next/navigation";
import { useDropzone } from 'react-dropzone';
import Card from '@/components/Card';
import { Button } from '@/components/base/buttons/button';
import { X } from '@untitledui/icons';
import  DropdownButton from "@/components/dropdown/DropdownButton";
import { VIEW_TYPE_OPTIONS, LIGHTING_OPTIONS, POSITION_OPTIONS } from '@/components/dropdown/image.options';

import { uploadDrugImages } from "@/lib/api/drug";
import { ImageInput } from '@/types/drug';
import { DrugImages } from "@/types/drug";
import { useNotification } from '@/providers/notification-provider';

interface FileUploadProps {
  onClose: () => void;
  onUploaded: (images: DrugImages[]) => void;
  trade: string;
}

export default function UploadImageModal({ 
    onClose, 
    onUploaded,
    trade,
} : FileUploadProps) {
    const { id } = useParams();
    const [images, setImages] = useState<ImageInput[]>([]);
    const [useDefaultName, setUseDefaultName] = useState(!!trade);
    const [customTradeName, setCustomTradeName] = useState(trade ?? "");
    const { showNotification } = useNotification();

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        rejectedFiles.forEach((file) => {
            showNotification(`ไฟล์ ${file.file.name} ไม่รองรับ`, "error");
        });

        setImages((prev) => {
            const existingNames = new Set(prev.map(f => f.file.name));

            const newFiles = acceptedFiles
                .filter((f) => {
                    if (existingNames.has(f.name)) {
                        showNotification(`ไฟล์ ${f.name} ถูกเลือกแล้ว`, "warning");
                        return false;
                    }
                    return true;
                })
                .map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                    view_type: "front",
                    lighting: "bright",
                    position: 1,
                }));

            return [...prev, ...newFiles];
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
        }
    });

    const removeFile = (index: number) => {
        setImages((prev) =>
            prev.filter((_, i) => i !== index)
    )};

    const updateField = (
        index: number,
        field: keyof ImageInput,
        value: any
    ) => {
        setImages((prev) => {
        const copy = [...prev];
        (copy[index] as any)[field] = value;
        return copy;
        });
    };

        
    const handleFilesUploaded = async () => {
        const finalName = useDefaultName ? trade : customTradeName;

        if (!finalName || finalName.trim() === "") {
            showNotification("กรุณากรอกชื่อทางการค้า", "error");
            return;
        }

        try {
            const uploaded = await uploadDrugImages(
                String(id),
                images,
                finalName
            );

            onUploaded(uploaded);
            setImages([]);
            onClose();

        } catch (err) {
            console.error(err);
            showNotification("อัปโหลดไม่สำเร็จ", "error");
        }
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/40" />

        {/* modal card */}
        <Card
            title='เพิ่มรูปภาพ'
            className="flex flex-col justify-between relative z-10 my-100 mx-50 w-full h-full max-h-[80vh]"
            scrollable
        >
            <div className="flex flex-col h-full">
                <div className=" flex-1 flex flex-col">
                    <div className="flex flex-1 gap-4">
                        <div className="flex flex-col gap-4">
                            <div
                                {...getRootProps()}
                                className="
                                    w-full h-52 flex justify-center items-center 
                                    border-2 border-dashed border-gray-300
                                    rounded-lg p-6 text-center cursor-pointer
                                    hover:border-blue-500 transition
                                "
                            >
                                <input {...getInputProps()} />
                                <p className="text-sm text-gray-600">
                                    Drag & drop รูปที่นี่ หรือคลิกเพื่อเลือกไฟล์
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3>ชื่อทางการค้า</h3>
                                <input
                                    type="text"
                                    disabled={useDefaultName}
                                    value={useDefaultName ? trade : customTradeName}
                                    onChange={(e) => setCustomTradeName(e.target.value)}
                                    className={`w-full rounded-md ring-1 mx-2 px-5 py-2 text-sm
                                        focus:outline-none focus:ring-2
                                        ${!useDefaultName && !customTradeName ? "ring-red-400" : "ring-secondary"}
                                    `}
                                />
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={useDefaultName}
                                        disabled={!trade}
                                        onChange={(e) => setUseDefaultName(e.target.checked)}
                                    />
                                    <span>ใช้ชื่อตามในระบบ</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <h3 className="mb-4">
                                ไฟล์ที่เลือก
                            </h3>

                            {images.length > 0 ? (
                                <div className="space-y-3 overflow-y-auto max-h-[30vh]">
                                    {images.map((img, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 items-center shadow-sm border border-primary-gray p-3 rounded-lg"
                                        >
                                            {/* preview */}
                                            <img
                                                src={img.preview}
                                                className="w-20 h-20 object-cover rounded"
                                            />

                                            {/* metadata */}
                                            <div className="flex flex-col gap-2 flex-1">
                                                {/* view */}
                                                <DropdownButton
                                                    value={(img.view_type ?? "front") as any}
                                                    options={VIEW_TYPE_OPTIONS}
                                                    onChange={(val) => updateField(i, "view_type", val)}
                                                    expand
                                                />

                                            {/* lighting */}
                                            <DropdownButton
                                                value={(img.lighting ?? "bright") as any}
                                                options={LIGHTING_OPTIONS}
                                                onChange={(val) => updateField(i, "lighting", val)}
                                                expand
                                            />

                                                {/* position */}
                                                <DropdownButton
                                                    value={String(img.position ?? 1)}
                                                    options={POSITION_OPTIONS}
                                                    onChange={(val) => updateField(i, "position", Number(val))}
                                                    expand
                                                />
                                            </div>

                                            {/* remove */}
                                            <button
                                                onClick={() => removeFile(i)}
                                                className="text-gray-500 hover:text-red-600"
                                            >
                                                <X />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                ) : (
                                <p className="text-sm text-gray-500">
                                    ยังไม่ได้เลือกรูปภาพ
                                </p>
                                )}
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-2 mt-6">
                    
                        <Button
                            disabled={
                                images.length === 0 ||
                                (!useDefaultName && !customTradeName.trim())
                            }
                            onClick={handleFilesUploaded}
                        >
                            อัปโหลด
                        </Button>

                        <Button color="secondary" onClick={onClose}>
                            ยกเลิก
                        </Button>

                    </div>
                </div>
                
                <div className="flex flex-col w-full">
                    <h3 className="text-primary-blue">ตัวอย่างภาพถ่ายมุมมาตรฐาน</h3>
                    <div className="grid grid-cols-3 gap-3 w-fit">
                        <img src="/drugImage/TACR_front_7.jpg" className="w-full h-32 object-cover rounded" />
                        <img src="/drugImage/TACR_front_8.jpg" className="w-full h-32 object-cover rounded" />
                        <img src="/drugImage/TACR_side_7.jpg" className="w-full h-32 object-cover rounded" />
                        <img src="/drugImage/TACR_side_8.jpg" className="w-full h-32 object-cover rounded" />
                        <img src="/drugImage/TACR_top_7.jpg" className="w-full h-32 object-cover rounded" />
                        <img src="/drugImage/TACR_top_8.jpg" className="w-full h-32 object-cover rounded" />
                    </div>
                </div>
            </div>
        </Card>
    </div>
    );
};