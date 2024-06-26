import { FaRegTrashCan } from "react-icons/fa6";
function AuthorCard({id, name, picture, updateAuthors}) {

    const handleDeleteAuthor = async () => {
        const response = await fetch(`http://localhost:3000/authors/delete-by-id/${id}`, {
            method: 'DELETE'
        });
        updateAuthors();
    }

    return(
        <div className={"flex flex-row p-2 rounded-md bg-slate-50 shadow-md"}>
            <div className={"w-full"}>
                <img
                    className={"h-36 rounded-md w-32"}
                    src={picture}
                    alt="Author"
                />
            </div>
            <div className={"flex flex-col p-2 w-full"}>
                <div className={"flex justify-end hover:text-red-500"}>
                    <button onClick={handleDeleteAuthor}>
                        <FaRegTrashCan/>
                    </button>
                </div>
                <p className={"text-lg font-medium"}>{name}</p>
                <button className={"bg-slate-800 hover:bg-slate-700 text-white rounded-md px-2 py-0.5 shadow-md mt-3 mb-2"}>Ver</button>
                <button className={"bg-slate-300 hover:bg-slate-400 rounded-md px-2 py-0.5 shadow-md"}>Editar</button>
            </div>
        </div>
    )
}

export default AuthorCard