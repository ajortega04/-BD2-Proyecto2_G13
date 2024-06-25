import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function InputSearch() {
    const [searchText, setSearchText] = useState("");
    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchText(value);
    }

    return(
        <div className="flex justify-start w-full">
            <input value={ searchText } onChange={ handleSearchInputChange } className={"rounded-full border-2 border-black px-4 py-1 w-full"} type="text" placeholder="¿Qué quieres escuchar?"/>
            <BsSearch className={"absolute right-10 text-2xl mt-1 ml-2 hover:text-green-500"}/>
        </div>
    )
}

export default InputSearch;