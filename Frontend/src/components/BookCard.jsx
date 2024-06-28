import React, { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import BookView from './BookView';
import '../index.css';

function BookCard({
    bookId,
    title,
    author,
    description,
    imageUrl,
    precio,
    cantidad_stock,
    fecha_publicacion,
    disponibilidad,
    puntuacion_promedio,
    onEdit,
    onDelete,
    onAddToCart,
    userType
}) {
    const [viewBook, setViewBook] = useState(false);

    const handleViewBook = () => {
        setViewBook(true);
    };

    const handleCloseBookView = () => {
        setViewBook(false);
    };

    return (
        <div className="flex flex-row p-3 rounded-md bg-slate-50 shadow-md">
            <div className="w-full flex items-center justify-center p-1">
                <img
                    className="h-36 rounded-md w-32"
                    src={imageUrl}
                    alt={author}
                />
            </div>

            <div className="flex flex-col justify-between p-2 w-full">
                <div className="flex justify-end hover:text-red-500">
                {userType !== '0' && (
                    <button onClick={onDelete}>
                        <FaRegTrashCan />
                    </button>
                    )}  
                </div>
                <div>
                    <p className="text-lg font-medium">{title}</p>
                    <p className="text-sm font-medium text-gray-600">{author}</p>
                </div>
                <div className="mt-4 flex items-center">
                    <button className="bg-black text-white rounded-md px-3 py-1 shadow-md mr-2 p-1" onClick={handleViewBook}>
                        Ver
                    </button>
                    {userType !== '0' && (
                    <button className="bg-gray-300 hover:bg-gray-400 rounded-md px-3 py-1 shadow-md p-1" onClick={onEdit}>
                        Editar
                    </button>
                    )}
                    <button
                        className="bg-red-700 hover:bg-red-800 rounded-full p-2 shadow-md flex items-center justify-center ml-2"
                        onClick={onAddToCart}
                        aria-label="Agregar al carrito"
                    >
                        <img
                            src="../../public/carrito-de-compras.png" 
                            alt="Carrito de compras"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
            {viewBook && (
                <BookView
                    book={{
                        bookId:bookId,
                        titulo: title,
                        autor: author,
                        descripcion: description,
                        imagenURL: imageUrl,
                        precio: precio,
                        cantidad_stock: cantidad_stock,
                        fecha_publicacion: fecha_publicacion,
                        disponibilidad: disponibilidad,
                        puntuacion_promedio: puntuacion_promedio
                    }}
                    onClose={handleCloseBookView}
                />
            )}
        </div>
    );
}

export default BookCard;
