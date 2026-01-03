
import React from 'react';
import { StoryboardPanel as StoryboardPanelType } from '../types';

interface StoryboardPanelProps {
  panel: StoryboardPanelType;
  index: number;
  onClick: () => void;
}

const StoryboardPanel: React.FC<StoryboardPanelProps> = ({ panel, index, onClick }) => {
  return (
    <div className="group relative">
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary/90 text-white font-bold flex items-center justify-center rounded-full shadow-lg z-10 border-2 border-white dark:border-[#1f2530] group-hover:scale-110 transition-transform">
        {index}
      </div>
      <button
        onClick={onClick}
        className="w-full bg-white dark:bg-[#1f2530] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-none border border-slate-200 dark:border-[#282e39] flex flex-col transform hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 text-left"
        aria-label={`View larger image for scene: ${panel.text}`}
      >
        <div className="aspect-video bg-slate-100 dark:bg-[#111318] overflow-hidden">
          <img
            src={panel.imageUrl}
            alt={`Storyboard for: ${panel.text.substring(0, 30)}...`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex-grow bg-white dark:bg-[#1f2530] border-t border-slate-100 dark:border-[#282e39]">
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4 italic">
            "{panel.text}"
          </p>
        </div>
      </button>
    </div>
  );
};

export default StoryboardPanel;
