<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Facades\RegisterFacade;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class RegisterController extends Controller
{
    public function create(): Response
    {
        return RegisterFacade::create();
    }

    public function store(RegisterRequest $request): RedirectResponse
    {
        return RegisterFacade::store($request);
    }
}
