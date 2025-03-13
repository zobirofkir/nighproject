import MessageLayout from '@/layouts/message/message-layout';
import { useRef, useState } from 'react';
import { FaCamera, FaCheck, FaEdit, FaSave } from 'react-icons/fa';

const DEFAULT_AVATAR = 'https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png';

interface UserProfile {
    name: string;
    about: string;
    phone: string;
    avatar: string;
}

const Profile = () => {
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

    const handleSaveChanges = () => {
        console.log('Saving changes...');
    };

    const handleImageError = () => {
        setProfile((prev) => ({
            ...prev,
            avatar: DEFAULT_AVATAR,
        }));
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setImageError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setImageError('Image size should be less than 5MB');
            return;
        }

        setImageError('');

        const imageUrl = URL.createObjectURL(file);
        setProfile((prev) => ({
            ...prev,
            avatar: imageUrl,
        }));

        console.log('File selected:', file);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <MessageLayout>
            <div className="flex h-screen flex-col items-center justify-center mt-10 bg-gray-100 transition-colors duration-200 dark:bg-gray-900">
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
                            className={`g-gray-600 hover:bg-gray-700' } absolute right-0 bottom-0 rounded-full bg-gray-700 p-2 text-gray-300 text-white shadow-lg transition-colors duration-200 hover:bg-gray-600`}
                        >
                            <FaCamera size={20} />
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                    </div>

                    {/* Display image error if any */}
                    {imageError && <p className="text-sm text-red-500 dark:text-red-400">{imageError}</p>}

                    {/* Name Section */}
                    <div className="w-full rounded-lg bg-white p-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 dark:text-gray-300">Name</label>
                            <button onClick={() => toggleEdit('name')} className="transition-colors duration-200 hover:text-gray-600">
                                {editMode.name ? <FaCheck className="text-gray-500" /> : <FaEdit className="text-gray-400" />}
                            </button>
                        </div>
                        {editMode.name ? (
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => handleEdit('name', e.target.value)}
                                className="mt-1 w-full border-b border-gray-200 bg-white p-2 text-gray-800 focus:border-gray-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-400"
                            />
                        ) : (
                            <p className="mt-1">{profile.name}</p>
                        )}
                    </div>

                    {/* About Section */}
                    <div className="w-full rounded-lg bg-white p-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-500 dark:text-gray-300">About</label>
                            <button onClick={() => toggleEdit('about')} className="transition-colors duration-200 hover:text-gray-600">
                                {editMode.about ? <FaCheck className="text-gray-500" /> : <FaEdit className="text-gray-400" />}
                            </button>
                        </div>
                        {editMode.about ? (
                            <input
                                type="text"
                                value={profile.about}
                                onChange={(e) => handleEdit('about', e.target.value)}
                                className="mt-1 w-full border-b border-gray-200 bg-white p-2 text-gray-800 focus:border-gray-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-400"
                            />
                        ) : (
                            <p className="mt-1">{profile.about}</p>
                        )}
                    </div>

                    {/* Phone Section */}
                    <div className="w-full rounded-lg bg-white p-4 text-gray-800 shadow-md dark:bg-gray-800 dark:text-white">
                        <label className="text-gray-500 dark:text-gray-300">Phone</label>
                        <p className="mt-1">{profile.phone}</p>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="flex w-full flex-col gap-4">
                        <button
                            onClick={handleSaveChanges}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            <FaSave size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </MessageLayout>
    );
};

export default Profile;
