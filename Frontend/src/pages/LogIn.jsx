import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const result = await response.json();
            console.log('Usuario autenticado:', result);

            // Guardar _id y type en localStorage
            localStorage.setItem('userId', result._id);
            localStorage.setItem('userType', result.type.toString());

            navigate("/home");
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Correo electrónico o contraseña incorrectos. Por favor, intenta de nuevo.');
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900">
            <div className="p-14 rounded-md text-center bg-zinc-950 text-white">
                <p className="text-4xl font-bold">Iniciar sesión</p>
                <p className="text-2xl font-bold">Bookstore</p>
                <hr className="my-5 border-t-2 mx-auto border-zinc-800" />
                <form onSubmit={handleLogin} className="text-left">
                    <div className="mb-5">
                        <label htmlFor="email" className="text-sm font-bold pb-7">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md mt-2"
                            placeholder="example@email.com"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full p-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"
                            required
                        />
                    </div>
                    <div className="pt-10 text-sm">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-3xl text-white py-2 font-bold"
                        >Ingresar</button>
                        <p className="pt-4 text-zinc-400">¿No tienes una cuenta? <Link to={"/signup"} className="text-white hover:text-indigo-500">Regístrate</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;