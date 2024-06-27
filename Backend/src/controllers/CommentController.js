const Comment = require('../models/Comment')
const Book = require('../models/Book');


const CommentController = {
    postAddComment: async (req, res) => {
        try {
            const { userId, descripcion, puntuacion, bookId } = req.body;
            const now = new Date();
            console.log(req.body)

            const newComment = new Comment({
                userId: userId,
                Descripcion: descripcion,
                createdAt: now,
                puntuacion: puntuacion,
                bookId: bookId
            });

            const pipeline = [
                { $match: { bookId } },
                { $group: { _id: "$bookId", puntuacionPromedio: { $avg: "$puntuacion" } } }
            ];

            const result = await Comment.aggregate(pipeline);
            if (result.length > 0) {
                let book = await Book.findOne({ _id: bookId });
                book.puntuacion_promedio = parseFloat(result[0].puntuacionPromedio.toFixed(2));
                await book.save();
            } 
            res.status(200).json({ message: 'Commentario Agregado', newComment });
            await newComment.save();

        } catch (error) {
            res.status(500).json({ message: 'Error Agregar Un Commentario', error: error.message });
        }
    },
    getComment: async (req, res) => {
        try {
            const idbook = req.params.bookId;
            const bookComments = await Comment.find({ bookId: idbook }).populate('userId', 'name');
            const formattedComments = bookComments.map(comment => ({
                id: comment._id,
                userName: comment.userId.name ? comment.userId.name : null,
                Descripcion: comment.Descripcion,
                createdAt: comment.createdAt,
                puntuacion: comment.puntuacion
            }));
            res.status(200).json(formattedComments);
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo los comentarios', error: error.message });
        }
    }
};

module.exports = CommentController;