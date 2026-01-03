import React, { useState, useEffect } from 'react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/config';

const Settings: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const key = getGeminiApiKey();
        if (key) setApiKey(key);
    }, []);

    const handleSave = () => {
        setGeminiApiKey(apiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="layout-container flex h-full grow flex-col max-w-[1200px] mx-auto w-full px-4 md:px-8 py-6 md:py-10">
            {/* Page Header */}
            <div className="flex flex-col gap-2 mb-8 animate-fade-in">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold font-display leading-tight tracking-[-0.033em]">Application Settings</h1>
                <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal max-w-2xl">
                    Configure your API connections to power the storyboard generation engine. Your keys are stored locally in your browser and are never sent to our servers.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Settings Forms */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* LLM Section */}
                    <section className="flex flex-col gap-4 bg-white dark:bg-[#111318] p-6 rounded-xl border border-slate-200 dark:border-[#282e39] shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#282e39] pb-4 mb-2">
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold font-display flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">smart_toy</span>
                                LLM Configuration
                            </h2>
                            {saved && (
                                <span className="px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-500/20">Saved</span>
                            )}
                        </div>

                        {/* Provider Select (Simplified for now as only Gemini is supported in this logic, but keeping UI) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 dark:text-white text-sm font-medium font-display leading-normal">Select Provider</label>
                            <div className="relative">
                                <select className="w-full appearance-none rounded-lg border border-slate-300 dark:border-[#3b4354] bg-slate-50 dark:bg-[#1c1f27] px-4 py-3 pr-10 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body text-base transition-shadow">
                                    <option value="gemini">Google Gemini</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-[#9da6b9]">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* API Key Input */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-slate-900 dark:text-white text-sm font-medium font-display leading-normal">API Key</label>
                                <a className="text-xs text-primary hover:underline flex items-center gap-1" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
                                    Get your key
                                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                </a>
                            </div>
                            <div className="relative group">
                                <input
                                    className="w-full rounded-lg border border-slate-300 dark:border-[#3b4354] bg-slate-50 dark:bg-[#1c1f27] px-4 py-3 pr-12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#9da6b9] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body transition-shadow"
                                    placeholder="AIza..."
                                    type={showKey ? "text" : "password"}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600 dark:text-[#9da6b9] dark:hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">{showKey ? 'visibility' : 'visibility_off'}</span>
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-[#6b7280]">Key is required for story generation.</p>
                        </div>
                    </section>

                    {/* Action Bar */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-transparent dark:border-transparent">
                        <button
                            onClick={() => setApiKey('')}
                            className="w-full sm:w-auto px-6 py-3 rounded-lg text-slate-600 dark:text-[#9da6b9] hover:bg-slate-100 dark:hover:bg-[#1c1f27] font-medium font-display transition-colors text-sm"
                        >
                            Reset to Defaults
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium font-display shadow-lg shadow-blue-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">save</span>
                            Save Settings
                        </button>
                    </div>
                </div>

                {/* Right Column: Info Cards */}
                <div className="flex flex-col gap-6">
                    {/* Privacy Card */}
                    <div className="relative overflow-hidden rounded-xl bg-[#111318] group">
                        <div className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKqfzO2nbP5mX9gVYiFrzRTf17LGnRrJbtM0CGHuv-n-HlfBo475cWWmJpV1F7AEd1Uw6uWAUXrtRqM_4x2dNJxA_dhYhbKnSjJQ-Y7X3aNSxT6tH6O6e5EL5nQ79mP065TxCCgj0ayzzYnvzYJTH6s4wL0Y7ij83az-G1sVZOTFCCyg8AJOkxHjfFIHprZngH2D9yRKPfsfOKk8N6SzkL3Bhqpo6P-e6uvG5JP4NA0hL-52Y5SII-MkjRyoLQ_eW-rMPDiCCucsg")' }}></div>
                        <div className="relative z-10 p-6 flex flex-col gap-4 h-full justify-end min-h-[240px]">
                            <div className="bg-primary/20 p-2 rounded-lg w-fit text-white backdrop-blur-sm">
                                <span className="material-symbols-outlined">shield_lock</span>
                            </div>
                            <div>
                                <h3 className="text-white text-xl font-bold font-display leading-tight mb-2">Privacy First</h3>
                                <p className="text-slate-200 text-sm font-normal leading-relaxed">
                                    Your API keys are encrypted and stored securely in your browser's local storage. We never transmit them to our servers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
