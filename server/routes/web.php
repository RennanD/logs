<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/teste', function () {
  return response()->json([
    'ok' => 'true'
  ]);
});

$router->group(['prefix' => '/students'], function () use ($router) {
  $router->get('/', 'ListStudentsController@handle');

  $router->get('/{student_id}', 'ShowStudentController@handle');
});

$router->group(['prefix' => '/admins'], function () use ($router) {
  $router->get('/', 'ListAdminsController@handle');
});
