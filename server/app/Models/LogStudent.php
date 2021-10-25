<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogStudent extends Model {
  protected $table = 'log_acessos_aluno';

  /**
  * @var array
  */

  protected $fillable = [
    'nome', 'aluno_id', 'ip', 'url', 'data'
  ];
}
