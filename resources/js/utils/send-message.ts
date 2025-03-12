import axios from "axios";

export const sendMessage = async (message: string, recipientId: number) => {
    try {
        await axios.post('/api/messages', {
            content: message,
            recipient_id: recipientId,
        });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};
