<?php

namespace App\Services;

use App\Http\Resources\StudentsCollection;
use App\Models\Students;

class ListStudentsService {
  /**
   * @return array
   */
  public function run($limit = 10, $search = '') {
    $studentsModel = new Students();

    $students = $studentsModel
    ->query()
    ->where('nome', 'like', '%'.$search.'%')
    ->orWhere('aluno_id_keep', 'like', '%'.$search.'%')
    // ->groupBy('aluno_id')
    ->orderBy('nome', 'ASC')
    ->paginate($limit);

    $countStudents = $studentsModel
      ->query()
      ->where('nome', 'like', '%'.$search.'%')
      ->orWhere('aluno_id_keep', 'like', '%'.$search.'%')
      ->get()
      ->count();

    $studentsCollection = new StudentsCollection($students);

    return [
      "result" => $studentsCollection->collection($students),
      "current_page" => $students->currentPage(),
      "last_page" => $students->lastPage(),
      "count" => $countStudents
    ];
  }
}
