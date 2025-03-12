import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const HeaderComponent = () => {
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.theme = newTheme;
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="mb-6 w-full">
            <nav className="relative flex items-center justify-between">
                <div className="text-2xl font-bold">WeeChat</div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative z-50 p-2 lg:hidden">
                    <div className="flex flex-col gap-1.5">
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                    </div>
                </button>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-4 lg:flex">
                    <button
                        onClick={toggleTheme}
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-[#1a1a1a]"
                        style={{
                            boxShadow:
                                theme === 'light'
                                    ? '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)'
                                    : '0px 2px 4px rgba(255, 255, 255, 0.1), 0px 4px 8px rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {theme === 'light' ? (
                            <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                                />
                                <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        )}
                    </button>
                    {auth.user ? (
                        <Link
                            href={route('messages')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Open Chat
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`fixed inset-0 z-40 transform bg-white transition-transform duration-300 ease-in-out lg:hidden dark:bg-[#1a1a1a] ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex h-full flex-col items-center justify-center gap-8">
                        <button
                            onClick={toggleTheme}
                            className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-[#2a2a2a]"
                        >
                            {theme === 'light' ? (
                                <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                                    />
                                    <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                        {auth.user ? (
                            <Link href={route('messages')} className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                                Open Chat
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
