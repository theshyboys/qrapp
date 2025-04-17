import CustomQrScanner from '@/components/CustomQrScanner';
import QRScanner2 from '@/components/QRScanner2';

export default function ScanPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {/* <h1 className="text-2xl font-bold mb-6">สแกน QR Code</h1> */}
      <QRScanner2 />
    </main>
  );
}
