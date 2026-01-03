import React from 'react';

const Help: React.FC = () => {
    return (
        <div className="layout-container flex h-full grow flex-col">
            <div className="w-full bg-white dark:bg-[#1a202c] border-b border-[#e5e7eb] dark:border-[#2a2e37]">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary w-fit">
                            <span className="material-symbols-outlined text-sm">school</span>
                            <span className="text-xs font-bold uppercase tracking-wide">Documentation</span>
                        </div>
                        <h1 className="text-[#111318] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Help & Setup Guide</h1>
                        <p className="text-[#616f89] dark:text-gray-400 text-lg font-normal leading-relaxed">
                            A complete guide to configuring your API keys and creating AI-generated storyboards.
                            We prioritize your privacy — keys are stored locally, and no login is required.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 w-full flex flex-col lg:flex-row gap-10">
                <main className="flex-1 flex flex-col gap-12 max-w-4xl">
                    <section className="scroll-mt-28" id="getting-started">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary">
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <h2 className="text-[#111318] dark:text-white text-3xl font-bold">Getting Started</h2>
                        </div>
                        <div className="prose max-w-none text-[#616f89] dark:text-gray-300 font-body">
                            <p className="mb-4">
                                Welcome to AI Storyboard! This tool allows you to generate visual storyboards from text scripts using the power of Large Language Models (LLMs) and image generation APIs.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 p-5 rounded-xl border border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-900/30 my-6">
                                <div className="shrink-0 text-primary">
                                    <span className="material-symbols-outlined text-3xl">security</span>
                                </div>
                                <div>
                                    <h4 className="text-[#111318] dark:text-white font-bold text-lg mb-1">Important: Privacy & Security</h4>
                                    <p className="text-sm leading-relaxed">
                                        Your API keys are stored <strong>locally in your browser</strong> to communicate directly with LLM services. We do not store your keys on our servers. Clearing your browser cache will remove these keys.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-[#e5e7eb] dark:border-[#2a2e37]" />

                    <section className="scroll-mt-28" id="api-configuration">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-primary">
                                <span className="material-symbols-outlined">key</span>
                            </div>
                            <h2 className="text-[#111318] dark:text-white text-3xl font-bold">API Configuration</h2>
                        </div>
                        <p className="text-[#616f89] dark:text-gray-300 mb-8 font-body">
                            To use the generator, you need to provide your own API keys. This allows you to control your usage and costs directly with the providers.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col rounded-xl border border-[#e5e7eb] dark:border-[#2a2e37] bg-white dark:bg-[#1f2530] overflow-hidden">
                                <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a2e37] bg-gray-50/50 dark:bg-gray-800/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary">smart_toy</span>
                                        <h3 className="font-bold text-lg text-[#111318] dark:text-white">Gemini API</h3>
                                    </div>
                                    <p className="text-sm text-[#616f89] dark:text-gray-400">Google Gemini for generation.</p>
                                </div>
                                <div className="p-5 flex flex-col gap-4 font-body text-sm text-[#616f89] dark:text-gray-300">
                                    <ol className="list-decimal list-inside space-y-2 marker:text-primary marker:font-bold">
                                        <li>Sign up at <a className="text-primary hover:underline" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a>.</li>
                                        <li>Create a new API key.</li>
                                        <li>Copy the key immediately.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Help;
