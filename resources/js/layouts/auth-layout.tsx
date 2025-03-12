import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
