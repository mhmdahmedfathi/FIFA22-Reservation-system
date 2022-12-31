import React, { useEffect, useState } from "react";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { fetchUsers } from "./helpers/index";
import AxiosConfiged from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../StateManagment/Auth/actions";
import { logout } from "../Helpers/auth";
import "./admin.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newManagers, setnewManagers] = useState([]);

  useEffect(() => {
    fetchUsers(setUsers, setnewManagers);
  }, []);

  const handleDelete = async (id) => {
    const res = await AxiosConfiged.delete(`/users/${id}`);
    if (res.status === 200) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleAccept = async (manager) => {
    const res = await AxiosConfiged.post(`/users/approve/${manager.id}`);
    if (res.status === 200) {
      setnewManagers((prev) =>
        prev.filter((managers) => managers.id !== manager.id),
      );
      setUsers((prev) => [...prev, manager]);
    }
  };

  const name = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUser());
    };
    if (name.length === 0) {
      fetchUser();
    }
  }, []);

  const log_out = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <nav className="navbar sticky-top navbar-black bg-black">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: "white" }}>
              Welcome {name}
            </a>
            <a className="navbar-brand" style={{ color: "white" }}>
              Dashboard
            </a>
            <a
              className="navbar-brand"
              style={{ color: "white" }}
              href="javascript:void(0)"
              onClick={() => {
                log_out();
              }}
            >
              log out
            </a>
          </div>
        </nav>
        <div className="row mx-0 p-5 pt-3">
          <h3 className="mt-2 pt-1 text-center fw-bold">Managers Request</h3>
          <div className="col-12 col-md-12">
            {newManagers.length ? (
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">username</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody className="body_table">
                  {newManagers.map((manager, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{manager.username}</td>
                      <td>{manager.firstname}</td>
                      <td>{manager.lastname}</td>
                      <td>{manager.email}</td>
                      <td>{manager.gender === 0 ? "Female" : "Male"}</td>
                      <td>
                        <button
                          className="btn btn-link text-decoration-none text-approve"
                          style={{ color: "green" }}
                          onClick={() => {
                            handleAccept(manager);
                          }}
                        >
                          Accept{" "}
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
        <div className="row mx-0 p-5 pt-3">
          <div className="col-12 col-md-12">
            <h3 className="mt-2 pt-1 text-center fw-bold">Users</h3>
            {users.length ? (
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">username</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Role</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody className=" body_table table-white">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.username}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.gender === 0 ? "Female" : "Male"}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-link text-decoration-none text-danger"
                          onClick={() => {
                            handleDelete(user.id);
                          }}
                        >
                          Delete{" "}
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
