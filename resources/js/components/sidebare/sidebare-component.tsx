import { logout } from '@/utils/logout-user';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { SidebarInput } from '@/components/ui/sidebar';
import { Search } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

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
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

const SidebareComponent = ({ isSidebarOpen, toggleSidebar, users, selectedUser, handleUserSelect, auth, searchQuery, setSearchQuery }: Props) => {
    const handleProfile = () => {
        router.visit(route('profile'));
    };

    return (
        <motion.div
            initial={false}
            animate={{ width: isSidebarOpen ? '320px' : '0px' }}
            className="relative h-screen border-r bg-white dark:border-gray-700 dark:bg-gray-800"
        >
            <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Messages</h2>
                <button onClick={toggleSidebar} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Search Input */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <SidebarInput
                        type="search"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Users List */}
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <AnimatePresence>
                    {users.map((user) => (
                        <motion.button
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onClick={() => handleUserSelect(user)}
                            className={`flex w-full items-center space-x-3 border-l-4 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700
                                ${
                                    selectedUser?.id === user.id
                                        ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-gray-700'
                                        : 'border-transparent'
                                }
                            `}
                        >
                            <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-800">
                                {user.isActive && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-gray-800"></span>
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                    {user.name} {user.id === auth.user.id && '(You)'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.isActive ? 'Active now' : 'Offline'}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>

                {users.length === 0 && (
                    <div className="flex h-32 items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchQuery ? 'No users found' : 'No users available'}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SidebareComponent;
