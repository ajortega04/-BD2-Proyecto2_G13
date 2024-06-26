import React, { useState, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import InputSearch from "../components/InputSearch.jsx";
import BookCard from "../components/BookCard.jsx";
import ModalContainer from "../components/ModalContainer.jsx";

function Books() {
    const defaultImage = "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [books, setBooks] = useState([]);
    const [newBookModSt, setNewBookModSt] = useState(false);
    const [editBookModSt, setEditBookModSt] = useState(false);
    const [selectedImage, setSelectedImage] = useState(defaultImage);
    const [formData, setFormData] = useState({
        autor: "",
        genero: "",
        titulo: "",
        precio: "",
        cantidad_stock: "",
        descripcion: "",
        fecha_publicacion: "", // Nuevo campo
        disponibilidad: "",    // Nuevo campo
        puntuacion_promedio: "" // Nuevo campo
    });

    const [editFormData, setEditFormData] = useState({
        _id: "",
        autor: "",
        genero: "",
        titulo: "",
        precio: "",
        cantidad_stock: "",
        descripcion: "",
        fecha_publicacion: "", // Nuevo campo
        disponibilidad: "",    // Nuevo campo
        puntuacion_promedio: "" // Nuevo campo
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener todos los libros desde la API
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/books'); // Cambia aquí la URL si es diferente
            if (!response.ok) {
                throw new Error('Error al obtener los libros');
            }
            const data = await response.json();
            setBooks(data); // Actualiza el estado con los libros obtenidos
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
            setError(error.message);
            setLoading(false);
            // Manejar el error en caso necesario
        }
    };

    // Cargar libros al montar el componente
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/books/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    imagenURL: selectedImage
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el libro');
            }

            // Limpiar estado y cerrar modal después de operación exitosa
            setNewBookModSt(false);
            setSelectedImage(defaultImage);
            setFormData({
                autor: "",
                genero: "",
                titulo: "",
                precio: "",
                cantidad_stock: "",
                descripcion: "",
                fecha_publicacion: "",
                disponibilidad: "",
                puntuacion_promedio: ""
            });

            // Recargar la lista de libros después de crear uno
            fetchBooks();

        } catch (error) {
            console.error('Error al crear el libro:', error);
            // Manejar el error en caso necesario (mostrar mensaje al usuario, etc.)
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/books/${editFormData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...editFormData,
                    imagenURL: selectedImage
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el libro');
            }

            // Limpiar estado y cerrar modal después de operación exitosa
            setEditBookModSt(false);
            setSelectedImage(defaultImage);
            setEditFormData({
                _id: "",
                autor: "",
                genero: "",
                titulo: "",
                precio: "",
                cantidad_stock: "",
                descripcion: "",
                fecha_publicacion: "",
                disponibilidad: "",
                puntuacion_promedio: ""
            });

            // Recargar la lista de libros después de actualizar uno
            fetchBooks();

        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            // Manejar el error en caso necesario (mostrar mensaje al usuario, etc.)
        }
    };

    const handleImageClick = () => {
        document.getElementById("inputImage").click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedImage(defaultImage);
        }
    };

    const handleEditBook = async (bookId) => {
        // Implementa la lógica para editar un libro
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el libro para editar');
            }
            const bookToUpdate = await response.json();

            // Lógica para prellenar el formulario con los datos del libro a editar
            setEditFormData({
                _id: bookToUpdate._id,
                autor: bookToUpdate.autor,
                genero: bookToUpdate.genero,
                titulo: bookToUpdate.titulo,
                precio: bookToUpdate.precio,
                cantidad_stock: bookToUpdate.cantidad_stock,
                descripcion: bookToUpdate.descripcion,
                fecha_publicacion: bookToUpdate.fecha_publicacion,
                disponibilidad: bookToUpdate.disponibilidad,
                puntuacion_promedio: bookToUpdate.puntuacion_promedio
            });
            setSelectedImage(bookToUpdate.imagenURL);
            setEditBookModSt(true);
        } catch (error) {
            console.error('Error al editar el libro:', error);
            // Manejar el error en caso necesario
        }
    };

    const handleDeleteBook = async (bookId) => {
        // Implementa la lógica para eliminar un libro
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el libro');
            }
            // Recargar la lista de libros después de eliminar uno
            fetchBooks();
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            // Manejar el error en caso necesario
        }
    };

    if (loading) return <p>Cargando libros...</p>;
    if (error) return <p>Error al cargar libros: {error}</p>;

    return (
        <Layout title={"Libros"}>
            <InputSearch />
            <div className={"flex justify-end mt-5"}>
                <button onClick={() => setNewBookModSt(true)} className={"bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-md px-7 py-0.5 shadow-md"}>
                    Agregar libro
                </button>
            </div>
            <div className={"grid grid-cols-3 2xl:grid-cols-4 mt-5 gap-x-3 gap-y-2"}>
                {books.map((book) => (
                    <BookCard
                        key={book._id}
                        title={book.titulo}
                        author={book.autor}
                        description={book.descripcion}
                        imageUrl={book.imagenURL}
                        precio={book.precio}
                        cantidad_stock={book.cantidad_stock}
                        fecha_publicacion={book.fecha_publicacion}
                        disponibilidad={book.disponibilidad}
                        puntuacion_promedio={book.puntuacion_promedio}
                        onEdit={() => handleEditBook(book._id)}
                        onDelete={() => handleDeleteBook(book._id)}
                    />
                ))}
            </div>

            <ModalContainer
                state={newBookModSt}
                changeState={setNewBookModSt}
                title="Agregar nuevo libro"
            >
                <form className="flex flex-row" onSubmit={handleCreateSubmit}>
                    <div className="flex flex-col items-center justify-center mr-7">
                        <div onClick={handleImageClick} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                            <img id="profileImage" src={selectedImage} alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                        </div>
                        <input onChange={handleImageChange} id="inputImage" name="picture" type="file" accept=".jpg, .png, .jpeg" className="hidden" />
                        {
                            selectedImage !== defaultImage ? (<p className="text-sm font-bold">Foto de perfil</p>) :
                                (<p className="text-sm font-bold text-red-800">Selecciona una imagen</p>)
                        }
                    </div>
                    <div className="text-left grid grid-cols-2 gap-x-3 gap-y-2">
                        <div>
                            <label htmlFor="autor" className="text-sm font-bold pb-7">Autor</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="autor"
                                value={formData.autor}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="R.K. Rowling">R.K. Rowling</option>
                                <option value="Gabriel Garcia Márquez">Gabriel Garcia Márquez</option>
                                <option value="El rubiu">El rubiu</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="genero" className="text-sm font-bold pb-7">Género</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="genero"
                                value={formData.genero}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-bold pb-7">Título</label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el título para el libro"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Precio</label>
                            <input
                                type="number"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el precio"
                                name="precio"
                                value={formData.precio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Stock</label>
                            <input
                                type="number"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el stock"
                                name="cantidad_stock"
                                value={formData.cantidad_stock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Fecha de publicación</label>
                            <input
                                type="date"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="fecha_publicacion"
                                value={formData.fecha_publicacion}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Disponibilidad</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="disponibilidad"
                                value={formData.disponibilidad}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value={true}>Disponible</option>
                                <option value={false}>No disponible</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Puntuación promedio</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa la puntuación promedio"
                                name="puntuacion_promedio"
                                value={formData.puntuacion_promedio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-bold pb-7">Descripción</label>
                            <textarea
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa una descripción"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="pt-4 text-sm col-span-2">
                            <button type="submit" className="w-full bg-indigo-500 rounded-3xl text-white py-2 font-bold">Agregar</button>
                        </div>
                    </div>
                </form>
            </ModalContainer>


            <ModalContainer
                state={editBookModSt}
                changeState={setEditBookModSt}
                title="Editar libro"
            >
                <form className="flex flex-row" onSubmit={handleEditSubmit}>
                    <div className="flex flex-col items-center justify-center mr-7">
                        <div onClick={handleImageClick} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                            <img id="profileImage" src={selectedImage} alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                        </div>
                        <input onChange={handleImageChange} id="inputImage" name="picture" type="file" accept=".jpg, .png, .jpeg" className="hidden" />
                        {
                            selectedImage !== defaultImage ? (<p className="text-sm font-bold">Foto de perfil</p>) :
                                (<p className="text-sm font-bold text-red-800">Selecciona una imagen</p>)
                        }
                    </div>
                    <div className="text-left grid grid-cols-2 gap-x-3 gap-y-2">
                        <div>
                            <label htmlFor="autor" className="text-sm font-bold pb-7">Autor</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="autor"
                                value={editFormData.autor}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="R.K. Rowling">R.K. Rowling</option>
                                <option value="Gabriel Garcia Márquez">Gabriel Garcia Márquez</option>
                                <option value="El rubiu">El rubiu</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="genero" className="text-sm font-bold pb-7">Género</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="genero"
                                value={editFormData.genero}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-bold pb-7">Título</label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el título para el libro"
                                name="titulo"
                                value={editFormData.titulo}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Precio</label>
                            <input
                                type="number"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el precio"
                                name="precio"
                                value={editFormData.precio}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Stock</label>
                            <input
                                type="number"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa el stock"
                                name="cantidad_stock"
                                value={editFormData.cantidad_stock}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Fecha de publicación</label>
                            <input
                                type="date"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="fecha_publicacion"
                                value={editFormData.fecha_publicacion}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Disponibilidad</label>
                            <select
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                name="disponibilidad"
                                value={editFormData.disponibilidad}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value={true}>Disponible</option>
                                <option value={false}>No disponible</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold pb-7">Puntuación promedio</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa la puntuación promedio"
                                name="puntuacion_promedio"
                                value={editFormData.puntuacion_promedio}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-sm font-bold pb-7">Descripción</label>
                            <textarea
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                                placeholder="Ingresa una descripción"
                                name="descripcion"
                                value={editFormData.descripcion}
                                onChange={handleEditInputChange}
                            ></textarea>
                        </div>
                        <div className="pt-4 text-sm col-span-2">
                            <button type="submit" className="w-full bg-indigo-500 rounded-3xl text-white py-2 font-bold">Actualizar</button>
                        </div>
                    </div>
                </form>
            </ModalContainer>

        </Layout>
    );
}

export default Books;
