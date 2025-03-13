<?php

namespace App\Services\Constructors;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\RegisterRequest;
use Inertia\Response;

interface RegisterConstructor
{

    public function create(): Response;

    public function store(RegisterRequest $request): RedirectResponse;
}
