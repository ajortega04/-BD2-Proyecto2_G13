import React, { useState } from 'react';
import { FaRegTrashAlt as FaRegTrashCan } from 'react-icons/fa';
import BookView from './BookView';

function BookCard({ 
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
    onDelete 
}) {
    const [viewBook, setViewBook] = useState(false);

    const handleViewBook = () => {
        setViewBook(true);
    };

    const handleCloseBookView = () => {
        setViewBook(false);
    };

    return (
        <div className="flex flex-row p-4 rounded-lg bg-gray-100 shadow-md">
            <div className="w-36 h-52">
                <img
                    className="object-cover rounded-lg w-full h-full"
                    src={imageUrl}
                    alt={author}
                />
            </div>
            <div className="flex flex-col justify-between ml-4">
                <div className="flex justify-end">
                    <button onClick={onDelete} className="text-red-600 hover:text-red-800">
                        <FaRegTrashCan />
                    </button>
                </div>
                <div>
                    <p className="text-lg font-medium">{title}</p>
                    <p className="text-sm font-medium text-gray-600">{author}</p>
                    <p className="text-sm text-gray-700">{description}</p>
                </div>
                <div className="mt-2">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-1 shadow-md mr-2" onClick={handleViewBook}>
                        Ver
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 rounded-md px-3 py-1 shadow-md" onClick={onEdit}>
                        Editar
                    </button>
                </div>
            </div>
            {viewBook && (
                <BookView
                    book={{
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
