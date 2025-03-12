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

    /**
     * Messages API Routes
     */
    Route::post('/api/messages', [MessageController::class, 'store']);
    Route::get('/api/messages', [MessageController::class, 'index']);

    Route::get('/api/users', [UserController::class, 'index']);
    Route::get('/api/messages/{user}', [MessageController::class, 'getUserMessages']);

});

require __DIR__.'/auth.php';
