<?php

namespace App\Services;

use App\Models\Students;

class ListStudentsService {
  /**
   * @return array
   */
  public function run($limit = 10, $name = null) {
    $studentsModel = new Students();

    $students = $studentsModel
      ->all(['nome', 'aluno_id'])
      ->groupBy('aluno_id')
      ->take($limit);

    $response = [];

    foreach($students as $student) {
      $response[] = $student[0];
    }

    return $response;
  }
}
