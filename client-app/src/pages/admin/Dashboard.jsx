import React, { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';

function Dashboard() {

    const [clients, setClients] = useState([]);

    return (
        <>
            <h1 className="mt-5 pt-5 text-center fw-bold">Dashboard</h1>
            <div className="row mx-0 p-5 pt-3">
                <div className="col-12 col-md-6">
                    {clients.length ? (
                        <table
                            className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
                            style={{ height: 'fit-content' }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>clients</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link
                                                to={`/admin/edit-client/${client.slug}`}
                                                className="text-light"
                                            >
                                                {client.name}
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-link text-decoration-none text-danger"
                                                onClick={() => { }}
                                            >
                                                Delete{' '}
                                                <FontAwesomeIcon className="ms-2" icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="text-center">There are no clients</h2>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;