import { User } from '@/types/message';
import axios from 'axios';

export const fetchUsers = async (currentUserId: number): Promise<User[]> => {
    try {
        const response = await axios.get('/api/users');
        return response.data.filter((user: User) => user.id !== currentUserId);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
};
