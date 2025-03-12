<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;

class MessageController extends Controller
{
    public function index()
    {
        return MessageResource::collection(
            Message::with('user')->latest()->take(50)->get()
        );
    }

    public function store(MessageRequest $request)
    {
        $message = Message::create(array_merge(
            $request->validated(),
            ['user_id' => Auth::id()]
        ));

        $pusher = new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), ['cluster' => env('PUSHER_APP_CLUSTER')]);

        $pusher->trigger('chat-channel', 'new-message', ['message' => $message]);

        return MessageResource::make($message);
    }
}
