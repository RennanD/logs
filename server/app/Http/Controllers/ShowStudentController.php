<?php

namespace App\Http\Controllers;

use App\Services\ShowStudentService;
use  Illuminate\Http\Request;

class ShowStudentController extends Controller {
  public function handle(Request $request) {

    $aluno_id = $request->student_id;
    $limit = $request->query('limit');

    $showStudentLogs = new ShowStudentService();

    $logs = $showStudentLogs->run($aluno_id, $limit);

    return response()->json($logs);
  }
}
