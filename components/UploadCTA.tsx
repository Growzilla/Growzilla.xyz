import React, { useRef, useState } from 'react';

interface UploadCTAProps {
  theme?: 'blue' | 'green';
}

export const UploadCTA: React.FC<UploadCTAProps> = ({ theme = 'blue' }) => {
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const accent = theme === 'green' ? 'bg-green-600' : 'bg-blue-600';
  const ring = theme === 'green' ? 'ring-green-200' : 'ring-blue-200';

  return (
    <div className="w-full">
      <div className={`border border-dashed border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8 bg-white ring-2 ${ring}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 w-full md:w-auto">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Upload store data for a free audit</h4>
            <p className="text-xs sm:text-sm text-gray-600">CSV export or analytics snapshot. We'll send a prioritized conversion plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <input ref={inputRef} type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
            <button onClick={() => inputRef.current?.click()} className={`inline-flex items-center justify-center px-5 py-3 ${accent} text-white rounded-lg font-semibold shadow hover:opacity-95 transition text-sm sm:text-base w-full sm:w-auto`}>
              Choose file
            </button>
            {fileName && <span className="text-xs text-gray-600 truncate text-center sm:text-left" title={fileName}>{fileName}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCTA;





