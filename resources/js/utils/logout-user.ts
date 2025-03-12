import axios from "axios";

export const logout = async () => {
    try {
        await axios.post('/logout');
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
