import React from "react";
import ReactDOM from "react-dom";
import "../public/semantic-dist/semantic.min.css";
import "../public/style.css";
import TimersDashboard from "./App";

const rootElement = document.getElementById("content");
ReactDOM.render(
  <React.StrictMode>
    <TimersDashboard />
  </React.StrictMode>,
  rootElement
);
