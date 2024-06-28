import React, { useState, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import InputSearch from "../components/InputSearch.jsx";
import BookCard from "../components/BookCard.jsx";
import ModalContainer from "../components/ModalContainer.jsx";
import Modal from 'react-modal';
import '../index.css';

function Books() {
    const defaultImage = "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [books, setBooks] = useState([]);
    const [newBookModSt, setNewBookModSt] = useState(false);
    const [editBookModSt, setEditBookModSt] = useState(false);
    const [selectedImage, setSelectedImage] = useState(defaultImage);
    const [selectedImageEdit, setSelectedImageEdit] = useState(defaultImage);
    const [authors, setAuthors] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        isError: false
    });
    const [userType, setUserType] = useState(null);
    
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (title, message, isError = false) => {
        setModalContent({ title, message, isError });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSuccess = (message) => {
        openModal('Exito!', message);
    };

    const handleError = (message) => {
        openModal('Error!', message, true);
    };

    const [formData, setFormData] = useState({
        autor: "",
        genero: "",
        titulo: "",
        precio: "",
        cantidad_stock: "",
        descripcion: "",
        fecha_publicacion: "", // Nuevo campo
        disponibilidad: "",    // Nuevo campo
        puntuacion_promedio: "",// Nuevo campo
        imagenURL: "" // Nuevo campo
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
        puntuacion_promedio: "",
        imagenURL: "" // Nuevo campo
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
            setFilteredBooks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
            setError(error.message);
            setLoading(false);
            // Manejar el error en caso necesario
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await fetch('http://localhost:3000/authors/get-all');

            if (!response.ok) {
                console.error('Network response was not ok');
                return;
            }

            const data = await response.json();
            setAuthors(data);  // Suponiendo que setAuthors es una función para actualizar el estado de los autores
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    useEffect(() => {
        const filtered = books.filter(book =>
          book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.autor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
      }, [books, searchTerm]);
      
      const handleSearchChange = (value) => {
        setSearchTerm(value);
      };


    // Cargar libros al montar el componente
    useEffect(() => {
        fetchBooks();
        fetchAuthors();
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);
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
            const formDataToSubmit = new FormData(); // Crear una instancia de FormData

            // Agregar los campos individuales al formDataToSubmit
            formDataToSubmit.append('autor', formData.autor);
            formDataToSubmit.append('genero', formData.genero);
            formDataToSubmit.append('titulo', formData.titulo);
            formDataToSubmit.append('precio', formData.precio);
            formDataToSubmit.append('cantidad_stock', formData.cantidad_stock);
            formDataToSubmit.append('descripcion', formData.descripcion);
            formDataToSubmit.append('fecha_publicacion', formData.fecha_publicacion);
            formDataToSubmit.append('disponibilidad', formData.disponibilidad);
            formDataToSubmit.append('puntuacion_promedio', formData.puntuacion_promedio);

            // Agregar la imagen si existe
            const imageInput = document.getElementById('inputImage');
            if (!imageInput.files[0]) {
                handleError('Debes seleccionar una imagen para el libro.');
                return;
            }
            if (imageInput.files[0]) {
                formDataToSubmit.append('imagen', imageInput.files[0]);
            }

            const response = await fetch('http://localhost:3000/books/create', {
                method: 'POST',
                body: formDataToSubmit,
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

            handleSuccess('¡El libro se ha agregado satisfactoriamente!');
            // Recargar la lista de libros después de crear uno
            fetchBooks();

        } catch (error) {
            console.error('Error al crear el libro:', error);
            handleError('Error al crear el libro');
            // Manejar el error en caso necesario (mostrar mensaje al usuario, etc.)

        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            // Preparar los datos a enviar
            const formDataToSubmit = new FormData();

            // Agregar los campos individuales al formDataToSubmit
            formDataToSubmit.append('_id', editFormData._id);
            formDataToSubmit.append('autor', editFormData.autor);
            formDataToSubmit.append('genero', editFormData.genero);
            formDataToSubmit.append('titulo', editFormData.titulo);
            formDataToSubmit.append('precio', editFormData.precio);
            formDataToSubmit.append('cantidad_stock', editFormData.cantidad_stock);
            formDataToSubmit.append('descripcion', editFormData.descripcion);
            formDataToSubmit.append('fecha_publicacion', editFormData.fecha_publicacion);
            formDataToSubmit.append('disponibilidad', editFormData.disponibilidad);
            formDataToSubmit.append('puntuacion_promedio', editFormData.puntuacion_promedio);

            // Agregar la imagen si se seleccionó una nueva
            const imageInput = document.getElementById('inputImageEdit');
            if (imageInput.files[0]) {
                formDataToSubmit.append('imagen', imageInput.files[0]);
            } else {
                // Si no se seleccionó una nueva imagen, enviar la URL existente
                formDataToSubmit.append('imagenURL', editFormData.imagenURL);
                formDataToSubmit.append('imagen', null);
            }
            for (let pair of formDataToSubmit.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await fetch(`http://localhost:3000/books/update`, {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (!response.ok) {
                handleError('Error al Actualizar el Libro!.');
                throw new Error('Error al actualizar el libro');
            }

            // Limpiar estado y cerrar modal después de operación exitosa
            setEditBookModSt(false);
            setSelectedImageEdit(editFormData.imagenURL);
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
            handleSuccess('¡El libro se ha editado satisfactoriamente!');
            // Recargar la lista de libros después de actualizar uno
            fetchBooks();

        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            handleError('Error al actualizar el libro.');
            // Manejar el error en caso necesario (mostrar mensaje al usuario, etc.)
        }
    };


    const handleImageClick = () => {
        document.getElementById("inputImage").click();
    };

    const handleImageClickEdit = () => {
        document.getElementById("inputImageEdit").click();
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

    const handleImageChangeEdit = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImageEdit(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            console.log(editFormData.imagenURL)
            setSelectedImageEdit(editFormData.imagenURL);
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
                puntuacion_promedio: bookToUpdate.puntuacion_promedio,
                imagenURL: bookToUpdate.imagenURL
            });
            //console.log("hande Edit "+bookToUpdate.imagenURL)
            setSelectedImageEdit(bookToUpdate.imagenURL);
            setEditBookModSt(true);
        } catch (error) {
            console.error('Error al editar el libro:', error);
            // Manejar el error en caso necesario
        }
    };

    const handleAddToCart = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el libro para agregar al carrito');
            }
            const bookToAdd = await response.json();

            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.id === bookToAdd._id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: bookToAdd._id,
                    title: bookToAdd.titulo,
                    description: bookToAdd.descripcion,
                    price: bookToAdd.precio,
                    quantity: 1,
                    image: bookToAdd.imagenURL
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            console.log(`Se agregó "${bookToAdd.titulo}" al carrito.`);
    
        } catch (error) {
            console.error('Error al agregar el libro al carrito:', error);
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
            handleSuccess('¡El libro se ha eliminado satisfactoriamente!');
            // Recargar la lista de libros después de eliminar uno
            fetchBooks();
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
            handleError('Error al eliminar el libro.');
            // Manejar el error en caso necesario
        }
    };
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    if (loading) return <p>Cargando libros...</p>;
    if (error) return <p>Error al cargar libros: {error}</p>;


    
    return (
        <Layout title={"Libros"}>
            <InputSearch onSearch={handleSearchChange} />
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                className={`custom-modal ${modalContent.isError ? 'error-modal' : ''}`}
                overlayClassName="modal-overlay"
                contentLabel={modalContent.title}
            >
                <h2 className="modal-title">{modalContent.title}</h2>
                <p className="modal-message">{modalContent.message}</p>
                <button className="modal-button" onClick={closeModal}>Cerrar</button>
            </Modal>
            {userType !== '0' && (
            <div className={"flex justify-end mt-5"}>
                <button onClick={() => setNewBookModSt(true)} className={"bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-md px-7 py-0.5 shadow-md"}>
                    Agregar libro
                </button>
            </div>
            )}
            <div className={"grid grid-cols-3 2xl:grid-cols-4 mt-5 gap-x-3 gap-y-2"}>
                {filteredBooks.map((book) => (
                    <BookCard
                        bookId={book._id}
                        title={book.titulo}
                        author={book.autor}
                        description={book.descripcion}
                        imageUrl={book.imagenURL}
                        precio={book.precio}
                        cantidad_stock={book.cantidad_stock}
                        fecha_publicacion={formatDate(book.fecha_publicacion)}
                        disponibilidad={book.disponibilidad}
                        puntuacion_promedio={book.puntuacion_promedio}
                        onEdit={() => handleEditBook(book._id)}
                        onDelete={() => handleDeleteBook(book._id)}
                        onAddToCart={() => handleAddToCart(book._id)}
                        userType={userType}
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
                            selectedImage !== defaultImage ? (<p className="text-sm font-bold">Foto de libro</p>) :
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
                                {authors.map(author => (
                                    <option key={author.id} value={author.name}>{author.name}</option>
                                ))}
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
                                <option value="Ciencia ficción">Ciencia ficción</option>
                                <option value="Fantasía">Fantasía</option>
                                <option value="Romance">Romance</option>
                                <option value="Misterio">Misterio</option>
                                <option value="Aventura">Aventura</option>
                                <option value="Biografía">Biografía</option>
                                <option value="Histórico">Histórico</option>
                                <option value="Terror">Terror</option>
                                <option value="Humor">Humor</option>
                                <option value="Poesía">Poesía</option>
                                <option value="Filosofía">Filosofía</option>
                                <option value="Autoayuda">Autoayuda</option>
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
                                value={formatDate(formData.fecha_publicacion)}
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
                        <div onClick={handleImageClickEdit} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                            <img id="profileImage" src={selectedImageEdit} alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                        </div>
                        <input onChange={handleImageChangeEdit} id="inputImageEdit" name="pictureEdit" type="file" accept=".jpg, .png, .jpeg" className="hidden" />
                        {
                            selectedImageEdit !== defaultImage ? (<p className="text-sm font-bold">Foto de libro</p>) :
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
                                {authors.map(author => (
                                    <option key={author.id} value={author.name}>{author.name}</option>
                                ))}
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
                                <option value="Ciencia ficción">Ciencia ficción</option>
                                <option value="Fantasía">Fantasía</option>
                                <option value="Romance">Romance</option>
                                <option value="Misterio">Misterio</option>
                                <option value="Aventura">Aventura</option>
                                <option value="Biografía">Biografía</option>
                                <option value="Histórico">Histórico</option>
                                <option value="Terror">Terror</option>
                                <option value="Humor">Humor</option>
                                <option value="Poesía">Poesía</option>
                                <option value="Filosofía">Filosofía</option>
                                <option value="Autoayuda">Autoayuda</option>
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
                                value={formatDate(editFormData.fecha_publicacion)}
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
