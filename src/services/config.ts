export const getGeminiApiKey = (): string | null => {
    const localKey = localStorage.getItem('gemini_api_key');
    if (localKey) return localKey;

    // Fallback to env var if available
    // Vite exposes env vars on import.meta.env
    return import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || null;
};

export const setGeminiApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
};
