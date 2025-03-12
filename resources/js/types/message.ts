import { PageProps } from '@inertiajs/core';

export interface ChatMessage {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface SelectedUser {
    id: number;
    name: string;
    email: string;
}

export interface Props extends PageProps {
    auth: {
        user: User;
    };
}
