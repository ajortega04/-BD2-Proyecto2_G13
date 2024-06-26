const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const BookController = require('../controllers/BookController');

// Ruta para crear un libro
router.post('/create', upload.none(), BookController.createBook);

// Ruta para obtener todos los libros
router.get('/', BookController.getAllBooks);

// Ruta para obtener un libro por ID
router.get('/:id', BookController.getBookById);

// Ruta para actualizar un libro por ID
router.put('/:id', upload.none(), BookController.updateBook);

// Ruta para eliminar un libro por ID
router.delete('/:id', BookController.deleteBook);

module.exports = router;
