import React from "react";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

//page
import Welcome from "./page/Welcome/Welcome";
import Login from "./page/login/Login";
import RegisterDoctor from "./page/Register/RegisterDoctor";
import ConfirmOTP from "./page/ConfirmOTP/ConfirmOTP";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegisterDoctor" element={<RegisterDoctor />} />
        <Route path="/ConfirmOTP" element={<ConfirmOTP />} />
      </Routes>
    </Fragment>
  );
}

export default App;
