import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

function RegistrarUsuario() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContraseña] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleBackToLogin = () => {
        navigate('/');
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validarPassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        setSuccess('')

        if(!validateEmail(correo)) {
            setError('El correo electronico no tiene un formato valido.');
            return;
        }

        if(!validarPassword(contra)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/usuarios/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, genero, correo, contra, fecha_nacimiento: fechaNacimiento }),
            });

            const data = await response.json();

            if(response.ok) {
                setSuccess('Usuario creado satisfactoriamente');
                setNombre('');
                setApellido('');
                setGenero('');
                setCorreo('');
                setContraseña('');
                setFechaNacimiento('')
            } else {
                console.log(data.message);
                setError(data.message || 'Error al crear el usuario');
            }
        } catch(error) {
            setError('Error al conectar con el servidor');
            console.log(error);
        }
    }

    return(
        <>
            <div className='register-container'>
                <Container className='content'>
                    <div className='register-form-wrapper'>
                        <h1 className='text-center-custom mb-4'>Registrar Usuario</h1>
                        <Form className='register-form' onSubmit={handleSubmit}>
                            <Form.Group controlId='formBasicFirstName'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type='text' placeholder='Ingresa tu nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='formBasicLastName'>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type='text' placeholder='Ingresa tu apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='formBasicGender'>
                                <Form.Label>Género</Form.Label>
                                <Form.Control as='select' value={genero} onChange={(e) => setGenero(e.target.value)}>
                                    <option>Selecciona tu género</option>
                                    <option>M</option>
                                    <option>F</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Ingresa tu correo' value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' placeholder='Ingresa tu contraseña' value={contra} onChange={(e) => setContraseña(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='formBasicDOB'>
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control type='date' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                            </Form.Group>
                            <div className='d-flex justify-content-between mt-4'>
                                <Button variant='outline-success' className='boton-submit' type='submit'>Registrar</Button>
                                <Button variant='outline-danger' className='boton-back ml-2' onClick={handleBackToLogin}>Regresar</Button>
                            </div>
                        </Form>
                        {error && (
                            <Alert variant='danger' className='mt-3'>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert variant='success' className='mt-3'>
                                {success}
                            </Alert>
                        )}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default RegistrarUsuario;