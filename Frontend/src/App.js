import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegistrarUsuario from './components/Registro';
import Administrador from './components/Admin';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<RegistrarUsuario />} />
          <Route path='/admin' element={<Administrador />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
