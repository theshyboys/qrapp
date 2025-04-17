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
            beep();
            console.log('QR Code detected:', decodedText);
            //alert(decodedText);
            router.push(`/scan-result?data=${encodeURIComponent(decodedText)}`);
            scannerRef.current.stop().catch(console.error);
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


    // ฟังก์ชันสำหรับทำเสียงบี๊ปเมื่อสแกนสำเร็จ
    const beep = () => {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioContext = new AudioContext();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.value = 800;
          gainNode.gain.value = 0.5;
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
          console.error('Error playing beep sound:', error);
        }
      };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Container สำหรับ Html5Qrcode */}
      <div id="reader" ref={videoRef} className="w-full h-full" />
      
    </div>
  );
}