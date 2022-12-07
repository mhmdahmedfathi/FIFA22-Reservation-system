import React, { useEffect, useState } from 'react';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { fetchUsers } from './helpers/index';
import AxiosConfiged from '../../axiosConfig';

function Dashboard() {

    const [users, setUsers] = useState([]);
    const [newManagers, setnewManagers] = useState([]);

    useEffect(() => {
        fetchUsers(setUsers, setnewManagers);
    }, []);

    const handleDelete = (id) => {
        const res = AxiosConfiged.delete(`/users/${id}`);
        if (res.status === 200) {
            setUsers((prev) => prev.filter((user) => user.id !== id));
        }
    };

    const handleAccept = (manager) => {
        const res = AxiosConfiged.post(`/users/accept-manager/${manager.id}`);
        if (res.status === 200) {
            setnewManagers((prev) => prev.filter((managers) => managers.id !== manager.id));
            setUsers((prev) => [...prev, manager]);
        }
    };


    return (
        <div>
            <h1 className="mt-5 pt-5 text-center fw-bold">Dashboard</h1>
            <div className="row mx-0 p-5 pt-3">
                <div className="col-12 col-md-6">
                    {users.length ? (
                        <table
                            className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
                            style={{ height: 'fit-content' }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>users</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <button
                                                className="btn btn-link text-decoration-none text-danger"
                                                onClick={() => { handleDelete(user.id) }}
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
                        <h2 className="text-center">There are no users</h2>
                    )}
                </div>
                <div className="col-12 col-md-6">
                    {newManagers.length ? (
                        <table
                            className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
                            style={{ height: 'fit-content' }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>new managers</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {newManagers.map((manager, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {manager.username}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-link text-decoration-none text-accept"
                                                onClick={() => { handleAccept(manager) }}
                                            >
                                                Accept{' '}
                                                <FontAwesomeIcon className="ms-2" icon={faCheck} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="text-center">There are no manager request</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;