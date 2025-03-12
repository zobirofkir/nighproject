import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';

interface ChatMessage {
    id: number;
    content: string;
    sender: 'me' | 'other';
    timestamp: Date;
}

interface User {
    id: number;
    name: string;
    status: 'online' | 'offline';
    lastSeen?: Date;
}

const Message = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sample users data
    const users: User[] = [
        { id: 1, name: 'John Doe', status: 'online' },
        { id: 2, name: 'Jane Smith', status: 'offline', lastSeen: new Date() },
        { id: 3, name: 'Mike Johnson', status: 'online' },
        { id: 4, name: 'Sarah Wilson', status: 'offline', lastSeen: new Date() },
    ];

    // Sample data - replace with your actual data
    useEffect(() => {
        setMessages([
            {
                id: 1,
                content: 'Hey, how are you?',
                sender: 'other',
                timestamp: new Date(),
            },
            {
                id: 2,
                content: "I'm good, thanks! How about you?",
                sender: 'me',
                timestamp: new Date(),
            },
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    content: newMessage,
                    sender: 'me',
                    timestamp: new Date(),
                },
            ]);
            setNewMessage('');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? 'w-80' : 'w-0'
                } border-r bg-white transition-all duration-300 md:relative md:block dark:border-gray-700 dark:bg-gray-800 ${
                    isSidebarOpen ? 'absolute inset-y-0 left-0 z-50' : 'hidden'
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Contacts</h2>
                    <button onClick={toggleSidebar} className="rounded p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-700">
                        <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center border-b p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            <div className="ml-4">
                                <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                                <p className={`text-sm ${user.status === 'online' ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {user.status === 'online' ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                            <h2 className="font-semibold text-gray-800 dark:text-white">Chat Title</h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Online</span>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-gray-900">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
                                    }`}
                                >
                                    <p className="break-words">{message.content}</p>
                                    <span className="mt-1 block text-xs opacity-70">{format(message.timestamp, 'HH:mm')}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="border-t bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center space-x-2">
                        <button type="button" className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
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
            </div>
        </div>
    );
};

export default Message;
