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

const Left = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChat = () => {
    navigate("/ChatHome");
  };

  const handleMedicalRecord = () => {
    dispatch(NextPage.actions.NextPageChange(true));
    dispatch(NextPage.actions.NextPageChangeBook(false));
    dispatch(NextPage.actions.NextPageChangeInfor(false));
    dispatch(NextPage.actions.NextPageChangeInforDoctor(false));
  };
  const handleInformation = () => {
    dispatch(NextPage.actions.NextPageChange(false));
    dispatch(NextPage.actions.NextPageChangeBook(false));
    dispatch(NextPage.actions.NextPageChangeInfor(true));
    dispatch(NextPage.actions.NextPageChangeInforDoctor(false));
  };
  const handleBook = () => {
    dispatch(NextPage.actions.NextPageChange(false));
    dispatch(NextPage.actions.NextPageChangeInfor(false));
    dispatch(NextPage.actions.NextPageChangeBook(true));
    dispatch(NextPage.actions.NextPageChangeInforDoctor(false));
  };
  const handleInformationDoctor = () => {
    dispatch(NextPage.actions.NextPageChange(false));
    dispatch(NextPage.actions.NextPageChangeInfor(false));
    dispatch(NextPage.actions.NextPageChangeBook(false));
    dispatch(NextPage.actions.NextPageChangeInforDoctor(true));
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
          <h1>Th??ng tin</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleChat}>
          <ChatIcon className={cx("icon")} />
          <h1>H???i tho???i</h1>
        </div>
      </ItemLeft>
      {role ? (
        <ItemLeft>
          <div className={cx("group-item")}>
            <FormatListBulletedIcon className={cx("icon")} />
            <h1>H??? s?? b???nh nh??n</h1>
          </div>
        </ItemLeft>
      ) : (
        <ItemLeft>
          <div className={cx("group-item")} onClick={handleMedicalRecord}>
            <FormatListBulletedIcon className={cx("icon")} />
            <h1>H??? s?? b???nh ??n</h1>
          </div>
        </ItemLeft>
      )}
      {role ? (
        <ItemLeft>
          <div className={cx("group-item")} onClick={handleBook}>
            <CalendarMonthIcon className={cx("icon")} />
            <h1>Danh s??ch l???ch h???n</h1>
          </div>
        </ItemLeft>
      ) : (
        <ItemLeft>
          <div className={cx("group-item")} onClick={handleBook}>
            <CalendarMonthIcon className={cx("icon")} />
            <h1>?????t l???ch h???n</h1>
          </div>
        </ItemLeft>
      )}
      <ItemLeft>
        <div className={cx("group-item")} onClick={handleInformationDoctor}>
          <PersonIcon className={cx("icon")} />
          <h1>Th??ng tin b??c s??</h1>
        </div>
      </ItemLeft>
    </div>
  );
};

export default Left;
