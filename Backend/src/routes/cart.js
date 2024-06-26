const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const CartController = require('../controllers/CartController');

// Ruta para crear un libro
router.post('/create', upload.none(), CartController.createCart);

// Ruta para obtener todos los libros
router.get('/', CartController.getAllCarts);

// Ruta para obtener un libro por ID
router.get('/:id', CartController.getCartById);

// Ruta para actualizar un libro por ID
router.put('/:id', upload.none(), CartController.updateCart);

// Ruta para eliminar un libro por ID
router.delete('/:id', CartController.deleteCart);

module.exports = router;
