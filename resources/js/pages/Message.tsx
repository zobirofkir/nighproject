import { useChat } from '@/hooks/use-chat';
import { Props } from '@/types/message';
import { logout } from '@/utils/logout-user';
import { router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Message = () => {
    const { auth } = usePage<Props>().props;
    const { messages, newMessage, setNewMessage, users, selectedUser, handleSendMessage, handleUserSelect, messagesEndRef } = useChat(auth.user.id);

    const [isDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '-100%' },
    };

    const messageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleProfile = () => {
        router.visit(route('profile'));
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar with motion */}
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
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className={`flex cursor-pointer items-center border-b p-4 transition-colors duration-200 ${
                                            selectedUser?.id === user.id ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-800"></div>
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                ))}
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

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col">
                {/* Chat Header */}
                <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="rounded-full p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-700">
                            <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {selectedUser && (
                            <>
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-600 dark:to-gray-800"></div>
                                <div>
                                    <h2 className="font-bold text-gray-800 dark:text-white">{selectedUser.name}</h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={messageVariants}
                                transition={{ type: 'spring', duration: 0.5 }}
                                className={`flex ${message.user.id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                                        message.user.id === auth.user.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
                                    }`}
                                >
                                    <p className="leading-relaxed break-words">{message.content}</p>
                                    <span className="mt-1 block text-xs opacity-70">{format(new Date(message.created_at), 'HH:mm')}</span>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input */}
                {selectedUser ? (
                    <form onSubmit={handleSendMessage} className="border-t bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                className="rounded-full p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                😊
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                                className="flex-1 rounded-full border bg-gray-50 px-4 py-2.5 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <button type="submit" className="rounded-full bg-blue-500 p-2.5 text-white transition-colors hover:bg-blue-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
                        <p className="text-lg text-gray-500 dark:text-gray-400">Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
