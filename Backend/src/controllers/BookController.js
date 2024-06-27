const Book = require('../models/Book');

class BookController {
    // Controlador para crear un libro
    static async createBook({
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
    }) {
        try {
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
            return savedBook;
        } catch (error) {
            // Verificar si el error es debido a un índice único duplicado
            if (error.code === 11000) {
                throw new Error('Ya existe un libro con el mismo título, autor, género y fecha de publicación');
            }
            throw error;
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
    static async updateBook(id, updateFields) {
        try {
            // Realizar la actualización en la base de datos
            const updatedBook = await Book.findByIdAndUpdate(id, updateFields, { new: true });

            // Verificar si el libro existe y enviar la respuesta
            if (!updatedBook) {
                throw new Error('Libro no encontrado > '+id);
            }

            return updatedBook;
        } catch (error) {
            throw error; // Propaga el error para que sea manejado por el middleware de error en Express
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

        static async getBooksByAuthor(authorName) {
            try {
                const books = await Book.find({ autor: authorName });
                return books;
            } catch (error) {
                throw error;
            }
        }
}

module.exports = BookController;
