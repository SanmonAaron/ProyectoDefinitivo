import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../css/style.css'

const endpoint = 'http://localhost:8000/api'

const ShowPersonajes = () => {
    const [ usuarios, setUsuarios ] = useState([])
    const [ personajes, setPersonajes ] = useState([])
    const navigate = useNavigate()
    var usuarioLocal = localStorage.getItem('usuario')
    const idAvatar = ""

    useEffect (() => {
        getAllPersonajes();
        getAllUsuarios();
    },[])

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const getAllUsuarios = async () =>{
        const response = await axios.get(`${endpoint}/usuarios`)
        setUsuarios(response.data)
    }
    const getAllPersonajes = async () =>{
       const response = await axios.get(`${endpoint}/personajes`)
       //setPersonajes(response.data)
       const newData = [...response.data];
       newData.sort((a, b) => b.puntuación - a.puntuación);
       setPersonajes(newData);
    }
    const myuser = (personajeId) => {
        const myusuario = usuarios?.find(usuario => usuario.id === personajeId)
        return myusuario.nusuario
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
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
                    <h1 className="mb-3">Ránking de personajes</h1>
                    <h4 className="mb-3">Aquí podrás ver todos los personajes creados de los usuarios y compararlos con los tuyos</h4>
                  </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <table className="mask mt-3" border="1">
                        <thead></thead>
                        <tbody>
                        <tr>
                            <th>Nombre</th>
                            <th>Puntuación</th>
                            <th>Avatar</th>
                        </tr>
                        {personajes?.map((personaje, index) => (
                        <tr key={index}>
                            <td>{personaje.nombre}</td>
                            <td>{personaje.puntuación}</td>
                            <td>
                                <img id="avatarRanking" src={personaje.avatar} />
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            
        </div>
    )
  
}

export default ShowPersonajes