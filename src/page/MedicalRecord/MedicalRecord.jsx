import classNames from "classnames/bind";
import moment from "moment/moment";
import React from "react";
import styles from "./MedicalRecord.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);
const MedicalRecord = ({ user, userD, allHrecord }) => {
  console.log(userD);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allHrecord.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allHrecord.slice(indexOfFirstItem, indexOfLastItem);

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
  return (
    <div className={cx("title")}>
      <div className={cx("title-name")}>
        <span>HỒ SƠ BỆNH ÁN</span>
      </div>

      <div className={cx("panel-body p-2")}>
        <form>
          <div className={cx("form-group py-1")}>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ và tên:</b> <span>{user.fullName}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày sinh:</b>
                  <span>{moment(user?.dateOfBirth).format("DD/MM/YYYY")}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại:</b> <span>{user.phone}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Giới tính:</b> <span>{user.gender ? "Nam" : "Nữ"}</span>
                </label>
              </div>
            </div>

            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Số bảo hiểm:</b> <span>{user.insuranceNumber}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Nghề nghiệp:</b> <span> {user.job}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Địa chỉ:</b> <span>{user.address}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày điều trị:</b>
                  <span> {moment(user?.createdAt).format("DD/MM/YYYY")}</span>
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ tên người thân:</b>
                  <span>{user?.carer[0]?.fullName}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại người thân:</b>
                  <span>{user?.carer[0]?.phone}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Bác sĩ điều trị:</b>
                  <span>{userD?.fullName}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Bệnh viện:</b> <span>{userD?.workPlace}</span>
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Địa chỉ bác sĩ:</b>
                  <span>{userD?.address}</span>
                </label>
              </div>

              <div className={cx("input-field")}>
                <label>
                  <b>Chuyên môn:</b>
                  <span> {userD?.specialize}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại bác sĩ:</b>
                  <span>{userD?.phone}</span>
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Triệu chứng:</b>
                  <span>{user.medicalHistory}</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={cx("title-table")}>Bảng theo dõi chỉ số</div>
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
  );
};

export default MedicalRecord;
