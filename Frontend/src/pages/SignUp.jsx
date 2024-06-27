import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: 0,
        name: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        birthdate: '',
        profilePicture: null,
        paymentMethod: ''
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                profilePicture: file
            });
            setPreviewImage(URL.createObjectURL(file));
        } else if (e.target.name === 'paymentMethod') {
            const value = e.target.value;
            // Validar la longitud de la tarjeta de crédito (16 dígitos)
            if (value.length <= 16) {
                setFormData({
                    ...formData,
                    paymentMethod: value
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    async function handleSignUp(e) {
        e.preventDefault();

        // Verificar que las contraseñas coincidan
        if (formData.password !== formData.password2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Verificar que se haya ingresado un método de pago válido
        if (formData.paymentMethod.length !== 16) {
            alert("El método de pago debe tener 16 dígitos");
            return;
        }

        console.log(JSON.stringify(formData, null, 2));

        const { password2, ...dataToSend } = formData;
        const formDataToSend = new FormData();
        Object.keys(dataToSend).forEach(key => {
            formDataToSend.append(key, dataToSend[key]);
        });

         try {
            const response = await fetch('http://localhost:3000/users/create', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const result = await response.json();
            localStorage.setItem('userId', result._id);
            localStorage.setItem('userType', result.type.toString());
            navigate("/home");
         } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Hubo un error al crear el usuario. Por favor, intenta de nuevo.');
         }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="px-14 rounded-md text-center">
                <p className="text-3xl font-bold">Crear una cuenta</p>
                <p className="text-2xl font-medium text-slate-600">SoundStream</p>
                <hr className="my-5 border-t-2 mx-auto border-zinc-800" />
                <form onSubmit={handleSignUp} className="text-left">
                    <div className="mb-5 mt-2">
                        <label htmlFor="name" className="text-sm font-bold pb-7">¿Cuál es tu nombre?</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="lastName" className="text-sm font-bold pb-7">¿Cuál es tu apellido?</label>
                        <input
                            type="text"
                            name="lastName"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="Ingresa tu apellido"
                            onChange={handleChange}
                            value={formData.lastName}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="birthdate" className="text-sm font-bold pb-7">¿Cuál es tu fecha de nacimiento?</label>
                        <input
                            type="date"
                            name="birthdate"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            onChange={handleChange}
                            value={formData.birthdate}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="text-sm font-bold pb-7">¿Cuál es tu correo electrónico?</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="example@email.com"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="text-sm font-bold">Crea una contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password2" className="text-sm font-bold">Confirma tu contraseña</label>
                        <input
                            type="password"
                            name="password2"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"
                            onChange={handleChange}
                            value={formData.password2}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="profilePicture" className="text-sm font-bold pb-7">Foto de perfil</label>
                        <input
                            type="file"
                            name="profilePicture"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            onChange={handleChange}
                            accept="image/*"
                        />
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="mt-2 max-w-full h-auto rounded-md" />
                        )}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="paymentMethod" className="text-sm font-bold pb-7">Método de pago</label>
                        <input
                            type="text"
                            name="paymentMethod"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="Ingresa tu tarjeta de crédito (16 dígitos)"
                            onChange={handleChange}
                            value={formData.paymentMethod}
                            maxLength={16}
                            required
                        />
                    </div>
                    <div className="pt-10 text-sm">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-3xl text-white py-2 font-semibold"
                        >Registrarse</button>
                        <p className="pt-4">¿Tienes una cuenta? <Link to={"/"} className="text-indigo-500 hover:text-black">Ingresar</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;