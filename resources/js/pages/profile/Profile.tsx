import { useEffect, useRef, useState } from 'react';
import { FaCamera, FaCheck, FaEdit, FaSave, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';

// Add default avatar constant
const DEFAULT_AVATAR = 'https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png';

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

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageError, setImageError] = useState<string>('');

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


    // Add these new handler functions
    const handleSaveChanges = () => {
        // TODO: Implement save changes logic
        console.log('Saving changes...');
    };

    const handleLogout = () => {
        // TODO: Implement logout logic
        console.log('Logging out...');
    };

    const handleDeleteAccount = () => {
        // TODO: Implement delete account logic
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Deleting account...');
        }
    };

    // Add this function to handle image errors
    const handleImageError = () => {
        setProfile((prev) => ({
            ...prev,
            avatar: DEFAULT_AVATAR,
        }));
    };

    // Add this function to handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setImageError('Please select an image file');
            return;
        }

        // Validate file size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image size should be less than 5MB');
            return;
        }

        setImageError('');

        // Create object URL for preview
        const imageUrl = URL.createObjectURL(file);
        setProfile((prev) => ({
            ...prev,
            avatar: imageUrl,
        }));

        // TODO: Implement actual file upload to server
        console.log('File selected:', file);
    };

    // Add this function to trigger file input click
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex min-h-screen flex-col transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>

            {/* Profile Content */}
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-6 p-6">
                {/* Avatar Section */}
                <div className="relative">
                    <img
                        src={profile.avatar}
                        alt="Profile"
                        onError={handleImageError}
                        className="h-32 w-32 rounded-full object-cover shadow-lg sm:h-40 sm:w-40"
                    />
                    <button
                        onClick={handleAvatarClick}
                        className={`absolute right-0 bottom-0 rounded-full p-2 shadow-lg transition-colors duration-200 ${
                            darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}
                    >
                        <FaCamera size={20} />
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </div>

                {/* Display image error if any */}
                {imageError && <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{imageError}</p>}

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

                {/* Action Buttons Section */}
                <div className="flex w-full flex-col gap-4">
                    <button
                        onClick={handleSaveChanges}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
                            darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        <FaSave size={18} />
                        Save Changes
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
                            darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        <FaSignOutAlt size={18} />
                        Logout
                    </button>

                    <button
                        onClick={handleDeleteAccount}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
                            darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                    >
                        <FaTrashAlt size={18} />
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
