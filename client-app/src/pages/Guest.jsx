import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AxiosConfiged from "../axiosConfig";
import { fetchMatchs } from "./Helpers/Mgmt";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";

function Guest() {
  const [Matches, setmatchs] = useState([]);
  const [match, setmatch] = useState({});
  const [view, setview] = useState(false);
  useEffect(() => {
    fetchMatchs(setmatchs);
  }, []);
  const handleView = (match) => {
    AxiosConfiged.get(`/matches/${match.id}`)
      .then((res) => {
        console.log(res.data);
        setmatch(res.data);
        setview(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setview(false);
  };
  return (
    <>
      <div>
        <nav className="navbar sticky-top navbar-black bg-black">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: "white" }}>
              Welcome
            </a>
            <a className="navbar-brand" style={{ color: "white" }} href="/">
              Home page
            </a>
          </div>
        </nav>
        <div className="row mx-0 p-5 pt-3">
          <div className="col-12 col-md-12">
            {Matches.length ? (
              <>
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>First team</th>
                      <th>time</th>
                      <th>Second team</th>
                      <th>view</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Matches.map((match, index) => (
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
                            view{" "}
                            <FontAwesomeIcon className="ms-2" icon={faEye} />
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
          {view && (
            <div>
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
                      disabled={true}
                      value={match.team1.name}
                      style={{
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                    />
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
                      disabled={true}
                      value={match.team2.name}
                      style={{
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px",
                      }}
                    />
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
                      disabled={true}
                      value={match.Stadium.name}
                    />
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
                    disabled={true}
                    value={match.date}
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
                    disabled={true}
                    value={match.time}
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
                      disabled={true}
                      value={match.ref1.name}
                    />
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
                      disabled={true}
                      value={match.ref2.name}
                    />
                    <div className="dropdown" id="title"></div>
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
                      disabled={true}
                      value={match.ref3.name}
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn col-2 col-md-1 btn-secondary ms-3 ms-md-2"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
}

export default Guest;
