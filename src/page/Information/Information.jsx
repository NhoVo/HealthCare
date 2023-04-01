import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MoodIcon from "@mui/icons-material/Mood";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddInformation from "../../components/AddInformation/AddInformation";
import Chart from "../../components/Chart/Chart";
import ChatBot from "../../components/ChatBot/ChatBot";
import DiseaseIndex from "../../components/DiseaseIndex/DiseaseIndex";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import {
  allHealthRecord,
  allHRecordPaient,
  filterPhonePatient,
  healthRD,
  healthWarningDay,
  nextPageSelector,
  nextPageSelectorBook,
  nextPageSelectorInfor,
  nextPageSelectorInforDoctor,
  tam,
  userDoctorPatient,
  userLogin,
  userPatients,
} from "../../Redux/selector";
import Book from "../Book/Book";
import MedicalRecord from "../MedicalRecord/MedicalRecord";
import MedicalRecordDoctor from "../MedicalRecord/MedicalRecordDoctor";
import styles from "./Information.module.scss";

import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { toast } from "react-toastify";
import images from "../../assets/images/index";
import useDebounce from "../../components/hooks/useDebounce";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import {
  fetchAllHRPatient,
  fetchEmergency,
  healthRecordDay,
} from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  fetchBloodPressuresDoctor,
  fetchBMIDoctor,
  fetchCholesterolDoctor,
  fetchGlucosesDoctor,
  fetchHeartbeatsDoctor,
} from "../../Redux/Features/HealthRecord/HeartbeatPatient";
import WarningIcon from "@mui/icons-material/Warning";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { postNotification } from "../../Redux/Features/Notifications/Notifications";
import InformationDoctor from "../InformationDoctor/InformationDoctor";

const cx = classNames.bind(styles);

const Information = () => {
  const [openInfo, setOpenInfo] = useState(false);

  const [BMI, setBMI] = useState(true);
  const [HA, setHA] = useState(false);
  const [CHOLES, setCHOLES] = useState(false);
  const [GLU, setGLU] = useState(false);
  const [TIM, setTIM] = useState(false);
  // const [healReport?, setHealReport] = useState("");

  const medicalRecord = useSelector(nextPageSelector);
  const pageBook = useSelector(nextPageSelectorBook);
  const pageInfor = useSelector(nextPageSelectorInfor);
  const pageInforDoctor = useSelector(nextPageSelectorInforDoctor);

  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);
  const healReport = useSelector(healthRD);
  const healtDay = useSelector(tam);

  const allHrecord = useSelector(allHealthRecord);
  const userD = useSelector(userDoctorPatient);
  const dispatch = useDispatch();
  //
  //bác sĩ
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [healReportPatient, setHealReportPatient] = useState([]);
  const result = useSelector(filterPhonePatient);
  const listPatient = useSelector(userPatients);

  const indexPatient = useSelector(allHRecordPaient);
  const debouncedValue = useDebounce(searchPhone, 500);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");
  useEffect(() => {
    if (searchPhone === "") {
      setSearchResult(false);
    } else {
      dispatch(filterSlice.actions.searchFilterChange(searchPhone));
      if (result !== 1) {
        setSearchResult(true);
        setHealReportPatient(result[0]);
      } else {
        toast.error(
          "Số điện thoại này không tồn tại hoặc chưa được đăng ký tài khoản. Vui lòng thử lại!"
        );
      }
    }
  }, [searchPhone, debouncedValue]);
  const handleModelOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleModelCloseInfo = () => {
    dispatch(healthRecordDay());
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
  const Emergency = () => {
    dispatch(fetchEmergency());
  };
  //bác sĩ
  const handleSearch = () => {
    dispatch(filterSlice.actions.searchFilterChange(searchPhone));
    if (result !== 1) {
      setSearchResult(true);
      setHealReportPatient(result[0]);
    } else {
      toast.error(
        "Số điện thoại này không tồn tại hoặc chưa được đăng ký tài khoản. Vui lòng thử lại!"
      );
    }
  };
  const handleChoose = (user) => {
    dispatch(fetchAllHRPatient(user.id));
    dispatch(fetchHeartbeatsDoctor(user.id));
    dispatch(fetchBMIDoctor(user.id));
    dispatch(fetchBloodPressuresDoctor(user.id));
    dispatch(fetchCholesterolDoctor(user.id));
    dispatch(fetchGlucosesDoctor(user.id));
  };

  return (
    <div className={cx("container")}>
      {userDoctor.role === "DOCTOR" ? (
        <>
          {pageBook || medicalRecord ? (
            <>
              {medicalRecord ? (
                <MedicalRecordDoctor user={user} listPatient={listPatient} />
              ) : (
                <Book />
              )}
            </>
          ) : (
            <>
              {pageInforDoctor ? (
                <InformationDoctor />
              ) : (
                <>
                  <div className={cx("col-12")}>
                    <div className={cx("col-2")} onClick={HandleBMI}>
                      <DiseaseIndex
                        name="BMI"
                        index={indexPatient[0]?.indexBmi}
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
                        index={indexPatient[0]?.systolic}
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
                        index={indexPatient[0]?.cholesterol}
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
                        index={indexPatient[0]?.glucose}
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
                        index={indexPatient[0]?.heartRateIndicator}
                        icon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: 20 }}
                            color="success"
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className={cx("center-Infor")}>
                    <div className={cx("col-4")}>
                      <div className={cx("title-list")}>
                        Danh sách bệnh nhân ({listPatient?.length})
                      </div>
                      <div className={cx("strikethrough")}></div>
                      <div className={cx("search-form")}>
                        <div
                          className={cx(
                            "row height d-flex justify-content-center align-items-center"
                          )}
                        >
                          <div className={cx("col-md-8")}>
                            <div className={cx("search")}>
                              <SearchIcon className={cx("item")} />
                              <input
                                type="text"
                                className={cx("form-control")}
                                placeholder="Nhập số điện thoại bệnh nhân..."
                                value={searchPhone}
                                onChange={(e) => setSearchPhone(e.target.value)}
                              />
                              <button
                                className={cx("btn btn-primary")}
                                onClick={handleSearch}
                              >
                                Tìm kiếm
                              </button>
                            </div>
                          </div>
                          <div className={cx("list-sum")}>
                            {searchResult ? (
                              <div className={cx("list-conversation")}>
                                <img
                                  className={cx("avatar-img")}
                                  // src={phoneNumber.avatar}
                                  src={images.logo}
                                  alt="avatar"
                                />
                                <div className={cx("content")}>
                                  <span className={cx("username")}>
                                    {healReportPatient?.fullName}
                                  </span>
                                  <span className={cx("message")}>
                                    {healReportPatient?.phone}
                                  </span>
                                  <span className={cx("message")}>
                                    Ngày sinh:
                                    {moment(
                                      healReportPatient?.dateOfBirth
                                    ).format("DD/MM/YYYY")}
                                  </span>
                                </div>

                                <div className={cx("result-add-friend")}>
                                  <button onClick={handleChoose}>Xem</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {listPatient?.map((user) => {
                                  return (
                                    <div
                                      className={cx("list-conversation")}
                                      key={user?.id}
                                    >
                                      <img
                                        className={cx("avatar-img")}
                                        // src={phoneNumber.avatar}
                                        src={images.logo}
                                        alt="avatar"
                                      />
                                      <div className={cx("content")}>
                                        <span className={cx("username")}>
                                          {user.fullName}
                                        </span>
                                        <span className={cx("message")}>
                                          {user.phone}
                                        </span>
                                        <span className={cx("message")}>
                                          Ngày sinh:
                                          {moment(user?.dateOfBirth).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </span>
                                      </div>
                                      <div className={cx("result-add-friend")}>
                                        <button
                                          onClick={() => handleChoose(user)}
                                        >
                                          Xem
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx("col-8")}>
                      <div className={cx("Chart")}>
                        {BMI ? <Chart BMI /> : null}
                        {HA ? <Chart HA /> : null}
                        {CHOLES ? <Chart CHOLES /> : null}
                        {GLU ? <Chart GLU /> : null}
                        {TIM ? <Chart TIM /> : null}
                        <div className={cx("Chart-bot")}>
                          <ChatBot />
                        </div>

                        {/* <ChatIA /> */}
                      </div>
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
            <>
              {medicalRecord ? (
                <MedicalRecord
                  user={user}
                  allHrecord={allHrecord}
                  userD={userD}
                />
              ) : (
                <Book />
              )}
            </>
          ) : (
            <>
              {pageInforDoctor ? (
                <InformationDoctor />
              ) : (
                <>
                  <div className={cx("col-12")}>
                    <h1 className={cx("title")}>Thêm thông tin</h1>
                    <div
                      className={cx("addIndex")}
                      onClick={handleModelOpenInfo}
                    >
                      <ControlPointIcon sx={{ fontSize: 30 }} />
                    </div>
                    <label className={cx("addIndex-lable")}>Cấp Cứu</label>
                    <div className={cx("addIndex-bell")} onClick={Emergency}>
                      <AddAlertIcon sx={{ fontSize: 30 }} />
                    </div>

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
                        <AddInformation
                          handleModelCloseInfo={handleModelCloseInfo}
                          user={user}
                        />
                      </div>
                    </ModelWrapper>
                  </div>
                  <div className={cx("col-12")}>
                    <div className={cx("col-2")} onClick={HandleBMI}>
                      <DiseaseIndex
                        name="BMI"
                        index={healReport?.indexBmi}
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
                        index={healReport?.systolic}
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
                        index={healReport?.cholesterol}
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
                        index={healReport?.glucose}
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
                        index={healReport?.heartRateIndicator}
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
                      {healReport?.status === "SAFE" ? (
                        <DiseaseIndex
                          name="Tình trạng"
                          index="Bình thường"
                          icon={
                            <MoodIcon sx={{ fontSize: 40 }} color="success" />
                          }
                        />
                      ) : null}
                      {healReport?.status === "DANGER" ? (
                        <DiseaseIndex
                          name="Tình trạng"
                          index="Nguy hiểm"
                          icon={
                            <FlashOnIcon sx={{ fontSize: 40, color: "red" }} />
                          }
                        />
                      ) : null}
                      {healReport?.status === "CRITIAL" ? (
                        <DiseaseIndex
                          name="Tình trạng"
                          index="Báo Động"
                          icon={
                            <WarningIcon
                              sx={{ fontSize: 40, color: "Yellow" }}
                            />
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className={cx("col-12")}>
                    <div className={cx("Chart")}>
                      {BMI ? <Chart BMI /> : null}
                      {HA ? <Chart HA /> : null}
                      {CHOLES ? <Chart CHOLES /> : null}
                      {GLU ? <Chart GLU /> : null}
                      {TIM ? <Chart TIM /> : null}
                      <ChatBot />
                      {/* <ChatIA /> */}
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
