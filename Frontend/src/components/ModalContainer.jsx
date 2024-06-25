import { RiCloseLargeLine } from "react-icons/ri";

function ModalContainer({ state, changeState, title, children }) {
    if (!state) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium mr-5">{title}</h2>
                    <button onClick={ () => changeState(false) } className="text-2xl"><RiCloseLargeLine /></button>
                </div>
                <div className="mb-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalContainer