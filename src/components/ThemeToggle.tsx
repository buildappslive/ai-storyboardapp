import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-[#9da6b9] dark:hover:bg-[#1c1f27] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <span className="material-symbols-outlined text-[24px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            <p className="text-sm font-medium font-display leading-normal">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </p>
        </button>
    );
};

export default ThemeToggle;
