"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { ChevronDown } from "@untitledui/icons";

type Camera = {
  deviceId: string;
  label: string;
};

type WebcamSelectorProps = {
  onSelect: (deviceId: string) => void;
};

export default function WebcamSelector({ onSelect }: WebcamSelectorProps) {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selected, setSelected] = useState<Camera | null>(null);


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
        setSelected(videoDevices[0]);
        onSelect(videoDevices[0].deviceId);
      }
    };

    getCameras();
  }, [onSelect]);

  return (
        <Dropdown.Root>
            <Button className="group w-62 justify-between" color="secondary" iconTrailing={ChevronDown}>
                {selected?.label ?? "เลือกกล้อง"}
            </Button>
 
        <Dropdown.Popover>
            <Dropdown.Menu>
                <Dropdown.Section>
                  {cameras.map((cam) => (
                    <Dropdown.Item
                      key={cam.deviceId}
                      onClick={() => {
                        setSelected(cam);
                        onSelect(cam.deviceId);
                      }}
                    >
                        {cam.label}
                      </Dropdown.Item>
                      ))}
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown.Popover>
    </Dropdown.Root>
    // <select
    //   value={selected}
    //   onChange={(e) => {
    //     setSelected(e.target.value);
    //     onSelect(e.target.value);
    //   }}
    //   className="px-5 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    // >
    //   {cameras.map((cam) => (
    //     <option key={cam.deviceId} value={cam.deviceId}>
    //       {cam.label}
    //     </option>
    //   ))}
    // </select>
  );
}
