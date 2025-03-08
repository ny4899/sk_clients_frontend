import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

// bootstarp
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

// common scss
import App from "./App";
import { AppProvider } from "./context";
import "./index.scss";  
// setInterval(() => {
//   window.location.reload();
// }, 1000 * 30);
// window.apiURL = "https://test-api.accesssurveykshan.co.in/api/v1";
window.apiURL = "http://localhost:8000/api/v1";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AppProvider>
);
