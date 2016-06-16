<?php

use App\Task;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('/task', 'TaskController@index');
Route::post('/task', 'TaskController@store');
Route::post('/task/show', 'TaskController@show');
Route::delete('/task/{task}', 'TaskController@destroy');

Route::get('/profile', 'UserController@profile');
Route::post('/profile', 'UserController@updateAvatar');
