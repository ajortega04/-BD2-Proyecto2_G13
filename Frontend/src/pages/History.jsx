import Layout from "../components/Layout.jsx";
function History() {
    return(
        <Layout
            title={"Historial"}
        >
            <div className={""}>
                <table className={"table-auto w-full text-center"}>
                    <thead className={"rounded-md"}>
                        <tr className={"bg-slate-700 text-white"}>
                            <th className={"px-2 py-2"}>Song</th>
                            <th>Artist</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td>Malcolm Lockyer</td>
                            <td>1961</td>
                        </tr>
                        <tr>
                            <td>Witchy Woman</td>
                            <td>The Eagles</td>
                            <td>1972</td>
                        </tr>
                        <tr>
                            <td>Shining Star</td>
                            <td>Earth, Wind, and Fire</td>
                            <td>1975</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </Layout>
    )
}

export default History;