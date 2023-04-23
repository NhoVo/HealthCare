import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames/bind";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import images from "../../assets/images/index";
import useDebounce from "../../components/hooks/useDebounce";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import { fetchAllHRPatient } from "../../Redux/Features/HealthRecord/HealthRecord";
import {
  allHRecordPaient,
  filterPhonePatient,
  inforPatient,
} from "../../Redux/selector";
import styles from "./MedicalRecordDoctor.module.scss";
import { fetchInformationPatient } from "../../Redux/Features/HealthRecord/HeartbeatPatient";
const cx = classNames.bind(styles);
const MedicalRecordDoctor = ({ user, listPatient }) => {
  const dispatch = useDispatch();
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [healReportPatient, setHealReportPatient] = useState([]);
  // const [patient, setPatient] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const result = useSelector(filterPhonePatient);
  const debouncedValue = useDebounce(searchPhone, 500);
  const indexPatient = useSelector(allHRecordPaient);
  const patient = useSelector(inforPatient);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(14);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(indexPatient.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = indexPatient.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={cx(currentPage === number ? "active" : null)}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    if (currentPage !== pages[pages.length - 1]) {
      setcurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePrevbtn = () => {
    if (currentPage !== pages[0]) {
      setcurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
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
  const handleChoose = (users) => {
    dispatch(fetchAllHRPatient(users.id));
    dispatch(fetchInformationPatient(users.id));
  };
  const handleModelOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  return (
    <div className={cx("title")}>
      <div className={cx("center-Infor")}>
        <div className={cx("listPatient")}>
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
                        src={healReportPatient.avatar}
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
                          {moment(healReportPatient?.dateOfBirth).format(
                            "DD/MM/YYYY"
                          )}
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
                              src={user?.avatar}
                              alt="avatar"
                            />
                            <div className={cx("content")}>
                              <span className={cx("username")}>
                                {user?.fullName}
                              </span>
                              <span className={cx("message")}>
                                {user?.phone}
                              </span>
                              <span className={cx("message")}>
                                Ngày sinh:
                                {moment(user?.dateOfBirth).format("DD/MM/YYYY")}
                              </span>
                            </div>
                            <div className={cx("result-add-friend")}>
                              <button onClick={() => handleChoose(user)}>
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
        </div>
        <div className={cx("informationPatient")}>
          <div className={cx("title-table")}>
            <span>Bảng theo dõi chỉ số</span>
            <button onClick={handleModelOpenInfo}>Xem chi tiết</button>
          </div>
          <ModelWrapper
            className={cx("model-add-information")}
            open={openInfo}
            onClose={handleModelCloseInfo}
          >
            <div className={cx("model-add-information-bg")}>
              <div className={cx("add-information-title")}>
                <span className={cx("information-title")}></span>
                <button className={cx("close-btn")}>
                  <FontAwesomeIcon
                    className={cx("close-ic")}
                    icon={faXmark}
                    onClick={handleModelCloseInfo}
                  />
                </button>
              </div>
              <div className={cx("panel-body p-2")}>
                <div className={cx("title-name")}>
                  <span>HỒ SƠ BỆNH ÁN</span>
                </div>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ và tên:</b> <span>{patient[0]?.fullName}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>
                          <span>
                            {moment(patient[0]?.dateOfBirth).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b> <span>{patient[0]?.phone}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b>{" "}
                          <span>{patient[0]?.gender ? "Nam" : "Nữ"}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số bảo hiểm:</b>{" "}
                          <span>{patient[0]?.insuranceNumber}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nghề nghiệp:</b> <span>{patient[0]?.job}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Địa chỉ:</b> <span>{patient[0]?.address}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ tên người thân:</b>
                          <span>{patient[0]?.carer[0]?.fullName}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại người thân:</b>
                          <span>{patient[0]?.carer[0]?.phone}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày điều trị:</b>
                          <span>
                            {moment(patient[0]?.createdAt).format("DD/MM/YYYY")}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Triệu chứng:</b>{" "}
                          <span>{patient[0]?.medicalHistory}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số nhịp:</b>{" "}
                          <span>{patient[0]?.heartRateIndicator}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chiều cao (cm): </b>
                          <span>{patient[0]?.height}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Cân nặng (kq):</b>
                          <span>{patient[0]?.weight}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số BMI:</b> <span>{patient[0]?.indexBmi}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số huyết áp:</b>{" "}
                          <span>{patient[0]?.systolic}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số Cholesterol:</b>
                          <span>{patient[0]?.cholesterol}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số Glucose:</b>{" "}
                          <span>{patient[0]?.glucose}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ModelWrapper>
          <div className={cx("table-infor")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>BMI</th>
                  <th>Tâm thu</th>
                  <th>Tâm trương</th>
                  <th>Cholesterol</th>
                  <th>Glucose</th>
                  <th>Nhịp Tim</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((hr, index) => {
                  return (
                    <tr key={hr.id}>
                      <td>{moment(hr.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{hr.indexBmi}</td>
                      <td>{hr.systolic}</td>
                      <td>{hr.diastolic}</td>
                      <td>{hr.cholesterol}</td>
                      <td>{hr.glucose}</td>
                      <td>{hr.heartRateIndicator}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul className={cx("pageNumbers")}>
            <li onClick={handlePrevbtn}>&lt;</li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li onClick={handleNextbtn}>&gt;</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDoctor;
