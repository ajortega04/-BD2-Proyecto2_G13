import React from "react";

const BookView = ({ book, onClose }) => {
    const { titulo, autor, descripcion, imagenURL, precio, cantidad_stock, fecha_publicacion, disponibilidad, puntuacion_promedio } = book;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                    <h2 className="text-xl font-bold">{titulo}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                    <div className="col-span-1">
                        <img src={imagenURL} alt={titulo} className="object-cover w-full h-auto rounded-lg" />
                    </div>
                    <div className="col-span-1">
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Autor:</span> {autor}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Descripción:</span> {descripcion}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Precio:</span> ${precio}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Stock:</span> {cantidad_stock}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Fecha de publicación:</span> {fecha_publicacion}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Disponibilidad:</span> {disponibilidad ? 'Disponible' : 'No disponible'}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Puntuación promedio:</span> {puntuacion_promedio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookView;
