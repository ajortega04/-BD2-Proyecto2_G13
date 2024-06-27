import Layout from "../components/Layout.jsx";
import { useState, useEffect } from "react";

function Profile() {
  const defaultImage = "https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--914bcfe0-f610-4610-a77e-6ea53c53f630/_330603286208.app.png?preferwebp=true&width=312";
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthdate: '',
    email: '',
    paymentMethod: '',
    profilePicture: null,
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setSelectedImage(userData.profilePicture || defaultImage);
        setFormData({
          name: userData.name,
          lastName: userData.lastName,
          birthdate: userData.birthdate,
          email: userData.email,
          paymentMethod: userData.paymentMethod,
          profilePicture: null,
        });
      } else {
        console.error('Error al obtener los datos del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario', error);
    }
  };

  const handleImageClick = () => {
    document.getElementById("inputImage").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(defaultImage);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PUT',
        body: updatedData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setSelectedImage(updatedUser.profilePicture || defaultImage);
        alert('Perfil actualizado exitosamente');
      } else {
        console.error('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
    }
  };

  return (
    <Layout title={"Perfil"}>
      <div className={"flex items-center justify-center"}>
        <div className={"px-14 py-7 bg-slate-100 mt-14 rounded-md shadow-lg"}>
          {user ? (
            <form className="flex flex-row" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center mr-7">
                <div onClick={handleImageClick} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                  <img id="profileImage" src={selectedImage} alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                </div>
                <input onChange={handleImageChange} id="inputImage" name="profilePicture" type="file" accept=".jpg, .png, .jpeg" className="hidden" />
                {selectedImage !== defaultImage ? (
                  <p className="text-sm font-bold">Foto de perfil</p>
                ) : (
                  <p className="text-sm font-bold text-red-800">Selecciona una imagen</p>
                )}
              </div>
              <div className="text-left grid grid-cols-2 gap-x-3 gap-y-2">
                <div>
                  <label className="text-sm font-bold pb-7">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold pb-7">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold pb-7">Fecha de nacimiento</label>
                  <input
                    type="date"
                    name="birthdate"
                    className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold pb-7">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold pb-7">Método de pago</label>
                  <input
                    type="text"
                    name="paymentMethod"
                    className="w-full p-2 text-sm border border-zinc-700 rounded-md"
                    value={formData.paymentMethod}
                    placeholder="Ingresa tu tarjeta de crédito (16 dígitos)"
                    onChange={handleChange}
                    maxLength={16}
                    required
                  />
                </div>
                <div className="pt-4 text-sm col-span-2">
                  <button type="submit" className="w-full bg-indigo-500 rounded-3xl text-white py-2 font-bold">Guardar cambios</button>
                </div>
              </div>
            </form>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;