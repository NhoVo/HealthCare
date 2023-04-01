import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Left from "../../components/Layout/Left/Left";
import Middle from "../../components/Layout/middle/Middle";
import { healthRecordDay } from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  fetchBloodPressures,
  fetchBMI,
  fetchCholesterol,
  fetchGlucoses,
  fetchHeartbeats,
} from "../../Redux/Features/HealthRecord/Heartbeat";
import { fetchNotficationsOfDoctor } from "../../Redux/Features/Notifications/Notifications";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";
import { userLogin } from "../../Redux/selector";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector(userLogin);

  useEffect(() => {
    dispatch(fetchLoginSlice());
  }, []);
  useEffect(() => {
    dispatch(fetchNotficationsOfDoctor());
    if (user.role === "DOCTOR") {
      dispatch(fetchUserPatients());
    } else {
      dispatch(healthRecordDay());
      dispatch(fetchHeartbeats());
      dispatch(fetchBMI());
      dispatch(fetchBloodPressures());
      dispatch(fetchCholesterol());
      dispatch(fetchGlucoses());
      dispatch(fetchUserDoctor(user.doctorId));
    }
  }, [user]);

  return (
    <div className={cx("container-fluid")}>
      <div className={cx("col-3")}>
        <Left role={user.role === "DOCTOR" ? true : false} />
      </div>
      {/* bg-info */}
      <div className={cx("col-9")}>
        <Middle />
      </div>
    </div>
  );
};

export default Home;
