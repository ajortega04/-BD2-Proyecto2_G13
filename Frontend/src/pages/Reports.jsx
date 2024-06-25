import Layout from "../components/Layout.jsx";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);


function Reports() {
    const chartData = {
        labels: ['C.S. Lewis', 'Harry Potter'],
        datasets: [{
            data: [90, 30],
            backgroundColor: ['#4f46e5', '#2563eb']
        }]
    };

    return(
        <Layout
            title={"Reportes"}
        >
            <div className={"ml-[300px] grow px-7 py-5"}>
                <div className={"flex justify-center items-center text-center w-2/3"}>
                    <Pie data={ chartData } />
                </div>
            </div>
        </Layout>
    )
}

export default Reports;