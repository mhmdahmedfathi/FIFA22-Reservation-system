import React, { useEffect, useState } from 'react';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AxiosConfiged from '../axiosConfig';
import { editMatch, fetchMatchs } from './Helpers/Mgmt';
import useInput from '../hooks/useInput';
import useCurrentState from '../hooks/useCurrentState';
function MgmtDashboard() {

    const [matchs, setmatchs] = useState([]);
    const [showenMatch, setshowenMatch] = useState(false);
    const [isEditable, setisEditable] = useState(false);
    const [holdID, setholdID] = useState(0);
    const [error, seterror] = useState("");

    useEffect(() => {
        fetchMatchs(setmatchs)
    }, []);

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
        const res = await editMatch(match);
        if (res.status === 200) {
            setisEditable(false);
            setshowenMatch(false);
            fetchMatchs(setmatchs);
        }
    }

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
    }


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
            seterror("Team 1 name is too short");
        } else if (errorTeam2) {
            seterror("Team 2 name is too short");
        }
        else if (errorMatchVenue) {
            seterror("Match Venue name is too short");
        }
        else if (errorMainReferee) {
            seterror("Main Referee name is too short");
        }
        else if (errorLineMan1) {
            seterror("Lineman 1 name is too short");
        }
        else if (errorLineMan2) {
            seterror("Lineman 2 name is too short");
        }
        else {
            seterror("");
        }
    }, [errorTeam1, errorTeam2, errorMatchVenue, errorMainReferee, errorLineMan1, errorLineMan2])


    return (
        <div>
            <h1 className="mt-5 pt-5 text-center fw-bold">Managers Dashboard</h1>
            <div className="row mx-0 p-5 pt-3">
                <div className="col-12 col-md-6">
                    {matchs.length ? (
                        <table
                            className="table table-dark table-striped table-bordered table-hover align-middle mt-1 text-center"
                            style={{ height: 'fit-content' }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>matchs</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchs.map((match, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> <button className="btn btn-link text-decoration-none text-white"
                                            onClick={() => { handleView(match) }}> {match.team1} vs {match.team2}</button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-link text-decoration-none text-danger"
                                                onClick={() => { handleEdit(match) }}
                                            >
                                                Edit{' '}
                                                <FontAwesomeIcon className="ms-2" icon={faEdit} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="text-center">There are no matchs</h2>
                    )}
                </div>
                <div className="col-12 col-md-6">
                    {(error) && (
                        <div className="alert alert-danger p-2 mb-3" role="alert">
                            {error}
                        </div>
                    )}
                    {showenMatch && (<form encType="multipart/form-data" onSubmit={handleSave} >
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

                        <button
                            className="btn btn-warning"
                            disabled={!isEditable}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-secondary ms-3"
                            onClick={() => { handleCancel() }}
                        >
                            Cancel
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    );
}

export default MgmtDashboard;