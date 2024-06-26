const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Ruta para crear un carrito
router.post('/create', CartController.createCart);

// Ruta para obtener el carrito de un usuario por su ID de usuario
router.get('/:userId', CartController.getCartByUserId);

// Ruta para agregar un item al carrito
router.post('/add', CartController.addItemToCart);

// Ruta para quitar un item del carrito
router.post('/remove', CartController.removeItemFromCart);

// Ruta para actualizar la cantidad de un item en el carrito
router.post('/update', CartController.updateItemQuantity);

// Ruta para eliminar el carrito de un usuario por su ID de usuario
router.delete('/:userId', CartController.deleteCart);

module.exports = router;
