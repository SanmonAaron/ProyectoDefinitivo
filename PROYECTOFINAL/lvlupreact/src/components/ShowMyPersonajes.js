import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ShowMyPersonajes = () => {
    const navigate = useNavigate()
    const [ personajes, setPersonajes ] = useState([])
    const [ personaje, setPersonaje ] = useState([])
    var usuarioLocal = localStorage.getItem('usuario')

    const endpoint = 'http://localhost:8000/api'

    useEffect (() => {
        getAllPersonajes()
    },[])
    const getAllPersonajes = async () =>{
        const response = await axios.get(`${endpoint}/personajes`)
        setPersonajes(response.data)
    }
    
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    const deletePersonaje = async (id) =>{
        await axios.delete(`${endpoint}/personaje/${id}`)
        getAllPersonajes()
    }
    const objetivos = (id) => {
        navigate(`/objetivos/${id}`)
    }
    const cancelCreate = () => {
        if(personaje.length == 1){
            alert('Solo puedes tener un personaje, puedes perzonalizar el mismo o borrarlo y crear otro nuevo')
        }else{
            navigate('/create')
        }
    } 
    const comprobarPersonaje = () => {
        var usuarioId = JSON.parse(usuarioLocal).usuario.id
        const personajesUsuario = personajes?.filter(personaje => personaje.usuario_id === usuarioId)
        setPersonaje(personajesUsuario)
    }
    setTimeout(comprobarPersonaje, 100)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <strong className="navbar-brand px-2 text-warning">⚔️LVLUP</strong>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to={'/inicio'} className='nav-link text-white'>Inicio</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/show'} className='nav-link text-white'>Ránking</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={`/showone/${JSON.parse(usuarioLocal).usuario.id}`} className='nav-link text-white'>Personaje</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="text-white m-3">Bienvenido amig@ {JSON.parse(usuarioLocal).usuario.nusuario}!</p>
                    <button onClick={logout} className="btn btn-warning m-2">Cerrar sesión</button>
                </div>
            </nav>
            <div className="mask mt-3">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-white">
                    <h1 className="mb-3">Personaje</h1>
                    <h4 className="mb-3">Aquí podrás ver todos tu personaje creado y acceder a todas sus opciones</h4>
                  </div>
                </div>
            </div>
            <button onClick={() => cancelCreate()} className='btn btn-dark mt-3 mb-5 text-white'>Crear personaje</button>
            <div className="container">
                <div className="row align-items-center">
                {personaje?.map((personaje) => (
                <div className="d-flex justify-content-center container col-5 p-5 mb-3" id="personajes" key={personaje.id}>
                    <div className="col-6 row">
                        <h4 className="text-warning mt-3 mb-3">{personaje.nombre}</h4>
                        <strong className="text-warning mb-3 mt-3">Puntuación: {personaje.puntuación}</strong>
                        <img src={personaje.avatar} />
                        <button onClick={() => objetivos(personaje.id)} className='btn btn-warning text-white mt-3'>Objetivos</button>
                        <Link to={`/edit/${personaje.id}`} className='btn btn-dark'>Personalizar</Link>
                        <button onClick={() => deletePersonaje(personaje.id)} className='btn btn-danger'>Eliminar</button>
                    </div>
                </div>
            ))}
                </div>
            </div>
        </div>
    ) 
    
    
}

export default ShowMyPersonajes