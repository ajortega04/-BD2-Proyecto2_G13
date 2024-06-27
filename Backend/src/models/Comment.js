const mongoose = require('mongoose');

// Definir el esquema del comentario
const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Descripcion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    bookId: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
