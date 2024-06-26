import {useEffect, useState} from "react";
import Layout from "../components/Layout.jsx";
import InputSearch from "../components/InputSearch.jsx";
import AuthorCard from "../components/AuthorCard.jsx";
import ModalContainer from "../components/ModalContainer.jsx";

function Authors() {
    const [newAuthormodSt, setNewAuthorModSt] = useState(false);
    const defaultImage = "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [selectedImage, setSelectedImage] = useState(defaultImage);
    const [authors, setAuthors] = useState([]);
    const [authorData, setAuthorData] = useState({
        name: '',
        biography: ''
    });

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:3000/authors/get-all');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);


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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthorData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', authorData.name);
        formData.append('biography', authorData.biography);

        const imageInput = document.getElementById('inputImage');
        if (imageInput.files[0]) {
            formData.append('picture', imageInput.files[0]);
        }

        try {
            const response = await fetch('http://localhost:3000/authors/create', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al crear el autor');
            }

            const result = await response.json();
            console.log('Autor creado:', result);

            setAuthorData({ name: '', biography: '' });
            setSelectedImage(defaultImage);
            setNewAuthorModSt(false);

        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo crear el autor');
        }
    }

    return(
        <Layout title={"Autores"}>
            <InputSearch/>
            <div className={"flex justify-end mt-5"}>
                <button onClick={ () => setNewAuthorModSt(true) } className={"bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-md px-7 py-0.5 shadow-md"}>
                    Agregar autor
                </button>
            </div>
            <div className={"grid grid-cols-3 2xl:grid-cols-4 mt-5 gap-x-3 gap-y-2"}>
                {authors.map(authors => (
                    <div key={authors._id}>
                        <AuthorCard
                            name={authors.name}
                            picture={authors.picture}
                        />
                    </div>
                ))}
            </div>

            <ModalContainer
                state={ newAuthormodSt }
                changeState={ setNewAuthorModSt }
                title={ "Registrar autor" }
            >
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <div onClick={handleImageClick} className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-slate-800 rounded-lg mb-4">
                            <img id="profileImage" src={ selectedImage } alt="Perfil" className="object-cover w-full rounded-lg h-full" />
                        </div>
                        <input onChange={handleImageChange} id="inputImage" name="picture" type="file" accept=".jpg, .png, .jpeg" className="hidden"/>
                        {
                            selectedImage !== defaultImage ? (<p className="text-sm font-bold">Foto de perfil</p>) :
                                (<p className="text-sm font-bold text-red-800">Selecciona una imagen</p>)
                        }
                    </div>
                    <div className="text-left">
                        <div className="mb-3 mt-2">
                            <label className="text-sm font-bold pb-7">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={authorData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                                placeholder="Ingresa el nombre del autor"
                                required
                            />
                        </div>
                        <div className="mb-3 mt-2">
                            <label className="text-sm font-bold pb-7">Biografía</label>
                            <textarea
                                name="biography"
                                value={authorData.biography}
                                onChange={handleInputChange}
                                className="w-full p-2 text-sm border border-zinc-700 rounded-md mt-2"
                                placeholder="Ingresa la biografía del autor"
                            ></textarea>
                        </div>
                        <div className="pt-4 text-sm">
                            <button type="submit" className="w-full bg-indigo-500 rounded-3xl text-white py-2 font-bold">Crear</button>
                        </div>
                    </div>
                </form>
            </ModalContainer>
        </Layout>
    )
}

export default Authors;