import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { signup } from './Helpers/auth';

function Signup() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

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

    const {
        value: firstname,
        error: errorfirstName,
        handleChange: changefirstName,
    } = useInput((value) => value.length < 3);

    const {
        value: lastname,
        error: errorlastname,
        handleChange: changelastName,
    } = useInput((value) => value.length < 3);
    const {
        value: date,
        error: errorDate,
        handleChange: changeDate,
    } = useInput((value) => false);

    const {
        value: gender,
        error: errorGender,
        handleChange: changeGender,
    } = useInput((value) => value !== "Male" && value !== "Female");

    const {
        value: nationality,
        error: errorNationality,
        handleChange: changeNationality,
    } = useInput((value) => false);

    const {
        value: email,
        error: errorEmail,
        handleChange: changeEmail,
    } = useInput((value) => !value.includes("@"));


    useEffect(() => {
        if (errorName) {
            setError("Make sure you entered the username correct");
        } else if (errorPassword) {
            setError("Make sure you entered the password correct");
        } else if (errorfirstName) {
            setError("Make sure you entered the firstname correct");
        } else if (errorlastname) {
            setError("Make sure you entered the lastname correct");
        } else if (errorDate) {
            setError("Make sure you entered the date correct");
        } else if (errorGender) {
            setError("Make sure you entered the gender correct \n it must be \"Male\" or \"Female\"");
        } else if (errorNationality) {
            setError("Make sure you entered the nationality correct");
        } else if (errorEmail) {
            setError("Make sure you entered the email correct");
        } else {
            setError(null);
        }
    }, [errorName, errorPassword, errorfirstName, errorlastname, errorDate, errorGender, errorNationality, errorEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const signupData = {
            name,
            password,
            firstname,
            lastname,
            date,
            gender,
            nationality,
            email,
            role: "admin"
        };
        const res = await signup(signupData);
        if (!res.error) {
            setSuccess(true);
        } else {
            console.log(res.error);
        }
        setLoading(false);
    };

    if (success) {
        return <Redirect to="/admin/login" />;
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
                <h2 className="text-center mb-3">Admin Signup</h2>
                {(error) && (
                    <div className="alert alert-danger p-2 mb-3" role="alert">
                        {error}
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
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        id="firstname"
                        placeholder="firstname"
                        value={firstname}
                        onChange={changefirstName}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        id="lastname"
                        placeholder="lastname"
                        value={lastname}
                        onChange={changelastName}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label mb-1">
                        Birth date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        name="birthdate"
                        id="birthdate"
                        placeholder="birthdate"
                        value={date}
                        onChange={changeDate}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label mb-1">
                        Gender
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        id="gender"
                        placeholder="gender"
                        value={gender}
                        onChange={changeGender}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Nationality" className="form-label mb-1">
                        Nationality
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="Nationality"
                        id="Nationality"
                        placeholder="Nationality"
                        value={nationality}
                        onChange={changeNationality}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-1">
                        Email address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={changeEmail}
                        required
                        autoFocus
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

export default Signup;