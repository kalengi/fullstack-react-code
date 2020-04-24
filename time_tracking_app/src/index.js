import React from "react";
import ReactDOM from "react-dom";
import "./semantic-dist/semantic.min.css";
import "./style.css";
import TimersDashboard from "./App";

const rootElement = document.getElementById("content");
ReactDOM.render(
  <React.StrictMode>
    <TimersDashboard />
  </React.StrictMode>,
  rootElement
);
