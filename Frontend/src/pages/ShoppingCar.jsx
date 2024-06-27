import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout.jsx";
import '../index.css';

function ShoppingCar() {
    const [cart, setCart] = useState([]);

    // Función para actualizar la cantidad de un ítem en el carrito
    const handleUpdateQuantity = (itemId, delta) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    // Función para eliminar un ítem del carrito
    const handleRemoveItem = (itemId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Función para limpiar completamente el carrito
    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    // Calcular el total del carrito
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Función para cargar el carrito desde localStorage
    const handleTmp = () => {
        try {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(storedCart);
        } catch (error) {
            console.error('Error al obtener el carrito desde localStorage:', error);
        }
    };

    // Cargar el carrito al cargar la página por primera vez
    useEffect(() => {
        handleTmp();
    }, []);

    return (
        <Layout title={"Carrito de compras"}>
            <div className="container">
                <h2>Carrito de Compras</h2>
                
                {cart.length === 0 ? (
                    <p>Tu carrito está vacío.</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td className="product">
                                            <img src={item.image} alt={item.title} />
                                            <div className="product-details">
                                                <strong>{item.title}</strong>
                                                <p>{item.description}</p>
                                            </div>
                                        </td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td className="quantity-controls">
                                            <button onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
                                            <input type="text" value={item.quantity} readOnly />
                                            <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
                                        </td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className="remove" onClick={() => handleRemoveItem(item.id)}>&times;</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total">
                            Total: ${total.toFixed(2)}
                        </div>
                        <button className="checkout-btn" onClick={handleClearCart}>Completar Compra</button>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default ShoppingCar;
