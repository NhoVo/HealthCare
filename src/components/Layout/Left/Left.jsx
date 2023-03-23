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
import {
  nextPageSelector,
  nextPageSelectorBook,
  nextPageSelectorInfor,
  nextPageSelectorInforDoctor,
} from "../../../Redux/selector";
import { fetchAllHealthRecord } from "../../../Redux/Features/HealthRecord/HealthRecord";
import { fetchBookedSchedule } from "../../../Redux/Features/Book/PatientBook";
import { fetchListBookedOfDoctor } from "../../../Redux/Features/Book/DoctorBook";

const cx = classNames.bind(styles);

const Left = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const medicalRecord = useSelector(nextPageSelector);
  const pageBook = useSelector(nextPageSelectorBook);
  const pageInfor = useSelector(nextPageSelectorInfor);
  const pageInforDoctor = useSelector(nextPageSelectorInforDoctor);
  const handleChat = () => {
    navigate("/ChatHome");
  };

  const handleMedicalRecord = () => {
    dispatch(fetchAllHealthRecord());
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
    dispatch(fetchBookedSchedule());
    dispatch(fetchListBookedOfDoctor());
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
      {pageInfor ? (
        <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformation}>
            <EditIcon className={cx("icon")} />
            <h1>Thông tin</h1>
          </div>
        </div>
      ) : (
        <div className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformation}>
            <EditIcon className={cx("icon")} />
            <h1>Thông tin</h1>
          </div>
        </div>
      )}
      <div className={cx("itemLeft")}>
        <div className={cx("group-item")} onClick={handleChat}>
          <ChatIcon className={cx("icon")} />
          <h1>Hội thoại</h1>
        </div>
      </div>
      {role ? (
        <>
          {medicalRecord ? (
            <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <h1>Hồ sơ bệnh nhân</h1>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <h1>Hồ sơ bệnh nhân</h1>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {medicalRecord ? (
            <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <h1>Hồ sơ bệnh nhân</h1>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <h1>Hồ sơ bệnh án</h1>
              </div>
            </div>
          )}
        </>
      )}
      {role ? (
        <>
          {pageBook ? (
            <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <h1>Danh sách lịch hẹn</h1>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <h1>Danh sách lịch hẹn</h1>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {pageBook ? (
            <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <h1>Đặt lịch hẹn</h1>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <h1>Đặt lịch hẹn</h1>
              </div>
            </div>
          )}
        </>
      )}
      {pageInforDoctor ? (
        <div style={{ background: "#33CCFF" }} className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformationDoctor}>
            <PersonIcon className={cx("icon")} />
            <h1>Thông tin bác sĩ</h1>
          </div>
        </div>
      ) : (
        <div className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformationDoctor}>
            <PersonIcon className={cx("icon")} />
            <h1>Thông tin bác sĩ</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Left;
