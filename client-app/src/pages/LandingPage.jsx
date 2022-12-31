import React, { useEffect, useState } from "react";
import AxiosConfiged from "./../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./../StateManagment/Auth/actions";
import { logout } from "./Helpers/auth";
import "./Landingpage.css";

function LandingPage() {
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

  const log_out = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <nav className="navbar sticky-top navbar-black bg-black">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: "white" }}>
              {auth.username ? "Welcome " + auth.username : "Login"}
            </a>
            <a className="navbar-brand" style={{ color: "white" }}>
              Landing Page
            </a>
            {auth.username && (
              <a
                className="navbar-brand"
                style={{ color: "white" }}
                href="javascript:void(0)"
                onClick={() => {
                  log_out();
                }}
              >
                log out
              </a>
            )}
          </div>
        </nav>
        <div className="container2">
          <div className="col-12">
            <h1 className="text-center">
              {" "}
              Welcome to World Cup Reservation matches 2022{" "}
            </h1>
          </div>
          <div className="row2">
            <div className="col-12">
              <p>
                Welcome to our world cup reservation system, here you can
                reserve your seat for the matches you want to watch, you can
                also see the matches that are available and the matches that are
                already reserved.
                <br />
                <br /> As an admin you can accept managers and you can also see
                the matches.
                <br />
                <br /> As a manager you can add new matches, add new stadiums,
                add new teams, add new fans, and you can also see the matches
                that are reserved by the fans.
                <br />
                <br /> As a fan you can reserve your seat for the matches you
                want to watch, you can also see the matches that are available
                and the matches that are already reserved.
              </p>
              {auth.username ? (
                <div className="col-12 col-md-12">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <button
                      className="btn col-4 col-md-5 btn-primary"
                      onClick={() => {
                        auth.role === "Admin"
                          ? (window.location.href = "/admin/dashboard")
                          : auth.role === "Manager"
                          ? (window.location.href = "/manager/dashboard")
                          : (window.location.href = "/fan");
                      }}
                    >
                      View your Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className="btn col-4 col-md-10 btn-primary"
                    style={{ marginBottom: "10px" }}
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    login
                  </button>
                  <br />
                  <button
                    className="btn col-4 col-md-10 btn-primary"
                    onClick={() => {
                      window.location.href = "/signup";
                    }}
                  >
                    signup
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn col-4 col-md-10 btn-primary"
                    onClick={() => {
                      window.location.href = "/guest";
                    }}
                  >
                    View as a guest
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
