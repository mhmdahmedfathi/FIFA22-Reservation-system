import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useCurrentState from "../hooks/useCurrentState";
import { getUser } from '../StateManagment/Auth/actions';
import { fetchFan, editFan } from "./Helpers/fan";
// import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./fan.css";
import Nav from "react-bootstrap/Nav";
import { logout } from "./Helpers/auth";

export default function ResponsiveDialog() {
  const [fan, setFan] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    fetchFan(name, setFan)
  }, [name]);

  const {
    value: email,
    error: errorEmail,
    handleChange: changeEmail,
    handleEvent: handleEmail,
  } = useCurrentState((value) => {});

  const {
    value: FirstName,
    error: errorFirstName,
    handleChange: changeFirstName,
    handleEvent: handleFirstName,
  } = useCurrentState((value) => {});

  const {
    value: LastName,
    error: errorLastName,
    handleChange: changeLastName,
    handleEvent: handleLastName,
  } = useCurrentState((value) => {});

  const {
    value: BirthDate,
    error: errorBirthDate,
    handleChange: changeBirthDate,
    handleEvent: handleBirthDate,
  } = useCurrentState((value) => {});

  const {
    value: Gender,
    error: errorGender,
    handleChange: changeGender,
    handleEvent: handleGender,
  } = useCurrentState((value) => {});

  const {
    value: Nationality,
    error: errorNationality,
    handleChange: changeNationality,
    handleEvent: handleNationality,
  } = useCurrentState((value) => {});

  const {
    value: Role,
    error: errorRole,
    handleChange: changeRole,
    handleEvent: handleRole,
  } = useCurrentState((value) => {});

  const {
    value: Password,
    error: errorPassword,
    handleChange: changePassword,
    handleEvent: handlePassword,
  } = useCurrentState((value) => {} );

  const handleSave = async (e) => {
    e.preventDefault();
    let fan = {
      username: name,
      email: email,
      firstname: FirstName,
      lastname: LastName,
      birthdate: BirthDate,
      gender: Gender,
      nationality: Nationality,
      role: Role,
      password: Password
    };
    const res = await editFan(fan);
    if (res.status === 200) {
        setEdit(false);
        fetchFan(name, setFan);
    } else {
        // seterror("something went wrong");
    }
}

const saveState = (fan) => {
    changeFirstName(fan.firstname);
    changeLastName(fan.lastname);
    changeBirthDate(fan.birthdate);
    changeGender(fan.gender);
    changeNationality(fan.nationality);
    changeRole(fan.role);
    changePassword(fan.password);
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClickProfile = () => {
    setEdit(false);
    saveState(fan)
  };

  const handleEdit = () => {
    setEdit(true);
    saveState(fan)
  };

  const logOut = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div>
      <button
        className="navbar-brand btn btn-link text-decoration-none"
        style={{ color: "white" }}
        onClick={handleClickOpen}
      >
        Profile
      </button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Nav variant="tabs" defaultActiveKey="#profileForm">
            <Nav.Item>
              <Nav.Link onClick={handleClickProfile} href="#profileForm">
                Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleEdit} eventKey="link-1">
                Edit Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="ProfileForm" id="profileForm">
            <form encType="multipart/form-data" onSubmit={handleSave}>
              <div className="row align-items-end">
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    autoComplete="off"
                    autoFocus
                    disabled={true}
                    value={name}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Email Address</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Team2"
                    id="Team2"
                    placeholder="example@g.com"
                    autoComplete="off"
                    autoFocus
                    disabled={true}
                    value={email}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    placeholder="Abeer"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={edit? FirstName: fan.firstname}
                    onChange={handleFirstName}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="LastName"
                    id="LastName"
                    placeholder="Hussein"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={LastName}
                    onChange={handleLastName}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Birth Date</label>
                  <input
                    className="form-control"
                    type="Date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={BirthDate}
                    onChange={handleBirthDate}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Gender</label>
                  <input
                    className="form-control"
                    type="gender"
                    name="gender"
                    id="gender"
                    placeholder="Female"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={Gender}
                    onChange={handleGender}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Nationality</label>
                  <input
                    className="form-control"
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Egyptian"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={Nationality}
                    onChange={handleNationality}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Role</label>
                  <input
                    className="form-control"
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Fan"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={Role}
                    onChange={handleRole}
                  />
                </div>
                <div className="col-12 col-md-6 form-group mb-3">
                  <label htmlFor="title">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    autoComplete="off"
                    autoFocus
                    disabled={!edit}
                    value={Password}
                    onChange={handlePassword}
                  />
                </div>
              </div>
              {/* {edit && <button className="btn btn-warning">Submit</button>} */}
              <button className="btn btn-warning" disabled={!edit}>
                Submit
              </button>
              <button
                className="btn btn-secondary ms-3 ms-md-2"
                onClick={handleClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-secondary" onClick={logOut} autoFocus>
            Log Out
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
