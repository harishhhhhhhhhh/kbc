<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class questionController extends Controller
{
    function getQuestions(){
        // $questions = DB::table('questions')->get();
        // return response()->json(["questions"=>$questions]);

        $result = DB::select(Db::raw('select category,GROUP_CONCAT(question,\':[\',option1,\',\',option2,\',\',option3,\',\',option4,\',\',correct,\']\') AS questions from questions group by category'));
       
    
    return response()->json($result);
    }
}
