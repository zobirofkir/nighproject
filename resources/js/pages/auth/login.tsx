import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppLayout>
            <Head title="Log in" />
            <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full min-w-[350px] md:min-w-[500px] overflow-hidden">
                    <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome back</h2>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className="border-gray-200 bg-gray-50 focus:border-gray-300 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-700"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={route('password.request')}
                                                className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="border-gray-200 bg-gray-50 focus:border-gray-300 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-700"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="border-gray-300 text-gray-800 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-700"
                                    />
                                    <Label htmlFor="remember" className="text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <TextLink
                                    href={route('register')}
                                    tabIndex={5}
                                    className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
                                >
                                    Sign up
                                </TextLink>
                            </div>
                        </form>

                        {status && (
                            <div className="mt-4 rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
