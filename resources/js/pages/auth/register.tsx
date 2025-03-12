import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    image: File | null;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Register" />
            <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full min-w-[350px] overflow-hidden md:min-w-[500px]">
                    <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">Create your account</h2>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">
                                        Profile Image
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                                        >
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            disabled={processing}
                                        />
                                        <span className="text-sm text-gray-500">Click to upload profile image</span>
                                    </div>
                                    <InputError message={errors.image} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Full name"
                                        className="border-gray-200 bg-gray-50 text-gray-500 focus:border-gray-300 focus:ring-gray-200"
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                        className="border-gray-200 bg-gray-50 text-gray-500 focus:border-gray-300 focus:ring-gray-200"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Password"
                                        className="border-gray-200 bg-gray-50 text-gray-500 focus:border-gray-300 focus:ring-gray-200"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-gray-300">
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm password"
                                        className="border-gray-200 bg-gray-50 text-gray-500 focus:border-gray-300 focus:ring-gray-200"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full bg-gray-800 text-white hover:bg-gray-700"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Create account
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                                Already have an account?{' '}
                                <TextLink href={route('login')} tabIndex={6} className="text-gray-800 hover:text-gray-600 dark:text-gray-300">
                                    Log in
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
