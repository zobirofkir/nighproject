<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Services\Facades\MessageFacade;

class MessageController extends Controller
{
    public function index()
    {
        return MessageFacade::index();
    }

    public function store(MessageRequest $request)
    {
        return MessageFacade::store($request);
    }

    public function getUserMessages($userId)
    {
        return MessageFacade::getUserMessages($userId);
    }
}
