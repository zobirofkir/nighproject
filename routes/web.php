<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    /**
     * Messages Route
     */
    Route::get('/messages', function () {
        return inertia('Message');
    })->name('messages');

    Route::get('/profile', function () {
        return inertia('profile/Profile');
    })->name('profile');

    Route::get('/users/{user}', function (App\Models\User $user) {
        return inertia('UserProfile', [
            'user' => $user->only('id', 'name', 'email', 'created_at', 'isActive', 'image')
        ]);
    })->name('user.profile');

});

require __DIR__.'/auth.php';
require __DIR__.'/api-routes.php';
