import React, { useState, useRef, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt, FaEye, FaBook } from "react-icons/fa";

function AuthorCard({ id, name, biography, picture, updateAuthors, userType }) {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [editForm, setEditForm] = useState({ name, biography, picture });
    const [selectedImage, setSelectedImage] = useState(picture);
    const [authorBooks, setAuthorBooks] = useState([]);
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      if (modalContent === 'view') {
        fetchAuthorBooks();
      }
    }, [modalContent]);
  
    const fetchAuthorBooks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/by-author/${encodeURIComponent(name)}`);
        if (response.ok) {
          const books = await response.json();
          setAuthorBooks(books);
        } else {
          console.error('Error al obtener los libros del autor');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  const handleDeleteAuthor = async () => {
    const response = await fetch(`http://localhost:3000/authors/delete-by-id/${id}`, {
      method: 'DELETE'
    });
    updateAuthors();
    setShowModal(false);
  };

  const handleEditAuthor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('biography', editForm.biography);
    if (selectedImage !== picture) {
      formData.append('picture', editForm.picture);
    }

    try {
      const response = await fetch(`http://localhost:3000/authors/update/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        updateAuthors();
        setShowModal(false);
        alert('Autor actualizado correctamente');
      } else {
        console.error('Error al actualizar el autor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setEditForm({ ...editForm, picture: file });
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setSelectedImage(picture);
    setEditForm({ name, biography, picture });
  };

  return (
    <>
      <div className="flex flex-row p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-1/3">
          <img
            className="h-48 w-full object-cover rounded-md shadow-md"
            src={picture}
            alt={name}
          />
        </div>
        <div className="flex flex-col p-4 w-2/3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            {userType !== '0' && (
              <div className="flex space-x-2">
                <button onClick={() => openModal('edit')} className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                  <FaPencilAlt size={20} />
                </button>
                <button onClick={() => openModal('delete')} className="text-red-500 hover:text-red-700 transition-colors duration-300">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{biography}</p>
          <button onClick={() => openModal('view')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-300 flex items-center justify-center">
            <FaEye className="mr-2" /> Ver detalles
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {modalContent === 'delete' && (
              <>
                <h2 className="text-2xl font-bold mb-4">Confirmar eliminación</h2>
                <p className="mb-4">¿Estás seguro de que quieres eliminar a {name}?</p>
                <div className="flex justify-end space-x-4">
                  <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                    Cancelar
                  </button>
                  <button onClick={handleDeleteAuthor} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Eliminar
                  </button>
                </div>
              </>
            )}
            {modalContent === 'edit' && (
              <>
                <h2 className="text-2xl font-bold mb-4">Editar autor</h2>
                <form onSubmit={handleEditAuthor} className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div onClick={handleImageClick} className="w-32 h-32 bg-slate-800 rounded-lg mb-4 cursor-pointer">
                      <img src={selectedImage} alt="Perfil" className="object-cover w-full h-full rounded-lg" />
                    </div>
                    <input 
                      ref={fileInputRef}
                      onChange={handleImageChange} 
                      type="file" 
                      accept=".jpg, .png, .jpeg" 
                      className="hidden" 
                    />
                    <p className="text-sm font-bold">
                      {selectedImage !== picture ? "Nueva foto seleccionada" : "Click para cambiar la foto"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Nombre
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      value={editForm.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biography">
                      Biografía
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="biography"
                      name="biography"
                      value={editForm.biography}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                      Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </>
            )}
            {modalContent === 'view' && (
              <>
              <h2 className="text-3xl font-bold mb-4">{name}</h2>
              <img src={picture} alt={name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Biografía</h3>
              <p className="text-gray-700 mb-6">{biography}</p>
              <h3 className="text-xl font-semibold mb-4">Libros del autor</h3>
              {authorBooks.length > 0 ? (
                <ul className="space-y-4">
                  {authorBooks.map((book) => (
                    <li key={book._id} className="flex items-start space-x-4">
                      <FaBook className="text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{book.titulo}</h4>
                        <p className="text-sm text-gray-600">{book.descripcion}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Este autor aún no tiene libros registrados.</p>
              )}
              <div className="flex justify-end mt-6">
                <button onClick={closeModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  Cerrar
                </button>
              </div>
            </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AuthorCard;