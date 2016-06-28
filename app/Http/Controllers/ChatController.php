<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Http\Requests;

use App\Message;

use App\Event\NewMessageAdded;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getIndex(Message $messages)
    {

        $messages = $messages->all();

        return view('chat.chat', ['messages' => $messages]);
    }

    public function postMessage(Request $request, Message $messages)
    {
        $result = $this->validator($request->all());

        if ($result->fails()) {
            response()->json($result->messages());
        }

        else {
            $user = ['user_id' => $request->user()->id, 'name' => $request->user()->name];

            $data = array_merge($user, $request->all());

            $message = $this->create($data);

            $message = $messages->find($message->id);
            $message->push($message->user->avatar);
            $message = json_encode($message);
            
            event(
                new \App\Events\NewMessageAdded($message)
            );
        }
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'message' => 'required|min:1',
        ]);
    }

    protected function create(array $data)
    {
        return Message::create([
            'user_id' =>  $data['user_id'],
            'author' => $data['name'],
            'message' => $data['message'],
        ]);
    }
}
