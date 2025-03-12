import { ChatMessage } from "@/types/message";
import axios from "axios";
export const fetchMessages = async (userId: number): Promise<ChatMessage[]> => {
    try {
        const response = await axios.get(`/api/messages/${userId}`);
        return response.data.data || [];
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        return [];
    }
};
