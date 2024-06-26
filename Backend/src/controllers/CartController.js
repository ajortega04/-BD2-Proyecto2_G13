const Cart = require('../models/Cart');
const User = require('../models/User');

const CartController = {
  createCart: async (req, res) => {
    try {
      const { userId, items } = req.body;

      // Verificar que el usuario exista
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newCart = new Cart({ userId, items });
      await newCart.save();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find().populate('userId items.bookId');
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id).populate('userId items.bookId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId items.bookId');
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      if (!deletedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = CartController;
