import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar_usuario';
import '../styles/perfil.css'

function ActualizarPerfil() {
    const navigate = useNavigate();
    const id_usuario = sessionStorage.getItem('id_usuario');

    const [formulario, setFormulario] = useState({
        id_usuario: '',
        nombre: '',
        apellido: '',
        genero: '',
        correo: '',
        contraseña: '',
        fecha_nacimiento: ''
    });

    useEffect(() => {
        const fetchUsuarioData = async (id_usuario) => {
            try {
                const response = await axios.get(`http://localhost:3000/api/usuarios/${id_usuario}`)
                const usuario = response.data;
                setFormulario({
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    genero: usuario.genero,
                    correo: usuario.correo,
                    contraseña: '',
                    fecha_nacimiento: usuario.fecha_nacimiento
                });
            } catch(error) {
                console.error('Error al obtener los datos del usuario: ', error);
            }
        }
        if(id_usuario) {
            fetchUsuarioData(id_usuario);
        } else {
            console.error('ID de usuario no encontrado en el estado');
        }
    }, [id_usuario]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/usuarios/${formulario.correo}`, formulario);
            console.log('Respuesta del servidor: ', response.data);
            navigate("/catalogo");
        } catch(error) {
            console.error('Error al actualizar el perfil del usuario: ', error);
        }
    };

    return(
        <>
            <div>
                <Navbar />
                <div className="cont-general-usuario">
                    <div className="container-usuario">
                    <div className="text">Actualizar Perfil de Usuario</div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                        <div className="input-data">
                            <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="input-data">
                            <input type="text" name="apellido" value={formulario.apellido} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="apellido">Apellido</label>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="input-data">
                            <input type="text" name="genero" value={formulario.genero} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="genero">Género</label>
                        </div>
                        <div className="input-data">
                            <input type="email" name="correo" value={formulario.correo} onChange={handleChange} disabled />
                            <div className="underline"></div>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="input-data">
                            <input type="password" name="contraseña" value={formulario.contraseña} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="contraseña">Contraseña</label>
                        </div>
                        <div className="input-data">
                            <input type="date" name="fecha_nacimiento" value={formulario.fecha_nacimiento} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                        </div>
                        </div>
                        <div className="form-row submit-btn">
                        <div className="input-data">
                            <div className="inner"></div>
                            <input type="submit" value="Actualizar" />
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ActualizarPerfil;