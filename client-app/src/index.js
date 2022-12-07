import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./StateManagment/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);
