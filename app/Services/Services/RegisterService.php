<?php

namespace App\Services\Services;

use App\Http\Requests\RegisterRequest;
use App\Services\Constructors\RegisterConstructor;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RegisterService implements RegisterConstructor
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        $request->validated();

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('profile-images', 'public');
            $userData['image'] = Storage::url($path);
        }

        $user = User::create($userData);

        event(new Registered($user));

        Auth::login($user);

        return back();
    }
}
