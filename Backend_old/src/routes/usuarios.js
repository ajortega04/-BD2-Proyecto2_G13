const express = require('express');
const router = express.Router();
const Usuario = require('../controllers/usuariosController')

// Obtener todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const users = await Usuario.getAll();
    res.json(users);
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

// Crear un nuevo usuario
router.post('/add', async (req, res, next) => {
  try {
    const { nombre, apellido, genero, correo, contra, fecha_nacimiento } = req.body;
    const newUser = await Usuario.create(nombre, apellido, genero, correo, contra, fecha_nacimiento);
    res.status(201).json(newUser);
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res, next) => {
  try {
    await Usuario.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res, next) => {
  try {
    const { nombre, apellido, genero, correo, contra, fecha_nacimiento } = req.body;
    const updatedUser = await Usuario.update(req.params.id, nombre, apellido, genero, correo, contra, fecha_nacimiento);
    res.json(updatedUser);
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

// Autenticar un usuario
router.post('/auth', async (req, res, next) => {
  try {
    const { correo, contra } = req.body;
    const user = await Usuario.authUser(correo, contra);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await Usuario.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err); // Pasa el error al manejador de errores
  }
});

module.exports = router;
