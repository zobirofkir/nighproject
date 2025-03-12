import { useEffect, useState } from 'react';
import { FaCamera, FaCheck, FaEdit, FaMoon, FaSun } from 'react-icons/fa';

interface UserProfile {
    name: string;
    about: string;
    phone: string;
    avatar: string;
}

const Profile = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Test data
    const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        about: "Hey there! I'm using WhatsApp",
        phone: '+1 234 567 8900',
        avatar: 'https://via.placeholder.com/150',
    });

    const [editMode, setEditMode] = useState({
        name: false,
        about: false,
    });

    useEffect(() => {
        // Check system preference for dark mode
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);

    const handleEdit = (field: 'name' | 'about', value: string) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleEdit = (field: 'name' | 'about') => {
        setEditMode((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex min-h-screen flex-col transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Profile Header */}
            <div className={`flex items-center justify-between p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
                <h1 className="text-xl font-semibold">Profile</h1>
                <button
                    onClick={toggleDarkMode}
                    className={`rounded-full p-2 ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    } hover:bg-gray-200 dark:hover:bg-gray-600`}
                >
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
            </div>

            {/* Profile Content */}
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-6 p-6">
                {/* Avatar Section */}
                <div className="relative">
                    <img src={profile.avatar} alt="Profile" className="h-32 w-32 rounded-full object-cover shadow-lg sm:h-40 sm:w-40" />
                    <button
                        className={`absolute right-0 bottom-0 rounded-full p-2 shadow-lg ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-600 text-white'
                        }`}
                    >
                        <FaCamera size={20} />
                    </button>
                </div>

                {/* Name Section */}
                <div className={`w-full rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <div className="flex items-center justify-between">
                        <label className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Name</label>
                        <button onClick={() => toggleEdit('name')} className="transition-colors duration-200 hover:text-gray-600">
                            {editMode.name ? <FaCheck className="text-gray-500" /> : <FaEdit className="text-gray-400" />}
                        </button>
                    </div>
                    {editMode.name ? (
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => handleEdit('name', e.target.value)}
                            className={`mt-1 w-full border-b p-2 focus:outline-none ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-800 text-white focus:border-gray-400'
                                    : 'border-gray-200 bg-white text-gray-800 focus:border-gray-600'
                            }`}
                        />
                    ) : (
                        <p className="mt-1">{profile.name}</p>
                    )}
                </div>

                {/* About Section */}
                <div className={`w-full rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <div className="flex items-center justify-between">
                        <label className={darkMode ? 'text-gray-300' : 'text-gray-500'}>About</label>
                        <button onClick={() => toggleEdit('about')} className="transition-colors duration-200 hover:text-gray-600">
                            {editMode.about ? <FaCheck className="text-gray-500" /> : <FaEdit className="text-gray-400" />}
                        </button>
                    </div>
                    {editMode.about ? (
                        <input
                            type="text"
                            value={profile.about}
                            onChange={(e) => handleEdit('about', e.target.value)}
                            className={`mt-1 w-full border-b p-2 focus:outline-none ${
                                darkMode
                                    ? 'border-gray-600 bg-gray-800 text-white focus:border-gray-400'
                                    : 'border-gray-200 bg-white text-gray-800 focus:border-gray-600'
                            }`}
                        />
                    ) : (
                        <p className="mt-1">{profile.about}</p>
                    )}
                </div>

                {/* Phone Section */}
                <div className={`w-full rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <label className={darkMode ? 'text-gray-300' : 'text-gray-500'}>Phone</label>
                    <p className="mt-1">{profile.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
