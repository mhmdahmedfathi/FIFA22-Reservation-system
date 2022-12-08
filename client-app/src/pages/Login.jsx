import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from './Helpers/auth';

function Login() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        value: name,
        error: errorName,
        handleChange: changeName,
    } = useInput((value) => value.length < 3);

    const {
        value: password,
        error: errorPassword,
        handleChange: changePassword,
    } = useInput((value) => value.length < 3);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const LoginData = {
            name,
            password,
        };
        const res = await login(LoginData);
        if (!res.error) {
            setSuccess(true);
        } else {
            console.log(res.error);
        }
        setLoading(false);
    };

    if (success) {
        return <Redirect to="/admin" />;
    }


    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Link
                to="/"
                className="btn btn-secondary position-fixed top-0 start-0 m-2"
            >
                Home
            </Link>
            <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded">
                <h2 className="text-center mb-3">Login</h2>
                {(errorName || errorPassword) && (
                    <div className="alert alert-danger p-2 mb-3" role="alert">
                        {errorName ? "Make sure you entered the username correct" :
                            "Make sure you entered the password correct"}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={name}
                        onChange={changeName}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={changePassword}
                        required
                        autoComplete="on"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary d-block mx-auto"
                    disabled={loading}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;