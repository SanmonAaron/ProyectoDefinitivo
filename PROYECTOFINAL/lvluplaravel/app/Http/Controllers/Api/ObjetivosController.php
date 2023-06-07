<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Personaje;
use App\Models\Objetivos;

use Illuminate\Http\Request;

class ObjetivosController extends Controller
{
    public function index()
    {
        $objetivos = Objetivos::all();
        return $objetivos;
    }

    public function store(Request $request)
    {
        $objetivos = new Objetivos();
        $objetivos->tareas = $request->tareas;
        $objetivos->realizado = false;
        $objetivos->personaje_id = $request->personaje_id;
        $objetivos->save();
    }

    public function update(Request $request, $id)
    {

        $objetivos = Objetivos::findOrFail($id);
        $objetivos->tareas = $request->tareas;
        $objetivos->save();
        return $objetivos;
    }

    public function show($id)
    {
        $objetivos = Objetivos::find($id);
        return $objetivos;
    }

    public function destroy($id)
    {
        $objetivos = Objetivos::destroy($id);
        return $objetivos;
    }

    public function objetivoRealizado(Request $request, $id)
    {

        $objetivos = Objetivos::findOrFail($id);
        $objetivos->realizado = $request->realizado;
        $objetivos->save();
        return $objetivos;
    }
}
