<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Personaje;
use App\Models\Objetivos;
use App\Models\Usuario;
use Illuminate\Http\Request;

class PersonajeController extends Controller
{

    public function index()
    {
        $personajes = Personaje::all();
        return $personajes;
    }

    public function store(Request $request)
    {

        request()->validate(
            [
            'nombre' => 'required|min:5'
            ]
        );

        $personaje = new Personaje();
        $personaje->nombre = $request->nombre;
        $personaje->usuario_id = $request->usuario_id;
        $personaje->puntuación = 0;
        $personaje->avatar = $request->avatar;
        $personaje->save();

    }

    public function show($id)
    {
        $personaje = Personaje::find($id);
        return $personaje;
    }

    public function update(Request $request, $id)
    {

        request()->validate(
            [
            'nombre' => 'required|min:5'
            ]
        );
        $personaje = Personaje::findOrFail($id);
        error_log($personaje->nombre);
        error_log($request->nombre);
        $personaje->nombre = $request->nombre;
        $personaje->avatar = $request->avatar;
        $personaje->save();
        return $personaje;
    }

    public function destroy($id)
    {
        $personaje = Personaje::destroy($id);
        return $personaje;
    }

    public function subirPuntuacion(Request $request, $id)
    {
        $personaje = Personaje::findOrFail($request->id);
        $personaje->puntuación = $personaje->puntuación + 100;
        $personaje->save();
        return $personaje;
    }
}
