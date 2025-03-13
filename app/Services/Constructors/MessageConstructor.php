<?php

namespace App\Services\Constructors;

use App\Http\Requests\MessageRequest;

interface MessageConstructor
{
    public function index();

    public function store(MessageRequest $request);

    public function getUserMessages($userId);
}
