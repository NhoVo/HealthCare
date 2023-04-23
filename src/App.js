/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

//page
import Welcome from "./page/Welcome/Welcome";
import Login from "./page/login/Login";
import RegisterDoctor from "./page/Register/RegisterDoctor";
import ConfirmOTP from "./page/ConfirmOTP/ConfirmOTP";
import ResisterPatient from "./page/Register/ResisterPatient";
import Home from "./page/Home/Home";
import ChatHome from "./page/ChatHome/ChatHome";
import ChooseDoctor from "./page/ChooseDoctor/ChooseDoctor";
import { useMemo } from "react";
import { io } from "socket.io-client";
import { fetchNotficationsOfDoctor } from "./Redux/Features/Notifications/Notifications";
import { useDispatch } from "react-redux";

import Room from "./page/RooomChat/Room";

import ConfirmOTPDoctor from "./page/ConfirmOTP/ConfirmOTPDoctor";
import ForgetPassword from "./page/forgetPassword/ForgetPassword";
const getToken = JSON.parse(localStorage.getItem("jwt_refresh_token"));

export let socket = io(process.env.REACT_APP_BASE_URL_SOCKET_IO, {
  transports: ["websocket"],
  query: `Authorization=${getToken}`,
});

const App = () => {
  const dispatch = useDispatch();
  useMemo(() => {
    if (localStorage.getItem("jwt_refresh_token")) {
      socket = io(process.env.REACT_APP_BASE_URL_SOCKET_IO, {
        transports: ["websocket"],
        query: `Authorization=${getToken}`,
      });

      socket.on("newNotification", (data) => {
        dispatch(fetchNotficationsOfDoctor());
      });
    }
  }, [localStorage.getItem("jwt_refresh_token")]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegisterDoctor" element={<RegisterDoctor />} />
        <Route path="/ConfirmOTP" element={<ConfirmOTP />} />
        <Route path="/ConfirmOTPDoctor" element={<ConfirmOTPDoctor />} />
        <Route path="/ResisterPatient" element={<ResisterPatient />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatHome" element={<ChatHome />} />
        <Route path="/ChooseDoctor" element={<ChooseDoctor />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </Fragment>
  );
};

export default App;
