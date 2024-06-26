const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    descripcion: { type: String, required: true },
    genero: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    disponibilidad: { type: Boolean, required: true },
    cantidad_stock: { type: Number, required: true },
    puntuacion_promedio: { type: Number, required: true },
    precio: { type: Number, required: true },
    imagenURL: { type: String }
});

// Índice único compuesto para titulo, autor, genero y fecha_publicacion
bookSchema.index({ titulo: 1, autor: 1, genero: 1, fecha_publicacion: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema, 'Books');

module.exports = Book;
