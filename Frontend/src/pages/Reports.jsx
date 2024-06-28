import Layout from "../components/Layout.jsx";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function Reports() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch("http://localhost:3000/history/reporte", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setItems(data.result);
                console.log(data.result); // Asegúrate de usar data.result aquí
            } catch (error) {
                console.error('Error:', error);
                setItems([]); // Manejar errores limpiando los items si es necesario
            }
        };

        fetchReport();
    }, []);

    // Datos del gráfico - actualiza con los datos dinámicos obtenidos de items
    const chartData = {
        labels: items.map(item => item.title),
        datasets: [{
            data: items.map(item => item.totalQuantity),
            backgroundColor: ['#4f46e5', '#2563eb', '#42a5f5', '#66bb6a', '#ffca28'] // Ajusta según la cantidad de datos
        }]
    };

    return (
        <Layout title="Reportes">
            <div className="ml-[300px] grow px-7 py-5">
                <div className="flex justify-center items-center text-center w-2/3">
                    <Pie data={chartData} />
                </div>
            </div>
        </Layout>
    );
}

export default Reports;
