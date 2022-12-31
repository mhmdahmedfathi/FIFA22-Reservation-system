import React, { useEffect, useState } from "react";
import { faEye, faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { add_editMatch, fetchMatchs, fetchTeams, fetchStadiums, fetchReferees } from './Helpers/Mgmt';
import { fetchFan, editFan, addReservation, fetchReservedSeats } from "./Helpers/fan";
import useCurrentState from "../hooks/useCurrentState";
import { logout } from "./Helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../StateManagment/Auth/actions";
import "./mgmt.css";
import "./fan.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dialog from "@mui/material/Dialog";
import fanprofile from "./FanProfile";
import CreditCard from "./CreditCard";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function FanHome() {
  const [fan, setFan] = useState([]);
  // const [addReservation, setAddReservation] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(0);
  const [reservedMatchID, setReservedMatchID] = useState(0);
  const [rowsNum, setRowsNum] = useState(0);
  const [colsNum, setColsNum] = useState(0);

  const [matchs, setmatchs] = useState([]);
  const [showenMatch, setshowenMatch] = useState(false);
  const [isEditable, setisEditable] = useState(false);
  const [holdID, setholdID] = useState(0);
  const [error, seterror] = useState("");
  const [add, setadd] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [Teams, setTeams] = useState(false);
  const [stadiums, setstadiums] = useState([]);
  const [referees, setreferees] = useState([]);

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
    fetchReservedSeats(reservedMatchID, setReservedSeat)
    fetchMatchs(setmatchs);
    fetchTeams(setTeams)
    fetchStadiums(setstadiums)
    fetchReferees(setreferees)
  }, []);

  // for the matches

  const handleCancel = () => {
    setisEditable(false);
    setshowenMatch();
  };

  const {
    value: team1,
    error: errorTeam1,
    handleChange: changeTeam1,
    handleEvent: handleTeam1,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: team2,
    error: errorTeam2,
    handleChange: changeTeam2,
    handleEvent: handleTeam2,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: MatchVenue,
    error: errorMatchVenue,
    handleChange: changeMatchVenue,
    handleEvent: handleMatchVenue,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: date,
    error: errorDate,
    handleChange: changeDate,
    handleEvent: handleDate,
  } = useCurrentState((value) => false);

  const {
    value: time,
    error: errorTime,
    handleChange: changeTime,
    handleEvent: handleTime,
  } = useCurrentState((value) => false);

  const {
    value: MainReferee,
    error: errorMainReferee,
    handleChange: changeMainReferee,
    handleEvent: handleMainReferee,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: LineMan1,
    error: errorLineMan1,
    handleChange: changeLineMan1,
    handleEvent: handleLineMan1,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: LineMan2,
    error: errorLineMan2,
    handleChange: changeLineMan2,
    handleEvent: handleLineMan2,
  } = useCurrentState((value) => value.length < 3);

  const handleSave = async (e) => {
    e.preventDefault();
    let match = {
      id: holdID,
      team1: team1,
      team2: team2,
      MatchVenue: MatchVenue,
      Date: date,
      Time: time,
      MainReferee: MainReferee,
      Lineman1: LineMan1,
      Limeman2: LineMan2,
    };
    const res = await add_editMatch(match, add);
    if (res.status === 200) {
      setisEditable(false);
      setshowenMatch(false);
      fetchMatchs(setmatchs);
      setadd(false);
    } else {
      seterror("something went wrong");
    }
  };

  const handleSaveReservation = async (e) => {
    e.preventDefault();
    let reservation = {
      date: new Date(),
      seatNumber: reservedSeat,
      userid: fan.id,
      matchid: reservedMatchID
    };
    const res = await addReservation(reservation)
    if (res.status === 200) {
      
    } else {
      seterror("something went wrong");
    }
  };

  const saveState = (match) => {
    setholdID(match.id);
    changeTeam1(match.team1);
    changeTeam2(match.team2);
    changeMatchVenue(match.MatchVenue);
    changeDate(match.Date);
    changeTime(match.Time);
    changeMainReferee(match.MainReferee);
    changeLineMan1(match.Lineman1);
    changeLineMan2(match.Limeman2);
  };

  const handleView = (match) => {
    setshowenMatch(true);
    setisEditable(false);
    saveState(match);
  };

  const [seatDisable, setSeatDisable] = React.useState(false);

  const handleReserve = (match) => {
    setShowGrid(true);
    setReservedMatchID(match.id)
    setRowsNum(match.Stadium.rows)
    setColsNum(match.Stadium.seatsPerRow)
  };

  const handleReserveSeat = () => {
    setSeatDisable(true);
  };

  const [openPay, setOpenPay] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  let disableArray = [];

  const handleOpenPay = () => {
    setOpenPay(true);
  };

  const handleClosePay = () => {
    setOpenPay(false);
  };

  let isSubmitted = [];
  for (let i = 0; i < rowsNum * colsNum; i++) {
    isSubmitted.push(0);
  }
  isSubmitted[2] = 1;

  return (
    <div>
      <nav className="navbar sticky-top navbar-black bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: "white" }}>
            Home {name}
          </a>
          <a className="navbar-brand" style={{ color: "white" }}>
            FIFA WORLD CUP 22
          </a>
          {fanprofile()}
        </div>
      </nav>
      <h1 className="mt-2 pt-5 text-center fw-bold"> Matches</h1>
      <div className="row mx-0 p-5 pt-3">
        <div className="col-12 col-md-12">
          {matchs.length ? (
            <>
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>First team</th>
                    <th>time</th>
                    <th>Second team</th>
                    <th>view</th>
                    <th>reserve</th>
                    <th>cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {matchs.map((match, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td> {match.team1} </td>
                      <td> {match.Time} </td>
                      <td> {match.team2}</td>
                      <td>
                        <button
                          className="btn btn-myedit btn-link text-decoration-none text-view"
                          onClick={() => {
                            handleView(match);
                          }}
                        >
                          view <FontAwesomeIcon className="ms-2" icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <a href="#TicketReserve">
                          <button
                            className="btn btn-myedit btn-link text-decoration-none text-success"
                            onClick={() => {
                              handleReserve(match);
                            }}
                          >
                            reserve{" "}
                            <FontAwesomeIcon className="ms-2" icon={faFutbol} />
                          </button>
                        </a>
                      </td>
                      <td>
                        <a href="#TicketReserve">
                          <button
                            className="btn btn-myedit btn-link text-decoration-none text-danger"
                            onClick={() => {
                              handleReserve(match);
                            }}
                          >
                            cancel{" "}
                            <FontAwesomeIcon className="ms-2" icon={faFutbol} />
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h2 className="text-center">There are no matchs</h2>
          )}
        </div>
        <div className="col-12 col-md-12">
          {showenMatch && (
            <>
              <h1 className="mt-2 pt-5 text-center fw-bold">
                {" "}
                Match {add ? "add" : !isEditable ? "view" : "reserve"}
              </h1>
              {error && (
                <div className="alert alert-danger p-2 mb-1" role="alert">
                  {error}
                </div>
              )}
              <form encType="multipart/form-data" onSubmit={handleSave}>
                <div className="row align-items-end">
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Team 1</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Team1"
                      id="Team1"
                      placeholder="Team 1"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={team1}
                      onChange={handleTeam1}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Team 2</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Team2"
                      id="Team2"
                      placeholder="Team 2"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={team2}
                      onChange={handleTeam2}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Match Venue</label>
                    <input
                      className="form-control"
                      type="text"
                      name="MatchVenue"
                      id="MatchVenue"
                      placeholder="Match Venue"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={MatchVenue}
                      onChange={handleMatchVenue}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      id="date"
                      placeholder="Date"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={date}
                      onChange={handleDate}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Time</label>
                    <input
                      className="form-control"
                      type="time"
                      name="time"
                      id="time"
                      placeholder="time"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={time}
                      onChange={handleTime}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Main Referee</label>
                    <input
                      className="form-control"
                      type="text"
                      name="mainReferee"
                      id="mainReferee"
                      placeholder="Main Referee"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={MainReferee}
                      onChange={handleMainReferee}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Lineman 1</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lineMan1"
                      id="lineMan1"
                      placeholder="LineMan 1"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={LineMan1}
                      onChange={handleLineMan1}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Lineman 2</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lineMan2"
                      id="lineMan2"
                      placeholder="Lineman 2"
                      autoComplete="off"
                      autoFocus
                      disabled={!isEditable}
                      value={LineMan2}
                      onChange={handleLineMan2}
                    />
                  </div>
                </div>

                {isEditable && (
                  <button
                    className="btn col-2 col-md-1 btn-warning"
                    disabled={!isEditable}
                  >
                    Submit
                  </button>
                )}
                <button
                  className="btn col-2 col-md-1 btn-secondary ms-3 ms-md-2"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
        <div className="col-12 col-md-12">
          {showGrid && (
            <>
              <h1 className="mt-2 pt-5 text-center fw-bold"> Match Reserve</h1>
              {error && (
                <div className="alert alert-danger p-2 mb-1" role="alert">
                  {error}
                </div>
              )}

              <div id="TicketReserve">
                <Container>
                  {Array.from(Array(rowsNum)).map((_i, index_i) => (
                    <Row className="stadRow">
                      {Array.from(Array(colsNum)).map((_j, index_j) => (
                        <Col>
                          <button
                            className= "btn block btn-secondary stadBtn"
                            id={index_j + colsNum * index_i + 1}
                            onClick={() => {
                              setReservedSeat(index_j + colsNum * index_i + 1)
                              // setOpenPay(true);
                              // disableArray.push(index_j+cols_num*index_i+1)
                              // console.log(disableArray)
                              // console.log(isSubmitted)
                              // btnToDisable = index_j+cols_num*index_i+1
                              // changeBtnColor()
                              // document.getElementById(index_j+cols_num*index_i+1).style.backgroundColor="#41403e"
                            }}
                            disabled={
                              isSubmitted[index_j + colsNum * index_i + 1]
                            }
                          >
                            {index_j + colsNum * index_i + 1}
                          </button>
                        </Col>
                      ))}
                    </Row>
                  ))}
                  <div>
                    <Dialog
                      fullScreen={fullScreen}
                      open={openPay}
                      onClose={handleClosePay}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogContent>
                        <div>
                          <form>
                            <div
                              className="form-group"
                              encType="multipart/form-data"
                            >
                              <label>Credit Card Number</label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Credit Card Number"
                              />
                            </div>
                            <div className="form-group">
                              <label>Pin Number</label>
                              <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Pin Number"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                handleSaveReservation()
                                setOpenPay(false)
                              }}
                            >
                              Submit
                            </button>

                            <button
                              className="btn btn-secondary ms-3 ms-md-2"
                              onClick={handleClosePay}
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Container>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FanHome;