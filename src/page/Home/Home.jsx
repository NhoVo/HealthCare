import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Left from "../../components/Layout/Left/Left";
import Middle from "../../components/Layout/middle/Middle";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import {
  fetchUserDoctor,
  fetchUserDoctors,
} from "../../Redux/Features/Users/UserDoctors";
import { userLogin } from "../../Redux/selector";
import { useLocation } from "react-router-dom";
import { healthRecordDay } from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  fetchBloodPressures,
  fetchBMI,
  fetchCholesterol,
  fetchGlucoses,
  fetchHeartbeats,
} from "../../Redux/Features/HealthRecord/Heartbeat";
import { fetchBookedSchedule } from "../../Redux/Features/Book/PatientBook";
import { useState } from "react";
import { fetchNotficationsOfDoctor } from "../../Redux/Features/Notifications/Notifications";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";
import { fetchListBookedOfDoctor } from "../../Redux/Features/Book/DoctorBook";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);
  // console.log("333------HOme", userDoctor.role);

  useEffect(() => {
    dispatch(fetchLoginSlice());
  }, []);
  useEffect(() => {
    // console.log("39------Home", userDoctor.role);
    if (userDoctor.role === "DOCTOR") {
      dispatch(fetchNotficationsOfDoctor());
      dispatch(fetchUserPatients());
      dispatch(fetchListBookedOfDoctor());
    } else {
      dispatch(healthRecordDay());
      dispatch(fetchHeartbeats());
      dispatch(fetchNotficationsOfDoctor());
      dispatch(fetchBMI());
      dispatch(fetchBloodPressures());
      dispatch(fetchCholesterol());
      dispatch(fetchGlucoses());
      dispatch(fetchUserDoctor(user.doctorId));
      dispatch(fetchBookedSchedule());
    }
  }, [user, userDoctor]);

  return (
    <div className={cx("container-fluid")}>
      <div className={cx("row")}>
        <div className={cx("col-3")}>
          <Left role={user.role === "DOCTOR" ? true : false} />
        </div>
        {/* bg-info */}
        <div className={cx("col-9")}>
          <Middle />
        </div>
      </div>
    </div>
  );
};

export default Home;
