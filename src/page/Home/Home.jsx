import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
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

import {
  fetchLoginSlice,
  fetchUserCaller,
} from "../../Redux/Features/Users/UserLoginSlice";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";
import { userLogin } from "../../Redux/selector";
import styles from "./Home.module.scss";
import { socket } from "../../App";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";

import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";

import { useNavigate } from "react-router-dom";

import WarningIcon from "@mui/icons-material/Warning";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [openEmergency, setOpenEmergency] = useState(false);

  const [callStatus, setCallStatus] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [callerId, setCallerId] = useState("");
  const [calleeId, setCalleeId] = useState("");
  const [userCaller, setUserCaller] = useState("");

  const user = useSelector(userLogin);
  const [userEmergency, setUserEmergency] = useState("");
  useEffect(() => {
    dispatch(fetchLoginSlice());
  }, []);
  useEffect(() => {
    socket.on("incomingCall", ({ conversationId, callerId }) => {
      setOpenInfo(true);
      setCallStatus("Cuộc gọi đến...");
      setCallerId(callerId);
      setConversationId(conversationId);
      // alert("có người gọi");
      dispatch(fetchUserCaller(callerId)).then((v) => {
        setUserCaller(v.payload);
      });
    });
  }, []);
  useEffect(() => {
    socket.on("newNotification", (data) => {
      console.log("Emergency", data);
      if (data.data?.typeNotification === "EMERGENCY") {
        setUserEmergency(data.data);
        setOpenEmergency(true);
      }
    });
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
      // dispatch(fetchUserDoctor(user.doctorId));
    }
  }, [user]);

  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  const handleModelCloseEmergency = () => {
    setOpenEmergency(false);
  };
  const navigate = useNavigate();
  const handleAccept = () => {
    const calleeId = user.role === "DOCTOR" ? user.doctor.id : user.id;
    socket.emit("acceptCall", { conversationId, callerId, calleeId });
    navigate(`/room/${conversationId}`);
  };

  const handleReject = () => {
    const calleeId = user.role === "DOCTOR" ? user.doctor.id : user.id;
    socket.emit("rejectCall", { conversationId, callerId, calleeId });
    setOpenInfo(false);
  };
  return (
    <>
      <ModelWrapper
        className={cx("model-add-emergency")}
        open={openEmergency}
        onClose={handleModelCloseEmergency}
      >
        <div className={cx("model-add-emergency-bg")}>
          <div className={cx("notification-icon")}>
            <WarningIcon className={cx("item-content")} sx={{ fontSize: 50 }} />
          </div>
          <div className={cx("notification-header")}>
            <h2>THÔNG BÁO CẤP CỨU</h2>
          </div>
          <div className={cx("notification-body")}>
            <p>{userEmergency?.content}</p>
          </div>
          <div className={cx("map-container")}>
            <div className={cx("map-container-url")}>
              LIÊN HỆ CỨU HỘ 115 &nbsp;
              <a href={userEmergency?.url}>Địa chỉ hiện tại của bệnh nhân</a>
            </div>
          </div>
          <div className={cx("notification-footer")}>
            <button onClick={() => setOpenEmergency(false)}>Xác nhận</button>
          </div>
        </div>
      </ModelWrapper>
      <ModelWrapper
        className={cx("model-add-information")}
        open={openInfo}
        onClose={handleModelCloseInfo}
      >
        <div className={cx("model-add-information-bg")}>
          <div className={cx("info-image")}>
            <img
              className={cx("img-avatar")}
              src={
                userCaller?.role === "DOCTOR"
                  ? userCaller?.doctor?.avatar
                  : userCaller?.patient?.avatar
              }
              alt="img-avatar"
            />
          </div>
          <div className={cx("title-name")}>
            <div className={cx("name")}>
              {userCaller?.role === "DOCTOR"
                ? userCaller?.doctor?.fullName
                : userCaller?.patient?.fullName}
            </div>
          </div>
          <div className={cx("title-name")}>
            <div className={cx("name")}>{callStatus}</div>
          </div>
          <div className={cx("form-call")}>
            <div className={cx("icon-refuse")} onClick={handleReject}>
              <CallEndIcon sx={{ fontSize: 30 }} />
            </div>
            <div className={cx("icon-accept")} onClick={handleAccept}>
              <CallIcon sx={{ fontSize: 30 }} />
            </div>
          </div>
        </div>
      </ModelWrapper>

      <div className={cx("container-fluid")}>
        <div className={cx("col-3")}>
          <Left role={user.role === "DOCTOR" ? true : false} />
        </div>
        {/* bg-info */}
        <div className={cx("col-9")}>
          <Middle />
        </div>
      </div>
    </>
  );
};

export default Home;
