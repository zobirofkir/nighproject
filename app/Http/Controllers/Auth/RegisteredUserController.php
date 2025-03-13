<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Facades\RegisterFacade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return RegisterFacade::create();
    }

    public function store(Request $request): RedirectResponse
    {
        return RegisterFacade::store($request);
    }
}
