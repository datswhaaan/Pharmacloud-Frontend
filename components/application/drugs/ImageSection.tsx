"use client"

import { useState } from "react";
import Card from "@/components/Card"

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Button } from "@/components/base/buttons/button";
import { Pencil01 } from "@untitledui/icons";
import UploadImageModal from "./UploadImageModal";
import { DrugImages } from "@/types/drug";

interface Props {
    images: DrugImages[];
}

export default function ImageSection({images} : Props) {
    const [index, setIndex] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);


    const slides = images.map((img) => ({
        src: img.image_url,
    }));

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id)
            ? prev.filter(x => x !== id)
            : [...prev, id]
        );
    };
    
    const handleFilesUploaded = (files: File[]) => {
        // Handle uploaded files here
        console.log(files);
    }; 

    return (
        <Card>
            <div className="flex w-full justify-between items-center">
                <h2 className="pb-4">ภาพยา</h2>
                
                {!isEdit ? (
                    <Button
                        iconLeading={<Pencil01 className="w-4 h-4 text-white" />}
                        className="flex items-center justify-center"
                        onClick={() => setIsEdit(true)}
                    >
                        <p className="text-white">แก้ไข</p>
                    </Button>
                    ) : (
                    <div className="flex gap-3">
                        <Button
                            className="flex items-center justify-center"
                            onClick={() => {setIsUploadOpen(true); console.log(isUploadOpen)}}
                        >   
                            เพิ่มรูปภาพ
                        </Button>

                        <Button
                            disabled={selected.length === 0}
                            onClick={() => {
                                /* handle delete image */
                            }}
                        >
                            ลบ ({selected.length})
                        </Button>


                        <Button
                            onClick={() => setIsEdit(false)}
                        >
                            เสร็จสิ้น
                        </Button>
                    </div>
                    )}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-4">
                {images.map((img, i) => {
                    const isSelected = selected.includes(img.id);

                    return (
                    <div
                        key={img.id}
                        className="relative rounded overflow-hidden cursor-pointer"
                        onClick={() => {
                        if (!isEdit) setIndex(i);
                        }}
                    >
                        {/* รูป */}
                        <img
                        src={img.image_url}
                        alt={`drug-${img.id}`}
                        className={`w-full h-full object-cover transition
                            ${isEdit && isSelected ? "opacity-70" : ""}
                        `}
                        />

                        {/* วงกลม select (แสดงเฉพาะ edit mode) */}
                        {isEdit && (
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); // ไม่ให้ click ทะลุไปโดนรูป
                            toggleSelect(img.id);
                            }}
                            className={`
                            absolute top-2 right-2
                            w-6 h-6 rounded-full
                            border-2 flex items-center justify-center
                            ${isSelected
                                ? "bg-blue-600 border-blue-600"
                                : "bg-white border-gray-300"}
                            `}
                        >
                            {isSelected && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                        </button>
                        )}
                    </div>
                    );
                })}
            </div>

            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
            
            {isUploadOpen && (
                <UploadImageModal 
                    onFilesUploaded={handleFilesUploaded}
                    onClose={() => setIsUploadOpen(false)}/>
            )}

        </Card>
    )
}