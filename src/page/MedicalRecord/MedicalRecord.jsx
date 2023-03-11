import React from "react";
import classNames from "classnames/bind";
import styles from "./MedicalRecord.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";

const cx = classNames.bind(styles);
const MedicalRecord = ({ user, userD, allHrecord }) => {
  return (
    <div className={cx("Title")}>
      <h1>HỒ SƠ BỆNH ÁN</h1>
      <div className={cx("panel-body p-2")}>
        <form>
          <div className={cx("form-group py-1")}>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ và tên:</b> {user.fullName}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày sinh:</b>
                  {moment(user?.dateOfBirth).format("DD/MM/YYYY")}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại:</b> {user.phone}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Giới tính:</b> {user.gender ? "Nam" : "Nữ"}
                </label>
              </div>
            </div>

            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Số bảo hiểm:</b> {user.insuranceNumber}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày cấp:</b> 09/01/2019
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Nghề nghiệp:</b> {user.job}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Cơ quan/ Đơn vị công tác:</b> An Giang
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Bác sĩ điều trị:</b> {userD?.fullName}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Bệnh viện:</b> {userD?.workPlace}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Chuyên môn:</b> {userD?.specialize}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại bác sĩ:</b> {userD?.phone}
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
                  <b>Địa chỉ:</b> {user.address}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field-2")}>
                <label>
                  <b>tiểu sử bệnh:</b>
                  {user.medicalHistory}
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={cx("title-table")}>
        Bảng theo dõi chỉ số <input type="date" />
        <SearchIcon className={cx("search")} />
      </div>
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
            {allHrecord?.map((hr, index) => {
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
  );
};

export default MedicalRecord;
