import AppLayout from '@/layouts/app-layout';
import { type SharedData as Home } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage<Home>().props;

    return (
        <AppLayout>
            {/* Main Content */}
            <main className="flex w-full flex-col items-center text-center">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="mb-6 text-4xl font-bold lg:text-6xl">Connect Instantly with WeeChat</h1>
                    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                        A simple, secure, and reliable way to chat with friends and family
                    </p>
                    {auth.user ? (
                        <Link
                            href={route('messages')}
                            className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
                        >
                            Start Chatting
                        </Link>
                    ) : (
                        <Link
                            href={route('register')}
                            className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
                        >
                            Get Started
                        </Link>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <div className="mb-4 text-3xl">💬</div>
                        <h3 className="mb-2 text-xl font-semibold">Real-time Messaging</h3>
                        <p className="text-gray-600 dark:text-gray-300">Send and receive messages instantly with real-time updates</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <div className="mb-4 text-3xl">🔒</div>
                        <h3 className="mb-2 text-xl font-semibold">Secure Chats</h3>
                        <p className="text-gray-600 dark:text-gray-300">Your conversations are private and protected</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                        <div className="mb-4 text-3xl">🌐</div>
                        <h3 className="mb-2 text-xl font-semibold">Cross-Platform</h3>
                        <p className="text-gray-600 dark:text-gray-300">Chat from any device, anywhere, anytime</p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">Join thousands of users who are already enjoying WeeChat</p>
                    {!auth.user && (
                        <div className="flex justify-center gap-4">
                            <Link href={route('register')} className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
                                Create Account
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-lg border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} WeeChat. All rights reserved.</p>
            </footer>
        </AppLayout>
    );
}
