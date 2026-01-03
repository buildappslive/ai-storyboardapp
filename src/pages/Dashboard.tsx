import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { getAllHistory, deleteHistoryItem } from '../services/dbService';
import { StoryboardResult } from '../types';
import StoryboardPanel from '../components/StoryboardPanel'; // Re-using, or maybe create a small card? 
// Actually StoryboardPanel is for the slide view. I should make a simple card here or reuse.
// Let's create a simple card structure inline or verify if StoryboardPanel is suitable.
// StoryboardPanel takes a single panel. A StoryboardResult has MANY panels.
// I should show the first panel as a thumbnail.

const Dashboard: React.FC = () => {
    const [stories, setStories] = useState<StoryboardResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setIsLoading(true);
        try {
            const data = await getAllHistory();
            setStories(data);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id?: number) => {
        e.preventDefault();
        if (!id) return;
        if (confirm('Are you sure you want to delete this storyboard?')) {
            await deleteHistoryItem(id);
            await loadHistory();
        }
    };

    const handleDownload = async (e: React.MouseEvent, story: StoryboardResult) => {
        e.preventDefault();
        if (!story.dbId) return;

        setDownloadingId(story.dbId);
        try {
            const zip = new JSZip();
            // Add all panel images to zip
            for (let i = 0; i < story.panels.length; i++) {
                const panel = story.panels[i];
                const base64Data = panel.imageUrl.split(',')[1];
                const filename = `Slide_${String(i + 1).padStart(2, '0')}.png`;
                zip.file(filename, base64Data, { base64: true });
            }

            // Generate zip
            const content = await zip.generateAsync({ type: 'blob' });

            // Trigger download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `Storyboard_${story.dbId}_${Date.now()}.zip`;
            link.click();

            setTimeout(() => URL.revokeObjectURL(link.href), 100);
        } catch (err) {
            console.error('Download failed', err);
            alert('Failed to create ZIP. Please try again.');
        } finally {
            setDownloadingId(null);
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="layout-container flex h-full grow flex-col max-w-[1200px] mx-auto w-full px-4 md:px-8 py-6 md:py-10">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-fade-in">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold font-display leading-tight tracking-[-0.033em]">Dashboard</h1>
                <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal max-w-2xl">
                    View your generated storyboards and create new masterpieces.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-[#282e39] text-center">
                    <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                        <span className="material-symbols-outlined text-4xl">auto_stories</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Stories Yet</h3>
                    <p className="text-slate-500 dark:text-gray-400 mb-6 max-w-md">
                        You haven't generated any storyboards yet. Create your first storyboard to see it here!
                    </p>
                    <Link to="/storyboard" className="px-6 py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium font-display shadow-lg shadow-blue-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">add_circle</span>
                        Create New Story
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <div key={story.dbId || story.timestamp} className="group flex flex-col bg-white dark:bg-[#1f2530] border border-slate-200 dark:border-[#282e39] rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                            {/* Thumbnail (First Panel) */}
                            <div className="relative aspect-video bg-slate-100 dark:bg-[#111318] overflow-hidden">
                                {story.panels.length > 0 ? (
                                    <img
                                        src={story.panels[0].imageUrl}
                                        alt="Story thumbnail"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={(e) => handleDownload(e, story)}
                                        disabled={downloadingId === story.dbId}
                                        className="p-2 bg-black/50 hover:bg-primary/80 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                        title="Download ZIP"
                                    >
                                        {downloadingId === story.dbId ? (
                                            <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-sm">download</span>
                                        )}
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, story.dbId)}
                                        className="p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete Storyboard"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-white text-xs font-medium">
                                    {story.panels.length} Slides
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col gap-3 flex-1">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{story.artStyle}</span>
                                        <h3 className="text-slate-900 dark:text-white font-bold text-lg line-clamp-1 leading-tight">
                                            {story.scriptExcerpt ? story.scriptExcerpt.substring(0, 20) + (story.scriptExcerpt.length > 20 ? '...' : '') : 'Untitled Story'}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-slate-500 dark:text-gray-400 text-sm line-clamp-2 min-h-[2.5em]">
                                    {story.scriptExcerpt || "No script preview available."}
                                </p>
                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-[#282e39] flex items-center justify-between text-xs text-slate-400 dark:text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {formatDate(story.timestamp)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* New Story Card (Always at end? Or maybe top. Let's keep it in the separate Empty state or header button. Actually user might miss it if list is long. Let's add a small FAB or just rely on Sidebar) */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
