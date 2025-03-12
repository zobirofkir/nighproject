import { ChatMessage, Props, SelectedUser, User } from '@/types/message';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import Pusher from 'pusher-js';
import React, { useEffect, useRef, useState } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
axios.defaults.headers.common['Accept'] = 'application/json';

const Message = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const { auth } = usePage<Props>().props;

    useEffect(() => {
        axios
            .get('/api/users')
            .then((response) => {
                setUsers(response.data.filter((user: User) => user.id !== auth.user.id));
            })
            .catch((error) => {
                console.error('Failed to fetch users:', error);
            });
    }, []);

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
        });

        // Subscribe to the channel
        const channel = pusher.subscribe('chat-channel');

        // Listen for new messages
        channel.bind('new-message', (data: { message: ChatMessage }) => {
            setMessages((prevMessages) => {
                // Only add the message if it's related to the selected conversation
                if (selectedUser && (data.message.user.id === selectedUser.id || data.message.user.id === auth.user.id)) {
                    return [...prevMessages, data.message];
                }
                return prevMessages;
            });
        });

        // Cleanup on component unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && selectedUser) {
            try {
                await axios.post('/api/messages', {
                    content: newMessage,
                    recipient_id: selectedUser.id,
                });
                setNewMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        axios
            .get(`/api/messages/${user.id}`)
            .then((response) => {
                // Ensure we're setting an array of messages
                setMessages(response.data.data || []); // Access the data property from Laravel API Resource
            })
            .catch((error) => {
                console.error('Failed to fetch messages:', error);
                setMessages([]); // Set empty array on error
            });
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        // Make a POST request to the logout endpoint
        axios
            .post('/logout')
            .then(() => {
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    const sidebarVariants = {
        open: { width: '20rem', opacity: 1, x: 0 },
        closed: { width: 0, opacity: 0, x: '-100%' },
    };

    const messageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Sidebar with motion */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        className={`absolute inset-y-0 left-0 z-50 border-r bg-white md:relative md:block dark:border-gray-700 dark:bg-gray-800`}
                    >
                        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{auth.user.name}</h2>
                            <button onClick={toggleSidebar} className="rounded p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-700">
                                <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto">
                            <div>
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className={`flex cursor-pointer items-center border-b p-4 ${selectedUser?.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t p-4 dark:border-gray-700">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
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
                <div className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleSidebar} className="rounded p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-700">
                            <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {selectedUser && (
                            <>
                                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div>
                                    <h2 className="font-semibold text-gray-800 dark:text-white">{selectedUser.name}</h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Chat Messages with motion */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-gray-900">
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
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        message.user.id === auth.user.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
                                    }`}
                                >
                                    <p className="break-words">{message.content}</p>
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
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                                😊
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                                className="flex-1 rounded-full border p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <button type="submit" className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
