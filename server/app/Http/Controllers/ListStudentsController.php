<?php

namespace App\Http\Controllers;

use App\Services\ListStudentsService;

class ListStudentsController extends Controller {
  public function handle() {
    $listStudents = new ListStudentsService();

    $students = $listStudents->run();

    return response()->json($students);
  }
}
