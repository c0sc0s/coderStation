// react.core / react.dom
import React from "react";
import ReactDOM from "react-dom/client";

// react.router
import { BrowserRouter } from "react-router-dom";

// antd
import 'antd/dist/reset.css';

// components
import App from "./App";

// store
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>

      </App>
    </BrowserRouter>
  </Provider>
) 