import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./fan.css";
import Nav from "react-bootstrap/Nav";
import { logout } from "./Helpers/auth";

export default function CreditCard() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="ProfileForm" id="profileForm">
            <form encType="multipart/form-data">
              {/* <div className="row align-items-end"> */}
              <div className="row align-items-end">
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
              <div className="row align-items-end">
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
              {/* </div> */}
              <button className="btn btn-warning">Submit</button>
              <button
                className="btn btn-secondary ms-3 ms-md-2"
                onClick={() => {
                  // handleCancel();
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-secondary" onClick={handleClose} autoFocus>
            Ok
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
