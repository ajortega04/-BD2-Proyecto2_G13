import Layout from "../components/Layout.jsx";
import {useState} from "react";

function Profile() {
    const defaultImage = "https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--914bcfe0-f610-4610-a77e-6ea53c53f630/_330603286208.app.png?preferwebp=true&width=312";
    const [selectedImage, setSelectedImage] = useState(defaultImage);

    const handleImageClick = () => {
        document.getElementById("inputImage").click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            }

            reader.readAsDataURL(file);
        } else {
            setSelectedImage(defaultImage);
        }
    }

    return(
        <Layout title={"Perfil"}>
            <div className={"flex items-center justify-center"}>
                <div className={"px-14 py-7 bg-slate-100 mt-14 rounded-md shadow-lg"}>
                    <form className="flex flex-row">
                        <div className="flex flex-col items-center justify-center mr-7">
                            <div onClick={handleImageClick} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                                <img id="profileImage" src={ selectedImage } alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                            </div>
                            <input onChange={handleImageChange} id="inputImage" name="picture" type="file" accept=".jpg, .png, .jpeg" className="hidden"/>
                            {
                                selectedImage != defaultImage ? (<p className="text-sm font-bold">Foto de perfil</p>) :
                                    (<p className="text-sm font-bold text-red-800">Selecciona una imagen</p>)
                            }
                        </div>
                        <div className="text-left grid grid-cols-2 gap-x-3 gap-y-2">
                            <div>
                                <label className="text-sm font-bold pb-7">Nombre</label>
                                <input type="text" className="w-full p-2 text-sm border border-zinc-700 rounded-md" required/>
                            </div>
                            <div>
                                <label className="text-sm font-bold pb-7">Apellido</label>
                                <input type="text" className="w-full p-2 text-sm border border-zinc-700 rounded-md" required/>
                            </div>

                            <div>
                                <label className="text-sm font-bold pb-7">Fecha de nacimiento</label>
                                <input type="date" className="w-full p-2 text-sm border border-zinc-700 rounded-md" required/>
                            </div>
                            <div>
                                <label className="text-sm font-bold pb-7">Correo electrónico</label>
                                <input type="email" className="w-full p-2 text-sm border border-zinc-700 rounded-md" required/>
                            </div>
                            <div>
                                <label className="text-sm font-bold pb-7">Constraseña</label>
                                <input type="password" className="w-full p-2 text-sm border border-zinc-700 rounded-md" placeholder="**********" required/>
                            </div>
                            <div>
                                <label className="text-sm font-bold pb-7">Confirmar contraseña</label>
                                <input type="password" className="w-full p-2 text-sm border border-zinc-700 rounded-md" placeholder="**********" required/>
                            </div>
                            <div className="pt-4 text-sm col-span-2">
                                <button type="submit" className="w-full bg-indigo-500 rounded-3xl text-white py-2 font-bold">Guardar cambios</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Profile