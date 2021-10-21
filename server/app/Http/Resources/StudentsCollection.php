<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentsCollection extends JsonResource {
  public function toArray($request) {
    return [
      "nome" => $this->resource->nome,
      "aluno_id" => $this->resource->aluno_id,
    ];
  }
}
