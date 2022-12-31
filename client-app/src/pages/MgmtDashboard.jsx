/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addStadium,
  add_editMatch,
  fetchMatchs,
  fetchTeams,
  fetchStadiums,
  fetchReferees,
} from "./Helpers/Mgmt";
import useCurrentState from "../hooks/useCurrentState";
import { logout } from "./Helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../StateManagment/Auth/actions";
import "./mgmt.css";

function MgmtDashboard() {
  const [matchs, setmatchs] = useState([]);
  const [showenMatch, setshowenMatch] = useState(false);
  const [isEditable, setisEditable] = useState(false);
  const [holdID, setholdID] = useState(0);
  const [error, seterror] = useState("");
  const [error_Stadium, seterror_Stadium] = useState("");
  const [add, setadd] = useState(false);
  const [showStadium, setshowStadium] = useState(false);
  const [Teams, setTeams] = useState(false);
  const [stadiums, setstadiums] = useState([]);
  const [referees, setreferees] = useState([]);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    fetchMatchs(setmatchs);
    fetchTeams(setTeams);
    fetchStadiums(setstadiums);
    fetchReferees(setreferees);
  }, []);

  // for the matchs

  const handleCancel = () => {
    setisEditable(false);
    setshowenMatch();
  };

  const {
    value: team1,
    error: errorTeam1,
    handleChange: changeTeam1,
    handleEvent: handleTeam1,
  } = useCurrentState(
    (value) =>
      team2 === value ||
      Teams.find((team) => team.name === value) === undefined,
  );
  const {
    value: team2,
    error: errorTeam2,
    handleChange: changeTeam2,
    handleEvent: handleTeam2,
  } = useCurrentState(
    (value) =>
      team1 === value ||
      Teams.find((team) => team.name === value) === undefined,
  );

  const {
    value: MatchVenue,
    error: errorMatchVenue,
    handleChange: changeMatchVenue,
    handleEvent: handleMatchVenue,
  } = useCurrentState(
    (value) => stadiums.find((stadium) => stadium.name === value) === undefined,
  );

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
  } = useCurrentState(
    (value) =>
      LineMan1 === value ||
      LineMan2 === value ||
      referees.find((Referee) => Referee.name === value) === undefined,
  );

  const {
    value: LineMan1,
    error: errorLineMan1,
    handleChange: changeLineMan1,
    handleEvent: handleLineMan1,
  } = useCurrentState(
    (value) =>
      MainReferee === value ||
      LineMan2 === value ||
      referees.find((Referee) => Referee.name === value) === undefined,
  );

  const {
    value: LineMan2,
    error: errorLineMan2,
    handleChange: changeLineMan2,
    handleEvent: handleLineMan2,
  } = useCurrentState(
    (value) =>
      LineMan1 === value ||
      MainReferee === value ||
      referees.find((Referee) => Referee.name === value) === undefined,
  );

  const handleSave = async (e) => {
    e.preventDefault();
    let match = {
      id: holdID,
      team1: Teams.find((team) => team.name === team1).id,
      team2: Teams.find((team) => team.name === team2).id,
      stadium_id: stadiums.find((stadium) => stadium.name === MatchVenue).id,
      date: date,
      time: time,
      ref1: referees.find((Referee) => Referee.name === MainReferee).id,
      ref2: referees.find((Referee) => Referee.name === LineMan1).id,
      ref3: referees.find((Referee) => Referee.name === LineMan2).id,
      isFull,
    };
    const res = await add_editMatch(match, add);
    console.log(res);
    if (res.status === 200) {
      setisEditable(false);
      setshowenMatch(false);
      await fetchMatchs(setmatchs);
      setadd(false);
    } else {
      seterror("something went wrong");
    }
  };

  const saveState = (match) => {
    setholdID(match.id);
    changeTeam1(match.team1.name);
    changeTeam2(match.team2.name);
    changeMatchVenue(match.Stadium.name);
    changeDate(match.date.slice(0, 10) || "2022-12-22");
    changeTime(match.time || "20:00");
    changeMainReferee(match.ref1.name);
    changeLineMan1(match.ref2.name);
    changeLineMan2(match.ref3.name);
    setIsFull(match.isFull);
  };

  const clearState = () => {
    changeTeam1("");
    changeTeam2("");
    changeMatchVenue("");
    changeDate("");
    changeTime("");
    changeMainReferee("");
    changeLineMan1("");
    changeLineMan2("");
  };

  const handleAdd = () => {
    clearState();
    setadd(true);
    setisEditable(true);
    setshowenMatch(true);
  };

  const handleView = (match) => {
    setshowenMatch(true);
    setisEditable(false);
    saveState(match);
  };

  const handleEdit = (match) => {
    setisEditable(true);
    setshowenMatch(match);
    saveState(match);
  };

  useEffect(() => {
    if (errorTeam1) {
      seterror(
        "Make sure that Team 1 name is not the same as Team 2 name and that it is found in the teams list",
      );
    } else if (errorTeam2) {
      seterror(
        "Make sure that Team 2 name is not the same as Team 1 name and that it is found in the teams list",
      );
    } else if (errorMatchVenue) {
      seterror("Match Venue name is too short");
    } else if (errorMainReferee) {
      seterror("Main Referee name is too short");
    } else if (errorLineMan1) {
      seterror("Lineman 1 name is too short");
    } else if (errorLineMan2) {
      seterror("Lineman 2 name is too short");
    } else {
      seterror("");
    }
  }, [
    errorTeam1,
    errorTeam2,
    errorMatchVenue,
    errorMainReferee,
    errorLineMan1,
    errorLineMan2,
  ]);

  // for the Stadiums

  const {
    value: Stadium_name,
    error: errorStadium_name,
    handleChange: changeStadium_name,
    handleEvent: handleStadium_name,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: rows,
    error: errorRows,
    handleChange: changeRows,
    handleEvent: handleRows,
  } = useCurrentState((value) => value < 0);

  const {
    value: Columns,
    error: errorColumns,
    handleChange: changeColumns,
    handleEvent: handleColumns,
  } = useCurrentState((value) => value < 0);

  const {
    value: city,
    error: errorCity,
    handleChange: changeCity,
    handleEvent: handleCity,
  } = useCurrentState((value) => value.length < 3);

  const {
    value: country,
    error: errorCountry,
    handleChange: changeCountry,
    handleEvent: handleCountry,
  } = useCurrentState((value) => value.length < 3);

  useEffect(() => {
    if (errorStadium_name) {
      seterror_Stadium("Stadium name is too short");
    } else if (errorRows) {
      seterror_Stadium("Rows number must be more than 0");
    } else if (errorColumns) {
      seterror_Stadium("Columns number must be more than 0");
    } else {
      seterror_Stadium("");
    }
  }, [errorStadium_name, errorRows, errorColumns]);

  const handleSaveStadium = async (e) => {
    e.preventDefault();
    let stadium = {
      name: Stadium_name,
      rows,
      city,
      country,
      seatsPerRow: Columns,
    };
    const res = await addStadium(stadium);
    if (res.status === 200) {
      setshowStadium(false);
    } else {
      seterror_Stadium("Stadium name already exists");
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
    <div>
      <nav className="navbar sticky-top navbar-black bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: "white" }}>
            Welcome {name}
          </a>
          <a className="navbar-brand" style={{ color: "white" }}>
            Manager Dashboard
          </a>
          <a
            className="navbar-brand"
            style={{ color: "white" }}
            href=""
            onClick={() => {
              log_out();
            }}
          >
            log out
          </a>
        </div>
      </nav>
      <h1 className="mt-2 pt-5 text-center fw-bold"> Match details</h1>
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
                    <th>edit</th>
                  </tr>
                </thead>
                <tbody>
                  {matchs.map((match, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td> {match.team1.name} </td>
                      <td> {match.time || "8:00 PM"} </td>
                      <td> {match.team2.name}</td>
                      <td>
                        <button
                          className="btn btn-link text-decoration-none text-view"
                          onClick={() => {
                            handleView(match);
                          }}
                        >
                          view <FontAwesomeIcon className="ms-2" icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-link text-decoration-none text-danger"
                          onClick={() => {
                            handleEdit(match);
                          }}
                        >
                          Edit{" "}
                          <FontAwesomeIcon className="ms-2" icon={faEdit} />
                        </button>
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
        <div className="col-12 col-md-12 ">
          {showenMatch && (
            <>
              <h1 className="mt-2 pt-5 text-center fw-bold">
                {" "}
                Match {add ? "add" : !isEditable ? "view" : "edit"}
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
                    <div style={{ display: "flex" }}>
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
                        style={{
                          borderBottomRightRadius: "0px",
                          borderTopRightRadius: "0px",
                        }}
                      />
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {Teams.length > 0 &&
                            Teams.map((team, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeTeam1(team.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {team.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Team 2</label>
                    <div style={{ display: "flex" }}>
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
                        style={{
                          borderBottomRightRadius: "0px",
                          borderTopRightRadius: "0px",
                        }}
                      />
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {Teams.length > 0 &&
                            Teams.map((team, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeTeam2(team.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {team.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Match Venue</label>
                    <div style={{ display: "flex" }}>
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
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {stadiums.length > 0 &&
                            stadiums.map((stadium, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeMatchVenue(stadium.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {stadium.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
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
                      onChange={(e) => {
                        changeDate(e.target.value);
                      }}
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
                    <div style={{ display: "flex" }}>
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
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {referees.length > 0 &&
                            referees.map((referee, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeMainReferee(referee.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {referee.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Lineman 1</label>
                    <div style={{ display: "flex" }}>
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
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {referees.length > 0 &&
                            referees.map((referee, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeLineMan1(referee.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {referee.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Lineman 2</label>
                    <div style={{ display: "flex" }}>
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
                      <div className="dropdown" id="title">
                        <a
                          style={{ margin: "auto" }}
                          className="btn btn-secondary dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <faList />
                        </a>

                        <ul
                          className="dropdown-menu"
                          style={{
                            borderBottomLeftRadius: "0px",
                            borderTopLeftRadius: "0px",
                          }}
                        >
                          {referees.length > 0 &&
                            referees.map((referee, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  changeLineMan2(referee.name);
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  {referee.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <button
              className="btn col-4 col-md-2 btn-primary"
              onClick={() => {
                handleAdd();
              }}
            >
              Add match
            </button>
            <button
              className="btn col-4 col-md-2 btn-warning ms-3 ms-md-2"
              onClick={() => {
                setshowStadium(true);
              }}
            >
              Add Stadium
            </button>
          </div>
        </div>

        <div className="col-12 col-md-12">
          {showStadium && (
            <>
              <h1 className="mt-2 pt-5 text-center fw-bold"> Add Stadium</h1>
              {error_Stadium && (
                <div className="alert alert-danger p-2 mb-1" role="alert">
                  {error_Stadium}
                </div>
              )}
              <form encType="multipart/form-data" onSubmit={handleSaveStadium}>
                <div className="row align-items-end">
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Stadium name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="StadiumName"
                      id="StadiumName"
                      placeholder="Stadium Name"
                      autoComplete="off"
                      autoFocus
                      value={Stadium_name}
                      onChange={handleStadium_name}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Shape</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Shape"
                      id="Shape"
                      placeholder="Shape"
                      autoComplete="off"
                      autoFocus
                      value={"Rectangular Lounge"}
                      disabled={true}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Rows</label>
                    <input
                      className="form-control"
                      type="number"
                      name="Rows"
                      id="Rows"
                      placeholder="Rows"
                      autoComplete="off"
                      autoFocus
                      value={rows}
                      onChange={handleRows}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Columns</label>
                    <input
                      className="form-control"
                      type="number"
                      name="Columns"
                      id="Columns"
                      placeholder="Columns"
                      autoComplete="off"
                      autoFocus
                      value={Columns}
                      onChange={handleColumns}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">City</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Rows"
                      id="Rows"
                      placeholder="city"
                      autoComplete="off"
                      autoFocus
                      value={city}
                      onChange={handleCity}
                    />
                  </div>
                  <div className="col-12 col-md-6 form-group mb-3">
                    <label htmlFor="title">Country</label>
                    <input
                      className="form-control"
                      type="text"
                      name="Columns"
                      id="Columns"
                      placeholder="country"
                      autoComplete="off"
                      autoFocus
                      value={country}
                      onChange={handleCountry}
                    />
                  </div>
                </div>

                <button className="btn col-2 col-md-1 btn-warning">
                  Submit
                </button>
                <button
                  className="btn col-2 col-md-1 btn-secondary ms-3 ms-md-2"
                  onClick={() => {
                    setshowStadium(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MgmtDashboard;
