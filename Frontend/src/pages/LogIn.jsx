import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    function handleLogin() {
        navigate("/home")
    }

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900">
            <div className="p-14 rounded-md text-center bg-zinc-950 text-white">
                <p className="text-4xl font-bold">Iniciar sesión</p>
                <p className="text-2xl font-bold">Bookstore</p>
                <hr className="my-5 border-t-2 mx-auto border-zinc-800" />
                <form onSubmit={handleLogin} className="text-left">
                    <div className="mb-5">
                        <label htmlFor="" className="text-sm font-bold pb-7">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full p-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md mt-2"
                            placeholder="example@email.com"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm font-bold">Contraseña</label>
                        <input
                            type="password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            className="w-full p-2 text-sm bg-zinc-900 border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"
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