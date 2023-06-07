import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from "./components/Index";
import ShowPersonajes from "./components/ShowPersonajes";
import ShowMyPersonajes from "./components/ShowMyPersonajes";
import CreatePersonajes from "./components/CreatePersonaje";
import EditPersonajes from "./components/EditPersonaje";
import Login from './components/Login';
import Register from './components/Register';
import Objetivo from './components/CrearObjetivo';
import Objetivos from './components/Objetivos';
import EditarObjetivo from './components/EditarObjetivo'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
         <Route path='/inicio' element={ <Index /> } />
         <Route path='/show' element={ <ShowPersonajes /> } />
         <Route path='/showone/:id' element={ <ShowMyPersonajes /> } />
         <Route path='/create' element={ <CreatePersonajes /> } />
         <Route path='/edit/:id' element={ <EditPersonajes /> } />
         <Route path='/' element={ <Login /> } />
         <Route path='/register' element={ <Register /> } />
         <Route path='/objetivo/:personaje_id' element={ <Objetivo /> } />
         <Route path='/objetivos/:personaje_id' element={ <Objetivos /> } />
         <Route path='/editarobjetivo/:objetivo_id' element={ <EditarObjetivo /> } />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
