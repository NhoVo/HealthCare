import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Left from "../../components/Layout/Left/Left";
import Middle from "../../components/Layout/middle/Middle";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import { userLogin } from "../../Redux/selector";
import {
  fetchAllHealthRecord,
  healthRecordDay,
} from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  fetchBloodPressures,
  fetchBMI,
  fetchCholesterol,
  fetchGlucoses,
  fetchHeartbeats,
} from "../../Redux/Features/HealthRecord/Heartbeat";
import { fetchBookedSchedule } from "../../Redux/Features/Book/PatientBook";
import { fetchNotficationsOfDoctor } from "../../Redux/Features/Notifications/Notifications";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";
import { fetchListBookedOfDoctor } from "../../Redux/Features/Book/DoctorBook";

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
