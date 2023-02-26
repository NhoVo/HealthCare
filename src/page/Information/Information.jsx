import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Information.module.scss";
import DiseaseIndex from "../../components/DiseaseIndex/DiseaseIndex";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MoodIcon from "@mui/icons-material/Mood";
import { Chair } from "@mui/icons-material";
import Chart from "../../components/Chart/Chart";
import ChatBot from "../../components/ChatBot/ChatBot";
import ChatIA from "../../components/ChatBot/ChatIA";
import Book from "../Book/Book";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddInformation from "../../components/AddInformation/AddInformation";
import {
  getNextPageBook,
  healthRD,
  nextPageSelector,
  nextPageSelectorBook,
  nextPageSelectorInfor,
  nextPageSelectorInforDoctor,
  userLogin,
} from "../../Redux/selector";
import { useDispatch, useSelector } from "react-redux";
import MedicalRecord from "../MedicalRecord/MedicalRecord";
import { healthRecordDay } from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  fetchBloodPressures,
  fetchBMI,
  fetchCholesterol,
  fetchGlucoses,
  fetchHeartbeats,
} from "../../Redux/Features/HealthRecord/Heartbeat";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import InformationDoctor from "../InformationDoctor/InformationDoctor";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { fetchBookedSchedule } from "../../Redux/Features/Book/PatientBook";

const cx = classNames.bind(styles);

const Information = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [BMI, setBMI] = useState(true);
  const [HA, setHA] = useState(false);
  const [CHOLES, setCHOLES] = useState(false);
  const [GLU, setGLU] = useState(false);
  const [TIM, setTIM] = useState(false);
  // const [healReport, setHealReport] = useState("");

  const medicalRecord = useSelector(nextPageSelector);
  const pageBook = useSelector(nextPageSelectorBook);
  const pageInfor = useSelector(nextPageSelectorInfor);
  const pageInforDoctor = useSelector(nextPageSelectorInforDoctor);

  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);

  const healReport = useSelector(healthRD);

  const dispatch = useDispatch();

  const handleModelOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  const HandleBMI = () => {
    setBMI(true);
    setHA(false);
    setCHOLES(false);
    setGLU(false);
    setTIM(false);
  };
  const HandleHA = () => {
    setBMI(false);
    setHA(true);
    setCHOLES(false);
    setGLU(false);
    setTIM(false);
  };
  const HandleCHOLE = () => {
    setBMI(false);
    setHA(false);
    setCHOLES(true);
    setGLU(false);
    setTIM(false);
  };
  const HandleGLU = () => {
    setBMI(false);
    setHA(false);
    setCHOLES(false);
    setGLU(true);
    setTIM(false);
  };
  const HandleTIM = () => {
    setBMI(false);
    setHA(false);
    setCHOLES(false);
    setGLU(false);
    setTIM(true);
  };

  return (
    <div className={cx("container")}>
      {userDoctor.role === "DOCTOR" ? (
        <>
          {pageBook || medicalRecord ? (
            <>{medicalRecord ? <MedicalRecord user={user} /> : <Book />}</>
          ) : (
            <>
              {pageInforDoctor ? (
                <InformationDoctor />
              ) : (
                <>
                  <div className={cx("col-12")}>
                    <div className={cx("col-2")} onClick={HandleBMI}>
                      <DiseaseIndex
                        name="Tổng số bệnh nhân"
                        // index={healReport.indexBmi}
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleHA}>
                      <DiseaseIndex
                        name=""
                        // index={healReport.systolic}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleCHOLE}>
                      <DiseaseIndex
                        name="Cholesterol"
                        // index={healReport.cholesterol}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleGLU}>
                      <DiseaseIndex
                        name="Glucose"
                        // index={healReport.glucose}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleTIM}>
                      <DiseaseIndex
                        name="Nhịp Tim"
                        // index={healReport.heartbeat}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")}>
                      <DiseaseIndex
                        name="Tình trạng"
                        // index="Tốt"
                        icon={
                          <MoodIcon sx={{ fontSize: 20 }} color="success" />
                        }
                      />
                    </div>
                  </div>
                  <div className={cx("col-12")}>
                    <div className={cx("Chart")}>
                      <ChatIA />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {pageBook || medicalRecord ? (
            <>{medicalRecord ? <MedicalRecord user={user} /> : <Book />}</>
          ) : (
            <>
              {pageInforDoctor ? (
                <InformationDoctor />
              ) : (
                <>
                  <div className={cx("col-12")}>
                    <h1 className={cx("title")}>Thêm thông tin</h1>
                    <button
                      className={cx("addIndex")}
                      onClick={handleModelOpenInfo}
                    >
                      <ControlPointIcon sx={{ fontSize: 40 }} />
                    </button>
                    <ModelWrapper
                      className={cx("model-add-information")}
                      open={openInfo}
                      onClose={handleModelCloseInfo}
                    >
                      <div className={cx("model-add-information-bg")}>
                        <div className={cx("add-information-title")}>
                          <span className={cx("information-title")}>
                            Thông tin bệnh án
                          </span>
                          <button className={cx("close-btn")}>
                            <FontAwesomeIcon
                              className={cx("close-ic")}
                              icon={faXmark}
                              onClick={handleModelCloseInfo}
                            />
                          </button>
                        </div>
                        <AddInformation />
                      </div>
                    </ModelWrapper>
                  </div>
                  <div className={cx("col-12")}>
                    <div className={cx("col-2")} onClick={HandleBMI}>
                      <DiseaseIndex
                        name="BMI"
                        index={healReport.indexBmi}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleHA}>
                      <DiseaseIndex
                        name="Huyết áp"
                        index={healReport.systolic}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleCHOLE}>
                      <DiseaseIndex
                        name="Cholesterol"
                        index={healReport.cholesterol}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleGLU}>
                      <DiseaseIndex
                        name="Glucose"
                        index={healReport.glucose}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")} onClick={HandleTIM}>
                      <DiseaseIndex
                        name="Nhịp Tim"
                        index={healReport.heartRateIndicator}
                        percent="46%"
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                    <div className={cx("col-2")}>
                      <DiseaseIndex
                        name="Tình trạng"
                        index="Tốt"
                        icon={
                          <MoodIcon sx={{ fontSize: 20 }} color="success" />
                        }
                      />
                    </div>
                  </div>
                  <div className={cx("col-12")}>
                    <div className={cx("Chart")}>
                      {BMI ? <Chart BMI /> : null}
                      {HA ? <Chart HA /> : null}
                      {CHOLES ? <Chart CHOLES /> : null}
                      {GLU ? <Chart GLU /> : null}
                      {TIM ? <Chart TIM /> : null}
                      {/* <ChatBot /> */}
                      <ChatIA />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Information;
