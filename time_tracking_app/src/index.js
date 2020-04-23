import React from "react";
import ReactDOM from "react-dom";
import ProductList from "./App";

const rootElement = document.getElementById("content");
ReactDOM.render(
  <React.StrictMode>
    <ProductList />
  </React.StrictMode>,
  rootElement
);
