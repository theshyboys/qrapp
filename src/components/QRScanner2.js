'use client'; // ต้องใช้ client component ใน Next.js

import { Html5Qrcode,Html5QrcodeScanType } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


export default function QRScanner2() {
  const scannerRef = useRef(null);//<Html5Qrcode | null>(null);
  const videoRef = useRef(null);//<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const initScanner = async () => {
      try {
        const scanner = new Html5Qrcode('reader');
        scannerRef.current = scanner;

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        };

        await scanner.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            console.log('QR Code detected:', decodedText);
            //alert(decodedText);
            router.push(`/scan-result?data=${encodeURIComponent(decodedText)}`);
            // ทำอะไรกับข้อมูลที่ได้
          },
          (errorMessage) => {
            // ไม่ต้องแสดงข้อผิดพลาดหากผู้ใช้หยุดสแกนเอง
            if (errorMessage !== 'QR code parse error, error = NotFoundException: No MultiFormat Readers were able to detect the code.') {
              console.warn('QR Code scan error:', errorMessage);
            }
          }
        );

        // ปรับสไตล์ video element ให้เต็มจอ
        const videoElement = document.querySelector('#reader video');// as HTMLVideoElement;
        if (videoElement) {
          videoElement.style.width = '100vw';
          videoElement.style.height = '100vh';
          videoElement.style.objectFit = 'cover';
          videoElement.style.position = 'fixed';
          videoElement.style.top = '0';
          videoElement.style.left = '0';
        }
      } catch (err) {
        console.error('Failed to initialize scanner:', err);
      }
    };

    initScanner();

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [router]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Container สำหรับ Html5Qrcode */}
      <div id="reader" ref={videoRef} className="w-full h-full" />
      
      {/* Overlay สำหรับ UI เพิ่มเติม */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="border-2 border-white rounded-lg w-64 h-64 relative">
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-white"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-white"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-white"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-white"></div>
        </div>
      </div> */}
    </div>
  );
}