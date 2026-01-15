"use client";
import { useState, useRef, useEffect } from "react";


export default function ImageDisplay({ capturedImage }: { capturedImage: string | null }) {

  return (
    <div className="position-relative w-full max-w-lg">
        <>
          <img className="w-full h-full object-cover rounded-2xl" src={capturedImage || "drugsImage.jpg"} alt="Captured" />
        </>
    </div>
  );
};