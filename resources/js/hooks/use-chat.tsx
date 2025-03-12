import { ChatMessage, SelectedUser, User } from '@/types/message';
import { fetchMessages } from '@/utils/fetch-messages';
import { fetchUsers } from '@/utils/fetch-users';
import { sendMessage } from '@/utils/send-message';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

export const useChat = (currentUserId: number) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchUsers(currentUserId).then(setUsers);
    }, [currentUserId]);

    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
        });

        const channel = pusher.subscribe('chat-channel');
        channel.bind('new-message', (data: { message: ChatMessage }) => {
            setMessages((prev) => {
                if (selectedUser && (data.message.user.id === selectedUser.id || data.message.user.id === currentUserId)) {
                    return [...prev, data.message];
                }
                return prev;
            });
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [selectedUser, currentUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && selectedUser) {
            await sendMessage(newMessage, selectedUser.id);
            setNewMessage('');
        }
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        fetchMessages(user.id).then(setMessages);
    };

    return {
        messages,
        newMessage,
        setNewMessage,
        users,
        selectedUser,
        handleSendMessage,
        handleUserSelect,
        messagesEndRef,
    };
};
