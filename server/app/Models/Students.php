<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Students extends Model {
  protected $table = 'alunos';

  /**
  * @var array
  */

  protected $fillable = [
    'nome', 'aluno_id_keep'
  ];
}
