<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
