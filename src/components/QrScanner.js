'use client'; // This is required since we're using browser APIs

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QrScanner() {
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const onScanSuccess = (decodedText, decodedResult) => {
      // Stop the scanner
      scanner.clear();
      // Navigate to results page with the scanned data
      router.push(`/scan-result?data=${encodeURIComponent(decodedText)}`);
    };

    const onScanError = (error) => {
      // Handle scan error
      console.warn(error);
    };

    scanner.render(onScanSuccess, onScanError);

    // Cleanup function
    return () => {
      scanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner.', error);
      });
    };
  }, [router]);

  return <div id="qr-reader" className="w-full max-w-md mx-auto" />;
}
