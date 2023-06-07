import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../css/style.css'

const endpoint = 'http://localhost:8000/api/personaje'

const EditPersonaje = () => {

    const [nombre, setNombre] = useState('')
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    var usuarioLocal = localStorage.getItem('usuario')

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}/${id}`, {
            nombre: nombre,
            avatar: avatar
        })
        navigate(`/showone/${JSON.parse(usuarioLocal).usuario.id}`)
    }
    useEffect (() => {
        const getPersonajeById = async () => {
           const response = await axios.get(`${endpoint}/${id}`)
           setNombre(response.data.nombre)
           setAvatar(response.data.avatar)
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
        <div className="d-flex  justify-content-center">
        <form className="col-6 mt-5 p-5" onSubmit={update}>
            <h2 className="mt-3 mb-5 text-warning">Personalizar personaje</h2>
            <div className="mb-3">
                <label className='form-label text-white'><strong>Nombre</strong></label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' className='form-control border border-dark mb-3'/>
                <span className="text-white">*El nombre debe contener almenos 5 caracteres</span>
            </div>
            <label className='form-label text-white'><strong>Elige un avatar</strong></label>
            <br/>
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <label for="imagen1">
                            <img src='https://e1.pngegg.com/pngimages/531/653/png-clipart-wow-classes-icon-hunter-crest-thumbnail.png' />
                        </label>
                        <input type="radio" id="imagen1" name="imagen" value='https://e1.pngegg.com/pngimages/531/653/png-clipart-wow-classes-icon-hunter-crest-thumbnail.png' onChange={(e) => setAvatar(e.target.value)} />
                    </div>
                    <div class="col-md-4">
                        <label for="imagen2">
                            <img src='https://e1.pngegg.com/pngimages/904/898/png-clipart-wow-classes-icon-warlock-crest-thumbnail.png' />
                        </label>
                        <input type="radio" id="imagen2" name="imagen" value='https://e1.pngegg.com/pngimages/904/898/png-clipart-wow-classes-icon-warlock-crest-thumbnail.png' onChange={(e) => setAvatar(e.target.value)} />
                    </div>
                    <div class="col-md-4">
                        <label for="imagen3">
                            <img src='https://e1.pngegg.com/pngimages/390/307/png-clipart-wow-classes-icon-shaman-crest-thumbnail.png' />
                        </label>
                        <input type="radio" id="imagen3" name="imagen" value='https://e1.pngegg.com/pngimages/390/307/png-clipart-wow-classes-icon-shaman-crest-thumbnail.png' onChange={(e) => setAvatar(e.target.value)} />
                    </div>
                </div>
            </div>
            <button type='submit' className='btn btn-warning mb-2 mt-5'>Personalizar personaje</button>
        </form>
        </div>
    </div>
  )
}

export default EditPersonaje