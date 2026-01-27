"use client";
import { useState, useRef, forwardRef, useEffect, useImperativeHandle } from "react";

export type WebcamCaptureHandle = {
  capture: () => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type WebcamDisplayProps = {
  deviceId?: string;
  onCapture?: (image: string) => void;
  className?: string;
};

const WebcamDisplay = forwardRef<WebcamCaptureHandle, WebcamDisplayProps>(
  ({ deviceId, onCapture, className }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
      startWebcam();

      return () => {
        stopWebcam();
      };
    }, [deviceId]);

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: deviceId
            ? { deviceId: { exact: deviceId } }
            : true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing webcam", error);
      }
    };

    const stopWebcam = () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
        setMediaStream(null);
      }
    };

    const captureImage = () => {
      if (!videoRef.current || !canvasRef.current) return;
      console.log("Capturing image...");

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx || !video.videoWidth || !video.videoHeight) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/jpeg");

      setCapturedImage(imageDataUrl);
    };

    useImperativeHandle(ref, () => ({
      capture: captureImage,
      start: startWebcam,
      stop: stopWebcam,
      reset: resetState,
    }));

    const resetState = () => {
      setCapturedImage(null);
      startWebcam();
      console.log(`videoRef.current:`, videoRef.current);
      console.log(`canvasRef.current:`, canvasRef.current);
    };

  return (
    <div className= {`position-relative rounded-xl ${className}`}>
        <>
          {capturedImage ? (
            <img src={capturedImage}
            className="w-full h-full object-cover rounded-xl" />
          ) : (
            <video ref={videoRef} autoPlay muted 
            className="w-full h-full object-cover rounded-xl" />
          )}
        <canvas ref={canvasRef} className="hidden" />
        </>
    </div>
  );
});

WebcamDisplay.displayName = "WebcamDisplay";
export default WebcamDisplay;
