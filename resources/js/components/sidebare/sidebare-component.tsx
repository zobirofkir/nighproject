import { logout } from '@/utils/logout-user';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { User } from '@/types';
import UserListItem from './user-list-item';

interface Props {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    users: User[];
    selectedUser: User | null;
    handleUserSelect: (user: User) => void;
    auth: {
        user: {
            name: string;
        };
    };
}

const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

const SidebareComponent = ({ isSidebarOpen, toggleSidebar, users, selectedUser, handleUserSelect, auth }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleProfile = () => {
        router.visit(route('profile'));
    };

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebarVariants}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    className="absolute inset-y-0 left-0 z-50 w-80 border-r bg-white shadow-lg md:relative md:block dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{auth.user.name}</h2>
                        <button onClick={toggleSidebar} className="rounded-full p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-700">
                            <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex h-[calc(100%-4rem)] flex-col justify-between">
                        <div className="overflow-y-auto">
                            <div className="p-4 border-b dark:border-gray-700">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-lg border bg-gray-50 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    <svg
                                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-1 p-3">
                                {filteredUsers.map((user) => (
                                    <UserListItem
                                        key={user.id}
                                        user={user}
                                        isSelected={selectedUser?.id === user.id}
                                        onClick={() => handleUserSelect(user)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3 border-t p-4 dark:border-gray-700">
                            <button
                                onClick={handleProfile}
                                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-100 px-4 py-2.5 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <span>Profile</span>
                            </button>

                            <button
                                onClick={logout}
                                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500 px-4 py-2.5 text-white transition-colors hover:bg-red-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SidebareComponent;
