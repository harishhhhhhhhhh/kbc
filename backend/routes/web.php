<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\questionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/getQuestions', [questionController::class,'getQuestions']);
Route::put('/updateQuestionStatus', [questionController::class,'updateQuestionStatus']);
