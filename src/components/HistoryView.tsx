
import React, { useEffect, useState } from 'react';
import { getAllHistory, deleteHistoryItem } from '../services/dbService';
import { StoryboardResult } from '../types';

interface HistoryViewProps {
  onLoad: (result: StoryboardResult) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onLoad }) => {
  const [history, setHistory] = useState<StoryboardResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getAllHistory();
      setHistory(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (e: React.MouseEvent, dbId: number) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this recording?')) {
      await deleteHistoryItem(dbId);
      fetchHistory();
    }
  };

  if (loading) return <div className="text-center py-20 text-neutral-500">Loading your archives...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Project History</h2>
        <p className="text-neutral-500 text-sm">{history.length} projects saved locally</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-neutral-900/50 border-2 border-dashed border-neutral-800 rounded-3xl p-20 text-center">
          <p className="text-neutral-500 text-lg">No storyboards found yet. Start by generating one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div 
              key={item.dbId}
              onClick={() => onLoad(item)}
              className="group bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-6 cursor-pointer hover:border-indigo-500/50 transition-all hover:bg-neutral-800/50 shadow-sm"
            >
              <div className="w-24 h-24 bg-neutral-950 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-800">
                <img 
                  src={item.panels[0]?.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                  alt="Preview"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="text-white font-bold truncate mb-1">{item.scriptExcerpt}</h4>
                <p className="text-neutral-500 text-sm mb-2">{item.artStyle}</p>
                <p className="text-neutral-600 text-xs font-mono">
                  {new Date(item.timestamp).toLocaleString()} • {item.panels.length} Panels
                </p>
              </div>
              <button 
                onClick={(e) => handleDelete(e, item.dbId!)}
                className="p-3 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
