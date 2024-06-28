const Cart = require('../models/Cart'); // Importa el modelo de Cart
const User = require('../models/User'); // Importa el modelo de User
const Book = require('../models/Book'); // Importa el modelo de Book

const HistoryController = {
    getCartStatusProceso: async (req, res) => {
        try {
            const carts = await Cart.find({ status: 'en proceso' })
                .populate({
                    path: 'items.bookId',
                    select: 'titulo author precio' // Selecciona 'titulo', 'author' y 'precio' del libro
                })
                .populate('userId', 'name') // Pobla el usuario asociado y selecciona solo 'name'
                .select('_id createdAt items'); // Excluye _id y selecciona solo 'items' y 'createdAt'

            if (!carts || carts.length === 0) {
                return res.status(404).json({ message: 'No hay carritos en proceso' });
            }

            // Formatear la respuesta para enviar solo los datos necesarios
            const cartsFormatted = carts.map(cart => ({
                id: cart._id,
                userId: cart.userId ? cart.userId.name : 'Usuario no encontrado', // Verifica si userId existe antes de acceder a name
                createdAt: cart.createdAt, // Fecha de creación del carrito
                items: cart.items.map(item => ({
                    bookId: item.bookId ? item.bookId._id : null, // Acceder al ID del libro
                    titulo: item.bookId && item.bookId.titulo ? item.bookId.titulo : 'Título no encontrado', // Acceder al título del libro, verificando la existencia
                    author: item.bookId && item.bookId.autor ? item.bookId.autor : 'Autor no encontrado', // Acceder al autor del libro, verificando la existencia
                    precio: item.bookId && item.bookId.precio ? item.bookId.precio : 0, // Acceder al precio del libro, verificando la existencia
                    cantidad: item.quantity // Cantidad del libro en el carrito
                }))
            }));

            res.status(200).json(cartsFormatted);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
        }
    },
    getCartStatusEnviado: async (req, res) => {
        try {
            const carts = await Cart.find({ status: 'enviado' })
                .populate({
                    path: 'items.bookId',
                    select: 'titulo author precio' // Selecciona 'titulo', 'author' y 'precio' del libro
                })
                .populate('userId', 'name') // Pobla el usuario asociado y selecciona solo 'name'
                .select('-_id items createdAt status'); // Excluye _id y selecciona solo 'items' y 'createdAt'

            if (!carts || carts.length === 0) {
                return res.status(404).json({ message: 'No hay carritos en enviado' });
            }

            // Formatear la respuesta para enviar solo los datos necesarios
            const cartsFormatted = carts.map(cart => ({
                userId: cart.userId ? cart.userId.name : 'Usuario no encontrado', // Verifica si userId existe antes de acceder a name
                createdAt: cart.createdAt, // Fecha de creación del carrito
                items: cart.items.map(item => ({
                    bookId: item.bookId ? item.bookId._id : null, // Acceder al ID del libro
                    titulo: item.bookId && item.bookId.titulo ? item.bookId.titulo : 'Título no encontrado', // Acceder al título del libro, verificando la existencia
                    author: item.bookId && item.bookId.autor ? item.bookId.autor : 'Autor no encontrado', // Acceder al autor del libro, verificando la existencia
                    precio: item.bookId && item.bookId.precio ? item.bookId.precio : 0, // Acceder al precio del libro, verificando la existencia
                    cantidad: item.quantity // Cantidad del libro en el carrito
                }))
            }));

            res.status(200).json(cartsFormatted);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
        }
    },
    getCartStatusEntregado: async (req, res) => {
        try {
            const carts = await Cart.find({ status: 'entregado' })
                .populate({
                    path: 'items.bookId',
                    select: 'titulo author precio' // Selecciona 'titulo', 'author' y 'precio' del libro
                })
                .populate('userId', 'name') // Pobla el usuario asociado y selecciona solo 'name'
                .select('-_id items createdAt'); // Excluye _id y selecciona solo 'items' y 'createdAt'

            if (!carts || carts.length === 0) {
                return res.status(404).json({ message: 'No hay carritos en entregado' });
            }

            // Formatear la respuesta para enviar solo los datos necesarios
            const cartsFormatted = carts.map(cart => ({
                userId: cart.userId ? cart.userId.name : 'Usuario no encontrado', // Verifica si userId existe antes de acceder a name
                createdAt: cart.createdAt,
                id: cart.id, // Fecha de creación del carrito
                items: cart.items.map(item => ({
                    bookId: item.bookId ? item.bookId._id : null, // Acceder al ID del libro
                    titulo: item.bookId && item.bookId.titulo ? item.bookId.titulo : 'Título no encontrado', // Acceder al título del libro, verificando la existencia
                    author: item.bookId && item.bookId.autor ? item.bookId.autor : 'Autor no encontrado', // Acceder al autor del libro, verificando la existencia
                    precio: item.bookId && item.bookId.precio ? item.bookId.precio : 0, // Acceder al precio del libro, verificando la existencia
                    cantidad: item.quantity // Cantidad del libro en el carrito
                }))
            }));

            res.status(200).json(cartsFormatted);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
        }
    },
    potCambioStatus: async (req, res) => {
        try {
            const { id } = req.body;
            console.log(id)
            let cart = await Cart.findOne({ _id: id });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Actualizar el estado del carrito
            cart.status = "enviado";
            await cart.save();
            res.status(200).json({ message: 'Cart status updated successfully', cart });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los Cambio de Status', error: error.message });
        }
    },
    getReporteVentas: async (req, res) => {
        try {
            const pipeline = [
                { $match: { status: "entregado" } },
                { $unwind: "$items" },
                { $group: { _id: "$items.bookId", totalQuantity: { $sum: "$items.quantity" } } },
                { $sort: { totalQuantity: -1 } },
                { $limit: 10 }
            ];
            const topBooks = await Cart.aggregate(pipeline);

            const bookIds = topBooks.map(book => book._id);

            const books = await Book.find({ _id: { $in: bookIds } })
                .select('titulo')

            const result = topBooks.map(book => {
                const bookInfo = books.find(b => b._id.equals(book._id));
                return {
                    bookId: book._id,
                    totalQuantity: book.totalQuantity,
                    title: bookInfo ? bookInfo.titulo : "Title not found"
                };
            });

            res.status(200).json({ message: 'Cart status updated successfully', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los Cambio de Status', error: error.message });
        }
    }
};

module.exports = HistoryController;


