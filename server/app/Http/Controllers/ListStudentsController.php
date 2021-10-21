<?php

namespace App\Http\Controllers;

use App\Services\ListStudentsService;
use  Illuminate\Http\Request;

class ListStudentsController extends Controller {
  public function handle(Request $request) {

    $limit = $request->query('limit');
    $name = $request->query('name');

    // dd($name);

    $listStudents = new ListStudentsService();

    $students = $listStudents->run($limit, $name);

    return response()->json($students);
  }
}
