import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { AuthWrapper } from "./auth";
import { SettingsWrapper } from "./contexts/settings";
ReactDOM.render(
  <React.StrictMode>
    <SettingsWrapper>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </SettingsWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
