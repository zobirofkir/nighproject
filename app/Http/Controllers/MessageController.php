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
        $message = Message::create([
            'user_id' => Auth::id(),
            'recipient_id' => $request->recipient_id,
            'content' => $request->content
        ]);

        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            ['cluster' => env('PUSHER_APP_CLUSTER')]
        );

        $message->load('user'); // Load the user relationship
        $pusher->trigger('chat-channel', 'new-message', ['message' => $message]);

        return MessageResource::make($message);
    }

    public function getUserMessages($userId)
    {
        return MessageResource::collection(
            Message::where(function($query) use ($userId) {
                $query->where('user_id', Auth::id())
                      ->where('recipient_id', $userId)
                      ->orWhere('user_id', $userId)
                      ->where('recipient_id', Auth::id());
            })
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get()
        );
    }
}
