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
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";
import { userLogin } from "../../Redux/selector";
import styles from "./Home.module.scss";
import { socket } from "../../App";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [callerId, setCallerId] = useState("");
  const [calleeId, setCalleeId] = useState("");
  const user = useSelector(userLogin);
  useEffect(() => {
    socket.on("incomingCall", ({ conversationId, callerId }) => {
      setOpenInfo(true);
      setCallStatus("Cuộc gọi đến...");
      setCallerId(callerId);
      setConversationId(conversationId);
      // alert("có người gọi");
    });
  }, []);

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
      // dispatch(fetchUserDoctor(user.doctorId));
    }
  }, [user]);

  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  const navigate = useNavigate();
  const handleAccept = () => {
    const calleeId = user.role === "DOCTOR" ? user.doctor.id : user.id;
    socket.emit("acceptCall", { conversationId, callerId, calleeId });
    navigate(`/room/conversationId`);
  };

  const handleReject = () => {
    const calleeId = user.role === "DOCTOR" ? user.doctor.id : user.id;
    socket.emit("rejectCall", { conversationId, callerId, calleeId });
    setOpenInfo(false);
  };
  return (
    <>
      <ModelWrapper
        className={cx("model-add-information")}
        open={openInfo}
        onClose={handleModelCloseInfo}
      >
        <div className={cx("model-add-information-bg")}>
          <div className={cx("info-image")}>
            <img
              className={cx("img-avatar")}
              src={images.logo}
              alt="img-avatar"
            />
          </div>
          <div className={cx("title-name")}>
            <div className={cx("name")}>Tao gọi</div>
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
