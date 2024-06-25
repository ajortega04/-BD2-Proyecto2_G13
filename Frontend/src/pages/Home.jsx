import Layout from "../components/Layout.jsx";

function Home() {
    return(
        <>
            <Layout
                title={"Inicio"}
            >
                <div className={"flex flex-col justify-center items-center pt-36"}>
                    <h1 className={"text-4xl font-medium"}>
                        Sistemas de bases de datos 2
                    </h1>
                    <h2 className={"text-2xl text-slate-600 font-medium"}>Grupo 13</h2>
                    <div className={"grid grid-cols-3 gap-x-5 mt-10"}>
                        <img
                            className={"h-16"}
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                            alt="React"
                        />
                        <img
                            className={"h-16 ml-1"}
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                            alt="NodeJS"
                        />
                        <img
                            className={"h-16"}
                            src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg"
                            alt="MongoDB"
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Home;