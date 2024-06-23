import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminAlert, setShowAdminAlert] = useState(false);
  const [showUserAlert, setShowUserAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRegistrer = () => {
    navigate('/register')
  };

  const handleCheckboxChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowAdminAlert(false);
    setShowUserAlert(false);
    if (isAdmin && email === 'admin@gmail.com' && password === 'Admin123') {
      navigate("/admin");
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: email, contra: password }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.state) {
            sessionStorage.setItem('id_usuario', data.id_usuario);//Para guardar el id del usuario en el sessionStorage
            navigate('/catalogo');

          } else {
            setError('Credenciales invalidas');
          }
        } else {
          setError(data.message || 'Error al conectar con el servidor');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      }
    }
  }

  return (
    <div className='login-container-custom'>
      <Container className='content-custom'>
        <div className='login-form-wrapper-custom'>
          <h1 className='text-center-custom mb-4'>Inicio de Sesión</h1>
          <Form className='login-form-custom' onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='labels'>Email</Form.Label>
              <Form.Control type='email' placeholder='Ingresa tu correo' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label className='labels'>Contraseña</Form.Label>
              <Form.Control type='password' placeholder='Ingresa tu password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check className='labels' type='checkbox' label="administrador" onChange={handleCheckboxChange} />
            </Form.Group>
            <div className='d-flex-custom justify-content-between mt-4'>
              <Button variant='outline-success' type='submit'>Ingresar</Button>
              <Button variant='outline-danger' className='ml-2' onClick={handleBackToHome}>Regresar</Button>
            </div>
            <div className='text-center-custom mt-3'>
              <Button variant='link' onClick={handleRegistrer}>¿No tienes una cuenta? Regístrate</Button>
            </div>
          </Form>
          {showAdminAlert && (
            <Alert variant='success' className='mt-3'>
              Bienvenido Administrador<br />
              Cargando ventana...
            </Alert>
          )}
          {showUserAlert && (
            <Alert variant='success' className='mt-3'>
              Bienvenido Usuario<br />
            </Alert>
          )}
          {error && (
            <Alert variant='danger' className='mt-3'>
              {error}
            </Alert>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Login;
