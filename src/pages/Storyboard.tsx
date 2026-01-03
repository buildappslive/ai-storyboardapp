import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { generateStoryboardFromScript } from '../services/geminiService';
import { saveStoryboard } from '../services/dbService';
import { createInstagramSlide } from '../services/canvasService';
import { StoryboardResult } from '../types';
import ScriptInput from '../components/ScriptInput';
import StoryboardPanel from '../components/StoryboardPanel';
import Spinner from '../components/Spinner';
import ImageModal from '../components/ImageModal';

const Storyboard: React.FC = () => {
    const [script, setScript] = useState<string>('');
    const [currentResult, setCurrentResult] = useState<StoryboardResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [selectedPanelIndex, setSelectedPanelIndex] = useState<number | null>(null);
    const [isInstagramMode, setIsInstagramMode] = useState<boolean>(true);
    const [exportWithText, setExportWithText] = useState<boolean>(true);

    const handleGenerate = useCallback(async () => {
        if (!script.trim()) return;
        setIsLoading(true);
        setError(null);
        setCurrentResult(null);
        try {
            const result = await generateStoryboardFromScript(
                script,
                setLoadingMessage,
                isInstagramMode ? '1:1' : '16:9'
            );
            setCurrentResult(result);
            await saveStoryboard(result);
        } catch (e: any) {
            setError(e.message || 'Generation failed');
        } finally {
            setIsLoading(false);
        }
    }, [script, isInstagramMode]);

    const handleDownloadAll = async () => {
        if (!currentResult) return;

        setLoadingMessage('Processing images into templates...');
        setIsLoading(true);

        try {
            const zip = new JSZip();

            for (let i = 0; i < currentResult.panels.length; i++) {
                const panel = currentResult.panels[i];
                let imageDataUrl = panel.imageUrl;

                if (exportWithText) {
                    imageDataUrl = await createInstagramSlide(
                        panel.imageUrl,
                        panel.text,
                        i + 1,
                        currentResult.panels.length
                    );
                }

                const base64Data = imageDataUrl.split(',')[1];
                const filename = `Slide_${String(i + 1).padStart(2, '0')}.png`;
                zip.file(filename, base64Data, { base64: true });

                setLoadingMessage(`Preparing Slide ${i + 1} of ${currentResult.panels.length}...`);
            }

            setLoadingMessage('Creating ZIP archive...');
            const content = await zip.generateAsync({ type: 'blob' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `Storyboard_Carousel_${Date.now()}.zip`;
            link.click();

            setTimeout(() => URL.revokeObjectURL(link.href), 100);

        } catch (err) {
            console.error('ZIP creation failed', err);
            alert('Failed to bundle images into a ZIP. Please try again.');
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <div className="layout-container flex h-full grow flex-col max-w-[1200px] mx-auto w-full px-4 md:px-8 py-6 md:py-10">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-fade-in">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold font-display leading-tight tracking-[-0.033em]">Storyboard</h1>
                <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal max-w-2xl">
                    Turn your script into visual gold. Enter your scene description and let the AI do the rest.
                </p>
            </div>

            <div className="space-y-12">
                {!currentResult && !isLoading && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                            <div className="flex gap-4">
                                <label className="flex items-center cursor-pointer space-x-3 bg-white dark:bg-[#1f2530] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#282e39] hover:border-primary transition-colors">
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Instagram Format (1:1)</span>
                                    <input
                                        type="checkbox"
                                        checked={isInstagramMode}
                                        onChange={() => setIsInstagramMode(!isInstagramMode)}
                                        className="w-5 h-5 rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary"
                                    />
                                </label>
                            </div>
                        </div>

                        <ScriptInput
                            script={script}
                            onScriptChange={setScript}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                        />

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                                {error}
                            </div>
                        )}
                    </div>
                )}

                {isLoading && (
                    <div className="mt-20 flex flex-col items-center justify-center space-y-6">
                        <Spinner />
                        <p className="text-xl text-primary animate-pulse text-center max-w-md font-medium">
                            {loadingMessage}
                        </p>
                    </div>
                )}

                {currentResult && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-200 dark:border-[#282e39] pb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Storyboard Ready</h3>
                                <p className="text-slate-500 dark:text-gray-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {currentResult.artStyle}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-[#1f2530] p-3 rounded-2xl border border-slate-200 dark:border-[#282e39]">
                                <label className="flex items-center space-x-2 px-3 py-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={exportWithText}
                                        onChange={() => setExportWithText(!exportWithText)}
                                        className="w-4 h-4 rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">Apply Post-Ready Template</span>
                                </label>
                                <div className="w-px h-8 bg-slate-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
                                <div className="flex gap-2">
                                    <button onClick={() => setCurrentResult(null)} className="px-5 py-2.5 bg-slate-100 dark:bg-[#2a2e37] text-slate-700 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-[#374151] transition-colors text-sm font-bold">
                                        New
                                    </button>
                                    <button onClick={handleDownloadAll} className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-600 transition-all font-bold shadow-lg shadow-blue-500/20">
                                        Export ZIP ({currentResult.panels.length} Slides)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentResult.panels.map((panel, idx) => (
                                <StoryboardPanel
                                    key={panel.id}
                                    panel={panel}
                                    index={idx + 1}
                                    onClick={() => setSelectedPanelIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedPanelIndex !== null && currentResult && (
                <ImageModal
                    panel={currentResult.panels[selectedPanelIndex]}
                    totalPanels={currentResult.panels.length}
                    panelIndex={selectedPanelIndex + 1}
                    onClose={() => setSelectedPanelIndex(null)}
                    onNext={() => setSelectedPanelIndex((selectedPanelIndex + 1) % currentResult.panels.length)}
                    onPrev={() => setSelectedPanelIndex((selectedPanelIndex - 1 + currentResult.panels.length) % currentResult.panels.length)}
                />
            )}
        </div>
    );
};

export default Storyboard;
