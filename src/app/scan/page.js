import QrScanner from '@/components/QrScanner';

export default function ScanPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <QrScanner />
      <p className="mt-4 text-gray-600">Point your camera at a QR code</p>
    </div>
  );
}
