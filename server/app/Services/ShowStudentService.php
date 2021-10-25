<?php

namespace App\Services;

// use App\Http\Resources\StudentsCollection;

use App\Models\LogStudent;

class ShowStudentService {
  /**
   * @return array
   */
  public function run($aluno_id, $limit = 100, $url = '') {
    $studentsModel = new LogStudent();

    $logs = $studentsModel
    ->query()
    ->where('aluno_id', '=', $aluno_id)
    ->where('url', 'like', '%'.$url.'%')
    ->paginate($limit);

    $response = [];

    foreach($logs as $log) {
      $response[] = $log;
    }

    return [
      "result" => $response,
      "current_page" => $logs->currentPage(),
      "last_page" => $logs->lastPage()
    ];
  }
}
