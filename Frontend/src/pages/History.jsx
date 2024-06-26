import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Accordion, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function History() {
    const [status, setStatus] = useState('enProceso');
    const [items, setItems] = useState([]);

    const statusCompras = (event) => {
        setStatus(event.target.id);
    };

    const consultaHistorial = async (status) => {
        try {
            const response = await fetch(`http://localhost:3000/history/${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setItems([]);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error:', error);
            setItems([]); // Manejar errores limpiando los items si es necesario
        }
    };

    const CambirStatus = async (id) => {
        const data = {
            "id" : id
        }
        console.log(data)
        try {
            const response = await fetch("http://localhost:3000/history/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }else{
                setStatus("enviado")
            }
        } catch (error) {
            console.error('Error:', error);
            setItems([]); // Manejar errores limpiando los items si es necesario
        }
    }

    useEffect(() => {
        consultaHistorial(status);
    }, [status]);

    return (
        <Layout title={"Historial"}>
            <div>
                <div className="">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="enProceso" checked={status === 'enProceso'} onChange={statusCompras} />
                        <label className="form-check-label" htmlFor="enProceso">
                            En Proceso
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="enviado" checked={status === 'enviado'} onChange={statusCompras} />
                        <label className="form-check-label" htmlFor="enviado">
                            Enviado
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="entregado" checked={status === 'entregado'} onChange={statusCompras} />
                        <label className="form-check-label" htmlFor="entregado">
                            Entregado
                        </label>
                    </div>
                </div>
                <div>
                    <Accordion defaultActiveKey="0">
                        {items.map((item, index) => (
                            <Accordion.Item key={index} eventKey={index.toString()}>
                                <Accordion.Header> Compra realizada por: {item.userId} Fecha de compra: {new Date(item.createdAt).toLocaleString()}</Accordion.Header>
                                <Accordion.Body>
                                    <ol class="list-group list-group-flush">

                                        {item.items.map((books, index) => (
                                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                                <div class="ms-2 me-auto">
                                                    <div class="fw-bold">{books.titulo}</div>
                                                    <p> Precio : {books.precio}</p>
                                                    <p> cantidad  {books.cantidad}</p>
                                                </div>
                                            </li>
                                        ))}

                                    </ol>
                                    {status === 'enProceso' && (
                                        <Button onClick={() => CambirStatus(item.id)} >Comfirmar Envio</Button>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        </Layout>
    );
}

export default History;
