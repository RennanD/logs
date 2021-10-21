<?php

namespace App\Http\Controllers;

use App\Services\ShowStudentService;
use  Illuminate\Http\Request;

class ShowStudentController extends Controller {
  public function handle(Request $request) {

    $aluno_id = $request->student_id;
    $limit = $request->query('limit');
    $url = $request->query('url');

    $showStudentLogs = new ShowStudentService();

    $logs = $showStudentLogs->run($aluno_id, $limit, $url);

    return response()->json($logs);
  }
}
