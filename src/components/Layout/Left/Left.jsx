import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Left.module.scss";
import images from "../../../assets/images/index";
import ItemLeft from "../../ItemLeft/ItemLeft";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NextPage from "../../../Redux/Features/NextPage";

const cx = classNames.bind(styles);

const Left = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChat = () => {
    navigate("/ChatHome");
  };
  const handleMedicalRecord = () => {
    dispatch(NextPage.actions.NextPageChange(true));
    dispatch(NextPage.actions.NextPageChangeBook(false));
    dispatch(NextPage.actions.NextPageChangeInfor(false));
    console.log("ok");
  };
  const handleInformation = () => {
    dispatch(NextPage.actions.NextPageChange(false));
    dispatch(NextPage.actions.NextPageChangeBook(false));
    dispatch(NextPage.actions.NextPageChangeInfor(true));
  };
  const handleBook = () => {
    dispatch(NextPage.actions.NextPageChange(false));
    dispatch(NextPage.actions.NextPageChangeInfor(false));
    dispatch(NextPage.actions.NextPageChangeBook(true));
    console.log("ok34");
  };

  return (
    <div className={cx("left")}>
      <div className={cx("Logo")}>
        <img src={images.logo} alt="" />
        <h1>N&S HealthCase</h1>
      </div>
      <div className={cx("separator")}></div>
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleInformation}>
          <EditIcon className={cx("icon")} />
          <h1>Thông tin</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleChat}>
          <ChatIcon className={cx("icon")} />
          <h1>Hội thoại</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleMedicalRecord}>
          <FormatListBulletedIcon className={cx("icon")} />
          <h1>Hồ sơ bệnh án</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleBook}>
          <CalendarMonthIcon className={cx("icon")} />
          <h1>Đặt lịch hẹn</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <PersonIcon className={cx("icon")} />
          <h1>Thông tin bác sĩ</h1>
        </div>
      </ItemLeft>
    </div>
  );
};

export default Left;
