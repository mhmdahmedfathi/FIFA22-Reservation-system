import * as React from "react";
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
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClickProfile = () => {
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
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
            <form encType="multipart/form-data">
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
                    //   value={team1}
                    //   onChange={handleTeam1}
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
                    //   value={team2}
                    //   onChange={handleTeam2}
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
                    //   value={MatchVenue}
                    //   onChange={handleMatchVenue}
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
                    //   value={date}
                    //   onChange={handleDate}
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
                    //   value={time}
                    //   onChange={handleTime}
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
                    //   value={MainReferee}
                    //   onChange={handleMainReferee}
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
                    //   value={LineMan1}
                    //   onChange={handleLineMan1}
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
                    //   value={LineMan2}
                    //   onChange={handleLineMan2}
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
                    //   value={LineMan2}
                    //   onChange={handleLineMan2}
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
