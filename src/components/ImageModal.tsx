
import React, { useState, useEffect } from 'react';
import { StoryboardPanel as StoryboardPanelType } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { createInstagramSlide } from '../services/canvasService';

interface ImageModalProps {
  panel: StoryboardPanelType;
  totalPanels: number;
  panelIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ panel, totalPanels, panelIndex, onClose, onNext, onPrev }) => {
  const [showTemplate, setShowTemplate] = useState(true);
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      const url = await createInstagramSlide(panel.imageUrl, panel.text, panelIndex, totalPanels);
      setTemplateUrl(url);
    };
    generatePreview();
  }, [panel, panelIndex, totalPanels]);

  return (
    <div 
      className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl flex items-center justify-center z-50 p-4 sm:p-8" 
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Toggle Switch */}
        <div className="mb-6 bg-neutral-900 p-1 rounded-full border border-neutral-800 flex shadow-2xl">
          <button 
            onClick={() => setShowTemplate(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${!showTemplate ? 'bg-neutral-700 text-white' : 'text-neutral-500'}`}
          >
            RAW IMAGE
          </button>
          <button 
            onClick={() => setShowTemplate(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${showTemplate ? 'bg-indigo-600 text-white' : 'text-neutral-500'}`}
          >
            INSTAGRAM PREVIEW
          </button>
        </div>

        <div className="relative w-full aspect-square bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
          <img 
            src={showTemplate && templateUrl ? templateUrl : panel.imageUrl} 
            alt="Storyboard Preview" 
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-2xl">
           {!showTemplate && (
             <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Original Script Text</h4>
                <p className="text-neutral-300 italic text-lg leading-relaxed">"{panel.text}"</p>
             </div>
           )}

           <div className="flex items-center gap-4">
              <button
                  onClick={onPrev}
                  className="text-neutral-400 hover:text-white p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-all"
                  aria-label="Previous"
              >
                  <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                  onClick={onClose}
                  className="px-8 py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all font-bold uppercase tracking-widest text-sm"
              >
                  Close
              </button>

              <button
                  onClick={onNext}
                  className="text-neutral-400 hover:text-white p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-all"
                  aria-label="Next"
              >
                  <ChevronRightIcon className="w-6 h-6" />
              </button>
           </div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-neutral-600 hover:text-white transition-colors"
      >
        <CloseIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ImageModal;
