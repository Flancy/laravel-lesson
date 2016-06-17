<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use Image;

class UserController extends Controller
{
    public function profile() {
        return view('profile.profile', ['user' => Auth::user()]);
    }

    public function updateAvatar(Request $request) {
        if($request->ajax()) {
            if($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $filename = time() . '.' . $avatar->getClientOriginalExtension();
                $makeImg = Image::make($avatar)->resize(300, 300)->save( public_path('/images/uploads/avatars/' . $filename ) );

                if($makeImg) {
                    $user = Auth::user();
                    $user->avatar = $filename;
                    $user->save();

                    return response()->json([Auth::user()]);
                }

                else {
                    return response()->json(array('data' => $request->all(), 'error' => 'Не сохранился файл'));
                }
            }
            else {
                return response()->json(array('data' => $request->all(),'error' => 'Нет файла'));
            }
        }

        else {
            return response()->json(array('error' => 'Не ajax'));
        }
    }
}
