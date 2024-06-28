import { Link, useNavigate, } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";
import { FaUserGroup, FaBook, FaRegCircleUser, FaCartShopping } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

function Sidebar () {
    const navigate = useNavigate();
    
    const handleCloseSession = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        navigate('/');
    }
    
    const userType = localStorage.getItem('userType');
    
      
    return (
        <div className="fixed h-screen text-white">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <div className="text-center py-5 bg-zinc-900 rounded-lg w-full">
                    <p className="text-white text-2xl">
                        Bookstore
                        <br/><span className={"font-bold"}>USAC</span>
                    </p>
                </div>
                <div className="bg-zinc-900 rounded-lg w-full overflow-y-auto h-full text-md">
                    <Link to={"/home"}>
                        <div className="flex items-center mt-5 hover:text-indigo-300 pl-3">
                            <AiFillHome className="mr-8 ml-3"/>
                            <p>Inicio</p>
                        </div>
                    </Link>
                    <Link to={"/authors"}>
                        <div className="flex items-center mt-5 hover:text-indigo-300 pl-3">
                            <FaUserGroup className="mr-8 ml-3"/>
                            <p>Autores</p>
                        </div>
                    </Link>
                    <Link to={"/books"}>
                        <div className="flex items-center mt-1 hover:text-indigo-300 pl-3">
                            <FaBook className="mr-8 ml-3"/>
                            <p>Libros</p>
                        </div>
                    </Link>
                    {userType !== '0' && (
                    <Link to={"/history"}>
                        <div className="flex items-center mt-1 hover:text-indigo-300 pl-3">
                            <GrHistory className="mr-8 ml-3"/>
                            <p>Historial</p>
                        </div>
                    </Link>
                    )}
                    {userType !== '0' && (
                    <Link to={"/reports"}>
                        <div className="flex items-center mt-1 hover:text-indigo-300 pl-3">
                            <TbReportAnalytics className="mr-8 ml-3"/>
                            <p>Reporte</p>
                        </div>
                    </Link>
                    )}
                    <hr className="mt-3 mb-3 border-t-2 mx-auto w-4/5 border-zinc-950"/>

                    <Link to={"/profile"}>
                        <div className="flex items-center mt-1 hover:bg-zinc-700 pl-2 py-2">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-md p-2">
                                <FaRegCircleUser className="font-bold text-xl"/>
                            </div>
                            <p className="ml-5">Perfil</p>
                        </div>
                    </Link>

                    <Link to={"/shopping-car"}>
                        <div className="flex items-center mt-1 hover:bg-zinc-700 pl-2 py-2">
                            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-md p-2">
                                <FaCartShopping className="font-bold text-xl"/>
                            </div>
                            <p className="ml-5">Carrito de compras</p>
                        </div>
                    </Link>

                    <button onClick={handleCloseSession} className={"w-full"}>
                        <div className="flex items-center mt-1 hover:bg-zinc-700 pl-2 py-2">
                            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md p-2">
                                <CiLogout className="font-bold text-xl"/>
                            </div>
                            <p className="ml-5">Cerrar sesión</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;