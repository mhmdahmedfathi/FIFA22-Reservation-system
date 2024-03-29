import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import useCurrentState from "../../hooks/useCurrentState";
import useInput from "../../hooks/useInput";
import { getUser } from "../../StateManagment/Auth/actions";
import { signup } from "../Helpers/auth";
import "./admin.css";

function AdminSignup() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [BackendError, setBackendError] = useState();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUser());
    };
    if (auth.username.length === 0) {
      fetchUser();
    }
  }, []);

  const {
    value: name,
    error: errorName,
    handleChange: changeName,
  } = useInput((value) => value.length < 3);

  const {
    value: password,
    error: errorPassword,
    handleChange: changePassword,
  } = useInput((value) => value.length < 8);

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
    handleEvent: handleGender,
  } = useCurrentState((value) => value !== 0 && value !== 1);

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
      setError(
        "Make sure you entered the password correct and at least 8 chars ",
      );
    } else if (errorfirstName) {
      setError("Make sure you entered the firstname correct");
    } else if (errorlastname) {
      setError("Make sure you entered the lastname correct");
    } else if (errorDate) {
      setError("Make sure you entered the date correct");
    } else if (errorGender) {
      setError(
        'Make sure you entered the gender correct \n it must be "Male" or "Female"',
      );
    } else if (errorNationality) {
      setError("Make sure you entered the nationality correct");
    } else if (errorEmail) {
      setError("Make sure you entered the email correct");
    } else if (BackendError) {
      setError(BackendError);
    } else {
      setError(null);
    }
  }, [
    errorName,
    errorPassword,
    errorfirstName,
    errorlastname,
    errorDate,
    errorGender,
    errorNationality,
    errorEmail,
    gender,
    BackendError,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    } else if (gender === "") {
      setError(
        'Make sure you entered Gender correct \n it must be "Male" or "Female"',
      );
      return;
    }

    setLoading(true);
    const signupData = {
      username: name,
      password,
      firstname,
      lastname,
      birthdate: date,
      gender,
      nationality,
      email,
      role: "Admin",
    };
    const res = await signup(signupData);
    if (res.status === true) {
      setSuccess(true);
    } else {
      console.log(res.error);
      let log_error = "";
      for (var key in res.error.data.errors) {
        console.log(key);
        if (res.error.data.errors.hasOwnProperty(key)) {
          log_error +=
            res.error.data.errors[key].value +
            " =>  " +
            res.error.data.errors[key].msg +
            "\n";
        }
      }
      console.log(log_error);
      setBackendError(log_error);
    }
    setLoading(false);
  };

  if (success || auth.username.length > 0) {
    return <Redirect to="/login" />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Link
        to="/"
        className="btn btn-secondary position-fixed top-0 start-0 m-2"
      >
        Home
      </Link>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-dark text-light rounded-4"
      >
        <h2 className="text-center mb-3">Admin Signup</h2>
        {error && (
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
        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div className="dropdown" id="gender">
            <a
              style={{ margin: "auto" }}
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {gender.length === 0
                ? "Please enter valid gender"
                : gender === 1
                ? "Male"
                : "Female"}
            </a>

            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    changeGender(1);
                  }}
                >
                  Male
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    changeGender(0);
                  }}
                >
                  Female
                </a>
              </li>
            </ul>
          </div>
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

export default AdminSignup;
