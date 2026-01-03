
import React from 'react';
import { FilmIcon } from './icons';

interface HeaderProps {
  onViewChange: (view: 'generator' | 'history') => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, currentView }) => {
  return (
    <header className="bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FilmIcon className="h-8 w-8 text-indigo-500" />
          <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
            InstaStoryboard
          </h1>
        </div>
        
        <nav className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
          <button 
            onClick={() => onViewChange('generator')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'generator' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Create
          </button>
          <button 
            onClick={() => onViewChange('history')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'history' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            History
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
