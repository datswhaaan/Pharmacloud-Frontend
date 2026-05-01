"use client";

export default function ImageDisplay({ capturedImage, className }: { capturedImage: string | null, className?: string }) {

  return (
    <div className={`position-relative w-full max-w-lg ${className}`}>
        <>
          <img className="w-full h-full object-cover rounded-2xl" src={capturedImage || "drugsImage.jpg"} alt="Captured" />
        </>
    </div>
  );
};