"use client";

import { useEffect, useState } from "react";

type Camera = {
  deviceId: string;
  label: string;
};

type WebcamSelectorProps = {
  onSelect: (deviceId: string) => void;
};

export default function WebcamSelector({ onSelect }: WebcamSelectorProps) {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const getCameras = async () => {
      // ขอ permission ก่อน ไม่งั้น label จะว่าง
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter((d) => d.kind === "videoinput")
        .map((d, i) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${i + 1}`,
        }));

      setCameras(videoDevices);

      if (videoDevices.length > 0) {
        setSelected(videoDevices[0].deviceId);
        onSelect(videoDevices[0].deviceId);
      }
    };

    getCameras();
  }, [onSelect]);

  return (
    <select
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        onSelect(e.target.value);
      }}
      className="px-5 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {cameras.map((cam) => (
        <option key={cam.deviceId} value={cam.deviceId}>
          {cam.label}
        </option>
      ))}
    </select>
  );
}
