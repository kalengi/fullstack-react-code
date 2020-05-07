import React from "react";
import ReactDOM from "react-dom";
import "../public/semantic-ui/semantic.min.css";
import "../public/index.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
