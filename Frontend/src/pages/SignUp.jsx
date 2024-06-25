import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [birthdate, setBirthdate] = useState('');

    async function handleSignUp(e) {
        e.preventDefault();
        navigate("/home")
        console.log("sign up...")
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="px-14 rounded-md text-center">
                <p className="text-3xl font-bold">Crear una cuenta</p>
                <p className="text-2xl font-medium text-slate-600">SoundStream</p>
                <hr className="my-5 border-t-2 mx-auto border-zinc-800" />
                <form onSubmit={ handleSignUp } className="text-left">
                    <div className="mb-5 mt-2">
                        <label htmlFor="name" className="text-sm font-bold pb-7">¿Cuál es tu nombre?</label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="Ingresa tu nombre"
                            onChange={ (e) => setName(e.target.value) }
                            value={ name }
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="lastName" className="text-sm font-bold pb-7">¿Cuál es tu apellido?</label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="Ingresa tu apellido"
                            onChange={ (e) => setLastName(e.target.value)}
                            value={ lastName } />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="birthdate" className="text-sm font-bold pb-7">¿Cuál es tu fecha de nacimiento?</label>
                        <input
                            type="date"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            onChange={ (e) => setBirthdate(e.target.value) }
                            value={ birthdate } />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="text-sm font-bold pb-7">¿Cuál es tu correo electrónico?</label>
                        <input
                            type="email"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="example@email.com"
                            onChange={ (e) => setEmail(e.target.value) }
                            value={ email }
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPasword" className="text-sm font-bold">Confirma tu contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"
                            onChange={ (e) => setPassword(e.target.value) }
                            value={ password }
                        />
                    </div>
                    <div>
                        <label htmlFor="pasword" className="text-sm font-bold">Crea una contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                            placeholder="*********"

                            onChange={ (e) => setPassword2(e.target.value) }
                            value={ password2 }
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