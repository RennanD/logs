<?php

namespace App\Http\Controllers;

use App\Services\ListStudentsService;
use  Illuminate\Http\Request;

class ListStudentsController extends Controller {
  public function handle(Request $request) {

    $limit = $request->query('limit');
    $search = $request->query('search');

    // dd($name);

    $listStudents = new ListStudentsService();

    $students = $listStudents->run($limit, $search);

    return response()->json($students);
  }
}
