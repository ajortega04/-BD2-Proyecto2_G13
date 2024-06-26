const Cart = require('../models/Cart');
const User = require('../models/User');
const Book = require('../models/Book');

const CartController = {
    getAllCarts: async (req, res) => {
        try {
            const carts = await Cart.find().populate('userId').populate('items.bookId');
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCart: async (req, res) => {
        try {
            const { userId } = req.body;

            // Verificar que el usuario exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar si el carrito ya existe para el usuario
            let cart = await Cart.findOne({ userId });
            if (cart) {
                return res.status(400).json({ message: 'Cart already exists for this user' });
            }

            cart = new Cart({ userId, items: [] });
            await cart.save();
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCartByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            const cart = await Cart.findOne({ userId }).populate('items.bookId');
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addItemToCart: async (req, res) => {
        try {
            const { userId, bookId, quantity } = req.body;

            // Verificar que el usuario exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar que el libro exista y obtener el precio
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const precio = book.precio;

            // Verificar que el carrito exista
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({ userId, items: [] });
            }

            // Agregar o actualizar el item en el carrito
            const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].precio = precio;
            } else {
                cart.items.push({ bookId, quantity, precio });
            }

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    removeItemFromCart: async (req, res) => {
        try {
            const { userId, bookId } = req.body;

            // Verificar que el usuario exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar que el carrito exista
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Remover el item del carrito
            cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateItemQuantity: async (req, res) => {
        try {
            const { userId, bookId, quantity } = req.body;

            // Verificar que el usuario exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar que el libro exista
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const precio = book.precio;

            // Verificar que el carrito exista
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Actualizar la cantidad del item en el carrito
            const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                cart.items[itemIndex].precio = precio;
            } else {
                return res.status(404).json({ message: 'Item not found in cart' });
            }

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCartStatus: async (req, res) => {
        try {
            const { userId, status } = req.body;

            // Verificar que el usuario exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verificar que el carrito exista
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Actualizar el estado del carrito
            cart.status = status;
            await cart.save();

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const userId = req.params.userId;

            const deletedCart = await Cart.findOneAndDelete({ userId });
            if (!deletedCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            res.status(200).json({ message: 'Cart deleted' });
        } catch (error) {
            res.status500().json({ message: error.message });
        }
    }
};

module.exports = CartController;
