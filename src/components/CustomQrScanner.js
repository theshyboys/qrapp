'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomQrScanner() {
  const router = useRouter();
  const qrRef = useRef(null);

  useEffect(() => {
    const html5Qrcode = new Html5Qrcode(qrRef.current.id);

    const config = { 
      fps: 10,
      qrbox: { width: 200, height: 200 }
    };

    html5Qrcode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        html5Qrcode.stop().then(() => {
          // ใช้ sessionStorage แทน URL params
          sessionStorage.setItem('lastScanResult', decodedText);
          alert(decodedText);
          //router.push('/scan-result2');
          //router.push('/scan2');
        }).catch(console.error);
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    ).catch(console.error);

    return () => {
      html5Qrcode.stop().catch(() => {});
    };
  }, [router]);

  return <div id="qr-reader" ref={qrRef} className="w-full max-w-md mx-auto" />;
}