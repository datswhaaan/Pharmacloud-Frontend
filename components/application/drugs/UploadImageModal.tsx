"use client"

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from '@/components/Card';
import { Button } from '@/components/base/buttons/button';
import { X } from '@untitledui/icons';

interface FileUploadProps {
  onClose: () => void;
  onFilesUploaded: (files: File[]) => void;
}

export default function FileUpload({ onClose, onFilesUploaded } : FileUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFiles(prev => {
            const existingNames = new Set(prev.map(f => f.name));
            const newFiles = acceptedFiles.filter(
            f => !existingNames.has(f.name)
            );
            return [...prev, ...newFiles];
        });
    }, []);



    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const removeFile = (index: number) => {
        setSelectedFiles(prev =>
            prev.filter((_, i) => i !== index)
    )};


    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* backdrop */}
        <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        />

        {/* modal card */}
        <Card className="relative z-10 m-100 h-fit">
            <h2 className="text-lg font-semibold mb-4">
                เพิ่มรูปภาพ
            </h2>

            <div className="flex gap-4">
                <div
                    {...getRootProps()}
                    className="
                        flex justify-center items-center 
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

                <div className="flex-1 flex flex-col h-72">
                    <h2 className="text-lg font-semibold mb-4">
                        ไฟล์ที่เลือก
                    </h2>

                    {selectedFiles.length > 0 ? (
                        <ul className="flex flex-col h-full space-y-2 overflow-y-auto">
                            {selectedFiles.map((file, i) => (
                            <li
                                key={i}
                                className="
                                flex items-center justify-between
                                text-sm text-gray-600
                                bg-gray-50 rounded px-3 py-2
                                "
                            >
                                <span className="truncate">
                                {file.name} ({Math.round(file.size / 1024)} KB)
                                </span>

                                <button
                                onClick={() => removeFile(i)}
                                className="
                                    text-gray-500 hover:text-red-700
                                    text-xs font-medium
                                "
                                >
                                    <X/>
                                </button>
                            </li>
                            ))}
                        </ul>
                    ) : (
                        <p>ยังไม่ได้เลือกรูปภาพ</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                
                <Button
                    disabled={selectedFiles.length === 0}
                    onClick={() => {
                        onFilesUploaded(selectedFiles);
                        setSelectedFiles([]);
                        onClose();
                    }}
                    >
                    อัปโหลด
                </Button>

                <Button color="secondary" onClick={onClose}>
                    ยกเลิก
                </Button>

            </div>
        </Card>
    </div>
    );
};