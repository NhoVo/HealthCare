import classNames from "classnames/bind";
import React from "react";
import images from "../../../assets/images/index";
import styles from "./Left.module.scss";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchListBookedOfDoctor,
  fetchListBookedOfDoctorCreate,
} from "../../../Redux/Features/Book/DoctorBook";
import {
  fetchBookedSchedule,
  fetchBookedScheduleCreate,
} from "../../../Redux/Features/Book/PatientBook";
import { fetchAllHealthRecord } from "../../../Redux/Features/HealthRecord/HealthRecord";
import NextPage from "../../../Redux/Features/NextPage";
import {
  nextPageSelector,
  nextPageSelectorBook,
  nextPageSelectorInfor,
  nextPageSelectorInforDoctor,
  userLogin,
} from "../../../Redux/selector";
import { getRatingOfDoctor } from "../../../Redux/Features/Rating/RatingDoctor";
import { fetchUserDoctor } from "../../../Redux/Features/Users/UserDoctors";

const cx = classNames.bind(styles);

const Left = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userLogin);

  const medicalRecord = useSelector(nextPageSelector);
  const pageBook = useSelector(nextPageSelectorBook);
  const pageInfor = useSelector(nextPageSelectorInfor);
  const pageInforDoctor = useSelector(nextPageSelectorInforDoctor);
  const handleChat = () => {
    navigate("/ChatHome");
  };

  const handleMedicalRecord = () => {
    dispatch(fetchAllHealthRecord());
    dispatch(fetchUserDoctor(user.doctorId));
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
    dispatch(fetchListBookedOfDoctorCreate());
    dispatch(fetchBookedScheduleCreate());

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
        <h1>CadioCare</h1>
      </div>
      <div className={cx("separator")}></div>
      {pageInfor ? (
        <div
          style={{ background: "#33CCFF", color: "white" }}
          className={cx("itemLeft")}
        >
          <div className={cx("group-item")} onClick={handleInformation}>
            <EditIcon className={cx("icons")} />
            <span>Thông tin</span>
          </div>
        </div>
      ) : (
        <div className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformation}>
            <EditIcon className={cx("icon")} />
            <span>Thông tin</span>
          </div>
        </div>
      )}
      <div className={cx("itemLeft")}>
        <div className={cx("group-item")} onClick={handleChat}>
          <ChatIcon className={cx("icon")} />
          <span>Hội thoại</span>
        </div>
      </div>
      {role ? (
        <>
          {medicalRecord ? (
            <div
              style={{ background: "#33CCFF", color: "white" }}
              className={cx("itemLeft")}
            >
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icons")} />
                <span>Hồ sơ bệnh nhân</span>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <span>Hồ sơ bệnh nhân</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {medicalRecord ? (
            <div
              style={{ background: "#33CCFF", color: "white" }}
              className={cx("itemLeft")}
            >
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icons")} />
                <span>Hồ sơ bệnh án</span>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleMedicalRecord}>
                <FormatListBulletedIcon className={cx("icon")} />
                <span>Hồ sơ bệnh án</span>
              </div>
            </div>
          )}
        </>
      )}
      {role ? (
        <>
          {pageBook ? (
            <div
              style={{ background: "#33CCFF", color: "white" }}
              className={cx("itemLeft")}
            >
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icons")} />
                <span>Danh sách lịch hẹn</span>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <span>Danh sách lịch hẹn</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {pageBook ? (
            <div
              style={{ background: "#33CCFF", color: "white" }}
              className={cx("itemLeft")}
            >
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icons")} />
                <span>Đặt lịch hẹn</span>
              </div>
            </div>
          ) : (
            <div className={cx("itemLeft")}>
              <div className={cx("group-item")} onClick={handleBook}>
                <CalendarMonthIcon className={cx("icon")} />
                <span>Đặt lịch hẹn</span>
              </div>
            </div>
          )}
        </>
      )}
      {pageInforDoctor ? (
        <div
          style={{ background: "#33CCFF", color: "white" }}
          className={cx("itemLeft")}
        >
          <div className={cx("group-item")} onClick={handleInformationDoctor}>
            <PersonIcon className={cx("icons")} />
            <span>Thông tin bác sĩ</span>
          </div>
        </div>
      ) : (
        <div className={cx("itemLeft")}>
          <div className={cx("group-item")} onClick={handleInformationDoctor}>
            <PersonIcon className={cx("icon")} />
            <span>Thông tin bác sĩ</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Left;
