<?php

namespace App\Services;

use App\Models\Students;

class ListStudentsService {
  /**
   * @return array
   */
  public function run() {
    $studentsModel = new Students();

    $students = $studentsModel
      ->all(['nome', 'aluno_id'])
      ->groupBy('aluno_id')
      ->take(5);

    $response = [];

    foreach($students as $student) {
      $response[] = $student[0];
    }

    return $response;
  }
}
