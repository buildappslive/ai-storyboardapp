
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface ScriptInputProps {
  script: string;
  onScriptChange: (script: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ script, onScriptChange, onGenerate, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onScriptChange(text);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-[#1f2530] border border-slate-200 dark:border-[#282e39] rounded-2xl p-8 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <UploadIcon className="w-24 h-24 text-primary" />
      </div>

      <textarea
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        placeholder="Drop your screenplay here... Identify characters clearly for the best consistency."
        className="w-full h-72 p-6 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none text-slate-900 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-600 text-lg font-mono leading-relaxed shadow-inner"
        disabled={isLoading}
      />

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={handleUploadClick}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-slate-100 dark:bg-[#2a2e37] text-slate-700 dark:text-gray-300 rounded-xl hover:bg-slate-200 dark:hover:bg-[#374151] transition-all font-semibold disabled:opacity-50 border border-slate-200 dark:border-[#282e39] hover:border-slate-300 dark:hover:border-[#4b5563]"
          disabled={isLoading}
        >
          <UploadIcon className="w-5 h-5 mr-3" />
          Load Script (.txt)
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt"
          className="hidden"
        />
        <button
          onClick={onGenerate}
          className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:bg-slate-300 dark:disabled:bg-[#2a2e37] disabled:text-slate-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed group/btn"
          disabled={isLoading}
        >
          <span className="flex items-center">
            {isLoading ? 'Processing Script...' : 'Action: Generate Storyboard'}
            {!isLoading && <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScriptInput;
