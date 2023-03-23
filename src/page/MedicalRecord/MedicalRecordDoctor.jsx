import React from "react";
import classNames from "classnames/bind";
import styles from "./MedicalRecordDoctor.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";
import { useState } from "react";
import images from "../../assets/images/index";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import { allHRecordPaient, filterPhonePatient } from "../../Redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useDebounce from "../../components/hooks/useDebounce";
import { useEffect } from "react";
import { fetchAllHRPatient } from "../../Redux/Features/HealthRecord/HealthRecord";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const MedicalRecordDoctor = ({ user, listPatient }) => {
  const dispatch = useDispatch();
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [healReportPatient, setHealReportPatient] = useState([]);
  const [patient, setPatient] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const result = useSelector(filterPhonePatient);
  const debouncedValue = useDebounce(searchPhone, 500);
  const indexPatient = useSelector(allHRecordPaient);

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
    setPatient(users);
  };
  const handleModelOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  return (
    <div className={cx("Title")}>
      <h1>HỒ SƠ BỆNH NHÂN</h1>
      <div className={cx("content")}>
        <div className={cx("listPatient")}>
          <div className={cx("col-4")}>
            <div className={cx("title-list")}>
              Danh sách bệnh nhân ( {listPatient?.length} )
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
                {searchResult ? (
                  <div className={cx("list-conversation")}>
                    <img
                      className={cx("avatar-img")}
                      // src={phoneNumber.avatar}
                      src={images.logo}
                      alt="avatar"
                    />
                    <div className={cx("content-s")}>
                      <h4 className={cx("username")}>
                        {healReportPatient?.fullName}
                      </h4>
                      <p className={cx("message")}>
                        {healReportPatient?.phone}
                      </p>
                      <p className={cx("message")}>
                        Ngày sinh:
                        {moment(healReportPatient?.dateOfBirth).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </div>

                    <div className={cx("result-add-friend")}>
                      <button onClick={handleChoose}>Xem</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {listPatient?.map((users) => {
                      return (
                        <div
                          className={cx("list-conversation")}
                          key={users?._id}
                        >
                          <img
                            className={cx("avatar-img")}
                            // src={phoneNumber.avatar}
                            src={images.logo}
                            alt="avatar"
                          />
                          <div className={cx("content-s")}>
                            <h4 className={cx("username")}>{users.fullName}</h4>
                            <p className={cx("message")}>{users.phone}</p>
                            <p className={cx("message")}>
                              Ngày sinh:
                              {moment(users?.dateOfBirth).format("DD/MM/YYYY")}
                            </p>
                          </div>
                          <div className={cx("result-add-friend")}>
                            <button onClick={() => handleChoose(users)}>
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
        <div className={cx("informationPatient")}>
          <h1>Thông tin bệnh nhân</h1>
          <div className={cx("panel-body p-2")}>
            <form>
              <div className={cx("form-group py-1")}>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Họ và tên:</b> {patient?.fullName}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Ngày sinh:</b>
                      {moment(patient?.dateOfBirth).format("DD/MM/YYYY")}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Số điện thoại:</b> {patient?.phone}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Giới tính:</b> {patient?.gender ? "Nam" : "Nữ"}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field-2")}>
                    <label>
                      <b>Địa chỉ:</b>
                      {patient?.address}
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className={cx("title-table")}>
            Bảng theo dõi chỉ số{" "}
            <button onClick={handleModelOpenInfo}>Xem chi tiết</button>
          </div>
          <ModelWrapper
            className={cx("model-add-information")}
            open={openInfo}
            onClose={handleModelCloseInfo}
          >
            <div className={cx("model-add-information-bg")}>
              <div className={cx("add-information-title")}>
                <span className={cx("information-title")}>
                  Thông tin bệnh nhân
                </span>
                <button className={cx("close-btn")}>
                  <FontAwesomeIcon
                    className={cx("close-ic")}
                    icon={faXmark}
                    onClick={handleModelCloseInfo}
                  />
                </button>
              </div>
              <div className={cx("panel-body p-2")}>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ và tên:</b> {patient.fullName}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>
                          {moment(patient?.dateOfBirth).format("DD/MM/YYYY")}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b> {patient.phone}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b> {patient.gender ? "Nam" : "Nữ"}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số bảo hiểm:</b> {patient.insuranceNumber}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nghề nghiệp:</b> {patient.job}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Địa chỉ:</b> {patient.address}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ tên người thân 1:</b> Lê Tuấn
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại người thân 1:</b> 0123456789
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ tên người thân 2:</b> Lê Tuấn
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại người thân 2:</b> 0123456789
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày điều trị:</b>{" "}
                          {moment(patient?.createdAt).format("DD/MM/YYYY")}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Triệu chứng:</b> khó thở, mệt mỏi(DỮ liệu tạm)
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chiều cao (cm): </b>
                          {patient?.height}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Cân nặng (kq):</b>
                          {patient?.weight}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số BMI:</b> {patient?.indexBmi}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số huyết áp:</b>
                          {patient?.indexBmi}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số Cholesterol:</b>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số Glucose:</b>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chỉ số nhịp:</b>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>tiểu sử bệnh:</b>
                          {patient.medicalHistory}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ModelWrapper>
          <div className={cx("table-infor")}>
            <table className={cx("table table-striped")}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>BMI</th>
                  <th>Tâm thu</th>
                  <th>Tâm trương</th>
                  <th>Cholesterol</th>
                  <th>Glucose</th>
                  <th>Nhịp Tim</th>
                  <th>Ngày</th>
                </tr>
              </thead>
              <tbody>
                {indexPatient?.map((hr, index) => {
                  return (
                    <tr key={hr.id}>
                      <td>{index + 1}</td>
                      <td>{hr.indexBmi}</td>
                      <td>{hr.systolic}</td>
                      <td>{hr.diastolic}</td>
                      <td>{hr.cholesterol}</td>
                      <td>{hr.glucose}</td>
                      <td>{hr.heartRateIndicator}</td>
                      <td>{moment(hr.createdAt).format("DD/MM/YYYY")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDoctor;
