import HeaderComponent from '@/components/header/header-component';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] transition-colors duration-300 ease-in-out dark:bg-[#0a0a0a] dark:text-white">
            <div className="mx-auto flex w-full max-w-[335px] flex-col items-center px-4 py-6 lg:max-w-4xl lg:px-8">
                <HeaderComponent />
                {children}
            </div>
        </div>
    );
}
