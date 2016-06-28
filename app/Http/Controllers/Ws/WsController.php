<?php

namespace App\Http\Controllers\Ws;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class WsController extends Controller
{
    public function checkAuth()
    {
        return response()->json([
            'auth' => \Auth::check()
        ]);
    }

    public function checkSub($channel)
    {
        return response()->json([
            'can' => \Auth::check()
        ]);
    }
}
