import { PageProps } from '@inertiajs/core';

export interface ChatMessage {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
    isActive: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    image: string | null;
}

export interface SelectedUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    image: string;
}

export interface Props extends PageProps {
    auth: {
        user: User;
    };
}
