import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../components/hooks/useDebounce";
import Center from "../../components/LayoutChat/Middle/Middle";
import Rightbar from "../../components/LayoutChat/Rightbar/Rightbar";
import Sidebar from "../../components/LayoutChat/Sidebar/Sidebar";
import { fetchConversation } from "../../Redux/Features/Conversation/Conversation";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { userLogin } from "../../Redux/selector";
import styles from "./ChatHome.module.scss";
import { socket } from "../../App";
import images from "../../assets/images";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const ChatHome = () => {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const debouncedValue = useDebounce(user, 500);
  useEffect(() => {
    dispatch(fetchLoginSlice());
  }, []);
  useEffect(() => {
    dispatch(fetchConversation());
  }, [user, debouncedValue]);
  const [openInfo, setOpenInfo] = useState(false);
  const [callStatus, setCallStatus] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [callerId, setCallerId] = useState("");
  const [calleeId, setCalleeId] = useState("");

  useEffect(() => {
    socket.on("incomingCall", ({ conversationId, callerId }) => {
      setOpenInfo(true);
      setCallStatus("Cuộc gọi đến...");
      setCallerId(callerId);
      setConversationId(conversationId);
      // alert("có người gọi");
    });
    socket.on("cancelCall", ({ conversationId, calleeId }) => {
      setOpenInfo(false);
    });
  }, []);
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
    <div className={cx("wrapper")}>
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
      <Sidebar />
      <Center />
      <Rightbar />
    </div>
  );
};

export default ChatHome;
