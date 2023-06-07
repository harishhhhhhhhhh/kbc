<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class questionController extends Controller
{
    function getQuestions(){
        $questions = DB::table('questions')->get();
        return response()->json(["questions"=>$questions]);
    }
}
