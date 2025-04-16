'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ScanResultContent() {
  const searchParams = useSearchParams();
  const scannedData = searchParams.get('data');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Scan Result</h1>
      <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full">
        <p className="break-words">{scannedData || 'No data found'}</p>
      </div>
      <button 
        onClick={() => window.location.href = '/scan'}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Scan Again
      </button>
    </div>
  );
}

export default function ScanResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScanResultContent />
    </Suspense>
  );
}