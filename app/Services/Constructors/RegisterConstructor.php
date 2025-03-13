<?php

namespace App\Services\Constructors;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

interface RegisterConstructor
{

    public function create(): Response;

    public function store(Request $request): RedirectResponse;
}
