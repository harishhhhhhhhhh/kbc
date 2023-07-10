<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class questionController extends Controller
{
    function getQuestions(){
        // $questions = DB::table('questions')->get();
        // return response()->json(["questions"=>$questions]);

        // $result = DB::select(Db::raw('select category,GROUP_CONCAT(question,\':[\',option1,\',\',option2,\',\',option3,\',\',option4,\',\',correct,\']\') AS questions from questions group by category'));
        $results = DB::table('questions')
    ->select('category', 'question', 'option1', 'option2', 'option3', 'option4', 'correct','id')
    ->where('visible','=',0)
    ->orderBy('category')
    ->get();

    
    return response()->json($results);
    }

    function updateQuestionStatus(Request $request){

        $question_id = $request->input('id');
        DB::table('questions')
        ->where('id','=',$question_id)
        ->update(['visible'=>1]);

    }

    function upload(Request $request){
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // Process the uploaded Excel file using Maatwebsite\Excel
            $data = Excel::toArray([], $file);

            if (!empty($data)) {
                $rows = $data[0]; // Assuming the data is present in the first sheet

                // Assuming you have a table named 'excel_data' to save the data
                foreach ($rows as $row) {
                    DB::table('excel_data')->insert([
                        'column1' => $row[0], // Access the appropriate columns from the imported row
                        'column2' => $row[1],
                        // Set values for other columns accordingly
                    ]);
                }
                return response()->json(['message' => 'Upload successful']);
            }

        }
        return response()->json(['message' => 'No file uploaded'], 400);
    }

    
}


