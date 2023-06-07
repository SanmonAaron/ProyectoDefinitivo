import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/objetivos'


const EditarObjetivo = () => {
    const [tareas, setTareas] = useState('')
    const navigate = useNavigate()
    const {objetivo_id} = useParams()
    var usuarioLocal = localStorage.getItem('usuario')

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8000/api/objetivo/${objetivo_id}`, {
            tareas: tareas
        })
        navigate(`/showone/${JSON.parse(usuarioLocal).usuario.id}`)
    }

    useEffect (() => {
        const getObjetivoById = async () => {
           const response = await axios.get(`${endpoint}/${objetivo_id}`)
           setTareas(response.data.tareas)
        }
        getObjetivoById()
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
            <div className="d-flex  justify-content-center">
            <form className="col-6 mt-5 p-5" onSubmit={update}>
                <h2 className="mt-3 mb-5 text-warning">Editar tarea</h2>
                <div className="mb-3">
                    <label className='form-label text-white'><strong>Tarea</strong></label>
                    <input value={tareas} onChange={(e) => setTareas(e.target.value)} type='text' className='form-control border border-dark mb-3'/>
                </div>
                <button type='submit' className='btn btn-warning mb-2 mt-5'>Editar tarea</button>
            </form>
            </div>
        </div>
      )
}

export default EditarObjetivo