import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="relative flex h-full min-h-screen w-full flex-row overflow-x-hidden bg-background-light dark:bg-background-dark font-body text-slate-900 dark:text-white transition-colors duration-200">
            {/* Sidebar Navigation */}
            <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318] md:flex">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                        {/* Logo Area */}
                        <div className="flex items-center gap-3 px-2">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">movie_filter</span>
                            </div>
                            <h1 className="text-slate-900 dark:text-white text-lg font-bold font-display leading-normal">AI Storyboard</h1>
                        </div>
                        {/* Navigation Links */}
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/"
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/')
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white'
                                    : 'text-slate-500 hover:bg-slate-100 dark:text-[#9da6b9] dark:hover:bg-[#1c1f27]'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[24px]">dashboard</span>
                                <p className="text-sm font-medium font-display leading-normal">Dashboard</p>
                            </Link>
                            <Link
                                to="/storyboard"
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/storyboard')
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white'
                                    : 'text-slate-500 hover:bg-slate-100 dark:text-[#9da6b9] dark:hover:bg-[#1c1f27]'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[24px]">auto_awesome_motion</span>
                                <p className="text-sm font-medium font-display leading-normal">Storyboard</p>
                            </Link>
                            <Link
                                to="/settings"
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/settings')
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white'
                                    : 'text-slate-500 hover:bg-slate-100 dark:text-[#9da6b9] dark:hover:bg-[#1c1f27]'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[24px] fill-current">settings</span>
                                <p className="text-sm font-medium font-display leading-normal">Settings</p>
                            </Link>
                            <Link
                                to="/help"
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/help')
                                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white'
                                    : 'text-slate-500 hover:bg-slate-100 dark:text-[#9da6b9] dark:hover:bg-[#1c1f27]'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[24px]">help</span>
                                <p className="text-sm font-medium font-display leading-normal">Help</p>
                            </Link>
                        </div>
                        {/* Theme Toggle */}
                        <div className="mt-auto px-2 pb-4">
                            <ThemeToggle />
                        </div>
                    </div>
                    {/* User/Footer Area */}
                    <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-[#282e39] pt-4">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                JS
                            </div>
                            <div className="flex flex-col">
                                <p className="text-slate-900 dark:text-white text-sm font-medium font-display leading-tight">Local User</p>
                                <p className="text-slate-400 dark:text-[#9da6b9] text-xs font-normal">No account required</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto w-full">
                {/* Top Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-[#282e39] bg-white dark:bg-[#111318]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">movie_filter</span>
                        <span className="font-bold font-display dark:text-white">AI Storyboard</span>
                    </div>
                    <button className="text-slate-500 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                {children}
            </main>
        </div>
    );
};

export default Layout;
