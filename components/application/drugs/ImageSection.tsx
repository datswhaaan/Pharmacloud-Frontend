"use client"

import { useState } from "react";
import Card from "@/components/Card"

interface Props {
    images: DrugImages[]
}

interface DrugImages {
  id: string,
  url: string,
  type: string,
  uploadedAt: string,
}

export default function ImageSection({images} : Props) {
    const [selectedImage, setSelectedImage] = useState<DrugImages | null>(null);

    return(
        <Card>
            <h2 className="pb-4">ภาพยา</h2>
            <div className='grid grid-cols-3 gap-6'>
              {images.map((img) => (
                <button 
                    key={img.id}
                    onClick={() => setSelectedImage(img)} 
                    className="rounded overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt={`drug-${img.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                    className="relative max-w-4xl w-full px-4"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-10 right-0 text-white text-3xl"
                    >
                        ✕
                    </button>

                    <img
                        src={selectedImage.url}
                        alt="drug-large"
                        className="w-full max-h-[80vh] object-contain rounded"
                    />
                    </div>
                </div>
                )}
        </Card>
    )
}