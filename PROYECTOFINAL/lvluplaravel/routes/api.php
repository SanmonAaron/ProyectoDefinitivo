<?php

use App\Http\Controllers\Api\PersonajeController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ObjetivosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(PersonajeController::class)->group(function (){
    Route::get('/personajes', 'index');
    Route::post('/personaje', 'store');
    Route::get('/personaje/{id}', 'show');
    Route::put('/personaje/{id}', 'update');
    Route::delete('/personaje/{id}', 'destroy');
    Route::put('/puntuacion/{id}', 'subirPuntuacion');
});
Route::controller(UsuarioController::class)->group(function (){
    Route::post('/register', 'store');
    Route::post('/login', 'login');
    Route::get('/usuarios', 'index');
    Route::get('/usuario/{id}', 'show');
});
Route::controller(ObjetivosController::class)->group(function (){
    Route::get('/objetivos', 'index');
    Route::post('/objetivo', 'store');
    Route::get('/objetivos/{id}', 'show');
    Route::delete('/objetivo/{id}', 'destroy');
    Route::put('/objetivo/{id}', 'update');
    Route::put('/objetivoCumplido/{id}', 'objetivoRealizado');
});


