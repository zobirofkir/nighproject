import AppLayout from '@/layouts/app-layout';
import { type SharedData as Home } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Home() {
    const { auth } = usePage<Home>().props;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <AppLayout>
            <main className="flex w-full flex-col items-center text-center">
                {/* Hero Section with Motion */}
                <div className="relative mb-20 w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight lg:text-7xl">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Connect Instantly</span>
                                <br />
                                with WeeChat
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mb-8 text-xl text-gray-600 dark:text-gray-300"
                            >
                                A simple, secure, and reliable way to chat with friends and family
                            </motion.p>
                            {auth.user ? (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={route('messages')}
                                        className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                                    >
                                        Start Chatting
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="absolute top-0 left-0 -z-10 h-64 w-64 rounded-full bg-blue-400 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: 0.5,
                        }}
                        className="absolute top-20 right-0 -z-10 h-64 w-64 rounded-full bg-purple-400 blur-3xl"
                    />
                </div>

                {/* Features Grid with Motion */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="container mx-auto mb-20 grid gap-8 px-4 lg:grid-cols-3"
                >
                    {/* Feature 1 */}
                    <motion.div
                        variants={itemVariants}
                        className="group rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className="mb-6 text-5xl">
                            💬
                        </motion.div>
                        <h3 className="mb-4 text-2xl font-bold">Real-time Messaging</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Experience lightning-fast messaging with instant updates and seamless delivery
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        variants={itemVariants}
                        className="group rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className="mb-6 text-5xl">
                            🔒
                        </motion.div>
                        <h3 className="mb-4 text-2xl font-bold">Secure Chats</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            End-to-end encryption ensures your conversations remain private and protected
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        variants={itemVariants}
                        className="group rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className="mb-6 text-5xl">
                            🌐
                        </motion.div>
                        <h3 className="mb-4 text-2xl font-bold">Cross-Platform</h3>
                        <p className="text-gray-600 dark:text-gray-300">Stay connected across all your devices with perfect synchronization</p>
                    </motion.div>
                </motion.div>

                {/* Call to Action with Motion */}
                <div className="relative mt-16 w-full bg-gradient-to-t from-blue-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto px-4 text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold">Ready to get started?</h2>
                        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">Join thousands of users who are already enjoying WeeChat</p>
                        {!auth.user && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center gap-6"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                                    >
                                        Create Account
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-gray-300 bg-white px-8 py-4 font-semibold transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-xl dark:border-gray-600 dark:bg-gray-800"
                                    >
                                        Sign In
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                        className="absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-blue-400 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: 0.5,
                        }}
                        className="absolute bottom-20 left-0 -z-10 h-64 w-64 rounded-full bg-purple-400 blur-3xl"
                    />
                </div>
            </main>
        </AppLayout>
    );
}
