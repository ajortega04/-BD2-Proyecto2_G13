import React, { useState, useEffect } from "react";
import { Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookView = ({ book, onClose }) => {
    const { bookId, titulo, autor, descripcion, imagenURL, precio, genero, cantidad_stock, fecha_publicacion, disponibilidad, puntuacion_promedio } = book;
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState('');
    const [newcomment, setNewComment] = useState('')

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    // Función para manejar cambios en el textarea
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    // Estado para controlar la visibilidad de la barra lateral de comentarios
    const [showComments, setShowComments] = useState(false);

    // Datos de comentarios quemados para pruebas
    const consultaHistorial = async () => {
        try {
            const response = await fetch(`http://localhost:3000/comment/${bookId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setComments([]);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error:', error);
            setComments([]); // Manejar errores limpiando los comments si es necesario
        }
    };

    const AddComentario = async () => {
        const data = {
            "userId": localStorage.getItem('userId'),
            "descripcion": newcomment,
            "puntuacion": rating,
            "bookId": bookId
        }
        try {
            const response = await fetch("http://localhost:3000/comment/addComment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await consultaHistorial(bookId);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Función para manejar el click en "Ver Comentarios"
    const handleViewComments = async () => {
        await consultaHistorial();
        setShowComments(true);
    };

    return (
        <div className="relative flex">
            {/* Modal de Detalles del Libro */}
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${showComments ? 'w-3/4' : 'w-full'}`}>
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
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label">Comentar</label>
                                <div className="m-1">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" onChange={handleRatingChange}></input>
                                        <label className="form-check-label" for="inlineRadio1">1</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" onChange={handleRatingChange}></input>
                                        <label className="form-check-label" for="inlineRadio2">2</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" onChange={handleRatingChange} ></input>
                                        <label className="form-check-label" for="inlineRadio3">3 </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="4" onChange={handleRatingChange} ></input>
                                        <label className="form-check-label" for="inlineRadio3">4</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="5" onChange={handleRatingChange} ></input>
                                        <label className="form-check-label" for="inlineRadio3">5 </label>
                                    </div>
                                </div>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={newcomment} onChange={handleCommentChange}></textarea>

                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Autor:</span> {autor}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Genero:</span> {genero}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Descripción:</span> {descripcion}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Precio:</span> ${precio}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Stock:</span> {cantidad_stock}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Fecha de publicación:</span> {fecha_publicacion}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Disponibilidad:</span> {disponibilidad ? 'Disponible' : 'No disponible'}</p>
                            <p className="text-sm text-gray-600 mb-4"><span className="font-bold">Puntuación promedio:</span> {puntuacion_promedio}</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={handleViewComments}>Ver Comentarios</button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={AddComentario}>Comentar</button>
                        </div>
                    </div>
                </div>

            </div>

            {showComments && (
                <div className="fixed right-0 top-0 h-full w-60 bg-white z-50 overflow-y-auto">
                    <div className="p-4 border-b border-gray-300">
                        <h3 className="text-lg font-bold mb-2">Comentarios</h3>
                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => setShowComments(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        {comments.length === 0 ? (
                            <p>No hay comentarios disponibles.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <Toast key={index} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                    <Toast.Header>
                                        <strong className="me-auto">{comment.userName}</strong>
                                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                                    </Toast.Header>
                                    <Toast.Body>
                                        <p>{comment.Descripcion}</p>
                                        <p>Puntuación {comment.puntuacion}</p>
                                    </Toast.Body>
                                </Toast>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookView;
