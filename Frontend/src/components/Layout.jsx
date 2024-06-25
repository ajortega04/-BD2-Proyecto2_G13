import Sidebar from "./Sidebar.jsx";

// eslint-disable-next-line react/prop-types
function Layout({ title, children }) {
    return(
        <div className={"flex h-screen"}>
            <Sidebar/>
            <div className={"ml-[300px] grow px-7 py-5"}>
                <div>
                    <h1 className={"text-2xl font-semibold uppercase pb-4"}>{ title }</h1>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Layout;
