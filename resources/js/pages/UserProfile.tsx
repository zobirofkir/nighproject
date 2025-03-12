import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';

interface Props {
    user: User;
}

const UserProfile = () => {
    const { user } = usePage<Props>().props;

    return (
        <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
            <div className="mx-auto max-w-3xl px-4">
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    {/* Profile Header */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
                        <div className="absolute -bottom-12 left-8">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg dark:border-gray-800">
                                {/* You can add user avatar here if available */}
                                <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="px-8 pt-16 pb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                            <Link
                                href="/messages"
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Back to Messages
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member since</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">{format(new Date(user.created_at), 'MMMM dd, yyyy')}</p>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">
                                    {user.isActive ? <span className="text-green-500">Active</span> : <span className="text-gray-500">Inactive</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
