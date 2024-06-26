const Book = require('../models/Book');

class BookController {
    // Crear un nuevo libro
    static async createBook(req, res, next) {
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
                precio,
                imagenURL
            } = req.body;

            const newBook = new Book({
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
            });

            // Intentar guardar el libro
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            // Verificar si el error es debido a un índice único duplicado
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Ya existe un libro con el mismo título, autor, género y fecha de publicación' });
            }
            next(error);
        }
    }

    // Obtener todos los libros
    static async getAllBooks(req, res, next) {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    // Obtener un libro por ID
    static async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    // Actualizar un libro por ID
    static async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const {
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

            const updateFields = {
                titulo,
                autor,
                descripcion,
                genero,
                fecha_publicacion,
                disponibilidad,
                cantidad_stock,
                puntuacion_promedio,
                precio,
                imagenURL // Aquí esperamos que imagenURL sea un texto con la URL de la imagen
            };

            const updatedBook = await Book.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }

            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    // Eliminar un libro por ID
    static async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);
            if (!deletedBook) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.status(200).json({ message: 'Libro eliminado exitosamente' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BookController;
