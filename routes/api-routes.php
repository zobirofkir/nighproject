<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    /**
     * Messages API Routes
     */
    Route::post('/api/messages', [MessageController::class, 'store']);
    Route::get('/api/messages', [MessageController::class, 'index']);

    Route::get('/api/users', [UserController::class, 'index']);
    Route::get('/api/messages/{user}', [MessageController::class, 'getUserMessages']);
});
