// react.core / react.dom
import React from "react";
import ReactDOM from "react-dom/client";

// react.router
import { BrowserRouter } from "react-router-dom";

// antd
import 'antd/dist/reset.css';

// components
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App>

    </App>
  </BrowserRouter>
) 