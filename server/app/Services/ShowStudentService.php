<?php

namespace App\Services;

// use App\Http\Resources\StudentsCollection;
use App\Models\Students;

class ShowStudentService {
  /**
   * @return array
   */
  public function run($aluno_id, $limit = 100) {
    $studentsModel = new Students();

    $logs = $studentsModel
    ->query()
    ->where('aluno_id', '=', $aluno_id)
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
