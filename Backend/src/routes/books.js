const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const BookController = require('../controllers/BookController');
const { uploadFile } = require('../s3');

router.post('/create', upload.single('imagen'), async (req, res, next) => {
    try {
        const {
            titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio
        } = req.body;

        const imagen = req.file; // Obtener la ruta del archivo subido

        // Procesa la imagen (subirla a S3 u otro almacenamiento)
        const result = await uploadFile(imagen);

        const newBook = await BookController.createBook({
            titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio,
            imagenURL: result // Asigna la URL de la imagen subida
        });

        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
});

// Ruta para obtener todos los libros
router.get('/', BookController.getAllBooks);

// Ruta para obtener un libro por ID
router.get('/:id', BookController.getBookById);

// Actualizar un libro por ID
router.post('/update', upload.single('imagen'), async (req, res, next) => {
    try {
        const {
            _id,
            titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio,
            imagenURL
        } = req.body;

        let imagenRuta = '';

        // Procesar la imagen si se ha subido
        if (req.file) {
            const result = await uploadFile(req.file); // Subir imagen a S3 y obtener la URL
            imagenRuta = result;
        } else {
            imagenRuta = imagenURL; // Si no se sube una nueva imagen, mantener la existente
        }

        const updatedBook = await BookController.updateBook(_id, {
            titulo,
            autor,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            puntuacion_promedio,
            precio,
            imagenURL: imagenRuta // Usar la URL procesada de la imagen
        });

        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
});

router.get('/by-author/:authorName', async (req, res, next) => {
    try {
        const { authorName } = req.params;
        const books = await BookController.getBooksByAuthor(authorName);
        res.json(books);
    } catch (err) {
        next(err);
    }
});

// Ruta para eliminar un libro por ID
router.delete('/:id', BookController.deleteBook);

module.exports = router;
