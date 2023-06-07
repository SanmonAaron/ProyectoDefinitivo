import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/objetivos'


const Objetivos = () => {
    const [ puntuacion, setPuntuacion ] = useState()
    const [ objetivos, setObjetivos ] = useState([])
    const [ personaje, setPersonaje ] = useState({})
    const [ tareas, setTareas ] = useState([])
    const navigate = useNavigate()
    const {personaje_id} = useParams()
    var usuarioLocal = localStorage.getItem('usuario')

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    // const updateNivel = async () => {
    //     await axios.put(`${endpoint2}/${id}`, {
    //         puntuación: puntuacion,
    //     })
    //     navigate('/inicio')
    // }

    const crearTarea = () => {
        navigate(`/objetivo/${personaje_id}`)
    }
    const getAllObjetivos = async () =>{
        const response = await axios.get(`${endpoint}`);
        setObjetivos(response.data)
    }
    const getPersonaje = async () =>{
        const response = await axios.get(`http://localhost:8000/api/personaje/${personaje_id}`)
        setPersonaje(response.data)
    }
    const filtrarTareas = async () => {
        const tareasUsuario = objetivos?.filter(objetivo => objetivo.personaje_id === personaje.id)
        setTareas(tareasUsuario)
    }
    const updatePuntuacion = () => {
        objetivos?.map(objetivo => {
            if(objetivo.personaje_id == personaje_id){
                axios.put(`http://localhost:8000/api/puntuacion/${personaje_id}`, {
                    puntuación: puntuacion
                })
            }
        })
        objetivos?.map(objetivo =>  {
            if(objetivo.personaje_id == personaje_id){
                axios.delete(`http://localhost:8000/api/objetivo/${objetivo.id}`)
            }
        })
        navigate(`/showone/${JSON.parse(usuarioLocal).usuario.id}`)
    }
    const eliminarObjetivo = (objetivoId) => {
        axios.delete(`http://localhost:8000/api/objetivo/${objetivoId}`)
    }
    useEffect (() => {
        getPersonaje()
        getAllObjetivos()
        filtrarTareas()
        const getPersonajeById = async () => {
            const response = await axios.get(`http://localhost:8000/api/personaje/${personaje_id}`)
            setPuntuacion(response.data.puntuación)
        }
        getPersonajeById()
        // eslint-disable-next-line
    }, [])

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
                    <h1 className="mb-3">Objetivos</h1>
                    <h4 className="mb-3">Completa las tareas para subir la puntuación de tu personaje</h4>
                  </div>
                </div>
            </div>
        <div className="container mt-5">
        <button onClick={() => crearTarea()} className='btn btn-dark text-white'>Añadir tarea</button>
        <div className="container mt-3">
            <div className="row align-items-center">
                <table className="mask" border="1">
                    <thead></thead>
                    <tbody>
                    {tareas?.map((tarea) => (
                    <tr key={tarea.id}>
                        <td>{tarea.tareas}</td>
                        <td>
                        <div>
                            <input type="checkbox" className="form-check-input m-1" id="exampleCheck1" />
                            <label className="form-check-label" forhtml="exampleCheck1">Realizado!</label>
                        </div>
                        </td>
                        <td>
                            <Link to={`/editarobjetivo/${tarea.id}`} className='btn btn-warning text-white m-1'>Editar tarea</Link>
                            <button onClick={() => eliminarObjetivo(tarea.id)} className='btn btn-danger text-white m-1'>Eliminar</button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>      
            </div>
            <button onClick={() => updatePuntuacion()} className='btn btn-dark text-white m-3'>Añadir puntos</button>
        </div>
        </div>
    </div>
  )
}

export default Objetivos