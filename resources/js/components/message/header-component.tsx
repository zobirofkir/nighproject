import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const HeaderComponent = () => {

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-colors duration-200 ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } shadow-md`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <Link
                            href="/messages"
                            className={`text-xl font-bold ${
                                darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'
                            } transition-colors duration-200`}
                        >
                            WeeChat
                        </Link>
                    </div>

                    {/* Navigation Links and Dark Mode Toggle */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/profile"
                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            } transition-colors duration-200`}
                        >
                            Profile
                        </Link>

                        <button
                            onClick={toggleDarkMode}
                            className={`rounded-full p-2 transition-colors duration-200 ${
                                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
