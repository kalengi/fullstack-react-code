import React from "react";
import ReactDOM from "react-dom";
import "../public/semantic-ui/semantic.min.css";
import "../public/index.css";
import Element from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Element />
  </React.StrictMode>,
  rootElement
);
